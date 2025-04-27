import { FaTrash } from 'react-icons/fa';

const CartItem = ({ 
  item, 
  onRemoveFromCart, 
  onUpdateQuantity 
}) => {
  return (
    <div className="flex items-center py-4 px-2 border-b border-gray-200 transition-colors hover:bg-gray-50">
      <img 
        src={item.images[0]} 
        alt={item.name} 
        className="w-16 h-16 object-cover rounded"
      />
      <div className="ml-4 flex-1">
        <h4 className="font-medium">{item.name}</h4>
        <p className="text-gray-600 text-sm">${item.price.toFixed(2)}</p>
      </div>
      <div className="flex items-center">
        <button 
          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
          className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-l"
        >
          -
        </button>
        <span className="w-10 h-8 flex items-center justify-center border-t border-b border-gray-300">
          {item.quantity}
        </span>
        <button 
          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
          className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-r"
        >
          +
        </button>
      </div>
      <button 
        onClick={() => onRemoveFromCart(item.id)}
        className="ml-4 text-red-500 hover:text-red-700"
      >
        <FaTrash />
      </button>
    </div>
  );
};

export default CartItem;