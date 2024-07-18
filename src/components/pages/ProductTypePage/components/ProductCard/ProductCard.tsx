interface Props {
  product: ProductT;
  isSlider?: boolean;
}

import { Icons, ProductT } from '../../../../../types';
import {
  addToFavorites,
  removeFromFavorites,
} from '../../../../../slices/favoriteSlice';
import {
  useAppDispatch,
  useCartSelector,
  useFavoritesSelector,
} from '../../../../../hooks/reduxHooks';
import { useEffect, useState } from 'react';

import Button from '../../../../generic/Button/Button';
import Icon from '../../../../generic/Icon/Icon';
import { addToCart } from '../../../../../slices/cartSlice';
import classnames from 'classnames';
import styles from './ProductCard.module.scss';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';

const ProductCard: React.FC<Props> = ({ product, isSlider }) => {
  const { cart } = useCartSelector(state => state);
  const { favorites } = useFavoritesSelector(state => state);
  const dispatch = useAppDispatch();
  const { user, isSignedIn } = useUser();
  const navigate = useNavigate();

  const {
    itemId: id,
    name,
    capacity,
    ram,
    price,
    fullPrice,
    screen,
    image,
  } = product;

  const isProductInCard = Object.hasOwn(cart, id);
  const cartProduct = {
    id,
    name,
    image,
    price,
  };

  const favoriteCard: ProductT = {
    name: product.name,
    capacity,
    color: product.color,
    screen,
    ram,
    id: product.id,
    category: 'phones',
    itemId: product.itemId,
    fullPrice: product.fullPrice,
    price: product.price,
    year: product.year,
    image: product.image,
  };

  const isProductInFavorites = favorites.some(item => item.name === name);

  const [icon, setIcon] = useState(
    isProductInFavorites ? Icons.HEART_FILL : Icons.HEART,
  );

  useEffect(() => {
    setIcon(
      favorites.some(item => item.name === name)
        ? Icons.HEART_FILL
        : Icons.HEART,
    );
  }, [favorites, name]);

  const handleFavoriteClick = () => {
    if (isSignedIn) {
      if (isProductInFavorites) {
        dispatch(
          removeFromFavorites({
            itemId: favoriteCard.itemId,
            userId: user?.id as string,
          }),
        );

        setIcon(Icons.HEART);
      } else {
        dispatch(
          addToFavorites({ newItem: favoriteCard, userId: user?.id as string }),
        );

        setIcon(Icons.HEART_FILL);
      }
    } else {
      navigate('/signin/');
    }
  };

  const link = '/' + product.category + '/' + product.itemId;

  return (
    <div
      className={classnames(
        {
          [styles.sliderCardContainer]: isSlider,
          [styles.container]: !isSlider,
        },
        '__app-PhoneCard-container',
      )}
      data-cy="cardsContainer"
    >
      <a href={link} className={styles.link}>
        <img
          className={classnames({
            [styles.sliderCardImage]: isSlider,
            [styles.image]: !isSlider,
          })}
          src={`${image}`}
          alt={name}
        />
      </a>
      <a href={link} className={styles.name}>
        {name}
      </a>
      <div className={styles.price}>
        <span className={styles.currentPrice}>{`$${price}`}</span>
        <span className={styles.fullPrice}>{`$${fullPrice}`}</span>
      </div>
      <ul className={styles.detailsList}>
        <li className={styles.detailsItem}>
          <span className={styles.detailsTitle}>Screen</span>
          <span>{screen}</span>
        </li>
        <li className={styles.detailsItem}>
          <span className={styles.detailsTitle}>Capacity</span>
          <span>{capacity}</span>
        </li>
        <li className={styles.detailsItem}>
          <span className={styles.detailsTitle}>RAM</span>
          <span>{ram}</span>
        </li>
      </ul>
      <div className={styles.buttons}>
        <Button
          onClick={() => {
            if (isSignedIn) {
              dispatch(
                addToCart({
                  newItem: { ...cartProduct, count: 1 },
                  userId: user?.id as string,
                }),
              );
            } else {
              navigate('/signin/');
            }
          }}
          isSelected={isProductInCard}
          className={styles.addToCard}
          title={isProductInCard ? 'Added to cart' : 'Add to cart'}
          isDisabled={isProductInCard}
        />
        <Icon
          onClick={handleFavoriteClick}
          className={styles.addToFavorite}
          iconId={icon}
        />
      </div>
    </div>
  );
};

export default ProductCard;
