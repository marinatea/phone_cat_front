import Icon from '../../../generic/Icon/Icon';
import { Icons } from '../../../../types';
import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';

const Footer: React.FC = () => {
  return (
    <div className={styles.footerWrapper}>
      <footer className={styles.footer}>
        <Link to="/" className={styles.footer__logo}>
          <img
            //eslint-disable-next-line max-len
            src="https://storage.googleapis.com/group_project_images/img/Logo.png"
            alt="logo"
          />
        </Link>

        <nav className={`${styles['footer-nav']} ${styles.footer__nav}`}>
          <a
            href="https://github.com/MaPaJBY"
            className={styles['footer-nav__item']}
          >
            Github
          </a>
          <a href="/" className={styles['footer-nav__item']}>
            Contacts
          </a>
          <a href="/" className={styles['footer-nav__item']}>
            Rights
          </a>
        </nav>

        <div className={styles['top-link']}>
          <p className={styles['top-link__text']}>Back to top</p>
          <button
            className={styles.button}
            onClick={() => window.scrollTo(0, 0)}
          >
            <Icon iconId={Icons.ARROW_TOP} />
          </button>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
