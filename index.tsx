import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { setData, setSymbol } from '../store/stockSlice';
import axios from 'axios';

const fetchData = async (dispatch: AppDispatch, symbol: string) => {
  const response = await axios.get(`/api/stocks/${symbol}`);
  dispatch(setData(response.data));
};

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, symbol } = useSelector((state: RootState) => state.stock);

  useEffect(() => {
    fetchData(dispatch, symbol);
    const interval = setInterval(() => fetchData(dispatch, symbol), 5000);
    return () => clearInterval(interval);
  }, [symbol, dispatch]);

  return (
    <div>
      <button onClick={() => dispatch(setSymbol(prompt('Enter stock symbol') || ''))}>Change Symbol</button>
      <table>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Price</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry, index) => (
            <tr key={index}>
              <td>{entry.symbol}</td>
              <td>{entry.price}</td>
              <td>{new Date(entry.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
