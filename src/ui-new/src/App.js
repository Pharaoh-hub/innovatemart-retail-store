import logo from './logo.svg';
import './App.css';

function App() {
  return (
  <div className="App">
    <header>
      <h1>InnovateMart</h1>
      <nav>
        <a href="/">Home</a> | <a href="/products">Products</a> | <a href="/cart">Cart</a>
      </nav>
    </header>
    <main>
      <h2>Featured Products</h2>
      <ul>
        <li>Wireless Headphones</li>
        <li>Smartwatch</li>
        <li>Bluetooth Speaker</li>
      </ul>
    </main>
    <footer>
      <p>&copy; 2025 InnovateMart</p>
    </footer>
  </div>
);
}
export default App;
