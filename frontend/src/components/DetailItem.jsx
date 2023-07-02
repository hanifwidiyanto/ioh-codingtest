import { useState, useEffect, useContext } from 'react';
import { FaEthereum } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../App';

export default function DetailItem() {
    const { setUser } = useContext(UserContext)
    const [item, setItem] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const { id } = useParams();

    const handleIncrease = () => {
        setQuantity(quantity + 1);
    };

    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleAddToCart = () => {
        const newItem = {
            item_id: id,
            item_name:item_name,
            quantity: quantity
        };

        setUser(prevUser => {
            const updatedItems = prevUser.items ? [...prevUser.items] : [];
            const existingItemIndex = updatedItems.findIndex(item => item.item_id === id);
            if (existingItemIndex !== -1) {
                updatedItems[existingItemIndex].quantity = quantity;
            } else {
                updatedItems.push(newItem);
            }
            return { ...prevUser, items: updatedItems };
        });
    };

    useEffect(() => {
        const getItem = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/items/${id}`);
                const itemData = response.data.item;
                const imageResponse = await axios.get(
                    `https://pixabay.com/api/?key=38017794-63616cf97b3b1001d6cab16cc&q=${encodeURIComponent(
                        itemData.item_name
                    )}&image_type=photo&per_page=3`
                );
                const image = imageResponse.data.hits[0];
                setItem({ ...itemData, img: image ? image.webformatURL : '' });
            } catch (error) {
                console.log(error);
            }
        };

        getItem();
    }, [id]);

    if (!item) {
        return <div>Loading...</div>;
    }

    const { item_name, price, img } = item;
    return (
        <div className='md:mt-36 mt-24 w-full flex  md:flex-row flex-col md:gap-12 justify-center gap-10 items-center'>
            <div className="md:w-[400px] w-96 md:h-[340px] h-80 border-2 p-4 rounded-lg bg-white border-black relative duration-100 cursor-pointer">
                <div className="md:w-[400px] w-96 md:h-[340px] h-80   bg-black rounded-lg absolute -z-10 -right-4 -bottom-4"></div>
                <img
                    src={img}
                    className="md:w-[400px] w-96 md:h-[260px] h-56"
                    alt={item_name}
                />
                <div className="flex flex-col gap-6">
                    <div className="mt-6 flex md:items-end items-center justify-between">
                        <h2 className="font-oxanium-bold md:text-3xl text-xl">
                            {item_name}
                        </h2>
                        <div className="flex gap-1 items-center text-2xl">
                            <FaEthereum />
                            <span>{price}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex flex-col gap-6'>
                <h2 className='font-oxanium-bold text-2xl'>#{id}</h2>
                <div className='flex gap-4 font-oxanium items-center'>
                    <button className='px-6 py-2 bg-blue-pixel tracking-wider rounded-lg text-white font-oxanium-semibold text-xl' onClick={handleDecrease}>-</button>
                    <span className='text-xl'>{quantity}</span>
                    <button className='px-6 py-2 bg-blue-pixel tracking-wider rounded-lg text-white font-oxanium-semibold text-xl' onClick={handleIncrease}>+</button>
                </div>
                <button className='px-6 py-2 bg-blue-pixel tracking-wider rounded-lg text-white font-oxanium-semibold text-xl' onClick={handleAddToCart}>Add to Cart</button>
            </div>
        </div>
    );
}
