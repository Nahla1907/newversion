import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import leftArrow from '../assets/icon-arrow-left.svg';
import { AnimatePresence, motion } from 'framer-motion';
import PaidStatus from './PaidStatus';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import formatDate from '../function/formatDate';
import DeleteModal from './DeleteModal';
import CreateInvoice2 from './CreateInvoice2';
import { useReactToPrint } from 'react-to-print';
import { PDFDownloadLink } from '@react-pdf/renderer';
import InvoicePDF2 from './InvoicePDF2';

function InvoiceInfo2() {
  const navigate = useNavigate();
  const { Id } = useParams();
  const dispatch = useDispatch();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [invoice, setInvoice] = useState(null);
  const componentRef = useRef();

  const fetchInvoice = () => {
    axios
      .get(`http://localhost:5000/api/invoices19/${Id}`)
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
    if (Id) {
      fetchInvoice();
    }
  }, [Id]);

  const onDeleteButtonClick = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/invoices19/${Id}`);
      navigate('/center2'); // Navigate back to the correct route after deletion
    } catch (error) {
      console.error("Error deleting the invoice:", error);
    }
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `Invoice_${invoice?.Id || ''}`
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
                <PaidStatus status={invoice.clientstatus19 || 'pending'} />
              </div>
              <div className="md:block hidden">
              <PDFDownloadLink
                  document={<InvoicePDF2 invoice={invoice} />}
                  fileName={`Invoice_${invoice.Id}.pdf`}
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
                    {invoice.Id}
                  </h1>
                  <p className="text-sm text-gray-500 dark:text-gray-200">{invoice.clientName19}</p>
                </div>
                <div className="mt-4 md:mt-0 text-left text-gray-400 dark:text-gray-200 text-sm md:text-right flex flex-col items-center">
                  <p> {formatDate(invoice.selectDeliveryDate19)}: تاريخ اليوم</p>
                  <p>الوكالة الولائية للتسيير </p>
                  <p>و التنظيم العقاريين الحضريين</p>
                  <p>{invoice.Invoicenumber19} :رقم الفاتورة </p>
                  <p>029404129:رقم الهاتف</p>
                </div>
              </div>

              <div className="mt-10 w-full text-right">
                <h3 className="text-lg font-semibold mb-4 dark:text-white">:المعلومات الشخصية</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-500 dark:text-gray-200 font-thin">:إسم السيد/ة </p>
                    <p className="dark:text-white text-bg text-black-500">{invoice.clientName19}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 dark:text-gray-200 font-thin">:رقم الهاتف </p>
                    <p className="dark:text-white">{invoice.clientPhone19}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-200 font-thin">:عنوان المسكن</p>
                    <p className="dark:text-white"> {invoice.clientStreet19}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-200 font-thin">:حالة الدفع </p>
                    <p className="dark:text-white">
                      {invoice.clientstatus19}
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
                 
                  <p className="dark:text-white">{invoice.months19}</p>
                  <p className="dark:text-white">{invoice.price19}</p>
                  <p className="dark:text-white">{invoice.TV19}</p>
                  <p className="dark:text-white">{invoice.total19}</p>
                  
                </div>
                <div className="mt-3 border-4 border-gray-700 bg-gray-800 text-white text-xl p-4 rounded-lg shadow-lg">
  <h2 className="text-center text-lg font-semibold"> {invoice.FinalP19} : المجموع بكل الرسوم</h2>
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
            // <CreateInvoice
            //   isEditMode={true}
            //   invoiceData={invoice} // Pass the current invoice data for editing
            //   onClose={() => setIsEditOpen(false)} // Close the modal
            //   onSave={(updatedInvoice) => {
            //     // Handle saving the updated invoice here
            //     // For example, you might want to send a PUT request to update the invoice
            //     axios.put(`http://localhost:5000/api/invoices/${invoiceId}`, updatedInvoice)
            //       .then((response) => {
            //         setInvoice(response.data);
            //         setIsEditOpen(false); // Close the edit modal
            //       })
            //       .catch((error) => {
            //         console.error('Error updating invoice:', error);
            //       });
            //   }}
            // />
            <CreateInvoice2
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

export default InvoiceInfo2;













