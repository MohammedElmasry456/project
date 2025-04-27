const Filters = ({ 
  categories, 
  selectedCategory, 
  onCategoryChange, 
  priceRange, 
  onPriceRangeChange 
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="font-bold text-lg mb-4">Filters</h3>
      
      <div className="mb-6">
        <h4 className="font-medium mb-2">Categories</h4>
        <div className="space-y-2">
          {categories.map(category => (
            <div key={category} className="flex items-center">
              <input
                type="radio"
                id={`category-${category}`}
                name="category"
                checked={selectedCategory === category}
                onChange={() => onCategoryChange(category)}
                className="mr-2"
              />
              <label htmlFor={`category-${category}`}>{category}</label>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h4 className="font-medium mb-2">Price Range</h4>
        <div className="mb-2">
          <span>${priceRange[0]} - ${priceRange[1]}</span>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="range"
            min="0"
            max="200"
            value={priceRange[0]}
            onChange={(e) => onPriceRangeChange([parseInt(e.target.value), priceRange[1]])}
            className="w-full"
          />
          <input
            type="range"
            min="0"
            max="200"
            value={priceRange[1]}
            onChange={(e) => onPriceRangeChange([priceRange[0], parseInt(e.target.value)])}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Filters;