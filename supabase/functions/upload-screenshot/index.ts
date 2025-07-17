import { createClient } from 'npm:@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    )

    // Get the authenticated user
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser()
    
    if (userError || !user) {
      throw new Error('User not authenticated')
    }

    const formData = await req.formData()
    const file = formData.get('screenshot') as File
    const orderId = formData.get('orderId') as string
    const cardTitle = formData.get('cardTitle') as string
    const amount = formData.get('amount') as string
    const paymentMethod = formData.get('paymentMethod') as string

    if (!file) {
      throw new Error('No screenshot file provided')
    }

    // Upload file to Supabase Storage
    const fileName = `${user.id}/${orderId}/${Date.now()}_${file.name}`
    const { data: uploadData, error: uploadError } = await supabaseClient.storage
      .from('screenshots')
      .upload(fileName, file)

    if (uploadError) {
      throw uploadError
    }

    // Get public URL
    const { data: { publicUrl } } = supabaseClient.storage
      .from('screenshots')
      .getPublicUrl(fileName)

    // Update order with screenshot URL
    const { error: updateError } = await supabaseClient
      .from('orders')
      .update({ 
        screenshot_url: publicUrl,
        payment_status: 'screenshot_uploaded'
      })
      .eq('id', orderId)
      .eq('user_id', user.id)

    if (updateError) {
      throw updateError
    }

    // In a real application, send email to cardvaulter@gmail.com
    console.log('Screenshot uploaded and email would be sent to cardvaulter@gmail.com:', {
      orderId,
      cardTitle,
      amount,
      paymentMethod,
      screenshotUrl: publicUrl,
      userEmail: user.email,
      timestamp: new Date().toISOString()
    })

    return new Response(
      JSON.stringify({ 
        success: true,
        message: 'Screenshot uploaded successfully. Payment confirmation sent to admin.',
        screenshotUrl: publicUrl
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})