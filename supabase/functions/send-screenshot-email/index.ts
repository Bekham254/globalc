import { createClient } from 'npm:@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const resendApiKey = Deno.env.get('RESEND_API_KEY')
    if (!resendApiKey) {
      throw new Error('RESEND_API_KEY is not configured')
    }

    // Create Supabase client with service role for public access
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    )

    const formData = await req.formData()
    const file = formData.get('screenshot') as File
    const customerEmail = formData.get('customerEmail') as string
    const orderDetails = formData.get('orderDetails') as string

    if (!file) {
      throw new Error('No screenshot file provided')
    }

    console.log('Processing screenshot submission:', {
      fileName: file.name,
      fileSize: file.size,
      customerEmail: customerEmail || 'anonymous',
      orderDetails: orderDetails || 'Payment screenshot'
    })

    // Store the submission in database for admin review
    const { data: submission, error: dbError } = await supabaseClient
      .from('screenshot_submissions')
      .insert({
        customer_email: customerEmail || 'anonymous@cardvault.com',
        order_details: orderDetails || 'Payment screenshot submission',
        file_name: file.name,
        file_size: file.size,
        status: 'pending_review'
      })
      .select()
      .single()

    if (dbError) {
      console.error('Database error:', dbError)
      throw new Error(`Failed to save submission: ${dbError.message}`)
    }

    console.log('Screenshot submission saved successfully:', submission.id)

    // Convert file to base64 for email attachment
    const arrayBuffer = await file.arrayBuffer()
    const base64File = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)))

    // Send email with Resend via direct API call
    try {
      const emailResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'noreply@cardvault.com',
          to: 'cardvaulter@gmail.com',
          subject: `Payment Screenshot - CardVault Order #${submission.id}`,
          html: `
<div style="font-family: Arial, sans-serif; color: #333; max-width: 600px;">
  <h2 style="color: #1a7f64;">New Payment Screenshot Received</h2>

  <div style="background-color: #f5f5f5; padding: 15px; border-radius: 8px; margin: 20px 0;">
    <p><strong>Customer Email:</strong> ${customerEmail || 'Not provided'}</p>
    <p><strong>Order Details:</strong> ${orderDetails || 'Payment screenshot submission'}</p>
    <p><strong>Screenshot File:</strong> ${file.name}</p>
    <p><strong>File Size:</strong> ${(file.size / 1024 / 1024).toFixed(2)} MB</p>
    <p><strong>Submission ID:</strong> ${submission.id}</p>
    <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
  </div>

  <p>Please check the admin panel for the uploaded screenshot.</p>
</div>
          `,
          attachments: [{
            filename: file.name,
            content: base64File
          }]
        })
      })

      const emailResult = await emailResponse.json()

      if (!emailResponse.ok) {
        console.error('Email API error:', emailResult)
        throw new Error(`Failed to send email: ${emailResult.message || 'Email service error'}`)
      }

      console.log('Email sent successfully:', emailResult.id)
    } catch (emailError) {
      console.error('Email service error:', emailError)
      throw new Error(`Failed to send email notification: ${emailError instanceof Error ? emailError.message : 'Unknown error'}`)
    }

    // Always return success since we saved to database
    return new Response(
      JSON.stringify({ 
        success: true,
        submissionId: submission.id,
        message: 'Screenshot submitted successfully! Admin will be notified via email at cardvaulter@gmail.com'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    console.error('Screenshot submission error:', error)
    const errorMessage = error instanceof Error ? error.message : String(error)
    return new Response(
      JSON.stringify({
        error: errorMessage,
        message: 'Failed to submit screenshot. Please try again or contact support.'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})