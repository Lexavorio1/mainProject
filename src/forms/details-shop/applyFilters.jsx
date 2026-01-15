import { flattenShopList } from "./Flatten.shopList"

export const applyFilters = (shopList, filters) => {
  let result = flattenShopList(shopList)

  if (filters.priceFrom !== '' && filters.priceFrom != null) {
    result = result.filter(p => p.price >= Number(filters.priceFrom))
  }

  if (filters.priceTo !== '' && filters.priceTo != null) {
    result = result.filter(p => p.price <= Number(filters.priceTo))
  }

  if (filters.onlyDiscount) {
    result = result.filter(p => p.discount)
  }

  if (filters.minStars) {
    result = result.filter(p => p.stars >= filters.minStars)
  }

  if (filters.sort === 'priceAsc') {
    result = [...result].sort((a, b) => a.price - b.price)
  }

  if (filters.sort === 'priceDesc') {
    result = [...result].sort((a, b) => b.price - a.price)
  }

  return result
}
