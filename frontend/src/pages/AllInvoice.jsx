import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';

export default function AllInvoice() {
  const [invoices, setInvoices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [message, setMessage] = useState('')

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/invoices', {
          withCredentials: true,
          params: { page: currentPage, limit: 8 },
        });
        setInvoices(response.data.invoices);
        setTotalPages(response.data.totalPages + 1);
      } catch (error) {
        console.log(error);
      }
    };

    fetchInvoices();
  }, [currentPage]);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const status = searchParams.get('status');

  useEffect(() => {
    if (status === 'deleted') setMessage('Invoice Deleted')

    const timer = setTimeout(() => {
      setMessage('');
    }, 1500);

    return () => {
      clearTimeout(timer);
    };

  }, [status])

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      {message.length > 0 && <div className='fixed top-24 flex w-full justify-center'>
        <div className='px-6 py-2 bg-green-pixel rounded-lg text-white'>{message}</div>
      </div>}
      <div className='flex gap-3 flex-wrap mt-6 px-6'>
        {invoices.map((invoice) => (
          <Link to={'/invoice/' + invoice.invoice_number} key={invoice.invoice_id} className="border-2 border-black rounded-lg h-16 w-48 p-3 relative">
            <h4 className="font-oxanium-bold text-xl">#{invoice.invoice_number}</h4>
            <span className={`absolute bottom-2 right-2 h-3 rounded-full w-3 ${invoice.due_date < Date.now() ? 'bg-green-pixel' : 'bg-red-pixel'}`}></span>
          </Link>
        ))}

        {/* Pagination */}
      </div>
      <div className='px-6 mt-12 flex gap-2 justify-center'>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
          <button
            key={page}
            className={`px-3 py-2 border rounded-lg font-oxanium ${page === currentPage ? 'bg-blue-pixel text-white' : 'bg-gray-200 text-gray-800'
              }`}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        ))}
      </div>
    </>
  );
}
