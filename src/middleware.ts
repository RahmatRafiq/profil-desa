import { NextResponse, type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

export async function middleware(request: NextRequest) {
  const isMaintenanceMode = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true'
  const path = request.nextUrl.pathname

  // Check if we are in maintenance mode
  if (isMaintenanceMode) {
    // Prevent redirect loop and allow static assets
    const isMaintenancePage = path === '/maintenance'
    const isStaticAsset = path.startsWith('/_next') || 
                         path.startsWith('/api') ||
                         path.includes('.') // basic check for files like logo.png, favicon.ico

    if (!isMaintenancePage && !isStaticAsset) {
      return NextResponse.redirect(new URL('/maintenance', request.url))
    }
  }

  return await updateSession(request)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
