/**
 * Notify Telegram + Discord when a new user registers.
 */
export async function notifyNewUser(user: {
  email: string
  name?: string | null
  provider: string
  plan?: string
  coupon?: string
}) {
  await Promise.allSettled([
    notifyTelegram(user),
    notifyDiscord(user)
  ])
}

async function notifyTelegram(user: {
  email: string
  name?: string | null
  provider: string
  plan?: string
  coupon?: string
}) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_NOTIFY_CHAT_ID

  if (!botToken || !chatId) {
    console.log('[Notify] TELEGRAM_BOT_TOKEN or TELEGRAM_NOTIFY_CHAT_ID not set, skipping')
    return
  }

  const lines = [
    `🆕 <b>Nuevo usuario en Jurídica</b>`,
    ``,
    `📧 ${escapeHtml(user.email)}`,
    user.name ? `👤 ${escapeHtml(user.name)}` : null,
    `🔑 ${user.provider}`,
    `📋 Plan: ${user.plan || 'free'}`,
    user.coupon ? `🎟️ Cupón: ${user.coupon}` : null
  ].filter(Boolean).join('\n')

  try {
    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: lines,
        parse_mode: 'HTML'
      })
    })
  } catch (e) {
    console.error('[Notify] Telegram send failed:', e)
  }
}

async function notifyDiscord(user: {
  email: string
  name?: string | null
  provider: string
  plan?: string
  coupon?: string
}) {
  const botToken = process.env.DISCORD_BOT_TOKEN
  const channelId = process.env.DISCORD_NOTIFY_CHANNEL_ID

  if (!botToken || !channelId) {
    console.log('[Notify] DISCORD_BOT_TOKEN or DISCORD_NOTIFY_CHANNEL_ID not set, skipping')
    return
  }

  const plan = user.plan || 'free'
  const tierLine = user.coupon ? `${plan} (cupón: ${user.coupon})` : plan
  const name = user.name || 'Sin nombre'

  const content = `🆕 **Jurídica** — ${name} (${user.email})\n🔑 ${user.provider} · **${tierLine}**`

  try {
    await fetch(`https://discord.com/api/v10/channels/${channelId}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bot ${botToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ content })
    })
  } catch (e) {
    console.error('[Notify] Discord send failed:', e)
  }
}

function escapeHtml(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}
