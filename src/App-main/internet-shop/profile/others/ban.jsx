export const isUserBanned = user => {
  if (!user?.ban?.active) return false

  const now = Date.now()
  const from = new Date(user.ban.from).getTime()
  const to = new Date(user.ban.to).getTime()

  return now >= from && now <= to
}

export const getBanRemainingDays = user => {
  if (!isUserBanned(user)) return 0

  const now = Date.now()
  const to = new Date(user.ban.to).getTime()

  return Math.ceil((to - now) / (1000 * 60 * 60 * 24))
}
