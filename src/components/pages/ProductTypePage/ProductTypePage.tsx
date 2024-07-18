type Props = {
  productsType: 'phones' | 'tablets' | 'accessories';
};

import { useEffect, useMemo, useState } from 'react';
import { fetchSortedProducts } from '../../../slices/productsSlice';
import { Icons, SortType } from '../../../types';
import Breadcrumbs from '../../generic/Breadcrumbs/Breadcrumbs';
import Icon from '../../generic/Icon/Icon';
import ProductCard from './components/ProductCard/ProductCard';
import Select from './components/Select/Select';
import styles from './ProductTypePage.module.scss';
import { useAppDispatch, useProductsSelector } from '../../../hooks/reduxHooks';
import Loader from '../../generic/Loader/Loader';

const sortOptions = [
  { value: SortType.WITHOUT_SORT, label: 'Without Sort' },
  { value: SortType.AZ, label: 'A to Z' },
  { value: SortType.ZA, label: 'Z to A' },
  { value: SortType.LOW_TO_HIGH, label: 'Lowest Price' },
  { value: SortType.HIGH_TO_LOW, label: 'Highest Price' },
  { value: SortType.NEWEST_TO_OLDEST, label: 'Newest' },
  { value: SortType.OLDEST_TO_NEWEST, label: 'Oldest' },
];

const itemsPerPageOptions = [
  { value: 8, label: '8' },
  { value: 16, label: '16' },
  { value: 24, label: '24' },
  { value: 32, label: '32' },
  { value: Number.MAX_SAFE_INTEGER, label: 'All' },
];

const ProductTypePage: React.FC<Props> = ({ productsType }) => {
  const dispatch = useAppDispatch();
  const { phones, tablets, accessories, sortedProducts, isLoading } =
    useProductsSelector(state => state);
  const params = useMemo(() => new URLSearchParams(window.location.search), []);
  const [currentPage, setCurrentPage] = useState(
    () => Number(params.get('page')) || 1,
  );
  const [itemsPerPage, setItemsPerPage] = useState(
    () => Number(params.get('itemsPerPage')) || 16,
  );
  const [sortType, setSortType] = useState<SortType>(
    () => (params.get('sort') as SortType) || SortType.WITHOUT_SORT,
  );

  const products =
    productsType === 'phones'
      ? phones
      : productsType === 'tablets'
        ? tablets
        : accessories;
  const productCount = products.length;
  const totalPages = Math.ceil(productCount / itemsPerPage);

  let pageTitle = '';

  switch (productsType) {
    case 'phones':
      pageTitle = 'Mobile Phones';
      break;
    case 'tablets':
      pageTitle = 'Tablets';
      break;
    case 'accessories':
      pageTitle = 'Accessories';
      break;
  }

  useEffect(() => {
    dispatch(
      fetchSortedProducts({
        category: productsType,
        sort: sortType,
        start: currentPage,
        limit: itemsPerPage,
      }),
    );
  }, [productsType, sortType, currentPage, itemsPerPage, dispatch]);

  useEffect(() => {
    params.set('sort', sortType);
    params.set('itemsPerPage', itemsPerPage.toString());
    params.set('page', currentPage.toString());
    window.history.replaceState(
      {},
      '',
      `${window.location.pathname}?${params}`,
    );
  }, [sortType, itemsPerPage, currentPage, params]);

  const handleSortChange = (value: number | SortType | undefined) => {
    if (typeof value === 'number' || typeof value === 'string') {
      setSortType(value as SortType);
      setCurrentPage(1);
    }
  };

  const handleItemsPerPageChange = (value: number | SortType | undefined) => {
    if (typeof value === 'number') {
      setItemsPerPage(value);
      setCurrentPage(1);
    }
  };

  const pagination = (pageNumber: number) => setCurrentPage(pageNumber);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 4;

    let startPage = Math.max(currentPage - Math.floor(maxPagesToShow / 2), 1);
    let endPage = startPage + maxPagesToShow - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(endPage - maxPagesToShow / 2, 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <span
          key={i}
          onClick={() => pagination(i)}
          className={
            currentPage === i
              ? `${styles.active} ${styles.pageNumber}`
              : styles.pageNumber
          }
          onMouseEnter={e => e.currentTarget.classList.add(styles.hover)}
          onMouseLeave={e => e.currentTarget.classList.remove(styles.hover)}
        >
          {i}
        </span>,
      );
    }

    return pageNumbers;
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <main className={styles.phonesPage}>
      <Breadcrumbs />
      <h1 className={styles.title}>{pageTitle}</h1>
      <span className={styles.subText}>{sortedProducts.length} models</span>
      <div className={styles.filterWrapper}>
        <div className={styles.filter}>
          <label className={styles.label} htmlFor="sort">
            Sort by:
          </label>
          <Select
            options={sortOptions}
            value={sortType}
            onChange={handleSortChange}
            className="my-custom-select"
          />
        </div>
        <div className={styles.filter}>
          <label className={styles.label} htmlFor="itemsPerPage">
            Items per page:
          </label>
          <Select
            options={itemsPerPageOptions}
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            className="my-custom-select"
          />
        </div>
      </div>
      <div className={styles.cardsContainer}>
        {sortedProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className={styles.pageSelector}>
        <Icon
          iconId={Icons.ARROW_LEFT}
          className={`${styles.arrowLeft} ${currentPage === 1 ? styles.disabled : ''}`}
          onClick={() => pagination(currentPage - 1)}
          disabled={currentPage === 1}
        />
        {renderPageNumbers()}
        <Icon
          iconId={Icons.ARROW_RIGHT}
          className={`${styles.arrowRight} ${currentPage === totalPages ? styles.disabled : ''}`}
          onClick={() => pagination(currentPage + 1)}
          disabled={currentPage === totalPages}
        />
      </div>
    </main>
  );
};

export default ProductTypePage;
