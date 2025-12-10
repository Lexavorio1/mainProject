import { SwiperInternetShop } from '../../forms/form-register-shop/swiper-internetShop'
import { DetailsShop } from '../../forms/details-shop.jsx/details-shop'
import { RoutingInternetShop } from '../../forms/form-register-shop/form-RoutingShop' 
import { SearchInternetShop } from '../../forms/form-register-shop/search-internetshop'
import { useState } from 'react'
import styles from './App-shop.module.css'

export const AppInternetShop = ({ onBack }) => {
  const [searchShop, setSearchShop] = useState('')
  const [selectedProduct, setSelectedProduct] = useState(null)

  return (
    <div className={styles.appShop}>
      <div className={styles.shopContainer}>
        <button className={styles.backButton} onClick={onBack}>
          ← Назад
        </button>

        <SearchInternetShop onChange={setSearchShop} />

        {/* Swiper со скидками */}
        {!searchShop && !selectedProduct && (
          <SwiperInternetShop onSelectProduct={setSelectedProduct} />
        )}

        {/* Основной роутинг или детали */}
        <div className={styles.mainShop}>
          {selectedProduct ? (
            <DetailsShop
              product={selectedProduct}
              onBack={() => setSelectedProduct(null)}
            />
          ) : (
            <RoutingInternetShop
              searchValue={searchShop}
              selectedProduct={selectedProduct}
              setSelectedProduct={setSelectedProduct}
            />
          )}
        </div>
      </div>
    </div>
  )
}
