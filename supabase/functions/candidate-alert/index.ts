import { serve } from 'https://deno.land/std@0.224.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const payload = await req.json()

    const resendApiKey = Deno.env.get('RESEND_API_KEY')
    const emailTo = Deno.env.get('ALERT_EMAIL_TO')
    const emailFrom = Deno.env.get('ALERT_EMAIL_FROM')

    if (!resendApiKey || !emailTo || !emailFrom) {
      return Response.json(
        { error: 'Missing email environment variables.' },
        { status: 500, headers: corsHeaders },
      )
    }

    const fullName = payload.full_name ?? 'New registration'
    const documentLabel = `${payload.document_type ?? ''} ${payload.document_number ?? ''}`.trim()
    const phone = [payload.phone_country_code, payload.phone].filter(Boolean).join(' ')

    const html = `
      <div style="font-family:Arial,sans-serif;line-height:1.6;color:#1f2937">
        <h2 style="color:#262788">New registration in Fill D Gap</h2>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${payload.email ?? ''}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Document:</strong> ${documentLabel}</p>
        <p><strong>Vocation:</strong> ${payload.vocation ?? ''}</p>
        <p><strong>Second vocation:</strong> ${payload.secondary_vocation ?? 'Not provided'}</p>
        <p><strong>Country:</strong> ${payload.country ?? ''}</p>
        <p><strong>Province:</strong> ${payload.province ?? ''}</p>
        <p><strong>Availability:</strong> ${payload.availability ?? ''}</p>
        <p><strong>Years of experience:</strong> ${payload.experience_years ?? ''}</p>
        <p><strong>License:</strong> ${payload.license ? 'Yes' : 'No'}</p>
        <p><strong>CV:</strong> ${payload.reference_letter_url ? `<a href="${payload.reference_letter_url}">Open file</a>` : 'No file'}</p>
      </div>
    `

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: emailFrom,
        to: [emailTo],
        subject: `New registration - ${fullName}`,
        html,
      }),
    })

    if (!response.ok) {
      const details = await response.text()
      return Response.json(
        { error: 'Failed to send email.', details },
        { status: 500, headers: corsHeaders },
      )
    }

    return Response.json({ ok: true }, { headers: corsHeaders })
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : 'Unexpected error' },
      { status: 500, headers: corsHeaders },
    )
  }
})
