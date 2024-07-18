import Breadcrumbs from '../../generic/Breadcrumbs/Breadcrumbs';
import Button from '../../generic/Button/Button';
import styles from './LoginPage.module.scss';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate('/registration');
  };

  return (
    <div className={styles.main}>
      <div className={styles.loginContainer}>
        <Breadcrumbs />
        <h2 className={styles.loginTitle}>Login</h2>
        <form className={styles.loginForm}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required />
          </div>
          <Button
            type="primary"
            title="Login"
            className={styles.loginButton}
            onClick={() => {}}
          />
        </form>
        <Button
          type="primary"
          title="Register"
          className={styles.registerRedirectButton}
          onClick={handleRegisterClick}
        />
      </div>
    </div>
  );
};

export default LoginPage;
