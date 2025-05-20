import React, { useState } from "react";
import "./App.css";

const PRODUCTS = [
  { id: 1, name: "T-Shirt", price: 20, image: "https://via.placeholder.com/100?text=T-Shirt" },
  { id: 2, name: "Jeans", price: 40, image: "https://via.placeholder.com/100?text=Jeans" },
  { id: 3, name: "Sneakers", price: 60, image: "https://via.placeholder.com/100?text=Sneakers" },
  { id: 4, name: "Cap", price: 10, image: "https://via.placeholder.com/100?text=Cap" },
];

function App() {
  const [cart, setCart] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const addToCart = (productId) => {
    setCart((cart) => ({
      ...cart,
      [productId]: (cart[productId] || 0) + 1,
    }));
  };

  const cartCount = Object.values(cart).reduce((sum, qty) => sum + qty, 0);

  const showSidebar = () => setSidebarOpen(true);
  const hideSidebar = () => setSidebarOpen(false);

  const checkout = () => {
    alert("Thank you for your purchase!");
    setCart({});
    hideSidebar();
  };

  React.useEffect(() => {
    function handleClick(e) {
      if (
        sidebarOpen &&
        !e.target.closest("#cart-sidebar") &&
        !e.target.closest("#cart")
      ) {
        hideSidebar();
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [sidebarOpen]);

  return (
    <div>
      <header>
        <h1>Mitumba Shop</h1>
        <div id="cart" onClick={showSidebar}>
          🛒 Cart (<span id="cart-count">{cartCount}</span>)
        </div>
      </header>
      <main>
        <section id="products">
          {PRODUCTS.map((product) => (
            <div className="product" key={product.id}>
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>${product.price}</p>
              <button onClick={() => addToCart(product.id)}>Add to Cart</button>
            </div>
          ))}
        </section>
        <aside
          id="cart-sidebar"
          className={sidebarOpen ? "" : "hidden"}
        >
          <h2>Your Cart</h2>
          <ul id="cart-items">
            {Object.entries(cart).length === 0 && (
              <li>Your cart is empty.</li>
            )}
            {Object.entries(cart).map(([id, qty]) => {
              const product = PRODUCTS.find((p) => p.id === Number(id));
              return (
                <li key={id}>
                  {product.name} x {qty} (${product.price * qty})
                </li>
              );
            })}
          </ul>
          <p id="cart-total">
            Total: $
            {Object.entries(cart)
              .reduce(
                (total, [id, qty]) =>
                  total +
                  PRODUCTS.find((p) => p.id === Number(id)).price * qty,
                0
              )}
          </p>
          <button id="checkout-btn" onClick={checkout}>
            Checkout
          </button>
        </aside>
      </main>
    </div>
  );
}

export default App;
