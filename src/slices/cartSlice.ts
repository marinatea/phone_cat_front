/* eslint-disable no-param-reassign */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { ICartProduct } from '../types';

export interface CartState {
  cart: {
    [productId: string]: ICartProduct & { count: number };
  };
  isLoading: boolean;
  error: undefined | string;
}

const initialState: CartState = {
  cart: {},
  isLoading: true,
  error: undefined,
};

export const setCart = createAsyncThunk(
  'cart/setCart',
  async (userId: string) => {
    const res = await fetch(
      `https://phone-catalog-back.onrender.com/users/${userId}`,
    );

    return res.json();
  },
);

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async ({
    userId,
    newItem,
  }: {
    userId: string;
    newItem: ICartProduct & { count: number };
  }) => {
    const res = await fetch(
      `https://phone-catalog-back.onrender.com/users/${userId}/cart`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem),
      },
    );

    return res.json();
  },
);

export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async ({ userId, itemId }: { userId: string; itemId: string }) => {
    const res = await fetch(
      `https://phone-catalog-back.onrender.com/users/${userId}/cart/${itemId}`,
      {
        method: 'DELETE',
      },
    );

    return res.json();
  },
);

export const patchCartItemCount = createAsyncThunk(
  'cart/patchCartItemCount',
  async ({
    userId,
    itemId,
    newCount,
  }: {
    userId: string;
    itemId: string;
    newCount: number;
  }) => {
    const res = await fetch(
      `https://phone-catalog-back.onrender.com/users/${userId}/cart/${itemId}/${newCount}`,
      {
        method: 'PATCH',
      },
    );

    return res.json();
  },
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(setCart.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(setCart.fulfilled, (state, action) => {
      state.isLoading = false;
      state.cart = action.payload.cart as unknown as {
        [productId: string]: ICartProduct & {
          count: number;
        };
      };
    });
    builder.addCase(setCart.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(addToCart.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(addToCart.fulfilled, (state, action) => {
      state.isLoading = false;
      state.cart = action.payload as unknown as {
        [productId: string]: ICartProduct & { count: number };
      };
    });
    builder.addCase(addToCart.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(removeFromCart.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(removeFromCart.fulfilled, (state, action) => {
      state.isLoading = false;
      state.cart = action.payload as unknown as {
        [productId: string]: ICartProduct & { count: number };
      };
    });
    builder.addCase(removeFromCart.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(patchCartItemCount.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(patchCartItemCount.fulfilled, (state, action) => {
      state.isLoading = false;
      state.cart = action.payload as unknown as {
        [productId: string]: ICartProduct & { count: number };
      };
    });
    builder.addCase(patchCartItemCount.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export default cartSlice.reducer;
