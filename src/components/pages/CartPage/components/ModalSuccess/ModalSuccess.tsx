import Breadcrumbs from '../../../../generic/Breadcrumbs/Breadcrumbs';
import Button from '../../../../generic/Button/Button';
import { NavLink } from 'react-router-dom';
import styles from './ModalSuccess.module.scss';

const ModalSuccess: React.FC = () => {
  return (
    <div id="success-modal" className={styles.modal}>
      <div className={styles.modalContent}>
        <Breadcrumbs />
        <h2 className={styles.title}>
          Thank you for your purchase! <span>&#x1F49C;</span>
        </h2>
        <p>
          Your order has been successfully placed. Confirmation has been sent to
          your email address.
        </p>
        <div className={styles.buttonContainer}>
          <NavLink to={'/'} className={styles.link}>
            <Button
              title="To Home"
              className={`${styles.button} ${styles.secondary}`}
            />
          </NavLink>
          <NavLink to={'/phones'} className={styles.link}>
            <Button
              title="Continue Shopping"
              className={`${styles.button} ${styles.secondary}`}
            />
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default ModalSuccess;
