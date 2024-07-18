import { IProductDetails, Icons, ProductT } from '../../../../../types';
import { Link, useNavigate } from 'react-router-dom';
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
import { addToCart } from '../../../../../slices/cartSlice';
// import { addToFavorites } from '../../../../../slices/favoriteSlice';
import classnames from 'classnames';
import getProductLink from '../../../../../utils/getProductLink';
import style from './Actions.module.scss';
import { useUser } from '@clerk/clerk-react';

const AVAILABLE_COLORS: { [key: string]: string } = {
  gold: '#fad8bd',
  spacegray: '#4d4c4a',
  midnightgreen: '#49534b',
  silver: '#e9e9e1',
  black: '#25262a',
  rosegold: '#f1c8c2',
  green: '#b7e4d0',
  yellow: '#ffe98b',
  white: '#fffaf7',
  purple: '#d4d1dc',
  red: '#cd273f',
  coral: '#ff6451',
};

interface Props {
  product: IProductDetails | null;
  productWithoutDetails: ProductT | null;
  productType: 'phones' | 'tablets' | 'accessories';
}

const Actions: React.FC<Props> = ({
  product,
  productWithoutDetails,
  productType,
}) => {
  const { cart } = useCartSelector(state => state);
  const { favorites } = useFavoritesSelector(state => state);
  const dispatch = useAppDispatch();
  const { user, isSignedIn } = useUser();
  const navigate = useNavigate();

  const isProductInFavorites = favorites.some(
    item => item.itemId === product?.id,
  );

  const [icon, setIcon] = useState(
    isProductInFavorites ? Icons.HEART_FILL : Icons.HEART,
  );

  useEffect(() => {
    setIcon(
      favorites.some(item => item.name === product?.name)
        ? Icons.HEART_FILL
        : Icons.HEART,
    );
  }, [favorites, product]);

  if (!product || !productWithoutDetails) {
    return null;
  }

  const toggleProductFavorites = () => {
    if (isSignedIn) {
      if (isProductInFavorites) {
        dispatch(
          removeFromFavorites({
            itemId: productWithoutDetails?.itemId || '',
            userId: user?.id as string,
          }),
        );
        setIcon(Icons.HEART);
      } else {
        dispatch(
          addToFavorites({
            newItem: productWithoutDetails,
            userId: user?.id as string,
          }),
        );
        setIcon(Icons.HEART_FILL);
      }
    } else {
      navigate('/signin/');
    }
  };

  const {
    name,
    capacityAvailable,
    colorsAvailable,
    priceDiscount,
    priceRegular,
    screen,
    resolution,
    processor,
    ram,
    capacity,
    id,
    images,
  } = product;

  const infoItems = [
    {
      title: 'Screen',
      value: screen,
    },
    {
      title: 'Resolution',
      value: resolution,
    },
    {
      title: 'Processor',
      value: processor,
    },
    {
      title: 'Ram',
      value: ram,
    },
  ];

  const activeColor = id.split('-').pop();

  const isProductInCard = Object.hasOwn(cart, id);

  const cartProduct = {
    id,
    name,
    image: images[0] || '',
    price: priceDiscount,
  };

  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <div className={style.colors}>
          <span className={style.label}>Available colors</span>
          <ul className={style.list}>
            {colorsAvailable.map(color => (
              <li key={color} className={style.item}>
                <Link
                  to={`/${productType}/${getProductLink({
                    id,
                    newPart: color,
                  })}`}
                  className={classnames(style.colorsLink, {
                    [style.activeLink]: color === activeColor,
                  })}
                  style={{ backgroundColor: AVAILABLE_COLORS[color] || color }}
                />
              </li>
            ))}
          </ul>
        </div>
        <div className={style.capacity}>
          <span className={style.label}>Select capacity</span>
          <ul className={style.list}>
            {capacityAvailable.map(capacityItem => (
              <li key={capacityItem} className={style.item}>
                <Link
                  to={`/${productType}/${getProductLink({
                    id,
                    newPart: capacityItem.toLowerCase(),
                    index: -2,
                  })}`}
                >
                  <Button
                    title={capacityItem}
                    type={capacityItem === capacity ? 'primary' : 'secondary'}
                    className={classnames(style.capacityButton, {
                      [style.capacityButtonActive]: capacityItem === capacity,
                    })}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className={style.price}>
          <span>{`$${priceDiscount}`}</span>
          <span className={style.priceRegular}>{`$${priceRegular}`}</span>
        </div>
        <div className={style.actions}>
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
            className={style.addToCard}
            title={isProductInCard ? 'Added to cart' : 'Add to cart'}
          />
          <Button
            onClick={toggleProductFavorites}
            type="secondary"
            className={style.addToFavorite}
            icon={icon}
          />
        </div>
        <ul>
          {infoItems.map(({ title, value }) => (
            <li className={style.infoItem} key={value}>
              <span className={style.infoTitle}>{title}</span>
              <span>{value}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Actions;
