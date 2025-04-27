import { FaShoppingCart, FaSignOutAlt, FaSearch } from 'react-icons/fa';
import SearchBar from './SearchBar';

const Header = ({ 
  isLoggedIn, 
  cartItemCount, 
  onLoginClick, 
  onLogout, 
  onCartClick,
  searchTerm,
  onSearchChange,
  searchResults,
  showSearchResults,
  onSearchResultClick
}) => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-30">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-blue-600">ShopEase</h1>
          </div>
          
          <div className="hidden md:block flex-1 mx-8">
            <SearchBar 
              searchTerm={searchTerm}
              onSearchChange={onSearchChange}
              searchResults={searchResults}
              showSearchResults={showSearchResults}
              onSearchResultClick={onSearchResultClick}
            />
          </div>
          
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="flex items-center space-x-2">
                <span className="hidden sm:inline">Welcome, User</span>
                <button 
                  onClick={onLogout}
                  className="text-gray-700 hover:text-blue-600"
                >
                  <FaSignOutAlt />
                </button>
              </div>
            ) : (
              <>
                <button 
                  onClick={() => onLoginClick('login')}
                  className="hidden sm:inline text-gray-700 hover:text-blue-600"
                >
                  Login
                </button>
                <button 
                  onClick={() => onLoginClick('register')}
                  className="hidden sm:inline bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-full text-sm transition-colors"
                >
                  Register
                </button>
              </>
            )}
            <button 
              onClick={onCartClick}
              className="relative text-gray-700 hover:text-blue-600"
            >
              <FaShoppingCart className="text-xl" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
        
        <div className="mt-3 md:hidden">
          <SearchBar 
            searchTerm={searchTerm}
            onSearchChange={onSearchChange}
            searchResults={searchResults}
            showSearchResults={showSearchResults}
            onSearchResultClick={onSearchResultClick}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;