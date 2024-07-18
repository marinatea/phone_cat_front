import styles from './NotFoundPage.module.scss';

const NotFoundPage = () => {
  return (
    <div className={styles.all}>
      <h1 className={styles.title}>Page not found</h1>
      <img
        className={styles.photo}
        src={
          // eslint-disable-next-line max-len
          'https://storage.googleapis.com/group_project_images/img/product-not-found.png'
        }
        alt="not found page"
      />
    </div>
  );
};

export default NotFoundPage;
