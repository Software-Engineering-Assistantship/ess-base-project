import { Outlet } from 'react-router-dom';
import Header from './routes/commons/Header';

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Outlet />
    </div>
  );
}

export default App;
