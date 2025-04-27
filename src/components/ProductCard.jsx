import { FaStar, FaStarHalfAlt, FaCartPlus } from 'react-icons/fa';

const ProductCard = ({ product, onAddToCart, onViewDetails }) => {
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
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 cursor-pointer hover:shadow-lg"
      onClick={() => onViewDetails(product)}
    >
      <div className="relative pb-2/3 h-48">
        <img 
          src={product.images[0]} 
          alt={product.name} 
          className="absolute h-full w-full object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
          <span className="flex">
            {renderRating()}
            <span className="text-gray-500 text-sm ml-1">({product.reviews})</span>
          </span>
        </div>
        <p className="text-gray-500 text-sm mb-2">{product.category}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-full text-sm transition-colors"
          >
            <FaCartPlus className="mr-1" /> Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;