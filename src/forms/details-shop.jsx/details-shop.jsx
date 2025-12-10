import styles from '../form-register-shop/InternetShop.module.css'

export const DetailsShop = ({ product, onBack }) => {
  if (!product) return null

  return (
    <div className={styles.productDetail}>
      <button className={styles.backButtonSmall} onClick={onBack}>
        ← Назад
      </button>
      <h2>{product.name}</h2>
      {product.img && <img src={product.img} width="300" alt={product.name} />}
      <p>Цена: {product.price || '-'}</p>
      <p>Звёзды: {product.stars || '-'}</p>
      <p>{product.title}</p>
    </div>
  )
}
