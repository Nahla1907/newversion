import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import leftArrow from '../assets/icon-arrow-left.svg';
import { AnimatePresence, motion } from 'framer-motion';
import PaidStatus from './PaidStatus';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import formatDate from '../function/formatDate';
import DeleteModal from './DeleteModal';
import CreateInvoice from './CreateInvoice';
import { useReactToPrint } from 'react-to-print';
import { PDFDownloadLink } from '@react-pdf/renderer';
import InvoicePDF from './InvoicePDF';

function InvoiceInfo() {
  const navigate = useNavigate();
  const { invoiceId } = useParams();
  const dispatch = useDispatch();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [invoice, setInvoice] = useState(null);
  const componentRef = useRef();

  const fetchInvoice = () => {
   
    axios
      .get(`http://localhost:5000/api/invoices/${invoiceId}`)
      .then((response) => {
        setInvoice(response.data);
      })
      .catch((error) => {
        console.error('Error fetching invoice:', error);
      });
  };

  const handleEditClick = () => {
    setIsEditOpen(true); // Open the edit modal
  };

  useEffect(() => {
    if (invoiceId) {
      fetchInvoice();
    }
  }, [invoiceId]);

  const onDeleteButtonClick = async () => {
    
    try {
      await axios.delete(`http://localhost:5000/api/invoices/${invoiceId}`);
      navigate('/center'); // Navigate back to the correct route after deletion
    } catch (error) {
      console.error("Error deleting the invoice:", error);
    }
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `Invoice_${invoice?.invoiceId || ''}`
  });

  if (!invoice) {
    return <div>Loading...</div>; // Render a loading state if the invoice is not yet loaded
  }

  return (
    <div className="bg-[#FAEBCD] dark:bg-[#2B2B28] min-h-screen py-4 px-4 md:px-8 lg:px-16 flex justify-center">
      <div className="invoice-container">
        <motion.div
          ref={componentRef}
          key="invoice-info"
          initial={{ x: 0 }}
          animate={{ x: 0 }}
          exit={{ x: '200%' }}
          transition={{ duration: 0.5 }}
          className="dark:bg-[#2B2B28] mx-auto duration-300 min-h-screen bg-[#FAEBCD] py-[34px] px-2 md:px-8 lg:px-12 max-w-3xl lg:py-[72px]"
        >
          <div>
            <button onClick={() => navigate(-1)} className="flex items-center space-x-4 group dark:text-white font-thin">
              <img src={leftArrow} alt="Go back" />
              <p className="group-hover:opacity-80">Go back</p>
            </button>

            <div className="mt-8 rounded-lg w-full flex items-center justify-between px-6 py-6 bg-white dark:bg-[#4C3D3D]">
              <div className="flex space-x-2 justify-between md:justify-start md:w-auto w-full items-center">
                <h1 className="text-gray-600 dark:text-gray-200">Status</h1>
                <PaidStatus status={invoice.clientstatus || 'pending'} />
              </div>
              <div className="md:block hidden">
              <PDFDownloadLink
                  document={<InvoicePDF invoice={invoice} />}
                  fileName={`Invoice_${invoice.invoiceId}.pdf`}
                  className="ml-3 text-center text-white bg-gray-500 hover:opacity-80 p-3 px-7 rounded-full"
                >
                  {({ loading }) =>  'Print'}
                </PDFDownloadLink>
                <button
                  onClick={() => setIsDeleteModalOpen(true)}
                  className="ml-3 text-center text-white bg-red-500 hover:opacity-80 p-3 px-7 rounded-full"
                >
                  Delete
                </button>
                <button
                  onClick={handleEditClick}
                  className="ml-3 text-center text-white bg-blue-500 hover:opacity-80 p-3 px-7 rounded-full"
                >
                  Edit
                </button>
              </div>
            </div>

            <div className="mt-4 rounded-lg w-full px-6 py-6 bg-white dark:bg-[#4C3D3D]">
              <div className="flex flex-col md:flex-row items-start justify-between w-full">
                <div>
                  <h1 className="font-semibold dark:text-white text-xl">
                    <span className="text-[#C07F00]">#</span>
                    {invoice.invoiceId}
                  </h1>
                  <p className="text-sm text-gray-500 dark:text-gray-200">{invoice.clientName}</p>
                </div>
                <div className="mt-4 md:mt-0 text-left text-gray-400 dark:text-gray-200 text-sm md:text-right flex flex-col items-center">
                  <p> {formatDate(invoice.selectDeliveryDate)}: تاريخ اليوم</p>
                  <p>الوكالة الولائية للتسيير </p>
                  <p>و التنظيم العقاريين الحضريين</p>
                  <p>{invoice.Invoicenumber} :رقم الفاتورة </p>
                  <p>029404129:رقم الهاتف</p>
                </div>
              </div>

              <div className="mt-10 w-full text-right">
                <h3 className="text-lg font-semibold mb-4 dark:text-white">:المعلومات الشخصية</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-500 dark:text-gray-200 font-thin">:إسم السيد/ة </p>
                    <p className="dark:text-white text-bg text-black-500">{invoice.clientName}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 dark:text-gray-200 font-thin">:رقم الهاتف </p>
                    <p className="dark:text-white">{invoice.clientPhone}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-200 font-thin">:عنوان المسكن</p>
                    <p className="dark:text-white"> {invoice.clientStreet}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-200 font-thin">:حالة الدفع </p>
                    <p className="dark:text-white">
                      {invoice.clientstatus}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-3 w-full text-right">
                <h3 className="text-lg font-semibold mb-3 dark:text-white">:تفاصيل الدفع</h3>
                <div className="grid grid-cols-4 gap-6">
                  <p className="text-gray-500 dark:text-gray-200 font-thin">المساحة</p>
                  <p className="text-gray-500 dark:text-gray-200 font-thin">السعر الوحدوي</p>      
                  <p className="text-gray-500 dark:text-gray-200 font-thin">القيمة المضافة %09</p>
                  <p className="text-gray-500 dark:text-gray-200 font-thin">المجموع خارج الرسوم</p>
                  
                  <p className="dark:text-white">{invoice.months}</p>
                  <p className="dark:text-white">{invoice.price}</p>
                  <p className="dark:text-white">{invoice.TVA}</p>
                  <p className="dark:text-white">{invoice.total}</p>
                  
                </div>
                <div className="mt-3 border-4 border-gray-700 bg-gray-800 text-white text-xl p-4 rounded-lg shadow-lg">
  <h2 className="text-center text-lg font-semibold"> {invoice.FinalP} : المجموع بكل الرسوم</h2>
  {/* <div className="mt-2 text-center text-2xl">{invoice.FinalP}</div> */}
</div>

              </div>
            </div>
          </div>

          <DeleteModal
           isOpen={isDeleteModalOpen}
           onClose={() => setIsDeleteModalOpen(false)} // Pass a function to handle closing
           onDelete={onDeleteButtonClick}
          />

          {/* Render CreateInvoice component when isEditOpen is true */}
          {isEditOpen && (
         
            <CreateInvoice
                type="edit" // Pass type as "edit"
                invoice={invoice} // Pass the current invoice data for editing
                onClose={() => setIsEditOpen(false)} // Close the modal
  />
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default InvoiceInfo;
















// import React, { useEffect, useState, useRef } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import leftArrow from '../assets/icon-arrow-left.svg';
// import { AnimatePresence, motion } from 'framer-motion';
// import PaidStatus from './PaidStatus';
// import { useDispatch } from 'react-redux';
// import { updateInvoiceStatus } from '../redux/invoiceSlice';
// import formatDate from '../function/formatDate';
// import DeleteModal from './DeleteModal';
// import CreateInvoice from './CreateInvoice';
// import axios from 'axios';
// import { useReactToPrint } from 'react-to-print';
// import { PDFDownloadLink } from '@react-pdf/renderer';
// import InvoicePDF from './InvoicePDF';

// function InvoiceInfo() {
//     const navigate = useNavigate();
//     const { invoiceId } = useParams();
//     const dispatch = useDispatch();
//     const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
//     const [isEditOpen, setIsEditOpen] = useState(false);
//     const [invoice, setInvoice] = useState(null);
//     const [error, setError] = useState(null);
//     const componentRef = useRef();

//     const onMakePaidClick = () => {
//         dispatch(updateInvoiceStatus({ invoiceId, clientstatus: 'paid' }));
//         fetchInvoice(); // Refetch the updated invoice
//     };

//     const fetchInvoice = () => {
//         axios.get(`http://localhost:5000/api/invoices/${invoiceId}`)
//             .then((response) => setInvoice(response.data))
//             .catch((error) => setError(error.message)); // Handle errors
//     };

//     useEffect(() => {
//         if (invoiceId) {
//             fetchInvoice();
//         }
//     }, [invoiceId]);
//     const handleCancel = () => {
//         onClose();
//       };

//     const onDeleteButtonClick = async () => {
//         try {
//             await axios.delete(`http://localhost:5000/api/invoices/${invoiceId}`);
//             navigate('/'); // Navigate after deletion
//         } catch (error) {
//             setError(error.message); // Handle errors
//         }
//     };

//     const handleEditInvoice = async (updatedInvoice) => {
//         try {
//             await axios.put(`http://localhost:5000/api/invoices/${invoiceId}, updatedInvoice`);
//             setInvoice(updatedInvoice);
//             setIsEditOpen(false);
//         } catch (error) {
//             setError(error.message); // Handle errors
//         }
//     };

//     const handlePrint = useReactToPrint({
//         content: () => componentRef.current,
//         documentTitle: `Invoice_${invoice?.invoiceId || ''}`
//     });

//     if (error) {
//         return <div>Error: {error}</div>; // Render error message if there's an error
//     }

//     if (!invoice) {
//         return <div>Loading...</div>; // Loading state
//     }

//     return (
//         <div className="bg-[#FAEBCD] dark:bg-[#2B2B28] min-h-screen py-4 px-4 md:px-8 lg:px-16 flex justify-center">
//             {isDeleteModalOpen && (
//                 <DeleteModal
//                     invoiceId={invoiceId}
//                     onDeleteButtonClick={onDeleteButtonClick}
//                     setIsDeleteModalOpen={setIsDeleteModalOpen}
//                 />
//             )}
//             <AnimatePresence>
//                 {isEditOpen && (
//                      <CreateInvoice
//                      invoice={invoice} // Pass the current invoice data for editing
//                      onClose={() => setIsEditOpen(false)} // Close the modal when done
//                    />
//                 )}
//             </AnimatePresence>
//             <div className="invoice-container">
//                 <motion.div
//                     ref={componentRef}
//                     key="invoice-info"
//                     initial={{ x: 0 }}
//                     animate={{ x: 0 }}
//                     exit={{ x: '200%' }}
//                     transition={{ duration: 0.5 }}
//                     className="dark:bg-[#2B2B28] mx-auto duration-300 min-h-screen bg-[#FAEBCD] py-[34px] px-2 md:px-8 lg:px-12 max-w-3xl lg:py-[72px]"
//                 >
//                     <div>
//                         <button onClick={() => navigate(-1)} className="flex items-center space-x-4 group dark:text-white font-thin">
//                             <img src={leftArrow} alt="Go back" />
//                             <p className="group-hover:opacity-80">Go back</p>
//                         </button>
//                         <div className="mt-8 rounded-lg w-full flex items-center justify-between px-6 py-6 bg-[white] dark:bg-[#4C3D3D]">
//                             <div className="flex space-x-2 justify-between md:justify-start md:w-auto w-full items-center">
//                                 <h1 className="text-gray-700 dark:text-gray-200">Status</h1>
//                                 <PaidStatus status={invoice.clientstatus || 'pending'} />
//                             </div>
//                             <div className="md:block hidden">
//                                 <PDFDownloadLink
//                                     document={<InvoicePDF invoice={invoice} />}
//                                     fileName={`Invoice_${invoice.invoiceId}.pdf`}
//                                     className="ml-3 text-center text-white bg-gray-500 hover:opacity-80 p-3 px-7 rounded-full"
//                                 >
//                                     {({ loading }) => (loading ? 'Loading document...' : 'Print')}
//                                 </PDFDownloadLink>
//                                 <button
//                                     onClick={() => setIsDeleteModalOpen(true)}
//                                     className="ml-3 text-center text-white bg-red-500 hover:opacity-80 p-3 px-7 rounded-full"
//                                 >
//                                     Delete
//                                 </button>
//                                 <button
//                                  onClick={() => setIsEditOpen(true)} // Open the edit modal
//                                  className="ml-3 text-center text-white bg-blue-500 hover:opacity-80 p-3 px-7 rounded-full"
//                                 >
//                                    Edit
//                                 </button>
//                             </div>
//                         </div>

//                         <div className="mt-4 rounded-lg w-full px-6 py-6 bg-white dark:bg-[#4C3D3D]">
//                             <div className="flex flex-col md:flex-row items-start justify-between w-full">
//                                 <div>
//                                     <h1 className="font-semibold dark:text-white text-xl">
//                                         <span className="text-[#C07F00]">#</span>
//                                         {invoice.invoiceId}
//                                     </h1>
//                                     <p className="text-sm text-gray-500 dark:text-gray-200">{invoice.clientName}</p>
//                                 </div>
//                                 <div className="mt-4 md:mt-0 text-left text-gray-400 dark:text-gray-200 text-sm md:text-right flex flex-col items-center">
//                                     <p> {formatDate(invoice.selectDeliveryDate)}: تاريخ اليوم</p>
//                                     <p>الوكالة الولائية للتسيير </p>
//                                     <p>و التنظيم العقاريين الحضريين</p>
//                                     <p>{invoice.Invoicenumber} :رقم الفاتورة </p>
//                                     <p>029404129:رقم الهاتف</p>
//                                 </div>
//                             </div>

//                             <div className="mt-10 w-full text-right">
//                                 <h3 className="text-lg font-semibold mb-4 dark:text-white">:المعلومات الشخصية</h3>
//                                 <div className="grid grid-cols-2 gap-4">
//                                     <div>
//                                         <p className="text-gray-500 dark:text-gray-200 font-thin">:إسم السيد/ة </p>
//                                         <p className="dark:text-white text-bg text-black-500">{invoice.clientName}</p>
//                                     </div>
//                                     <div>
//                                         <p className="text-gray-400 dark:text-gray-200 font-thin">:رقم الهاتف </p>
//                                         <p className="dark:text-white">{invoice.clientPhone}</p>
//                                     </div>
//                                     <div>
//                                         <p className="text-gray-500 dark:text-gray-200 font-thin">:عنوان المسكن</p>
//                                         <p className="dark:text-white"> {invoice.clientStreet}</p>
//                                     </div>
//                                     <div>
//                                         <p className="text-gray-500 dark:text-gray-200 font-thin">:حالة الدفع </p>
//                                         <p className="dark:text-white">
//                                              {invoice.clientstatus}
//                                         </p>
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className="mt-3 w-full text-right">
//                                 <h3 className="text-lg font-semibold mb-3 dark:text-white">:تفاصيل الدفع</h3>
//                                 <div className="grid grid-cols-5 gap-3">
//                                     <p className="text-gray-500 dark:text-gray-200 font-thin">المساحة</p>
//                                     <p className="text-gray-500 dark:text-gray-200 font-thin">السعر الوحدوي</p>      
//                                     <p className="text-gray-500 dark:text-gray-200 font-thin">القيمة الإجمالية</p>
//                                     <p className="text-gray-500 dark:text-gray-200 font-thin">مبلغ الطابع</p>
//                                     <p className="text-gray-500 dark:text-gray-200 font-thin">السعر النهائي</p>
//                                 </div>
//                                 <div className="grid grid-cols-5 gap-3 text-right">
//                                     <p className="dark:text-white">{invoice.months19}</p>
//                                     <p className="dark:text-white">{invoice.price19}</p>
//                                     <p className="dark:text-white">{invoice.total19}</p>
//                                     <p className="dark:text-white">{invoice.stampmoney19}</p>
//                                     <p className="dark:text-white">{invoice.FinalP19}</p>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </motion.div>
//             </div>
//         </div>
//     );
// }

// export default InvoiceInfo;










