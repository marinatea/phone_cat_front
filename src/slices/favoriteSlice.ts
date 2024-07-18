/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { ProductT } from '../types';

export interface FavoritesState {
  favorites: ProductT[];
  isLoading: boolean;
  error: undefined | string;
}

export const initialState: FavoritesState = {
  favorites: [],
  isLoading: true,
  error: undefined,
};

export const setFavorites = createAsyncThunk(
  'favorites/setFavorites',
  async (userId: string) => {
    const res = await fetch(
      `https://phone-catalog-back.onrender.com/users/${userId}`,
    );

    return res.json();
  },
);

export const addToFavorites = createAsyncThunk(
  'favorites/addToFavorites',
  async ({ userId, newItem }: { userId: string; newItem: ProductT }) => {
    const res = await fetch(
      `https://phone-catalog-back.onrender.com/users/${userId}/favorites`,
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

export const removeFromFavorites = createAsyncThunk(
  'favorites/removeFromFavorites',
  async ({ userId, itemId }: { userId: string; itemId: string }) => {
    const res = await fetch(
      `https://phone-catalog-back.onrender.com/users/${userId}/favorites/${itemId}`,
      {
        method: 'DELETE',
      },
    );

    return res.json();
  },
);

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    setFavorites: (
      state,
      action: PayloadAction<{ products: ProductT[]; userId: string }>,
    ) => ({
      ...state,
      favorites: action.payload.products,
    }),
  },
  extraReducers: builder => {
    builder.addCase(setFavorites.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(setFavorites.fulfilled, (state, action) => {
      state.isLoading = false;
      state.favorites = action.payload.favorites as unknown as ProductT[];
    });
    builder.addCase(setFavorites.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(addToFavorites.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(addToFavorites.fulfilled, (state, action) => {
      state.isLoading = false;
      state.favorites = action.payload as unknown as ProductT[];
    });
    builder.addCase(addToFavorites.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(removeFromFavorites.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(removeFromFavorites.fulfilled, (state, action) => {
      state.isLoading = false;
      state.favorites = action.payload as unknown as ProductT[];
    });
    builder.addCase(removeFromFavorites.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export default favoritesSlice.reducer;
