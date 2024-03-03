import { Outlet } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>Test</div>
      </header>
      <Outlet />
    </div>
  );
}

export default App;
