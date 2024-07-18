import React, { useEffect, useState } from 'react';

import Button from '../../../../generic/Button/Button';
import { Icons } from '../../../../../types';
import classNames from 'classnames';
import styles from './Banner.module.scss';
import { useSwipeable } from 'react-swipeable';

const Banner: React.FC = () => {
  const [sliderCounter, setSliderCounter] = useState(1);
  const [imageWidth, setImageWidth] = useState(0);
  const [translate, setTranslate] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      let newImageWidth;

      if (screenWidth >= 1200) {
        newImageWidth = 1040;
      } else if (screenWidth >= 640) {
        newImageWidth = screenWidth - 156.6;
      } else if (screenWidth >= 450) {
        newImageWidth = screenWidth - 50.19;
      } else {
        newImageWidth = screenWidth - 31.7;
      }

      setImageWidth(newImageWidth);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setSliderCounter(counter => (counter + 1 > 4 ? 1 : counter + 1)); // Assuming 4 images
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    setTranslate((sliderCounter - 1) * imageWidth);
  }, [sliderCounter, imageWidth]);

  const handleSliderCounterNext = () => {
    setSliderCounter(counter => (counter + 1 > 4 ? 1 : counter + 1)); // Assuming 4 images
  };

  const handleSliderCounterPrev = () => {
    setSliderCounter(counter => (counter - 1 < 1 ? 4 : counter - 1)); // Assuming 4 images
  };

  const rightClickDisabled = sliderCounter === 4;
  const leftClickDisabled = sliderCounter === 1;

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () =>
      setSliderCounter(counter => (counter + 1 > 4 ? 1 : counter + 1)),
    onSwipedRight: () =>
      setSliderCounter(counter => (counter - 1 < 1 ? 4 : counter - 1)),
  });

  return (
    <section className={styles.banner} {...swipeHandlers}>
      <div className={styles.banner__content}>
        <Button
          className={classNames(styles.banner__button, {
            [styles.disabled]: leftClickDisabled,
          })}
          onClick={handleSliderCounterPrev}
          type="secondary"
          icon={Icons.ARROW_LEFT}
          isDisabled={leftClickDisabled}
        />
        <div className={styles.banner__imagesWrapper}>
          <div
            className={styles.banner__images}
            style={{ transform: `translateX(-${translate}px)` }}
          >
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className={classNames(styles.banner__imageContainer, {
                  [styles.banner__imageContainer1]: index === 0,
                  [styles.banner__imageContainer2]: index === 1,
                  [styles.banner__imageContainer3]: index === 2,
                  [styles.banner__imageContainer4]: index === 3,
                })}
              >
                {index === 0 && (
                  <div className={styles.banner__imageContainer1}>
                    <div className={styles.banner__image1}></div>
                    <div className={styles.banner__overlayContainer}>
                      <div className={styles.banner__textContainer}>
                        <h2 className={styles.banner__overlayTitle}>
                          Now is available
                          <br /> in our store!{' '}
                          <span className={styles.banner__smile}>
                            &#128076;
                          </span>
                        </h2>
                        <p className={styles.banner__overlayText}>
                          Be the first
                        </p>
                      </div>
                      <Button
                        className={styles.banner__overlayButton}
                        onClick={() => alert('Button clicked!')}
                        type="primary"
                        title="ORDER NOW"
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <Button
          className={classNames(styles.banner__button, {
            [styles.disabled]: rightClickDisabled,
          })}
          onClick={handleSliderCounterNext}
          type="secondary"
          icon={Icons.ARROW_RIGHT}
          isDisabled={rightClickDisabled}
        />
      </div>
      <ul className={styles.banner__list}>
        {[...Array(4)].map((_, index) => (
          <li
            key={index}
            className={classNames(styles.banner__item, {
              [styles['banner__item--active']]: sliderCounter === index + 1,
            })}
          />
        ))}
      </ul>
    </section>
  );
};

export default Banner;
