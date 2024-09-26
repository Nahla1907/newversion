import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInvoices } from '../redux/invoiceActions'; // Updated to fetch invoices
import formatDate from '../function/formatDate';

function InvoiceList() {
  const dispatch = useDispatch();
  const invoices = useSelector((state) => state.invoices.invoices || []); // Updated to use invoices
  const [searchTerm, setSearchTerm] = useState(''); // State to track search input

  useEffect(() => {
    // Fetch all invoices from invoices when the component mounts
    dispatch(fetchInvoices());
  }, [dispatch]);

  // Filter invoices based on the search term
  const filteredInvoices = invoices.filter((invoice) =>
    invoice.clientName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='dark:bg-[#2B2B28] scrollbar-hide duration-300 min-h-screen bg-[#FAEBCD] py-[34px] px-2 md:px-8 lg:px-12 lg:py-[72px]'>
      <div className='max-w-4xl mx-auto'>
        <h1 className='lg:text-4xl md:text-2xl text-xl dark:text-white tracking-wide font-semibold mb-6'>Invoices 09%</h1>
        <input
          type='text'
          placeholder='Search by Client Name'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='w-[400px] mb-4 p-2 border rounded-lg dark:bg-white dark:text-black'
        />
        {filteredInvoices.length > 0 ? (
          <div className='overflow-x-auto'>
            <table className='min-w-full bg-white dark:bg-[#4C3D3D] rounded-lg shadow-md'>
              <thead>
                <tr>
                <th className='py-3 px-6 bg-gray-200 dark:bg-[#3A3A35] text-left text-xs font-semibold text-gray-700 dark:text-white uppercase tracking-wider'>المجموع النهائي</th>
                <th className='py-3 px-6 bg-gray-200 dark:bg-[#3A3A35] text-left text-xs font-semibold text-gray-700 dark:text-white uppercase tracking-wider'>التعيين</th>
                <th className='py-3 px-6 bg-gray-200 dark:bg-[#3A3A35] text-left text-xs font-semibold text-gray-700 dark:text-white uppercase tracking-wider'>الوضعية</th>
                <th className='py-3 px-6 bg-gray-200 dark:bg-[#3A3A35] text-left text-xs font-semibold text-gray-700 dark:text-white uppercase tracking-wider'>العنوان</th>
                <th className='py-3 px-6 bg-gray-200 dark:bg-[#3A3A35] text-left text-xs font-semibold text-gray-700 dark:text-white uppercase tracking-wider'>إلى</th>
                <th className='py-3 px-6 bg-gray-200 dark:bg-[#3A3A35] text-left text-xs font-semibold text-gray-700 dark:text-white uppercase tracking-wider'> تاريخ الدفع من </th>
                <th className='py-3 px-6 bg-gray-200 dark:bg-[#3A3A35] text-left text-xs font-semibold text-gray-700 dark:text-white uppercase tracking-wider'>رقم الهاتف</th>
                <th className='py-3 px-6 bg-gray-200 dark:bg-[#3A3A35] text-left text-xs font-semibold text-gray-700 dark:text-white uppercase tracking-wider'>الإسم و اللقب</th>
                <th className='py-3 px-6 bg-gray-200 dark:bg-[#3A3A35] text-left text-xs font-semibold text-gray-700 dark:text-white uppercase tracking-wider'>رقم الفاتورة</th>
                
                </tr>
              </thead>
              <tbody>
                {filteredInvoices.slice().reverse().map((invoice) => (
                  <tr key={invoice.Id} className='border-b'> {/* Assigning a unique key here */}
                  <td className='py-4 px-6 text-sm font-semibold text-gray-900 dark:text-white'>{invoice.FinalP}DZD</td>
                  <td className='py-4 px-6 text-sm font-semibold text-gray-900 dark:text-white'>{invoice.description} </td>
                  <td className='py-4 px-6 text-sm font-semibold text-[#365E32] dark:text-white'>{invoice.clientstatus} </td>
                  <td className='py-4 px-6 text-sm font-semibold text-gray-900 dark:text-white'>{invoice.clientCity} </td>
                  <td className='py-4 px-6 text-sm text-gray-700 dark:text-white'>{formatDate(invoice.selectDeliveryDateto)}</td>
                  <td className='py-4 px-6 text-sm text-gray-700 dark:text-white'>{formatDate(invoice.selectDeliveryDatefrom)}</td>
                  <td className='py-4 px-6 text-sm text-gray-700 dark:text-white'>{invoice.clientPhone}</td>
                  <td className='py-4 px-6 text-sm text-gray-700 dark:text-white'>{invoice.clientName}</td>
                  <td className='py-4 px-6 text-sm font-medium text-gray-900 dark:text-white'>{invoice.Invoicenumber}</td>
                   
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className='text-center text-gray-500'>No invoices found</p>
        )}
      </div>
    </div>
  );
}

export default InvoiceList;
