/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect, useMemo, useRef, useState } from 'react';

import Icon from '../../../../generic/Icon/Icon';
import { Icons } from '../../../../../types';
import { Link } from 'react-router-dom';
import styles from './SearchBar.module.scss';
import { useProductsSelector } from '../../../../../hooks/reduxHooks';

const SearchBar: React.FC = () => {
  const [isListOpen, setIsListOpen] = useState(false);
  const [search, setSearch] = useState('');
  const inputContainerRef = useRef<HTMLDivElement>(null);

  const { allProducts } = useProductsSelector(state => state);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputContainerRef.current &&
        !inputContainerRef.current.contains(event.target as Node)
      ) {
        setIsListOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const displayProducts = useMemo(() => {
    const lowSearch = search.toLowerCase().trim();

    return allProducts.filter(product =>
      product.name.toLowerCase().includes(lowSearch),
    );
  }, [allProducts, search]);

  return (
    <div
      className={styles.container}
      ref={inputContainerRef}
      onClick={() => {
        setIsListOpen(true);
      }}
    >
      <label className={styles.iconContainer} htmlFor="searchInput">
        <Icon iconId={Icons.SEARCH} className={styles.icon} />
      </label>
      <div className={styles.inputContainer}>
        <input
          className={styles.input}
          type="text"
          id="searchInput"
          value={search}
          placeholder="Search for a product"
          onChange={({ target }) => {
            setSearch(target.value);
          }}
        />
        {isListOpen && (
          <div className={styles.itemsContainer}>
            {displayProducts.map(product => (
              <Link
                to={`/${product.category}/${product.itemId}`}
                key={product.id}
                className={styles.item}
                onClick={() => {
                  setTimeout(() => {
                    setIsListOpen(false);
                  }, 1);
                }}
              >
                <div className={styles.imgContainer}>
                  <img
                    className={styles.img}
                    src={product.image}
                    alt="productImage"
                  />
                </div>

                <p className={styles.name}>{product.name}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
