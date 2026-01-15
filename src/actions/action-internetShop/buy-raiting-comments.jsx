export const buyCart = user => ({
  type: 'CREATE_ORDER',
  payload: {
    userId: user.id,
    order: {
      id: Date.now(),
      items: user.cart,
      total: user.cart.reduce(
        (s, i) => s + i.price * (1 - i.procent / 100) * i.count,
        0
      ),
      date: Date.now()
    }
  }
})

export const addReview = (productId, review) => ({
  type: 'ADD_REVIEW',
  payload: {
    productId,
    review
  }
})