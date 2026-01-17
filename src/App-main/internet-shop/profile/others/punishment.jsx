export const isPermanent = v => v === 'permanent'

export const isActiveUntil = until =>
  typeof until === 'number' && Date.now() < until

/* ===== BAN ===== */
export const isBanned = user => {
  if (!user?.banUntil) return false
  if (isPermanent(user.banUntil)) return true
  return isActiveUntil(user.banUntil)
}

export const getRemainingDays = banUntil => {
  if (!banUntil || banUntil === 'permanent') return null
  const diff = banUntil - Date.now()
  return Math.max(
    0,
    Math.ceil(diff / (1000 * 60 * 60 * 24))
  )
}

/* ===== MUTE ===== */
export const isMuted = user => {
  if (!user?.muteUntil) return false
  if (isPermanent(user.muteUntil)) return true
  return isActiveUntil(user.muteUntil)
}
