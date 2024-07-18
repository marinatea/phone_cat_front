import Breadcrumbs from '../../generic/Breadcrumbs/Breadcrumbs';
import Button from '../../generic/Button/Button';
import styles from './RegistrationPage.module.scss';
import { useNavigate } from 'react-router-dom';

const RegistrationPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className={styles.main}>
      <div className={styles.registerContainer}>
        <Breadcrumbs />
        <h2 className={styles.registerTitle}>Register</h2>
        <form className={styles.registerForm}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Name</label>
            <input type="name" id="name" name="name" required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="last-name">Last Name</label>
            <input type="last-name" id="last-name" name="last-name" required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              type="confirm-password"
              id="confirm-password"
              name="confirm-password"
              required
            />
          </div>
          <Button
            type="primary"
            title="Register"
            className={styles.registerRedirectButton}
            onClick={() => {}}
          />
          <Button
            type="primary"
            title="Login"
            className={styles.loginButton}
            onClick={handleLoginClick}
          />
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;
