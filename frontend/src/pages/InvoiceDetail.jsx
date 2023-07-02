import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import InvoiceHeader from '../components/InvoiceHeader';
import InvoiceItem from '../components/InvoiceItem';
import { FaEthereum } from 'react-icons/fa';

const InvoiceDetail = () => {
    const { id } = useParams();
    const [invoice, setInvoice] = useState(null);
    const [countdown, setCountdown] = useState(null);
    const [invoiceItems, setInvoiceItems] = useState([]);
    const [isSuccessCreated, setIsSuccessCreated] = useState(false)
    const [message, setMessage] = useState('');

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const status = searchParams.get('status');

    const navigate = useNavigate()

    useEffect(() => {
        if (status === 'created') {
            setIsSuccessCreated(true)
            setMessage('Invoice Crated')
        } else if (status === 'updated') {
            setMessage('Invoice Updated')
        }
    }, [status])


    useEffect(() => {
        const timer = setTimeout(() => {
            setMessage('');
        }, 1500);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    useEffect(() => {
        const fetchInvoice = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/invoices/${id}`, { withCredentials: true });
                const invoiceData = response.data;
                setInvoice(invoiceData);
                setInvoiceItems(invoiceData.invoice.InvoiceItems);
            } catch (error) {
                console.log(error);
            }
        };

        fetchInvoice();
    }, [id]);

    useEffect(() => {
        const calculateCountdown = () => {
            if (!invoice) return;

            const dueDate = new Date(invoice.invoice.due_date * 1000);
            const now = new Date();
            const difference = dueDate.getTime() - now.getTime();
            const countdown = Math.floor(difference / 1000);
            setCountdown(countdown);
        };

        calculateCountdown();

        const timer = setInterval(() => {
            calculateCountdown();
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, [invoice]);

    useEffect(() => {
        const fetchItemImages = async () => {
            const updatedItems = await Promise.all(
                invoice.invoice.InvoiceItems.map(async (invoiceItem) => {
                    try {
                        const response = await axios.get(
                            `https://pixabay.com/api/?key=38017794-63616cf97b3b1001d6cab16cc&q=${encodeURIComponent(
                                invoiceItem.Item.item_name
                            )}&image_type=photo&per_page=3`
                        );
                        const imageHits = response.data.hits;
                        const itemImage = imageHits.length > 0 ? imageHits[0].webformatURL : null;
                        return {
                            ...invoiceItem,
                            itemImage: itemImage,
                        };
                    } catch (error) {
                        console.log(error);
                        return invoiceItem;
                    }
                })
            );

            setInvoiceItems(updatedItems);
        };

        if (invoice && invoice.invoice.InvoiceItems.length > 0) {
            fetchItemImages();
        }

    }, [invoice]);

    if (!invoice) {
        return <div>Loading...</div>;
    }

    const { invoice_number } = invoice.invoice;

    const formatCountdown = () => {
        if (countdown === 0) {
            return "Waktu pembayaran telah berakhir";
        }

        const hours = Math.floor(countdown / 3600);
        const minutes = Math.floor((countdown % 3600) / 60);
        const seconds = countdown % 60;

        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const deleteInvoice = () => {
        axios.delete('http://localhost:5000/api/invoices/' + invoice.invoice.invoice_number, { withCredentials: true })

        navigate('/invoice?status=deleted')
    }
    return (
        <>
            {message.length > 0  && <div className='fixed top-24 flex w-full justify-center'>
                <div className='px-6 py-2 bg-green-pixel rounded-lg text-white'>{message}</div>
            </div>}
            <div className="px-6 mt-6">
                <InvoiceHeader invoiceNumber={invoice_number} formatCountdown={formatCountdown} />
                <div className="h-fit w-full border-2 border-black p-3 rounded-lg mt-6 bg-white relative">
                    <div className="flex flex-col divide-y-2 divide-black gap-3">
                        {/* Render setiap item invoice */}
                        {invoiceItems.map((invoiceItem) => (
                            <InvoiceItem key={invoiceItem.invoice_item_id} invoiceItem={invoiceItem} />
                        ))}
                    </div>
                </div>
                <div className='mt-6'>
                    <div className="h-fit flex justify-between w-full border-2 border-black p-3 rounded-lg mt-6 bg-white">
                        <h6 className='font-oxanium-bold'>Total Price</h6>
                        <div className='flex items-center'>
                            <FaEthereum />
                            <h4 className='font-oxanium text-xl'>{invoice.invoice.total_price}</h4>
                        </div>
                    </div>
                </div>
                {isSuccessCreated ?
                    <div className='flex justify-center mt-6 gap-2'>
                        <Link to="/invoice" className="bg-blue-pixel px-6 py-2 font-oxanium-semibold text-white rounded-lg">View All Invoices</Link>
                        <Link to={`/invoice/update/${invoice_number}`} className="bg-yellow-pixel px-6 py-2 font-oxanium-semibold text-black rounded-lg">Update Invoice</Link>
                    </div>
                    :
                    <div className='flex justify-center mt-6 gap-2'>
                        <Link to={`/invoice/update/${invoice_number}`} className="bg-yellow-pixel px-6 py-2 font-oxanium-semibold text-black rounded-lg">Update Invoice</Link>
                        <div onClick={deleteInvoice} className="bg-red-pixel px-6 py-2 font-oxanium-semibold text-white rounded-lg">Delete Invoice</div>
                    </div>
                }
            </div>
        </>
    );
};

export default InvoiceDetail;
