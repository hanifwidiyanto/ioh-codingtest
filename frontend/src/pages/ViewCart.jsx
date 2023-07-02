import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../App';
import CartItem from '../components/CartItem';
import CreateInvoiceButton from '../components/CreateInvoiceButton';

const ViewCart = () => {
  const { user, setUser } = useContext(UserContext);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItemData = async () => {
      try {
        if (user.items && user.items.length > 0) {
          const fetchItems = user.items.map(async (item) => {
            const response = await axios.get(`http://localhost:5000/api/items/${item.item_id}`);
            const itemData = response.data.item;

            // Fetch image for the item using Pixabay API or any other image source
            const imageResponse = await axios.get(
              `https://pixabay.com/api/?key=38017794-63616cf97b3b1001d6cab16cc&q=${encodeURIComponent(
                itemData.item_name
              )}&image_type=photo&per_page=3`
            );
            const image = imageResponse.data.hits[0];

            const updatedItemData = {
              item: {
                item_id: item.item_id,
                item_name: itemData.item_name,
                price: itemData.price,
                quantity: item.quantity,
                img: image ? image.webformatURL : '',
              },
            };

            return updatedItemData;
          });

          // Wait for all item requests to resolve
          const cartItemsData = await Promise.all(fetchItems);
          setCartItems(cartItemsData);
        } else {
          setCartItems([]);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchCartItemData();
  }, [user.items]);

  const handleQuantityChange = (itemId, newQuantity) => {
    const updatedItems = user.items.map((item) => {
      if (item.item_id === itemId) {
        return {
          ...item,
          quantity: newQuantity,
        };
      }
      return item;
    });

    setUser((prevUser) => ({
      ...prevUser,
      items: updatedItems,
    }));
  };

  return (
    <div className="px-6 mt-6">
      {cartItems.length === 0 ? (
        <div className="text-center">Cart is empty</div>
      ) : (
        <>
          <div className="w-full h-fit flex flex-col gap-4 divide-y-2 divide-black border-2 border-black rounded-lg md:p-3 p-2">
            {cartItems.map((cartItem) => (
              <CartItem
                key={cartItem.item.item_id}
                item={cartItem.item}
                handleQuantityChange={handleQuantityChange}
              />
            ))}
          </div>
          <CreateInvoiceButton />
        </>
      )}
    </div>
  );
};

export default ViewCart;
