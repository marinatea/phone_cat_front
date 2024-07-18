/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { OrderT } from '../types';

export interface OrdersState {
  orders: OrderT[];
  isLoading: boolean;
  error: undefined | string;
}

export const initialState: OrdersState = {
  orders: [],
  isLoading: true,
  error: undefined,
};

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {
  const res = await fetch('https://phone-catalog-back.onrender.com/orders');

  return res.json();
});

export const addOrder = createAsyncThunk(
  'orders/addOrder',
  async (newOrder: OrderT) => {
    const res = await fetch('https://phone-catalog-back.onrender.com/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newOrder),
    });

    return res.json();
  },
);

export const updateOrder = createAsyncThunk(
  'orders/updateOrder',
  async ({
    orderId,
    updatedOrder,
  }: {
    orderId: string;
    updatedOrder: Partial<OrderT>;
  }) => {
    const res = await fetch(
      `https://phone-catalog-back.onrender.com/orders/${orderId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedOrder),
      },
    );

    return res.json();
  },
);

export const deleteOrder = createAsyncThunk(
  'orders/deleteOrder',
  async (orderId: string) => {
    const res = await fetch(
      `https://phone-catalog-back.onrender.com/orders/${orderId}`,
      {
        method: 'DELETE',
      },
    );

    return res.json();
  },
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<OrderT[]>) => ({
      ...state,
      orders: action.payload,
    }),
  },
  extraReducers: builder => {
    builder.addCase(fetchOrders.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      state.isLoading = false;
      state.orders = action.payload.orders as OrderT[];
    });
    builder.addCase(fetchOrders.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(addOrder.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(addOrder.fulfilled, (state, action) => {
      state.isLoading = false;
      state.orders.push(action.payload as OrderT);
    });
    builder.addCase(addOrder.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(updateOrder.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(updateOrder.fulfilled, (state, action) => {
      state.isLoading = false;
      const index = state.orders.findIndex(
        order => order.id === action.payload.id,
      );

      if (index !== -1) {
        state.orders[index] = action.payload as OrderT;
      }
    });
    builder.addCase(updateOrder.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(deleteOrder.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(deleteOrder.fulfilled, (state, action) => {
      state.isLoading = false;
      state.orders = state.orders.filter(
        order => order.id !== action.payload.id,
      );
    });
    builder.addCase(deleteOrder.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export default ordersSlice.reducer;
export const { setOrders } = ordersSlice.actions;
