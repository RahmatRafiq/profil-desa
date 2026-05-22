import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', { status: 401 })
  }

  try {
    const supabase = await createClient()
    
    // Perform a lightweight query to keep the database active
    const { error } = await supabase
      .from('village_info')
      .select('id')
      .limit(1)
      .single()

    if (error) {
      console.error('Keep-alive query failed:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Database keep-alive successful',
      timestamp: new Date().toISOString()
    })
  } catch (err) {
    console.error('Unexpected error during keep-alive:', err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
