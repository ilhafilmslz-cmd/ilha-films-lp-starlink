import type { NextApiRequest, NextApiResponse } from 'next'
import crypto from 'crypto'

const PIXEL_ID = '1463619988729054'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const token = process.env.META_API_TOKEN

  if (!token) {
    console.error('META_API_TOKEN não configurado')
    return res.status(500).json({ error: 'Token não configurado' })
  }

  const clientIp =
    (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
    req.socket.remoteAddress ||
    ''

  const userAgent = req.headers['user-agent'] || ''
  const eventTime = Math.floor(Date.now() / 1000)
  const hashedIp = crypto.createHash('sha256').update(clientIp).digest('hex')

  const payload: Record<string, unknown> = {
    data: [
      {
        event_name: 'Contact',
        event_time: eventTime,
        action_source: 'website',
        event_source_url: req.headers.referer || 'https://ilhafilms.com.br',
        user_data: {
          client_ip_address: clientIp,
          client_user_agent: userAgent,
          fbc: req.body?.fbc || '',
          fbp: req.body?.fbp || '',
        },
        custom_data: {
          content_name: req.body?.content_name || 'Pelicula Automotiva',
          currency: 'BRL',
        },
      },
    ],
  }

  // Inclui test_event_code apenas se a variável de ambiente estiver definida
  if (process.env.FB_TEST_CODE) {
    payload.test_event_code = process.env.FB_TEST_CODE
  }

  try {
    const response = await fetch(
      `https://graph.facebook.com/v19.0/${PIXEL_ID}/events?access_token=${token}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }
    )

    const data = await response.json()

    if (!response.ok) {
      console.error('Erro CAPI Meta:', data)
      return res.status(500).json({ error: 'Erro ao enviar evento', details: data })
    }

    return res.status(200).json({ success: true, events_received: data.events_received })
  } catch (error) {
    console.error('Erro na requisição CAPI:', error)
    return res.status(500).json({ error: 'Erro interno' })
  }
}
