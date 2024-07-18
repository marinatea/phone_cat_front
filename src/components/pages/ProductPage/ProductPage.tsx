type Props = { productType: 'phones' | 'tablets' | 'accessories' };

import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import About from './components/Description/About';
import Actions from './components/Actions/Actions';
import Breadcrumbs from '../../generic/Breadcrumbs/Breadcrumbs';
import { IProductDetails } from '../../../types';
import ImagesSelector from './components/ImagesSelector/ImagesSelector';
import ProductsSlider from '../../generic/ProductsSlider/ProductsSlider';
import TechSpecs from './components/Description/TechSpecs';
import styles from './ProductPage.module.scss';
import { useAppDispatch, useProductsSelector } from '../../../hooks/reduxHooks';
import {
  fetchProductById,
  fetchProductByItemId,
  fetchRecommendedProducts,
} from '../../../slices/productsSlice';
import Loader from '../../generic/Loader/Loader';

const ProductPage: React.FC<Props> = ({ productType }) => {
  const navigate = useNavigate();
  const { productId } = useParams<{ productId: string }>();
  const dispatch = useAppDispatch();
  const isLoading = useProductsSelector(state => state.isLoading);
  const productWithoutDetails = useProductsSelector(
    state => state.selectedProduct,
  );
  const product = useProductsSelector(state => state.selectedProductDetails);
  const recommendedProducts = useProductsSelector(
    state => state.recommendedProducts,
  );

  useEffect(() => {
    if (productId) {
      dispatch(fetchProductByItemId(productId))
        .unwrap()
        .then(result => {
          dispatch(fetchProductById({ id: productId, category: productType }));
          dispatch(fetchRecommendedProducts(result.id));
        })
        .catch(error => {
          navigate('/product-not-found');
          throw new Error(error);
        });
    }
  }, [dispatch, navigate, productId, productType]);

  return (
    <main className={styles.productPage}>
      <Breadcrumbs />
      <h1 className={styles.title}>{product?.name}</h1>
      {isLoading && <Loader />}
      <div className={styles.photos}>
        <ImagesSelector images={product?.images} />
      </div>

      <div className={styles.actions}>
        <Actions
          product={product as IProductDetails}
          productType={productType}
          productWithoutDetails={productWithoutDetails}
        />
      </div>
      <div className={styles.about}>
        <About product={product as IProductDetails} />
      </div>
      <div className={styles.specs}>
        <TechSpecs product={product as IProductDetails} />
      </div>
      <div className={styles.suggested}>
        <ProductsSlider
          products={recommendedProducts}
          title="You may also like"
        />
      </div>
    </main>
  );
};

export default ProductPage;
