import PropTypes from 'prop-types'

const InvoiceHeader = ({ invoiceNumber, formatCountdown }) => {
  return (
    <div className="flex justify-between">
      <h2 className="font-oxanium-bold text-2xl">#{invoiceNumber}</h2>
      <div className="flex flex-col items-end">
        <h5 className='font-oxanium-semibold'>Payment Deadline:</h5>
        <span className='md:font-2xl font-xl font-oxanium'>{formatCountdown()}</span>
      </div>
    </div>
  );
};

export default InvoiceHeader;

InvoiceHeader.propTypes = {
    invoiceNumber: PropTypes.string,
    formatCountdown: PropTypes.func,

}