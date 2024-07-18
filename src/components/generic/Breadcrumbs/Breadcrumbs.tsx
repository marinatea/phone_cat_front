import { NavLink, useLocation, useNavigate } from 'react-router-dom';

import Icon from '../Icon/Icon';
import { Icons } from '../../../types';
import styles from './Breadcrumbs.module.scss';

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const pathnames = location.pathname.split('/').filter(pathname => pathname);

  const formatBreadcrumb = (breadcrumb: string) => {
    return breadcrumb.charAt(0).toUpperCase() + breadcrumb.slice(1);
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  const isSpecialPage =
    location.pathname === '/cart' || location.pathname === '/*';

  return (
    <ol className={styles.breadcrumbs}>
      <li>
        {isSpecialPage ? (
          <>
            <Icon
              iconId={Icons.ARROW_LEFT}
              className={styles.arrowLeft}
              onClick={handleBackClick}
            />
            <span className={styles.backText} onClick={handleBackClick}>
              Back
            </span>
          </>
        ) : (
          <>
            <NavLink to="/">
              <Icon iconId={Icons.HOME} className={styles.home} />
            </NavLink>
            {pathnames.length > 0 && (
              <Icon iconId={Icons.ARROW_RIGHT} className={styles.arrowRight} />
            )}
          </>
        )}
      </li>
      {!isSpecialPage &&
        pathnames.map((pathname, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;

          return (
            <li key={pathname}>
              {isLast ? (
                <span className={styles.text}>
                  {formatBreadcrumb(pathname)}
                </span>
              ) : (
                <>
                  <NavLink className={styles.active} to={routeTo}>
                    {formatBreadcrumb(pathname)}
                  </NavLink>
                  <Icon
                    iconId={Icons.ARROW_RIGHT}
                    className={styles.arrowRight}
                  />
                </>
              )}
            </li>
          );
        })}
    </ol>
  );
};

export default Breadcrumbs;