// import React, { useEffect, useState, useRef } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import leftArrow from '../assets/icon-arrow-left.svg';
// import { AnimatePresence, motion } from 'framer-motion';
// import PaidStatus from './PaidStatus';
// import { useDispatch } from 'react-redux';
// import { updateInvoiceStatus } from '../redux/invoiceSlice';
// import formatDate from '../function/formatDate';
// import DeleteModal from './DeleteModal';
// import CreateInvoice2 from './CreateInvoice2';
// import axios from 'axios';
// import { useReactToPrint } from 'react-to-print';
// import { PDFDownloadLink } from '@react-pdf/renderer';
// import InvoicePDF2 from './InvoicePDF2';

// function InvoiceInfo2() {
//   const navigate = useNavigate();
//   const { Id } = useParams();
//   const dispatch = useDispatch();
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
//   const [isEditOpen, setIsEditOpen] = useState(false);
//   const [invoice, setInvoice] = useState(null);
//   const componentRef = useRef();

//   const fetchInvoice = () => {
//     axios
//       .get(`http://localhost:5000/api/invoices19/${Id}`)
//       .then((response) => {
//         setInvoice(response.data);
//       })
//       .catch((error) => {
//         console.error('Error fetching invoice:', error);
//       });
//   };

//   useEffect(() => {
//     if (Id) {
//       fetchInvoice();
//     }
//   }, [Id]);

//   const onDeleteButtonClick = async () => {
//     try {
//       await axios.delete(`http://localhost:5000/api/invoices19/${Id}`);
//       navigate('/center2'); // Navigate back to the correct route after deletion
//     } catch (error) {
//       console.error("Error deleting the invoice:", error);
//     }
//   };

//   const handlePrint = useReactToPrint({
//     content: () => componentRef.current,
//     documentTitle: `Invoice_${invoice?.Id || ''}`
//   });

//   if (!invoice) {
//     return <div>Loading...</div>; // Render a loading state if the invoice is not yet loaded
//   }

//   return (
//     <div className="bg-[#FAEBCD] dark:bg-[#2B2B28] min-h-screen py-4 px-4 md:px-8 lg:px-16 flex justify-center">
//       <div className="invoice-container">
//         <motion.div
//           ref={componentRef}
//           key="invoice-info"
//           initial={{ x: 0 }}
//           animate={{ x: 0 }}
//           exit={{ x: '200%' }}
//           transition={{ duration: 0.5 }}
//           className="dark:bg-[#2B2B28] mx-auto duration-300 min-h-screen bg-[#FAEBCD] py-[34px] px-2 md:px-8 lg:px-12 max-w-3xl lg:py-[72px]"
//         >
//           <div>
//             <button onClick={() => navigate(-1)} className="flex items-center space-x-4 group dark:text-white font-thin">
//               <img src={leftArrow} alt="Go back" />
//               <p className="group-hover:opacity-80">Go back</p>
//             </button>

//             <div className="mt-8 rounded-lg w-full flex items-center justify-between px-6 py-6 bg-white dark:bg-[#4C3D3D]">
//               <div className="flex space-x-2 justify-between md:justify-start md:w-auto w-full items-center">
//                 <h1 className="text-gray-600 dark:text-gray-200">Status</h1>
//                 <PaidStatus status={invoice.clientstatus19 || 'pending'} />
//               </div>
//               <div className="md:block hidden">
//                 <PDFDownloadLink
//                   document={<InvoicePDF2 invoice={invoice} />}
//                   fileName={`Invoice_${invoice.Id}.pdf`}
//                   className="ml-3 text-center text-white bg-gray-500 hover:opacity-80 p-3 px-7 rounded-full"
//                 >
//                   {({ loading }) => (loading ? 'Loading document...' : 'Print')}
//                 </PDFDownloadLink>
//                 <button
//                   onClick={() => setIsDeleteModalOpen(true)}
//                   className="ml-3 text-center text-white bg-red-500 hover:opacity-80 p-3 px-7 rounded-full"
//                 >
//                   Delete
//                 </button>
//                 <button
//                   onClick={() => setIsEditOpen(true)} // Open the edit modal
//                   className="ml-3 text-center text-white bg-blue-500 hover:opacity-80 p-3 px-7 rounded-full"
//                 >
//                   Edit
//                 </button>
//               </div>
//             </div>

