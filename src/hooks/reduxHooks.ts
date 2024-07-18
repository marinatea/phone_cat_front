import { AppDispatch } from '../store';
import { CartState } from '../slices/cartSlice';
import { FavoritesState } from '../slices/favoriteSlice';
import { ProductsState } from '../slices/productsSlice';
import { RootState } from '../store';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useProductsSelector = <T>(selector: (state: ProductsState) => T) =>
  useSelector<RootState, T>(state => selector(state.products));

export const useCartSelector = <T>(selector: (state: CartState) => T) =>
  useSelector<RootState, T>(state => selector(state.cart));

export const useFavoritesSelector = <T>(
  selector: (state: FavoritesState) => T,
) => useSelector<RootState, T>(state => selector(state.favorites));
