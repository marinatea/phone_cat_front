import React from 'react';
import styles from './Badge.module.scss';
import { useCartSelector } from '../../../hooks/reduxHooks';

const CartBadge: React.FC = () => {
  const { cart } = useCartSelector(state => state);

  const itemCount = Object.values(cart).reduce(
    (totalCount, item) => totalCount + item.count,
    0,
  );

  return (
    <div className={styles.cartBadge}>
      <span className={styles.quantity}>{itemCount}</span>
    </div>
  );
};

export default CartBadge;
