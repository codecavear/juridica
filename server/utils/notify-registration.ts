/**
 * Notify Telegram when a new user registers.
 * Uses OpenClaw's Telegram bot directly.
 */
export async function notifyNewUser(user: {
  email: string
  name?: string | null
  provider: string
  plan?: string
  coupon?: string
}) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_NOTIFY_CHAT_ID

  if (!botToken || !chatId) {
    console.log('[Notify] TELEGRAM_BOT_TOKEN or TELEGRAM_NOTIFY_CHAT_ID not set, skipping notification')
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

function escapeHtml(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}
