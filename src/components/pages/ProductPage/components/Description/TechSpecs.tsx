interface Props {
  product: IProductDetails | null;
}

import { IProductDetails } from '../../../../../types';
import styles from './Description.module.scss';

const TechSpecs: React.FC<Props> = ({ product }) => {
  if (!product) {
    return null;
  }

  const { screen, resolution, processor, ram, camera, capacity, zoom, cell } =
    product;

  const techItems = [
    {
      title: 'Screen',
      value: screen,
    },
    {
      title: 'Resolution',
      value: resolution,
    },
    {
      title: 'Processor',
      value: processor,
    },
    {
      title: 'Ram',
      value: ram,
    },
    {
      title: 'Built in memory',
      value: capacity,
    },
    {
      title: 'Camera',
      value: camera,
    },
    {
      title: 'Zoom',
      value: zoom,
    },
    {
      title: 'Cell',
      value: cell.join(', '),
    },
  ];

  return (
    <>
      <div className={styles.tech}>
        <h2 className={styles.title}>Tech specs</h2>
        <ul className={styles.techList}>
          {techItems.map(({ title, value }) => (
            <li key={title} className={styles.techItem}>
              <span className={styles.techTitle}>{title}</span>
              <span>{value}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default TechSpecs;
