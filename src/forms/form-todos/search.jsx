import { useState, useEffect } from "react";
import { debounce } from "lodash";
import styles from './Form.module.css'

export const Search = ({ onChange }) => {
  const [search, setSearch] = useState("");

  const handleSearchDebounced = debounce((value) => {
    if (onChange) onChange(value);
  }, 300);

  useEffect(() => {
    handleSearchDebounced(search);

    return () => {
      handleSearchDebounced.cancel();
    };
  }, [search]);

  return (
    <input
      type="text"
      placeholder="Поиск..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className={styles.search}
    />
  );
};
