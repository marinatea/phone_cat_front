type Props = { images: string[] | undefined };

import classNames from 'classnames';
import styles from './ImagesSelector.module.scss';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const ImagesSelector: React.FC<Props> = ({ images }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const location = useLocation();

  useEffect(() => {
    setSelectedImageIndex(0);
  }, [location.pathname]);

  if (images === undefined) {
    return null;
  }

  return (
    <>
      <div className={styles.selectedImgContainer}>
        <img
          src={images[selectedImageIndex]}
          className={styles.selectedImg}
          alt="main image"
        />
      </div>

      <div className={styles.secondaryImgsContainer}>
        {images.map((image, i) => {
          return (
            <div
              key={image}
              className={classNames(
                styles.secondaryImgContainer,
                selectedImageIndex === i ? styles.selected : '',
              )}
              onClick={() => {
                setSelectedImageIndex(i);
              }}
            >
              <img
                src={image}
                className={styles.secondaryImg}
                alt="secondary image"
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ImagesSelector;
