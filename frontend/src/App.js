import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>Bem vindo ao AlmoCIn!</div>
      </header>
      <Outlet />
    </div>
  );
}

export default App;
