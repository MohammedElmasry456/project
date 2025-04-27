import { FaTimes, FaStar, FaStarHalfAlt, FaCartPlus } from 'react-icons/fa';

const ProductDetails = ({ 
  product, 
  onClose, 
  selectedImageIndex,
  onImageSelect,
  selectedColor,
  onColorSelect,
  selectedSize,
  onSizeSelect,
  cartItem,
  onAddToCart,
  onUpdateQuantity
}) => {
  if (!product) return null;

  const renderRating = () => {
    const stars = [];
    const fullStars = Math.floor(product.rating);
    const hasHalfStar = product.rating % 1 !== 0;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
      } else {
        stars.push(<FaStar key={i} className="text-gray-300" />);
      }
    }
    
    return stars;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        <div className="flex flex-col md:flex-row">
          {/* Product Images */}
          <div className="w-full md:w-1/2 p-6">
            <div className="relative h-96 mb-4">
              <img 
                src={product.images[selectedImageIndex]} 
                alt={product.name} 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex space-x-2 overflow-x-auto">
              {product.images.map((image, index) => (
                <div 
                  key={index}
                  className={`flex-shrink-0 w-20 h-20 cursor-pointer border-2 ${selectedImageIndex === index ? 'border-blue-500' : 'border-transparent'}`}
                  onClick={() => onImageSelect(index)}
                >
                  <img 
                    src={image} 
                    alt={`${product.name} thumbnail ${index}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Product Info */}
          <div className="w-full md:w-1/2 p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold">{product.name}</h2>
              <button 
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes />
              </button>
            </div>
            
            <div className="flex items-center mb-4">
              <span className="flex mr-2">
                {renderRating()}
              </span>
              <span className="text-gray-500 text-sm">{product.reviews} reviews</span>
              <span className="mx-2 text-gray-400">|</span>
              <span className="text-green-600 text-sm">
                {product.stock > 5 ? 'In Stock' : 
                 product.stock > 0 ? 'Low Stock' : 'Out of Stock'}
              </span>
            </div>
            
            <div className="mb-6">
              <span className="text-3xl font-bold">${product.price.toFixed(2)}</span>
              {product.warranty && (
                <span className="ml-2 text-gray-500">Warranty: {product.warranty}</span>
              )}
            </div>
            
            <div className="mb-6">
              <p className="text-gray-700">{product.description}</p>
            </div>
            
            {/* Color Selection */}
            {product.colorOptions && (
              <div className="mb-6">
                <h4 className="font-medium mb-2">Color</h4>
                <div className="flex space-x-2">
                  {product.colorOptions.map(color => (
                    <button
                      key={color}
                      className={`px-3 py-1 border rounded-full ${selectedColor === color ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
                      onClick={() => onColorSelect(color)}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Size Selection */}
            {product.sizes && (
              <div className="mb-6">
                <h4 className="font-medium mb-2">Size</h4>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      className={`w-16 py-1 border rounded ${selectedSize === size ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
                      onClick={() => onSizeSelect(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Features */}
            <div className="mb-6">
              <h4 className="font-medium mb-2">Features</h4>
              <ul className="list-disc pl-5 space-y-1">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
            
            {/* Add to Cart */}
            <div className="flex space-x-4">
              <div className="flex items-center border border-gray-300 rounded">
                <button 
                  className="w-10 h-10 flex items-center justify-center"
                  onClick={() => onUpdateQuantity(product.id, (cartItem?.quantity || 1) - 1)}
                >
                  -
                </button>
                <span className="w-10 h-10 flex items-center justify-center border-l border-r border-gray-300">
                  {cartItem?.quantity || 1}
                </span>
                <button 
                  className="w-10 h-10 flex items-center justify-center"
                  onClick={() => onUpdateQuantity(product.id, (cartItem?.quantity || 0) + 1)}
                >
                  +
                </button>
              </div>
              <button 
                onClick={() => onAddToCart(product)}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition-colors"
              >
                <FaCartPlus className="mr-2 inline" /> Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;