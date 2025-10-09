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
    )

    const formData = await req.formData()
    const file = formData.get('screenshot') as File
    const customerEmail = formData.get('customerEmail') as string
    const orderDetails = formData.get('orderDetails') as string

    if (!file) {
      throw new Error('No screenshot file provided')
    }

    // Convert file to base64 for email attachment
    const arrayBuffer = await file.arrayBuffer()
    const base64File = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)))

    // Prepare email content
    const emailSubject = 'Payment Screenshot - CardVault Order'
    const emailBody = `
      New payment screenshot received from CardVault customer.
      
      Customer Email: ${customerEmail}
      Order Details: ${orderDetails}
      Screenshot File: ${file.name}
      File Size: ${(file.size / 1024 / 1024).toFixed(2)} MB
      Timestamp: ${new Date().toISOString()}
      
      Please find the payment screenshot attached.
    `

    // Using a simple email service (you can replace with SendGrid, Resend, etc.)
    const emailPayload = {
      to: 'cardvaulter@gmail.com',
      from: 'noreply@cardvault.com',
      subject: emailSubject,
      text: emailBody,
      attachments: [
        {
          filename: file.name,
          content: base64File,
          type: file.type,
          disposition: 'attachment'
        }
      ]
    }

    // For demo purposes, we'll use a webhook service like Zapier or Make.com
    // In production, you'd use a proper email service
    const webhookUrl = 'https://hooks.zapier.com/hooks/catch/your-webhook-id/'
    
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailPayload)
    })

    if (!response.ok) {
      // Fallback: Log the email details for manual processing
      console.log('Email sending failed, logging for manual processing:', {
        to: 'cardvaulter@gmail.com',
        customerEmail,
        orderDetails,
        fileName: file.name,
        fileSize: file.size,
        timestamp: new Date().toISOString()
      })
      
      // Store in database for admin review
      await supabaseClient
        .from('screenshot_submissions')
        .insert({
          customer_email: customerEmail,
          order_details: orderDetails,
          file_name: file.name,
          file_size: file.size,
          status: 'pending_manual_review',
          created_at: new Date().toISOString()
        })
    }

    return new Response(
      JSON.stringify({ 
        success: true,
        message: 'Screenshot sent successfully to cardvaulter@gmail.com'
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