import { useState, useEffect } from 'react';
import { products as productsData, categories } from './data/products';
import Header from './components/Header';
import Footer from './components/Footer';
import ProductCard from './components/ProductCard';
import Filters from './components/Filters';
import Cart from './components/Cart';
import AuthModal from './components/AuthModal';
import Checkout from './components/Checkout';
import ProductDetails from './components/ProductDetails';

function App() {
  // State management
  const [products, setProducts] = useState(productsData);
  const [cart, setCart] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [showCart, setShowCart] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 200]);

  // Filter products based on search, category and price range
  useEffect(() => {
    let filtered = productsData;
    
    if (searchTerm) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(product => 
        product.category === selectedCategory
      );
    }
    
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    setProducts(filtered);
  }, [searchTerm, selectedCategory, priceRange]);

  // Handle search input changes
  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (term.length > 0) {
      const results = productsData.filter(product => 
        product.name.toLowerCase().includes(term.toLowerCase())
      ).slice(0, 5);
      setSearchResults(results);
      setShowSearchResults(true);
    } else {
      setShowSearchResults(false);
    }
  };

  // Handle search result click
  const handleSearchResultClick = (product) => {
    setSearchTerm(product.name);
    setShowSearchResults(false);
    setSelectedProduct(product);
  };

  // Cart functions
  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCart(prevCart => 
      prevCart.map(item =>
        item.id === productId 
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Auth functions
  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
    setShowAuthModal(false);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
    setShowAuthModal(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const toggleAuthModal = (mode) => {
    setAuthMode(mode);
    setShowAuthModal(!showAuthModal);
  };

  // Checkout functions
  const proceedToCheckout = () => {
    if (!isLoggedIn) {
      toggleAuthModal('login');
      return;
    }
    setCheckoutStep(1);
    setShowCart(false);
  };

  const completeCheckout = () => {
    setCart([]);
    setCheckoutStep(2);
  };

  const resetCheckout = () => {
    setCheckoutStep(0);
  };

  // Product details functions
  const viewProductDetails = (product) => {
    setSelectedProduct(product);
    setSelectedImageIndex(0);
    setSelectedColor(product.colorOptions ? product.colorOptions[0] : '');
    setSelectedSize(product.sizes ? product.sizes[0] : '');
  };

  const closeProductDetails = () => {
    setSelectedProduct(null);
  };

  const handleImageSelect = (index) => {
    setSelectedImageIndex(index);
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        isLoggedIn={isLoggedIn}
        cartItemCount={cart.length}
        onLoginClick={toggleAuthModal}
        onLogout={handleLogout}
        onCartClick={() => setShowCart(true)}
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        searchResults={searchResults}
        showSearchResults={showSearchResults}
        onSearchResultClick={handleSearchResultClick}
      />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-64 flex-shrink-0">
            <Filters 
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              priceRange={priceRange}
              onPriceRangeChange={setPriceRange}
            />
          </div>
          
          <div className="flex-1">
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-xl font-bold">
                {selectedCategory === 'All' ? 'All Products' : selectedCategory} 
                <span className="text-gray-500 text-sm ml-2">({products.length} items)</span>
              </h2>
              <div className="flex items-center">
                <span className="mr-2 text-sm">Sort by:</span>
                <select className="border border-gray-300 rounded px-2 py-1 text-sm">
                  <option>Featured</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Rating</option>
                </select>
              </div>
            </div>
            
            {products.length === 0 ? (
              <div className="text-center py-10">
                <i className="fas fa-search text-4xl text-gray-300 mb-4"></i>
                <p className="text-gray-500">No products found matching your criteria</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map(product => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onAddToCart={addToCart}
                    onViewDetails={viewProductDetails}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
      
      {/* Modals */}
      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        mode={authMode}
        onModeChange={setAuthMode}
        onLogin={handleLogin}
        onRegister={handleRegister}
      />
      
      <Cart 
        isOpen={showCart}
        onClose={() => setShowCart(false)}
        cart={cart}
        onRemoveFromCart={removeFromCart}
        onUpdateQuantity={updateQuantity}
        totalPrice={totalPrice}
        onProceedToCheckout={proceedToCheckout}
      />
      
      <Checkout 
        step={checkoutStep}
        cart={cart}
        totalPrice={totalPrice}
        onCompleteCheckout={completeCheckout}
        onResetCheckout={resetCheckout}
      />
      
      <ProductDetails 
        product={selectedProduct}
        onClose={closeProductDetails}
        selectedImageIndex={selectedImageIndex}
        onImageSelect={handleImageSelect}
        selectedColor={selectedColor}
        onColorSelect={handleColorSelect}
        selectedSize={selectedSize}
        onSizeSelect={handleSizeSelect}
        cartItem={cart.find(item => item.id === selectedProduct?.id)}
        onAddToCart={addToCart}
        onUpdateQuantity={updateQuantity}
      />
    </div>
  );
}

export default App;