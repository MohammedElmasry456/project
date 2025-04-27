import { FaTimes, FaShoppingCart } from 'react-icons/fa';
import CartItem from './CartItem';

const Cart = ({ 
  isOpen, 
  onClose, 
  cart, 
  onRemoveFromCart, 
  onUpdateQuantity, 
  totalPrice,
  onProceedToCheckout 
}) => {
  return (
    <div className={`fixed inset-y-0 right-0 w-full sm:w-96 bg-white shadow-lg transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out z-40`}>
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-xl font-bold">Your Cart ({cart.length})</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4">
          {cart.length === 0 ? (
            <div className="text-center py-10">
              <FaShoppingCart className="text-4xl text-gray-300 mb-4 mx-auto" />
              <p className="text-gray-500">Your cart is empty</p>
            </div>
          ) : (
            cart.map(item => (
              <CartItem 
                key={item.id}
                item={item}
                onRemoveFromCart={onRemoveFromCart}
                onUpdateQuantity={onUpdateQuantity}
              />
            ))
          )}
        </div>
        
        <div className="p-4 border-t">
          <div className="flex justify-between mb-4">
            <span className="font-medium">Subtotal:</span>
            <span className="font-bold">${totalPrice.toFixed(2)}</span>
          </div>
          <button 
            onClick={onProceedToCheckout}
            disabled={cart.length === 0}
            className={`w-full py-2 px-4 rounded ${cart.length === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'} transition-colors`}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;