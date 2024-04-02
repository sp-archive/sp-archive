import type { Config, Context } from '@netlify/functions'

const FORWARD_HOST = 'https://api.mixpanel.com/'

function getForwardedFor(req: Request, ip: string) {
  if (!req.headers.has('X-Real-Ip'))
    return ip

  const list = (req.headers.get('X-Forwarded-For') ?? '').split(', ')
  list.push(req.headers.get('X-Real-Ip')!)
  return list.join(', ')
}

export default async (req: Request, ctx: Context) => {
  const headers = new Headers(req.headers)
  headers.set('X-Real-IP', ctx.ip)
  headers.set('X-Forwarded-For', getForwardedFor(req, ctx.ip))
  headers.set('X-Forwarded-Host', new URL(req.url).host)
  ctx.log('new headers: %o', headers)

  const url = FORWARD_HOST + ctx.params.endpoint
  ctx.log('forward to: %s', url)

  const response = await fetch(url, {
    body: req.body,
    method: req.method,
    headers,
  })

  const body = await response.text()
  ctx.log('mixpanel response: %o', body)
  return new Response(body, {
    status: response.status,
    headers: response.headers,
  })
}

export const config: Config = {
  path: ['/mixpanel/:endpoint'],
}
