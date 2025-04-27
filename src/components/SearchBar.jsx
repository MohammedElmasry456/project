import { FaSearch } from 'react-icons/fa';

const SearchBar = ({ 
  searchTerm, 
  onSearchChange, 
  searchResults, 
  showSearchResults,
  onSearchResultClick
}) => {
  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={onSearchChange}
        />
        <FaSearch className="absolute left-3 top-3 text-gray-400" />
      </div>
      {showSearchResults && searchResults.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {searchResults.map(product => (
            <div 
              key={product.id}
              className="p-3 hover:bg-gray-100 cursor-pointer flex items-center"
              onClick={() => onSearchResultClick(product)}
            >
              <img src={product.images[0]} alt={product.name} className="w-10 h-10 object-cover mr-3" />
              <div>
                <p className="font-medium">{product.name}</p>
                <p className="text-sm text-gray-600">${product.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;