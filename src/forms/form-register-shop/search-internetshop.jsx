import { useState, useEffect, useMemo } from "react"
import { debounce } from "lodash"
import styles from './InternetShop.module.css'

export const SearchInternetShop = ({ onChange }) => {
  const [search, setSearch] = useState("")

  // создаём debounce один раз (или при изменении onChange)
  const handleSearchDebounced = useMemo(
    () => debounce(value => {
      if (onChange) onChange(value)
    }, 300),
    [onChange]
  )

  useEffect(() => {
    handleSearchDebounced(search)
    return () => handleSearchDebounced.cancel()
  }, [search, handleSearchDebounced])

  return (
    <input
      type="text"
      placeholder="Поиск товаров..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className={styles.search}
    />
  )
}
