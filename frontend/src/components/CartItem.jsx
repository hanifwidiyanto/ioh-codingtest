import PropTypes from 'prop-types'

const CartItem = ({ item, handleQuantityChange }) => {
    return (
        <div className="py-4 flex w-full justify-between">
            <img src={item.img} className="md:w-52 w-40 object-cover md:h-32 h-28" alt={item.item_name} />
            <div className="flex flex-col justify-between ml-4">
                <div className="flex flex-col items-end">
                    <span className="font-oxanium-bold">#{item.item_id}</span>
                    <span className="font-oxanium text-xl">{item.item_name}</span>
                    <span className="font-oxanium">{item.price}</span>
                </div>
                <div className="flex flex-col items-end">
                    <div className="flex gap-2">
                        <button onClick={() => handleQuantityChange(item.item_id, item.quantity - 1)}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => handleQuantityChange(item.item_id, item.quantity + 1)}>+</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartItem;

CartItem.propTypes = {
    item: PropTypes.object,
    handleQuantityChange: PropTypes.func
}