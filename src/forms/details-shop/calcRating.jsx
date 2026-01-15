export const calcRating = ratings => {
  if (!ratings || !ratings.length) return 0

  const sum = ratings.reduce((a, b) => a + b, 0)
  return +(sum / ratings.length).toFixed(1)
}
