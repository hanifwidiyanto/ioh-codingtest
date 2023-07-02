import { useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../App';
import { useNavigate } from 'react-router-dom';

export default function CreateInvoiceButton() {
    const { user , setUser} = useContext(UserContext);
    const { items } = user;
    const navigate = useNavigate()
    const createInvoice = async () => {
        try {
            const payload = {
                items: items.map((item) => ({
                    item_id: parseInt(item.item_id),
                    quantity: item.quantity,
                })),
            };
            const response = await axios.post('http://localhost:5000/api/invoices', payload, { withCredentials: true });
            navigate('/invoice/'+ response.data.invoice.invoice_number + '?status=created')
            // Setelah berhasil membuat invoice, Anda dapat melakukan tindakan lain, misalnya menghapus item dari keranjang
            setUser((prevUser) => ({ ...prevUser, items: [] }));
        } catch (error) {
            console.log(error);
            // Lakukan penanganan kesalahan sesuai kebutuhan Anda
        }
    };

    return (
        <div className="flex justify-center mt-6">
            <button onClick={createInvoice} className='px-8 py-3 bg-red-pixel text-white rounded-lg md:text-xl text-md font-oxanium-semibold hover:translate-x-1 hover:translate-y-1 duration-100'>Create Invoice</button>
        </div>
    );
}
