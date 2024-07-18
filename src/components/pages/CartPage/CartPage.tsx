import { useAppDispatch, useCartSelector } from '../../../hooks/reduxHooks';

import Breadcrumbs from '../../generic/Breadcrumbs/Breadcrumbs';
import Button from '../../generic/Button/Button';
import CartItem from './components/CartItem/CartItem';
import ModalSuccess from './components/ModalSuccess/ModalSuccess';
import { removeFromCart } from '../../../slices/cartSlice';
import styles from './CartPage.module.scss';
import { useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { OrderT } from '../../../types';
import { addOrder } from '../../../slices/orderSlice';

const CartPage: React.FC = () => {
  const [isCheckedOut, setIsCheckedOut] = useState(false);
  const { cart } = useCartSelector(state => state);

  const dispatch = useAppDispatch();
  const { user } = useUser();

  const totalPrice = Object.values(cart).reduce(
    (reducerPrice, item) => reducerPrice + item.count * item.price,
    0,
  );

  const itemCount = Object.values(cart).reduce(
    (reducerCount, item) => reducerCount + item.count,
    0,
  );

  const handleCheckout = async () => {
    setIsCheckedOut(true);

    for (const itemId of Object.keys(cart)) {
      const item = cart[itemId];
      const newOrder: OrderT = {
        productId: itemId,
        userId: user?.id as string,
        quantity: item.count,
        price: item.price,
        status: 'pending',
      };

      await dispatch(addOrder(newOrder)); // Dispatch the addOrder action for each item
      dispatch(removeFromCart({ userId: user?.id as string, itemId })); // Remove the item from the cart
    }
  };

  return (
    <main className={styles.cartPage}>
      {isCheckedOut && <ModalSuccess />}
      <Breadcrumbs />
      <h1 className={styles.title}>Cart</h1>
      <div className={styles.cardsContainer}>
        {!totalPrice && (
          <img
            className={styles.cartIsEmpty}
            // eslint-disable-next-line max-len
            src="https://storage.googleapis.com/group_project_images/img/cart-is-empty.png"
            alt="cart is empty"
          />
        )}
        <div className={styles.cardContainer}>
          <CartItem />
        </div>
      </div>
      <div className={styles.checkoutContainer}>
        <div className={styles.infoContainer}>
          <div className={styles.cashInfo}>${totalPrice}</div>
          <div className={styles.itemInfo}>Total for {itemCount} items</div>
        </div>
        <Button
          title={'Checkout'}
          type="primary"
          className={styles.checkoutButton}
          onClick={handleCheckout}
          isDisabled={itemCount === 0}
        />
      </div>
    </main>
  );
};

export default CartPage;
