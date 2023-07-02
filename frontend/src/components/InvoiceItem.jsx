import { FaEthereum } from 'react-icons/fa';
import PropTypes from 'prop-types'

const InvoiceItem = ({ invoiceItem }) => {
  return (
    <div key={invoiceItem.invoice_item_id} className='pt-3 flex justify-between'>
      {invoiceItem.itemImage && <img src={invoiceItem.itemImage} className='w-48 h-32 object-cover' alt={invoiceItem.Item.item_name} />}
      <div className='flex flex-col justify-between'>
        <div className='flex flex-col items-end '>
          <h4 className='font-oxanium-bold'>#{invoiceItem.Item.item_id}</h4>
          <h3 className='font-oxanium md:text-2xl text-xl'>{invoiceItem.Item.item_name}</h3>
        </div>
        <div className='flex flex-col items-end gap-1'>
          <span className='font-oxanium-semibold'>x{invoiceItem.quantity_item}</span>
          <div className='flex items-center'>
            <FaEthereum />
            <span className="font-oxanium">{invoiceItem.Item.price}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceItem;

InvoiceItem.propTypes = {
    invoiceItem : PropTypes.object
}