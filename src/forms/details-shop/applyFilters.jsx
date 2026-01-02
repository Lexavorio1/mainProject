export const applyFilters = (products, filters) => {
  let result = [...products]

  if (filters.priceFrom) {
    result = result.filter(p => p.price >= Number(filters.priceFrom))
  }

  if (filters.priceTo) {
    result = result.filter(p => p.price <= Number(filters.priceTo))
  }

  if (filters.onlyDiscount) {
    result = result.filter(p => p.discount)
  }

  if (filters.minStars) {
    result = result.filter(p => p.stars >= filters.minStars)
  }

  if (filters.sort === 'priceAsc') {
    result.sort((a, b) => a.price - b.price)
  }

  if (filters.sort === 'priceDesc') {
    result.sort((a, b) => b.price - a.price)
  }

  return result
}
