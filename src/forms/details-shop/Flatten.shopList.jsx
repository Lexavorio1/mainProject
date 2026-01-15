export const flattenShopList = (shopList = []) => {
  const shop = shopList[0]
  if (!shop || typeof shop !== 'object') return []

  const result = []

  Object.entries(shop).forEach(([category, group]) => {
    if (Array.isArray(group)) {
      group.forEach(item =>
        result.push({
          ...item,
          __category: category
        })
      )
    } else {
      Object.entries(group).forEach(([brand, items]) => {
        if (!Array.isArray(items)) return

        items.forEach(item =>
          result.push({
            ...item,
            __category: category,
            __brand: brand
          })
        )
      })
    }
  })

  return result
}
