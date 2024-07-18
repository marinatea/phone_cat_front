/* eslint-disable no-param-reassign */

import { IProductDetails, ProductT } from '../types';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export interface ProductsState {
  phones: IProductDetails[];
  tablets: IProductDetails[];
  accessories: IProductDetails[];
  allProducts: ProductT[];
  sortedProducts: ProductT[];
  recommendedProducts: ProductT[];
  newModels: ProductT[];
  hotPrices: ProductT[];
  selectedProduct: ProductT | null;
  selectedProductDetails: IProductDetails | null;
  isLoading: boolean;
  error: undefined | string;
}

const initialState: ProductsState = {
  phones: [],
  tablets: [],
  accessories: [],
  allProducts: [],
  sortedProducts: [],
  recommendedProducts: [],
  newModels: [],
  hotPrices: [],
  selectedProduct: null,
  selectedProductDetails: null,
  isLoading: true,
  error: undefined,
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const productTypes = ['phones', 'tablets', 'accessories', 'products'];

    const [phones, tablets, accessories, allProducts, newModels, hotPrices] =
      await Promise.all([
        ...productTypes.map(type =>
          fetch(`https://phone-catalog-back.onrender.com/${type}`),
        ),
        fetch('https://phone-catalog-back.onrender.com/products/new-models'),
        fetch('https://phone-catalog-back.onrender.com/products/hot-prices'),
      ]);

    const products = {
      phones: (await phones.json()) as IProductDetails[],
      tablets: (await tablets.json()) as IProductDetails[],
      accessories: (await accessories.json()) as IProductDetails[],
      allProducts: (await allProducts.json()) as ProductT[],
      newModels: (await newModels.json()) as ProductT[],
      hotPrices: (await hotPrices.json()) as ProductT[],
    };

    return products;
  },
);

export const fetchSortedProducts = createAsyncThunk(
  'products/fetchSortedProducts',
  async ({
    category,
    sort,
    start,
    limit,
  }: {
    category: string;
    sort: string;
    start: number;
    limit: number;
  }) => {
    const response = await fetch(
      `https://phone-catalog-back.onrender.com/products/sort?category=${category}&sort=${sort}&itemsPerPage=${limit}&page=${start}`,
    );
    const data = await response.json();

    return data as ProductT[];
  },
);

export const fetchProductByItemId = createAsyncThunk(
  'products/fetchProductByItemId',
  async (itemId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://phone-catalog-back.onrender.com/products/item?itemId=${itemId}`,
      );

      if (!response.ok) {
        throw new Error('Failed to fetch product');
      }

      const data = await response.json();

      return data;
    } catch (error) {
      return rejectWithValue('Failed to fetch product');
    }
  },
);

export const fetchRecommendedProducts = createAsyncThunk(
  'products/fetchRecommendedProducts',
  async (productId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://phone-catalog-back.onrender.com/products/${productId}/recommended`,
      );

      if (!response.ok) {
        throw new Error('Failed to fetch recommended products');
      }

      const data = await response.json();

      return data;
    } catch (error) {
      return rejectWithValue('Failed to fetch recommended products');
    }
  },
);

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (
    { id, category }: { id: string; category: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await fetch(
        `https://phone-catalog-back.onrender.com/${category}/${id}`,
      );

      if (!response.ok) {
        throw new Error('Failed to fetch product');
      }

      const data = await response.json();

      return data;
    } catch (error) {
      return rejectWithValue('Failed to fetch product');
    }
  },
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | undefined>) => {
      state.error = action.payload;
    },
    setProducts: (
      state,
      action: PayloadAction<{
        phones: IProductDetails[];
        tablets: IProductDetails[];
        accessories: IProductDetails[];
      }>,
    ) => {
      state.phones = action.payload.phones;
      state.tablets = action.payload.tablets;
      state.accessories = action.payload.accessories;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchSortedProducts.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(fetchSortedProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.sortedProducts = action.payload;
    });
    builder.addCase(fetchSortedProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(fetchProducts.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.phones = action.payload.phones;
      state.tablets = action.payload.tablets;
      state.accessories = action.payload.accessories;
      state.allProducts = action.payload.allProducts;
      state.newModels = action.payload.newModels;
      state.hotPrices = action.payload.hotPrices;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(fetchProductByItemId.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(fetchProductByItemId.fulfilled, (state, action) => {
      state.isLoading = false;
      state.selectedProduct = action.payload;
    });
    builder.addCase(fetchProductByItemId.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'Failed to fetch product';
    });
    builder.addCase(fetchRecommendedProducts.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(fetchRecommendedProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.recommendedProducts = action.payload;
    });
    builder.addCase(fetchRecommendedProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.error =
        action.error.message || 'Failed to fetch recommended products';
    });
    builder.addCase(fetchProductById.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(fetchProductById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.selectedProductDetails = action.payload;
    });
    builder.addCase(fetchProductById.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'Failed to fetch product';
    });
  },
});

export const { setIsLoading, setError, setProducts } = productsSlice.actions;
export default productsSlice.reducer;