//             <div className="mt-4 rounded-lg w-full px-6 py-6 bg-white dark:bg-[#4C3D3D]">
//               <div className="flex flex-col md:flex-row items-start justify-between w-full">
//                 <div>
//                   <h1 className="font-semibold dark:text-white text-xl">
//                     <span className="text-[#C07F00]">#</span>
//                     {invoice.Id}
//                   </h1>
//                   <p className="text-sm text-gray-500 dark:text-gray-200">{invoice.clientName19}</p>
//                 </div>
//                 <div className="mt-4 md:mt-0 text-left text-gray-400 dark:text-gray-200 text-sm md:text-right flex flex-col items-center">
//                   <p> {formatDate(invoice.selectDeliveryDate19)}: تاريخ اليوم</p>
//                   <p>الوكالة الولائية للتسيير </p>
//                   <p>و التنظيم العقاريين الحضريين</p>
//                   <p>{invoice.Invoicenumber19} :رقم الفاتورة </p>
//                   <p>029404129:رقم الهاتف</p>
//                 </div>
//               </div>

//               <div className="mt-10 w-full text-right">
//                 <h3 className="text-lg font-semibold mb-4 dark:text-white">:المعلومات الشخصية</h3>
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <p className="text-gray-500 dark:text-gray-200 font-thin">:إسم السيد/ة </p>
//                     <p className="dark:text-white text-bg text-black-500">{invoice.clientName19}</p>
//                   </div>
//                   <div>
//                     <p className="text-gray-400 dark:text-gray-200 font-thin">:رقم الهاتف </p>
//                     <p className="dark:text-white">{invoice.clientPhone19}</p>
//                   </div>
//                   <div>
//                     <p className="text-gray-500 dark:text-gray-200 font-thin">:عنوان المسكن</p>
//                     <p className="dark:text-white"> {invoice.clientStreet19}</p>
//                   </div>
//                   <div>
//                     <p className="text-gray-500 dark:text-gray-200 font-thin">:حالة الدفع </p>
//                     <p className="dark:text-white">
//                       {invoice.clientstatus19}
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               <div className="mt-3 w-full text-right">
//                 <h3 className="text-lg font-semibold mb-3 dark:text-white">:تفاصيل الدفع</h3>
//                 <div className="grid grid-cols-5 gap-3">
//                   <p className="text-gray-500 dark:text-gray-200 font-thin">المساحة</p>
//                   <p className="text-gray-500 dark:text-gray-200 font-thin">السعر الوحدوي</p>      
//                   <p className="text-gray-500 dark:text-gray-200 font-thin">القيمة المضافة %09</p>
//                   <p className="text-gray-500 dark:text-gray-200 font-thin">المجموع خارج الرسوم</p>
//                   <p className="text-gray-500 dark:text-gray-200 font-thin">المجموع بكل الرسوم</p>
//                   <p className="dark:text-white">{invoice.months19}</p>
//                   <p className="dark:text-white">{invoice.price19}</p>
//                   <p className="dark:text-white">{invoice.TVA19}</p>
//                   <p className="dark:text-white">{invoice.total19}</p>
//                   <p className="dark:text-white">{invoice.FinalP19}</p>
//                 </div>
//                 <div className='  p-3 font-semibold 
//                   text-white rounded-lg rounded-t-none 
//                   justify-between flex dark:bg-black 
//                   bg-[#4C3D3D] dark:text-gray-200 '>
//                   <h1 className=' text-left text-3xl'>
//                     {invoice.FinalP19}
//                   </h1>
//                   <h3 className=' text-right text-xl '>
//                   :المجموع بكل الرسوم  
//                   </h3>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </motion.div>
//         <AnimatePresence>
//           {isDeleteModalOpen && (
//           <DeleteModal
//           key="delete-modal"
//           invoiceId={Id}
//           onDelete={() => {
//           setIsDeleteModalOpen(false);
//           onDeleteButtonClick();
//          }}
//           setIsDeleteModalOpen={setIsDeleteModalOpen}
//          />
//          )}
//         </AnimatePresence>
//         {/* Render CreateInvoice2 for editing when isEditOpen is true */}
//         <AnimatePresence>
//           {isEditOpen && (
//             <motion.div
//               key="edit-modal"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//             >
//                <CreateInvoice2
//         invoice={invoice} // Pass the current invoice data for editing
//         onClose={() => setIsEditOpen(false)} // Close the modal when done
//       />
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// }

// export default InvoiceInfo2;