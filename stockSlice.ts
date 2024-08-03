import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface StockState {
  symbol: string;
  data: Array<{ symbol: string, price: number, timestamp: string }>;
}

const initialState: StockState = {
  symbol: 'GOOG',
  data: []
};

const stockSlice = createSlice({
  name: 'stock',
  initialState,
  reducers: {
    setSymbol(state, action: PayloadAction<string>) {
      state.symbol = action.payload;
    },
    setData(state, action: PayloadAction<Array<{ symbol: string, price: number, timestamp: string }>>) {
      state.data = action.payload;
    }
  }
});

export const { setSymbol, setData } = stockSlice.actions;
export default stockSlice.reducer;
