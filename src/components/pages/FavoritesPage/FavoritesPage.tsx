import Breadcrumbs from '../../generic/Breadcrumbs/Breadcrumbs';
import { FavoritesState } from '../../../slices/favoriteSlice';
import ProductCard from '../ProductTypePage/components/ProductCard/ProductCard';
import { ProductT } from '../../../types';
import styles from './FavoritesPage.module.scss';
import { useFavoritesSelector } from '../../../hooks/reduxHooks';
import Loader from '../../generic/Loader/Loader';

const FavoritesPage: React.FC = () => {
  const favorites = useFavoritesSelector(
    (state: FavoritesState) => state.favorites,
  );
  const isLoading = useFavoritesSelector(state => state.isLoading);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <main className={styles.favoritesPage}>
      <Breadcrumbs />
      <h1 className={styles.title}>Favorites</h1>
      <span className={styles.subText}>{favorites.length} items</span>
      <div className={styles.cardsContainer}>
        {favorites.map((product: ProductT, index: number) => (
          <ProductCard
            key={product.name ? `${product.name}-${index}` : `product_${index}`}
            product={product}
          />
        ))}
      </div>
    </main>
  );
};

export default FavoritesPage;
