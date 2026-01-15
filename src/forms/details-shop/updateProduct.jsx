export const updateProduct = (shopList, productId, updater) => {
  const updated = structuredClone(shopList)

  Object.keys(updated).forEach(category => {
    Object.keys(updated[category]).forEach(brand => {
      updated[category][brand] = updated[category][brand].map(item =>
        item.id === productId ? updater(item) : item
      )
    })
  })

  return updated
}
