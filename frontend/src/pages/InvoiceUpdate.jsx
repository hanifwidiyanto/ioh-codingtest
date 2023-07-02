import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { FaEthereum } from 'react-icons/fa';

export default function InvoiceUpdate() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [items, setItems] = useState([]);
    const [invoiceNumber, setInvoiceNumber] = useState('');

    const getImg = async (name) => {
        try {
            const response = await axios.get(
                `https://pixabay.com/api/?key=38017794-63616cf97b3b1001d6cab16cc&q=${encodeURIComponent(
                    name
                )}&image_type=photo&per_page=3`
            );
            return response.data.hits[0];
        } catch (error) {
            console.log(error);
            return null;
        }
    };

    const getInvoice = useCallback(async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/invoices/${id}`, { withCredentials: true });
            const invoiceData = response.data;
            setInvoiceNumber(invoiceData.invoice.invoice_number);
            const updatedItems = await Promise.all(
                invoiceData.invoice.InvoiceItems.map(async (item) => {
                    const img = await getImg(item.Item.item_name);

                    return {
                        item_id: item.Item.item_id,
                        item_name: item.Item.item_name,
                        price: item.Item.price,
                        quantity_item: item.quantity_item,
                        img: img ? img.webformatURL : '',
                    };
                })
            );

            setItems(updatedItems);
        } catch (error) {
            console.log(error);
        }
    }, [id]);

    useEffect(() => {
        getInvoice();
    }, [getInvoice]);

    const updateInvoice = async () => {
        try {
            const updatedItems = items.map(({ item_id, quantity_item }) => ({
                item_id,
                quantity: quantity_item,
            }));
            await axios.put(`http://localhost:5000/api/invoices/${id}`, { items: updatedItems }, { withCredentials: true });
            navigate('/invoice/' + id + "?status=updated")
        } catch (error) {
            console.log(error);
        }
    };

    const handleQuantityChange = (itemId, action) => {
        setItems((prevItems) => {
            return prevItems.map((item) => {
                if (item.item_id === itemId) {
                    const updatedQuantity = action === 'add' ? item.quantity_item + 1 : item.quantity_item - 1;
                    return { ...item, quantity_item: updatedQuantity >= 0 ? updatedQuantity : 0 };
                }
                return item;
            });
        });
    };

    return (
        <div className="mt-6 px-6">
            <h2 className="font-oxanium-semibold text-2xl">#{invoiceNumber}</h2>
            <ul className="flex flex-col gap-4 rounded-lg divide-y-2 p-3 border-2 border-black divide-black">
                {items.map((item) => (
                    <li key={item.item_id}>
                        <div className="flex justify-between">
                            <div>
                                {item.img && <img src={item.img} alt={item.item_name} className="w-40 h-36" />}
                            </div>
                            <div className="flex flex-col justify-between items-end">
                                <div className="flex items-end flex-col">
                                    <h4 className='font-oxanium-bold'>#{item.item_id}</h4>
                                    <h4 className='font-oxanium text-xl'>{item.item_name}</h4>
                                </div>
                                <div className="flex flex-col items-end">
                                    <div className="flex gap-1 items-center">
                                        <FaEthereum />
                                        <span className='font-oxanium'>{item.price}</span>
                                    </div>
                                    <div className='flex gap-2 font-oxanium-medium'>
                                        <button onClick={() => handleQuantityChange(item.item_id, 'subtract')}>-</button>
                                        <span>{item.quantity_item}</span>
                                        <button onClick={() => handleQuantityChange(item.item_id, 'add')}>+</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            <div className='mt-6 flex justify-center'>
            <button onClick={updateInvoice} className='bg-blue-pixel px-6 py-2 font-oxanium-semibold text-white rounded-lg'>Update Invoice</button>
            </div>
        </div>
    );
}
