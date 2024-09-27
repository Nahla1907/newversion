// import React, { useEffect, useState, useRef } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import leftArrow from '../assets/icon-arrow-left.svg';
// import { AnimatePresence, motion } from 'framer-motion';
// import PaidStatus from './PaidStatus';
// import { useDispatch } from 'react-redux';
// import axios from 'axios';
// import formatDate from '../function/formatDate';
// import DeleteModal from './DeleteModal';
// import CreateInvoice from './CreateInvoice';
// import { useReactToPrint } from 'react-to-print';
// import { PDFDownloadLink } from '@react-pdf/renderer';
// import InvoicePDF from './InvoicePDF';

// function InvoiceInfo() {
//   const navigate = useNavigate();
//   const { invoiceId } = useParams();
//   const dispatch = useDispatch();
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
//   const [isEditOpen, setIsEditOpen] = useState(false);
//   const [invoice, setInvoice] = useState(null);
//   const componentRef = useRef();

//   const fetchInvoice = () => {
//     const backendUrl = process.env.REACT_APP_BACKEND_URL;
//     axios
//       .get(`${backendUrl}/api/invoices/${invoiceId}`)
//       .then((response) => {
//         setInvoice(response.data);
//       })
//       .catch((error) => {
//         console.error('Error fetching invoice:', error);
//       });
//   };

//   const handleEditClick = () => {
//     setIsEditOpen(true); // Open the edit modal
//   };

//   useEffect(() => {
//     if (invoiceId) {
//       fetchInvoice();
//     }
//   }, [invoiceId]);

//   const onDeleteButtonClick = async () => {
//     const backendUrl = process.env.REACT_APP_BACKEND_URL;
//     try {
//       await axios.delete(`${backendUrl}/api/invoices/${invoiceId}`);
//       navigate('/center'); // Navigate back to the correct route after deletion
//     } catch (error) {
//       console.error("Error deleting the invoice:", error);
//     }
//   };

//   const handlePrint = useReactToPrint({
//     content: () => componentRef.current,
//     documentTitle: `Invoice_${invoice?.invoiceId || ''}`
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
//                 <PaidStatus status={invoice.clientstatus || 'pending'} />
//               </div>
//               <div className="md:block hidden">
//               <PDFDownloadLink
//                   document={<InvoicePDF invoice={invoice} />}
//                   fileName={`Invoice_${invoice.invoiceId}.pdf`}
//                   className="ml-3 text-center text-white bg-gray-500 hover:opacity-80 p-3 px-7 rounded-full"
//                 >
//                   {({ loading }) =>  'Print'}
//                 </PDFDownloadLink>
//                 <button
//                   onClick={() => setIsDeleteModalOpen(true)}
//                   className="ml-3 text-center text-white bg-red-500 hover:opacity-80 p-3 px-7 rounded-full"
//                 >
//                   Delete
//                 </button>
//                 <button
//                   onClick={handleEditClick}
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
//                     {invoice.invoiceId}
//                   </h1>
//                   <p className="text-sm text-gray-500 dark:text-gray-200">{invoice.clientName}</p>
//                 </div>
//                 <div className="mt-4 md:mt-0 text-left text-gray-400 dark:text-gray-200 text-sm md:text-right flex flex-col items-center">
//                   <p> {formatDate(invoice.selectDeliveryDate)}: تاريخ اليوم</p>
//                   <p>الوكالة الولائية للتسيير </p>
//                   <p>و التنظيم العقاريين الحضريين</p>
//                   <p>{invoice.Invoicenumber} :رقم الفاتورة </p>
//                   <p>029404129:رقم الهاتف</p>
//                 </div>
//               </div>

//               <div className="mt-10 w-full text-right">
//                 <h3 className="text-lg font-semibold mb-4 dark:text-white">:المعلومات الشخصية</h3>
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <p className="text-gray-500 dark:text-gray-200 font-thin">:إسم السيد/ة </p>
//                     <p className="dark:text-white text-bg text-black-500">{invoice.clientName}</p>
//                   </div>
//                   <div>
//                     <p className="text-gray-400 dark:text-gray-200 font-thin">:رقم الهاتف </p>
//                     <p className="dark:text-white">{invoice.clientPhone}</p>
//                   </div>
//                   <div>
//                     <p className="text-gray-500 dark:text-gray-200 font-thin">:عنوان المسكن</p>
//                     <p className="dark:text-white"> {invoice.clientStreet}</p>
//                   </div>
//                   <div>
//                     <p className="text-gray-500 dark:text-gray-200 font-thin">:حالة الدفع </p>
//                     <p className="dark:text-white">
//                       {invoice.clientstatus}
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               <div className="mt-3 w-full text-right">
//                 <h3 className="text-lg font-semibold mb-3 dark:text-white">:تفاصيل الدفع</h3>
//                 <div className="grid grid-cols-4 gap-6">
//                   <p className="text-gray-500 dark:text-gray-200 font-thin">المساحة</p>
//                   <p className="text-gray-500 dark:text-gray-200 font-thin">السعر الوحدوي</p>      
//                   <p className="text-gray-500 dark:text-gray-200 font-thin">القيمة المضافة %09</p>
//                   <p className="text-gray-500 dark:text-gray-200 font-thin">المجموع خارج الرسوم</p>
                  
//                   <p className="dark:text-white">{invoice.months}</p>
//                   <p className="dark:text-white">{invoice.price}</p>
//                   <p className="dark:text-white">{invoice.TVA}</p>
//                   <p className="dark:text-white">{invoice.total}</p>
                  
//                 </div>
//                 <div className="mt-3 border-4 border-gray-700 bg-gray-800 text-white text-xl p-4 rounded-lg shadow-lg">
//   <h2 className="text-center text-lg font-semibold"> {invoice.FinalP} : المجموع بكل الرسوم</h2>
//   {/* <div className="mt-2 text-center text-2xl">{invoice.FinalP}</div> */}
// </div>

//               </div>
//             </div>
//           </div>

//           <DeleteModal
//            isOpen={isDeleteModalOpen}
//            onClose={() => setIsDeleteModalOpen(false)} // Pass a function to handle closing
//            onDelete={onDeleteButtonClick}
//           />

//           {/* Render CreateInvoice component when isEditOpen is true */}
//           {isEditOpen && (
         
//             <CreateInvoice
//                 type="edit" // Pass type as "edit"
//                 invoice={invoice} // Pass the current invoice data for editing
//                 onClose={() => setIsEditOpen(false)} // Close the modal
//   />
//           )}
//         </motion.div>
//       </div>
//     </div>
//   );
// }

// export default InvoiceInfo;
















// // import React, { useEffect, useState, useRef } from 'react';
// // import { useParams, useNavigate } from 'react-router-dom';
// // import leftArrow from '../assets/icon-arrow-left.svg';
// // import { AnimatePresence, motion } from 'framer-motion';
// // import PaidStatus from './PaidStatus';
// // import { useDispatch } from 'react-redux';
// // import { updateInvoiceStatus } from '../redux/invoiceSlice';
// // import formatDate from '../function/formatDate';
// // import DeleteModal from './DeleteModal';
// // import CreateInvoice from './CreateInvoice';
// // import axios from 'axios';
// // import { useReactToPrint } from 'react-to-print';
// // import { PDFDownloadLink } from '@react-pdf/renderer';
// // import InvoicePDF from './InvoicePDF';

// // function InvoiceInfo() {
// //     const navigate = useNavigate();
// //     const { invoiceId } = useParams();
// //     const dispatch = useDispatch();
// //     const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
// //     const [isEditOpen, setIsEditOpen] = useState(false);
// //     const [invoice, setInvoice] = useState(null);
// //     const [error, setError] = useState(null);
// //     const componentRef = useRef();

// //     const onMakePaidClick = () => {
// //         dispatch(updateInvoiceStatus({ invoiceId, clientstatus: 'paid' }));
// //         fetchInvoice(); // Refetch the updated invoice
// //     };

// //     const fetchInvoice = () => {
// //         axios.get(`http://localhost:5000/api/invoices/${invoiceId}`)
// //             .then((response) => setInvoice(response.data))
// //             .catch((error) => setError(error.message)); // Handle errors
// //     };

// //     useEffect(() => {
// //         if (invoiceId) {
// //             fetchInvoice();
// //         }
// //     }, [invoiceId]);
// //     const handleCancel = () => {
// //         onClose();
// //       };

// //     const onDeleteButtonClick = async () => {
// //         try {
// //             await axios.delete(`http://localhost:5000/api/invoices/${invoiceId}`);
// //             navigate('/'); // Navigate after deletion
// //         } catch (error) {
// //             setError(error.message); // Handle errors
// //         }
// //     };

// //     const handleEditInvoice = async (updatedInvoice) => {
// //         try {
// //             await axios.put(`http://localhost:5000/api/invoices/${invoiceId}, updatedInvoice`);
// //             setInvoice(updatedInvoice);
// //             setIsEditOpen(false);
// //         } catch (error) {
// //             setError(error.message); // Handle errors
// //         }
// //     };

// //     const handlePrint = useReactToPrint({
// //         content: () => componentRef.current,
// //         documentTitle: `Invoice_${invoice?.invoiceId || ''}`
// //     });

// //     if (error) {
// //         return <div>Error: {error}</div>; // Render error message if there's an error
// //     }

// //     if (!invoice) {
// //         return <div>Loading...</div>; // Loading state
// //     }

// //     return (
// //         <div className="bg-[#FAEBCD] dark:bg-[#2B2B28] min-h-screen py-4 px-4 md:px-8 lg:px-16 flex justify-center">
// //             {isDeleteModalOpen && (
// //                 <DeleteModal
// //                     invoiceId={invoiceId}
// //                     onDeleteButtonClick={onDeleteButtonClick}
// //                     setIsDeleteModalOpen={setIsDeleteModalOpen}
// //                 />
// //             )}
// //             <AnimatePresence>
// //                 {isEditOpen && (
// //                      <CreateInvoice
// //                      invoice={invoice} // Pass the current invoice data for editing
// //                      onClose={() => setIsEditOpen(false)} // Close the modal when done
// //                    />
// //                 )}
// //             </AnimatePresence>
// //             <div className="invoice-container">
// //                 <motion.div
// //                     ref={componentRef}
// //                     key="invoice-info"
// //                     initial={{ x: 0 }}
// //                     animate={{ x: 0 }}
// //                     exit={{ x: '200%' }}
// //                     transition={{ duration: 0.5 }}
// //                     className="dark:bg-[#2B2B28] mx-auto duration-300 min-h-screen bg-[#FAEBCD] py-[34px] px-2 md:px-8 lg:px-12 max-w-3xl lg:py-[72px]"
// //                 >
// //                     <div>
// //                         <button onClick={() => navigate(-1)} className="flex items-center space-x-4 group dark:text-white font-thin">
// //                             <img src={leftArrow} alt="Go back" />
// //                             <p className="group-hover:opacity-80">Go back</p>
// //                         </button>
// //                         <div className="mt-8 rounded-lg w-full flex items-center justify-between px-6 py-6 bg-[white] dark:bg-[#4C3D3D]">
// //                             <div className="flex space-x-2 justify-between md:justify-start md:w-auto w-full items-center">
// //                                 <h1 className="text-gray-700 dark:text-gray-200">Status</h1>
// //                                 <PaidStatus status={invoice.clientstatus || 'pending'} />
// //                             </div>
// //                             <div className="md:block hidden">
// //                                 <PDFDownloadLink
// //                                     document={<InvoicePDF invoice={invoice} />}
// //                                     fileName={`Invoice_${invoice.invoiceId}.pdf`}
// //                                     className="ml-3 text-center text-white bg-gray-500 hover:opacity-80 p-3 px-7 rounded-full"
// //                                 >
// //                                     {({ loading }) => (loading ? 'Loading document...' : 'Print')}
// //                                 </PDFDownloadLink>
// //                                 <button
// //                                     onClick={() => setIsDeleteModalOpen(true)}
// //                                     className="ml-3 text-center text-white bg-red-500 hover:opacity-80 p-3 px-7 rounded-full"
// //                                 >
// //                                     Delete
// //                                 </button>
// //                                 <button
// //                                  onClick={() => setIsEditOpen(true)} // Open the edit modal
// //                                  className="ml-3 text-center text-white bg-blue-500 hover:opacity-80 p-3 px-7 rounded-full"
// //                                 >
// //                                    Edit
// //                                 </button>
// //                             </div>
// //                         </div>

// //                         <div className="mt-4 rounded-lg w-full px-6 py-6 bg-white dark:bg-[#4C3D3D]">
// //                             <div className="flex flex-col md:flex-row items-start justify-between w-full">
// //                                 <div>
// //                                     <h1 className="font-semibold dark:text-white text-xl">
// //                                         <span className="text-[#C07F00]">#</span>
// //                                         {invoice.invoiceId}
// //                                     </h1>
// //                                     <p className="text-sm text-gray-500 dark:text-gray-200">{invoice.clientName}</p>
// //                                 </div>
// //                                 <div className="mt-4 md:mt-0 text-left text-gray-400 dark:text-gray-200 text-sm md:text-right flex flex-col items-center">
// //                                     <p> {formatDate(invoice.selectDeliveryDate)}: تاريخ اليوم</p>
// //                                     <p>الوكالة الولائية للتسيير </p>
// //                                     <p>و التنظيم العقاريين الحضريين</p>
// //                                     <p>{invoice.Invoicenumber} :رقم الفاتورة </p>
// //                                     <p>029404129:رقم الهاتف</p>
// //                                 </div>
// //                             </div>

// //                             <div className="mt-10 w-full text-right">
// //                                 <h3 className="text-lg font-semibold mb-4 dark:text-white">:المعلومات الشخصية</h3>
// //                                 <div className="grid grid-cols-2 gap-4">
// //                                     <div>
// //                                         <p className="text-gray-500 dark:text-gray-200 font-thin">:إسم السيد/ة </p>
// //                                         <p className="dark:text-white text-bg text-black-500">{invoice.clientName}</p>
// //                                     </div>
// //                                     <div>
// //                                         <p className="text-gray-400 dark:text-gray-200 font-thin">:رقم الهاتف </p>
// //                                         <p className="dark:text-white">{invoice.clientPhone}</p>
// //                                     </div>
// //                                     <div>
// //                                         <p className="text-gray-500 dark:text-gray-200 font-thin">:عنوان المسكن</p>
// //                                         <p className="dark:text-white"> {invoice.clientStreet}</p>
// //                                     </div>
// //                                     <div>
// //                                         <p className="text-gray-500 dark:text-gray-200 font-thin">:حالة الدفع </p>
// //                                         <p className="dark:text-white">
// //                                              {invoice.clientstatus}
// //                                         </p>
// //                                     </div>
// //                                 </div>
// //                             </div>

// //                             <div className="mt-3 w-full text-right">
// //                                 <h3 className="text-lg font-semibold mb-3 dark:text-white">:تفاصيل الدفع</h3>
// //                                 <div className="grid grid-cols-5 gap-3">
// //                                     <p className="text-gray-500 dark:text-gray-200 font-thin">المساحة</p>
// //                                     <p className="text-gray-500 dark:text-gray-200 font-thin">السعر الوحدوي</p>      
// //                                     <p className="text-gray-500 dark:text-gray-200 font-thin">القيمة الإجمالية</p>
// //                                     <p className="text-gray-500 dark:text-gray-200 font-thin">مبلغ الطابع</p>
// //                                     <p className="text-gray-500 dark:text-gray-200 font-thin">السعر النهائي</p>
// //                                 </div>
// //                                 <div className="grid grid-cols-5 gap-3 text-right">
// //                                     <p className="dark:text-white">{invoice.months19}</p>
// //                                     <p className="dark:text-white">{invoice.price19}</p>
// //                                     <p className="dark:text-white">{invoice.total19}</p>
// //                                     <p className="dark:text-white">{invoice.stampmoney19}</p>
// //                                     <p className="dark:text-white">{invoice.FinalP19}</p>
// //                                 </div>
// //                             </div>
// //                         </div>
// //                     </div>
// //                 </motion.div>
// //             </div>
// //         </div>
// //     );
// // }

// // export default InvoiceInfo;














































































// // import React, { useEffect, useState } from 'react';
// // import { motion } from 'framer-motion';
// // import AddItem from './AddItem';
// // import { createInvoice } from '../redux/invoiceActions';
// // import { v4 as uuidv4 } from 'uuid';
// // import { useDispatch, useSelector } from 'react-redux';
// // import axios from 'axios'; // Import axios
// // import Select from 'react-select'
// // import {
// // validateInvoicenumber,
// // validateCLientPhone,
// // validateCLientName,
// // validateClientCity,
// // validateStatus,
// // validateClientStreetAddress,
// // validateItemCount,
// // validateItemCount1,
// // validateItemName,
// // validateItemPrice,
// // validateClientCountry,
// // } from '../function/createInvoiceValidator';

// // const CreateInvoice = ({ setOpenCreateInvoice, type, invoice }) => {
// // const dispatch = useDispatch();
// // const [isFirstLoad, setIsFirstLoad] = useState(true);
// // const [isValidatorActive, setIsValidatorActive] = useState(false);
// // const [isValid, setIsValid] = useState(true);
// // const [filterValue, setFilterValue] = useState('');
// // const deliveryTimes = [
// // { text: 'Next 1 months', value: 30 },
// // { text: 'Next 3 months', value: 93 },
// // { text: 'Next 6 months', value: 186 },
// // { text: 'Next 1 year', value: 372 },
// // ];
// // const STATUS = [
// //     {  label: 'pending', value:'pending'},
// //     {  label: 'paid' , value:'paid'},
// //     {  label: 'draft', value: 'draft' }
// //   ]
// // const [invoiceData, setInvoiceData] = useState({
// //     Invoicenumber: '',
// //     clientName: '',
// //     clientPhone: '',
// //     clientStreet: '',
// //     clientCity: '',
// //     clientstatus:'',
// //     clientCountry: '',
// //     description: '',
// //     selectDeliveryDate: '',
// //     selectDeliveryDatefrom: '',
// //     selectDeliveryDateto: '',
// //     paymentTerms: deliveryTimes[0].value,
// //     items: [
// //         {
// //             name: '',
// //             months: 1,
// //             Delay: 1,
// //             stampmoney: 0,
// //             TVA: 0,
// //             price: 0,
// //             total: 0,
// //             FinalP: 0,
// //             id: uuidv4(),
// //         },
// //     ],
// // });

// // const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     const formattedItems = invoiceData.items.map((item) => ({
// //         ...invoiceData,
// //         itemName: item.name,
// //         months: item.months,
// //         Delay: item.Delay,
// //         stampmoney: item.stampmoney,
// //         TVA: item.TVA,
// //         price: item.price,
// //         total: item.total,
// //         FinalP: item.FinalP,
// //     }));
// //     try {
// //         const response = await axios.post('http://localhost:5000/api/invoices', { formattedItems });
// //         console.log('Form submitted successfully:', response.data);
// //     } catch (error) {
// //         console.error('Error submitting form:', error);
// //     }
// // };

// // const onDelete = (id) => {
// //     setInvoiceData((prevData) => ({
// //         ...prevData,
// //         items: prevData.items.filter((item) => item.id !== id),
// //     }));
// // };

// // const handelOnChange = (id, e) => {
// //     let data = [...invoiceData.items];
// //     let foundData = data.find((el) => el.id === id);

// //     if (['months', 'Delay', 'price', 'total', 'stampmoney', 'TVA', 'FinalP'].includes(e.target.name)) {
// //         foundData[e.target.name] = e.target.value;
// //         foundData['total'] = (
// //             Number(foundData.months) * Number(foundData.price) +
// //             Number(foundData.months) * Number(foundData.price) * Number(foundData.Delay) * 0.05
// //         ).toFixed(2);
// //         foundData['stampmoney'] = (
// //             (Number(foundData.months) * Number(foundData.price) - 100) * 0.015 + 4.5
// //         ).toFixed(2);
// //         foundData['TVA'] = (Number(foundData.months) * Number(foundData.price) * 0.09).toFixed(2);
// //         foundData['FinalP'] = (
// //             Number(foundData.total) + Number(foundData.stampmoney) + Number(foundData.TVA)
// //         ).toFixed(2);
// //     } else {
// //         foundData[e.target.name] = e.target.value;
// //     }

// //     setInvoiceData((prevData) => ({ ...prevData, items: data }));
// // };

// // useEffect(() => {
// //     if (type === 'edit' && isFirstLoad) {
// //         const updatedItemsArray = invoice.items.map((obj, index) => ({ ...obj, id: index + 1 }));

// //         setInvoiceData({
// //             Invoicenumber: invoice.Invoicenumber,
// //             clientName: invoice.clientName,
// //             clientphone: invoice.clientPhone,
// //             clientStreet: invoice.clientAddress.street,
// //             clientCity: invoice.clientAddress.city,
// //             clientstatus: invoice.clientAddress.clientstatus,
// //             clientCountry: invoice.clientAddress.country,
// //             description: invoice.description,
// //             selectDeliveryDate: invoice.selectDeliveryDate,
// //             selectDeliveryDatefrom: invoice.selectDeliveryDatefrom,
// //             selectDeliveryDateto: invoice.selectDeliveryDateto,
// //             paymentTerms: invoice.paymentTerms,
// //             items: updatedItemsArray,
// //         });

// //         setIsFirstLoad(false);
// //     }
// // }, [invoice, isFirstLoad, type]);

// // function itemsValidator() {
// //     const itemName = invoiceData.items.map((i) => validateItemName(i.name));
// //     const itemCount1 = invoiceData.items.map((i) => validateItemCount1(i.months));
// //     const itemCount = invoiceData.items.map((i) => validateItemCount(i.Delay));
// //     const itemPrice = invoiceData.items.map((i) => validateItemPrice(i.price));
// //     const allItemsElement = itemName.concat(itemCount1, itemPrice);
// //     return !allItemsElement.includes(false);
// // }

// // function validator() {
// //     return (
// //         validateCLientPhone(invoiceData.clientPhone) &&
// //         validateCLientName(invoiceData.clientName) &&
// //         validateInvoicenumber(invoiceData.Invoicenumber) &&
// //         validateClientCity(invoiceData.clientCity) &&
// //         validateStatus(invoiceData.clientstatus) &&
// //         validateClientStreetAddress(invoiceData.clientStreet) &&
// //         validateClientCountry(invoiceData.clientCountry) &&
// //         itemsValidator()
// //     );
// // }

// // return (
// //     <form >
// //     <div
// //     onClick={(e) => {
// //     if (e.target !== e.currentTarget) {
// //     return;
// //     }
// //     setOpenCreateInvoice(false);
// //     }}
// //     className='fixed top-0 bottom-0 left-0 right-0 bg-[#000005be]'>
// //          <motion.div
// //             key='createInvoice-sidebar'
// //             initial={{ x: -500, opacity: 0 }}
// //             animate={{ opacity: 1, x: 0, transition: { type: 'spring', stiffness: 300, damping: 40, duration: 0.4 } }}
// //             exit={{ x: -700, transition: { duration: 0.2 } }}
// //             className='scrollbar-hide flex flex-col dark:text-white dark:bg-[#434343] bg-white md:pl-[150px] py-16 px-6 h-screen md:w-[768px] md:rounded-r-3xl' >
       
// //             <h1 className='font-semibold dark:text-white text-3xl'>
// //                 {type === 'edit' ? 'Edit' : 'Create'} Invoice
// //             </h1>

// //             <div className='overflow-y-scroll scrollbar-hide my-14'>
// //                 <div className='grid grid-cols-1 mx-1 space-y-4'>
// //                     <div className='flex flex-col mr-4 col-span-1'>
// //                         <label className='text-Black-400 font-light'>Invoice Number</label>
// //                         <input
// //                             type='text'
// //                             id='Invoicenumber'
// //                             value={invoiceData.Invoicenumber}
// //                             onChange={(e) => setInvoiceData((prev) => ({ ...prev, Invoicenumber: e.target.value }))}
// //                             className={`dark:bg-[#FAEBCD] py-2 px-4 dark:text-black border-[.2px] max-w-[400px] focus:outline-none rounded-lg focus:outline-yellow-400 border-gray-300 ${
// //                                 isValidatorActive && !validateInvoicenumber(invoiceData.Invoicenumber) && 'border-red-500 dark:border-red-500 outline-red-500 border-2'
// //                             } dark:border-gray-800`}
// //                         />
// //                     </div>

// //                     <div className='flex flex-col mr-4 col-span-2'>
// //                         <label className='text-Black-400 font-light'>Client's Name</label>
// //                         <input
// //                             type='text'
// //                             id='ClientsName'
// //                             value={invoiceData.clientName}
// //                             onChange={(e) => setInvoiceData((prev) => ({ ...prev, clientName: e.target.value }))}
// //                             className={`dark:bg-[#FAEBCD] py-2 px-4 dark:text-black border-[.2px] max-w-[400px] focus:outline-none rounded-lg focus:outline-yellow-400 border-gray-300 ${
// //                                 isValidatorActive && !validateCLientName(invoiceData.clientName) && 'border-red-500 dark:border-red-500 outline-red-500 border-2'
// //                             } dark:border-gray-800`}
// //                         />
// //                     </div>

// //                     <div className='flex flex-col mr-4 col-span-2'>
// //                         <label className='text-Black-400 font-light'>Client's Phone</label>
// //                         <input
// //                             type='phone'
// //                             id='clientsPhone'
// //                             value={invoiceData.clientPhone}
// //                             onChange={(e) => setInvoiceData((prev) => ({ ...prev, clientPhone: e.target.value }))}
// //                             className={`dark:bg-[#FAEBCD] py-2 px-4 dark:text-black border-[.2px] max-w-[400px] focus:outline-none rounded-lg focus:outline-yellow-400 border-gray-300 ${
// //                                 isValidatorActive && !validateCLientPhone(invoiceData.clientPhone) && 'border-red-500 dark:border-red-500 outline-red-500 border-2'
// //                             } dark:border-gray-800`}
// //                         />
// //                     </div>

// //                     <div className='flex flex-col mr-4 col-span-2'>
// //                         <label className='text-Black-400 font-light'>Client's Street Address</label>
// //                         <input
// //                             type='text'
// //                             id='streetaddress'
// //                             value={invoiceData.clientStreet}
// //                             onChange={(e) => setInvoiceData((prev) => ({ ...prev, clientStreet: e.target.value }))}
// //                             className={`dark:bg-[#FAEBCD] py-2 px-4 dark:text-black border-[.2px] max-w-[400px] focus:outline-none rounded-lg focus:outline-yellow-400 border-gray-300 ${
// //                                 isValidatorActive && !validateClientStreetAddress(invoiceData.clientStreet) && 'border-red-500 dark:border-red-500 outline-red-500 border-2'
// //                             } dark:border-gray-800`}
// //                         />
// //                     </div>

// //                     <div className='flex flex-col mr-4 col-span-2'>
// //                         <label className='text-Black-400 font-light'>Client's City</label>
// //                         <input
// //                             type='text'
// //                             id='city'
// //                             value={invoiceData.clientCity}
// //                             onChange={(e) => setInvoiceData((prev) => ({ ...prev, clientCity: e.target.value }))}
// //                             className={`dark:bg-[#FAEBCD] py-2 px-4 dark:text-black border-[.2px] max-w-[400px] focus:outline-none rounded-lg focus:outline-yellow-400 border-gray-300 ${
// //                                 isValidatorActive && !validateClientCity(invoiceData.clientCity) && 'border-red-500 dark:border-red-500 outline-red-500 border-2'
// //                             } dark:border-gray-800`}
// //                         />
// //                     </div>

// //                     <div className='flex flex-col mr-4 col-span-2'>
// //                 <label className='text-Black-400 font-light'>Client's Status</label>
// //                 <Select
// //                   id='clientstatus'
// //                   options={STATUS}
// //                   onChange={(selectedOption) =>
// //                     setInvoiceData((prev) => ({
// //                       ...prev,
// //                       clientstatus: selectedOption.value,
// //                     }))
// //                   }
// //                   className={`dark:bg-[#FAEBCD] py-2 px-4 dark:text-black border-[.2px] max-w-[400px] focus:outline-none rounded-lg focus:outline-yellow-400 border-gray-300 dark:border-gray-800 ${
// //                     isValidatorActive && !validateStatus(invoiceData.clientstatus) && 'border-red-500 dark:border-red-500 outline-red-500 border-2'
// //                   } dark:border-gray-800`}
// //                 />
// //               </div>

// //                     <div className='flex flex-col mr-4 col-span-2'>
// //                         <label className='text-Black-400 font-light'>Client's Country</label>
// //                         <input
// //                             type='text'
// //                             id='country'
// //                             value={invoiceData.clientCountry}
// //                             onChange={(e) => setInvoiceData((prev) => ({ ...prev, clientCountry: e.target.value }))}
// //                             className={`dark:bg-[#FAEBCD] py-2 px-4 dark:text-black border-[.2px] max-w-[400px] focus:outline-none rounded-lg focus:outline-yellow-400 border-gray-300 ${
// //                                 isValidatorActive && !validateClientCountry(invoiceData.clientCountry) && 'border-red-500 dark:border-red-500 outline-red-500 border-2'
// //                             } dark:border-gray-800`}
// //                         />
// //                     </div>

// //                     <div className='flex flex-col mr-4 col-span-2'>
// //                         <label className='text-Black-400 font-light'>Description</label>
// //                         <textarea
// //                         id='description'
// //                             value={invoiceData.description}
// //                             onChange={(e) => setInvoiceData((prev) => ({ ...prev, description: e.target.value }))}
// //                             className='dark:bg-[#FAEBCD] py-2 px-4 dark:text-black border-[.2px] max-w-[400px] focus:outline-none rounded-lg focus:outline-yellow-400 border-gray-300 dark:border-gray-800'
// //                             rows='5'
// //                         />
// //                     </div>

// //                     {/* <div className='flex flex-col mr-4 col-span-2'>
// //                         <label className='text-Black-400 font-light'>Payment Terms</label>
// //                         <select
// //                             value={invoiceData.paymentTerms}
// //                             onChange={(e) => setInvoiceData((prev) => ({ ...prev, paymentTerms: e.target.value }))}
// //                             className='dark:bg-[#32407B] py-2 px-4 border-[.2px] max-w-[400px] focus:outline-none rounded-lg focus:outline-blue-400 border-gray-300 dark:border-gray-800'
// //                         >
// //                             {deliveryTimes.map((term) => (
// //                                 <option key={term.value} value={term.value}>
// //                                     {term.text}
// //                                 </option>
// //                             ))}
// //                         </select>
// //                     </div> */}

// //                     <div className='flex flex-col mr-4 col-span-2'>
// //                         <label className='text-Black-400 font-light'>Select Delivery Date</label>
// //                         <input
// //                             type='date'
// //                             id='date1'
// //                             value={invoiceData.selectDeliveryDate}
// //                             onChange={(e) => setInvoiceData((prev) => ({ ...prev, selectDeliveryDate: e.target.value }))}
// //                             className='dark:bg-[#FAEBCD] py-2 px-4 dark:text-black border-[.2px] max-w-[400px] focus:outline-none rounded-lg focus:outline-yellow-400 border-gray-300 dark:border-gray-800'
// //                         />
// //                     </div>

// //                     <div className='flex flex-col mr-4 col-span-2'>
// //                         <label className='text-Black-400 font-light'>Select Delivery Date From</label>
// //                         <input
// //                             type='date'
// //                             id='dateto'
// //                             value={invoiceData.selectDeliveryDatefrom}
// //                             onChange={(e) => setInvoiceData((prev) => ({ ...prev, selectDeliveryDatefrom: e.target.value }))}
// //                             className='dark:bg-[#FAEBCD] py-2 px-4 dark:text-black border-[.2px] max-w-[400px] focus:outline-none rounded-lg focus:outline-yellow-400 border-gray-300 dark:border-gray-800'
// //                         />
// //                     </div>

// //                     <div className='flex flex-col mr-4 col-span-2'>
// //                         <label className='text-Black-400 font-light'>Select Delivery Date To</label>
// //                         <input
// //                             type='date'
// //                             id='datefrom'
// //                             value={invoiceData.selectDeliveryDateto}
// //                             onChange={(e) => setInvoiceData((prev) => ({ ...prev, selectDeliveryDateto: e.target.value }))}
// //                             className='dark:bg-[#FAEBCD] py-2 px-4 dark:text-black border-[.2px] max-w-[400px] focus:outline-none rounded-lg focus:outline-yellow-400 border-gray-300 dark:border-gray-800'
// //                         />
// //                     </div>
// //                 </div>

// //                 <div className='my-4'>
// //                     <h2 className='text-Black-400 font-light text-lg'>Invoice Items</h2>

// //                     {invoiceData.items.map((itemDetails, index) => (
// //                         <AddItem
// //                             key={itemDetails.id}
// //                             itemDetails={itemDetails}
// //                             setItem={setInvoiceData}
// //                             isValidatorActive={isValidatorActive}
// //                             onDelete={onDelete}
// //                             handelOnChange={handelOnChange}
// //                         />
// //                     ))}

// //                     <button
// //                         onClick={() => {
// //                             setInvoiceData((prevData) => ({
// //                                 ...prevData,
// //                                 items: [
// //                                     ...prevData.items,
// //                                     {
// //                                         name: '',
// //                                         months: 1,
// //                                         Delay: 1,
// //                                         stampmoney: 0,
// //                                         TVA: 0,
// //                                         price: 0,
// //                                         total: 0,
// //                                         FinalP: 0,
// //                                         id: uuidv4(),
// //                                     },
// //                                 ],
// //                             }));
// //                         }}
// //                         className='mt-4 bg-[#C07F00] hover:bg-[#4C3D3D] text-white font-bold py-2 px-4 rounded'
// //                     >
// //                         Add Item
// //                     </button>
// //                 </div>
// //             </div>

// //             <div className='flex justify-between'>
// //                 <button
// //                     onClick={() => setOpenCreateInvoice(false)}
// //                     className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded'
// //                 >
// //                     Cancel
// //                 </button>
                
// //                 <button
// //                    type="submit"
// //                    onClick={handleSubmit}
                   
// //                    className='bg-[#C07F00] hover:bg-[#4C3D3D] text-white font-bold py-2 px-4 rounded'
// //                 >
// //                         Save
// //                 </button>
       
// //             </div>
// //         </motion.div>
// //     </div>
// //    </form>
// // );
// // }

// // export default CreateInvoice; 



// import React, { useEffect, useState, useRef } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import leftArrow from '../assets/icon-arrow-left.svg';
// import { AnimatePresence, motion } from 'framer-motion';
// import PaidStatus from './PaidStatus';
// import { useDispatch } from 'react-redux';
// import axios from 'axios';
// import formatDate from '../function/formatDate';
// import DeleteModal from './DeleteModal';
// import CreateInvoice2 from './CreateInvoice2';
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
//     const backendUrl = process.env.REACT_APP_BACKEND_URL;
//     axios
//       .get(`${backendUrl}/api/invoices19/${Id}`)
//       .then((response) => {
//         setInvoice(response.data);
//       })
//       .catch((error) => {
//         console.error('Error fetching invoice:', error);
//       });
//   };


//   const handleEditClick = () => {
//     setIsEditOpen(true); // Open the edit modal
//   };

//   useEffect(() => {
//     if (Id) {
//       fetchInvoice();
//     }
//   }, [Id]);

//   const onDeleteButtonClick = async () => {
//     const backendUrl = process.env.REACT_APP_BACKEND_URL;
//     try {
//       await axios.delete(`${backendUrl}/api/invoices19/${Id}`);
//       navigate('/center'); // Navigate back to the correct route after deletion
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
//               <PDFDownloadLink
//                   document={<InvoicePDF2 invoice={invoice} />}
//                   fileName={`Invoice_${invoice.Id}.pdf`}
//                   className="ml-3 text-center text-white bg-gray-500 hover:opacity-80 p-3 px-7 rounded-full"
//                 >
//                   {({ loading }) =>  'Print'}
//                 </PDFDownloadLink>
//                 <button
//                   onClick={() => setIsDeleteModalOpen(true)}
//                   className="ml-3 text-center text-white bg-red-500 hover:opacity-80 p-3 px-7 rounded-full"
//                 >
//                   Delete
//                 </button>
//                 <button
//                   onClick={handleEditClick}
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
//                 <div className="grid grid-cols-4 gap-6">
//                   <p className="text-gray-500 dark:text-gray-200 font-thin">المساحة</p>
//                   <p className="text-gray-500 dark:text-gray-200 font-thin">السعر الوحدوي</p>      
//                   <p className="text-gray-500 dark:text-gray-200 font-thin">القيمة المضافة %09</p>
//                   <p className="text-gray-500 dark:text-gray-200 font-thin">المجموع خارج الرسوم</p>
                 
//                   <p className="dark:text-white">{invoice.months19}</p>
//                   <p className="dark:text-white">{invoice.price19}</p>
//                   <p className="dark:text-white">{invoice.TV19}</p>
//                   <p className="dark:text-white">{invoice.total19}</p>
                  
//                 </div>
//                 <div className="mt-3 border-4 border-gray-700 bg-gray-800 text-white text-xl p-4 rounded-lg shadow-lg">
//   <h2 className="text-center text-lg font-semibold"> {invoice.FinalP19} : المجموع بكل الرسوم</h2>
//   {/* <div className="mt-2 text-center text-2xl">{invoice.FinalP}</div> */}
// </div>
//               </div>
//             </div>
//           </div>

//           <DeleteModal
//            isOpen={isDeleteModalOpen}
//            onClose={() => setIsDeleteModalOpen(false)} // Pass a function to handle closing
//            onDelete={onDeleteButtonClick}
//           />

//           {/* Render CreateInvoice component when isEditOpen is true */}
//           {isEditOpen && (
//             // <CreateInvoice
//             //   isEditMode={true}
//             //   invoiceData={invoice} // Pass the current invoice data for editing
//             //   onClose={() => setIsEditOpen(false)} // Close the modal
//             //   onSave={(updatedInvoice) => {
//             //     // Handle saving the updated invoice here
//             //     // For example, you might want to send a PUT request to update the invoice
//             //     axios.put(`http://localhost:5000/api/invoices/${invoiceId}`, updatedInvoice)
//             //       .then((response) => {
//             //         setInvoice(response.data);
//             //         setIsEditOpen(false); // Close the edit modal
//             //       })
//             //       .catch((error) => {
//             //         console.error('Error updating invoice:', error);
//             //       });
//             //   }}
//             // />
//             <CreateInvoice2
//                 type="edit" // Pass type as "edit"
//                 invoice={invoice} // Pass the current invoice data for editing
//                 onClose={() => setIsEditOpen(false)} // Close the modal
//   />
//           )}
//         </motion.div>
//       </div>
//     </div>
//   );
// }

// export default InvoiceInfo2;













// // import React, { useEffect, useState, useRef } from 'react';
// // import { useParams, useNavigate } from 'react-router-dom';
// // import leftArrow from '../assets/icon-arrow-left.svg';
// // import { AnimatePresence, motion } from 'framer-motion';
// // import PaidStatus from './PaidStatus';
// // import { useDispatch } from 'react-redux';
// // import { updateInvoiceStatus } from '../redux/invoiceSlice';
// // import formatDate from '../function/formatDate';
// // import DeleteModal from './DeleteModal';
// // import CreateInvoice2 from './CreateInvoice2';
// // import axios from 'axios';
// // import { useReactToPrint } from 'react-to-print';
// // import { PDFDownloadLink } from '@react-pdf/renderer';
// // import InvoicePDF2 from './InvoicePDF2';

// // function InvoiceInfo2() {
// //   const navigate = useNavigate();
// //   const { Id } = useParams();
// //   const dispatch = useDispatch();
// //   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
// //   const [isEditOpen, setIsEditOpen] = useState(false);
// //   const [invoice, setInvoice] = useState(null);
// //   const componentRef = useRef();

// //   const fetchInvoice = () => {
// //     axios
// //       .get(`http://localhost:5000/api/invoices19/${Id}`)
// //       .then((response) => {
// //         setInvoice(response.data);
// //       })
// //       .catch((error) => {
// //         console.error('Error fetching invoice:', error);
// //       });
// //   };

// //   useEffect(() => {
// //     if (Id) {
// //       fetchInvoice();
// //     }
// //   }, [Id]);

// //   const onDeleteButtonClick = async () => {
// //     try {
// //       await axios.delete(`http://localhost:5000/api/invoices19/${Id}`);
// //       navigate('/center2'); // Navigate back to the correct route after deletion
// //     } catch (error) {
// //       console.error("Error deleting the invoice:", error);
// //     }
// //   };

// //   const handlePrint = useReactToPrint({
// //     content: () => componentRef.current,
// //     documentTitle: `Invoice_${invoice?.Id || ''}`
// //   });

// //   if (!invoice) {
// //     return <div>Loading...</div>; // Render a loading state if the invoice is not yet loaded
// //   }

// //   return (
// //     <div className="bg-[#FAEBCD] dark:bg-[#2B2B28] min-h-screen py-4 px-4 md:px-8 lg:px-16 flex justify-center">
// //       <div className="invoice-container">
// //         <motion.div
// //           ref={componentRef}
// //           key="invoice-info"
// //           initial={{ x: 0 }}
// //           animate={{ x: 0 }}
// //           exit={{ x: '200%' }}
// //           transition={{ duration: 0.5 }}
// //           className="dark:bg-[#2B2B28] mx-auto duration-300 min-h-screen bg-[#FAEBCD] py-[34px] px-2 md:px-8 lg:px-12 max-w-3xl lg:py-[72px]"
// //         >
// //           <div>
// //             <button onClick={() => navigate(-1)} className="flex items-center space-x-4 group dark:text-white font-thin">
// //               <img src={leftArrow} alt="Go back" />
// //               <p className="group-hover:opacity-80">Go back</p>
// //             </button>

// //             <div className="mt-8 rounded-lg w-full flex items-center justify-between px-6 py-6 bg-white dark:bg-[#4C3D3D]">
// //               <div className="flex space-x-2 justify-between md:justify-start md:w-auto w-full items-center">
// //                 <h1 className="text-gray-600 dark:text-gray-200">Status</h1>
// //                 <PaidStatus status={invoice.clientstatus19 || 'pending'} />
// //               </div>
// //               <div className="md:block hidden">
// //                 <PDFDownloadLink
// //                   document={<InvoicePDF2 invoice={invoice} />}
// //                   fileName={`Invoice_${invoice.Id}.pdf`}
// //                   className="ml-3 text-center text-white bg-gray-500 hover:opacity-80 p-3 px-7 rounded-full"
// //                 >
// //                   {({ loading }) => (loading ? 'Loading document...' : 'Print')}
// //                 </PDFDownloadLink>
// //                 <button
// //                   onClick={() => setIsDeleteModalOpen(true)}
// //                   className="ml-3 text-center text-white bg-red-500 hover:opacity-80 p-3 px-7 rounded-full"
// //                 >
// //                   Delete
// //                 </button>
// //                 <button
// //                   onClick={() => setIsEditOpen(true)} // Open the edit modal
// //                   className="ml-3 text-center text-white bg-blue-500 hover:opacity-80 p-3 px-7 rounded-full"
// //                 >
// //                   Edit
// //                 </button>
// //               </div>
// //             </div>

// //             <div className="mt-4 rounded-lg w-full px-6 py-6 bg-white dark:bg-[#4C3D3D]">
// //               <div className="flex flex-col md:flex-row items-start justify-between w-full">
// //                 <div>
// //                   <h1 className="font-semibold dark:text-white text-xl">
// //                     <span className="text-[#C07F00]">#</span>
// //                     {invoice.Id}
// //                   </h1>
// //                   <p className="text-sm text-gray-500 dark:text-gray-200">{invoice.clientName19}</p>
// //                 </div>
// //                 <div className="mt-4 md:mt-0 text-left text-gray-400 dark:text-gray-200 text-sm md:text-right flex flex-col items-center">
// //                   <p> {formatDate(invoice.selectDeliveryDate19)}: تاريخ اليوم</p>
// //                   <p>الوكالة الولائية للتسيير </p>
// //                   <p>و التنظيم العقاريين الحضريين</p>
// //                   <p>{invoice.Invoicenumber19} :رقم الفاتورة </p>
// //                   <p>029404129:رقم الهاتف</p>
// //                 </div>
// //               </div>

// //               <div className="mt-10 w-full text-right">
// //                 <h3 className="text-lg font-semibold mb-4 dark:text-white">:المعلومات الشخصية</h3>
// //                 <div className="grid grid-cols-2 gap-4">
// //                   <div>
// //                     <p className="text-gray-500 dark:text-gray-200 font-thin">:إسم السيد/ة </p>
// //                     <p className="dark:text-white text-bg text-black-500">{invoice.clientName19}</p>
// //                   </div>
// //                   <div>
// //                     <p className="text-gray-400 dark:text-gray-200 font-thin">:رقم الهاتف </p>
// //                     <p className="dark:text-white">{invoice.clientPhone19}</p>
// //                   </div>
// //                   <div>
// //                     <p className="text-gray-500 dark:text-gray-200 font-thin">:عنوان المسكن</p>
// //                     <p className="dark:text-white"> {invoice.clientStreet19}</p>
// //                   </div>
// //                   <div>
// //                     <p className="text-gray-500 dark:text-gray-200 font-thin">:حالة الدفع </p>
// //                     <p className="dark:text-white">
// //                       {invoice.clientstatus19}
// //                     </p>
// //                   </div>
// //                 </div>
// //               </div>

// //               <div className="mt-3 w-full text-right">
// //                 <h3 className="text-lg font-semibold mb-3 dark:text-white">:تفاصيل الدفع</h3>
// //                 <div className="grid grid-cols-5 gap-3">
// //                   <p className="text-gray-500 dark:text-gray-200 font-thin">المساحة</p>
// //                   <p className="text-gray-500 dark:text-gray-200 font-thin">السعر الوحدوي</p>      
// //                   <p className="text-gray-500 dark:text-gray-200 font-thin">القيمة المضافة %09</p>
// //                   <p className="text-gray-500 dark:text-gray-200 font-thin">المجموع خارج الرسوم</p>
// //                   <p className="text-gray-500 dark:text-gray-200 font-thin">المجموع بكل الرسوم</p>
// //                   <p className="dark:text-white">{invoice.months19}</p>
// //                   <p className="dark:text-white">{invoice.price19}</p>
// //                   <p className="dark:text-white">{invoice.TVA19}</p>
// //                   <p className="dark:text-white">{invoice.total19}</p>
// //                   <p className="dark:text-white">{invoice.FinalP19}</p>
// //                 </div>
// //                 <div className='  p-3 font-semibold 
// //                   text-white rounded-lg rounded-t-none 
// //                   justify-between flex dark:bg-black 
// //                   bg-[#4C3D3D] dark:text-gray-200 '>
// //                   <h1 className=' text-left text-3xl'>
// //                     {invoice.FinalP19}
// //                   </h1>
// //                   <h3 className=' text-right text-xl '>
// //                   :المجموع بكل الرسوم  
// //                   </h3>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </motion.div>
// //         <AnimatePresence>
// //           {isDeleteModalOpen && (
// //           <DeleteModal
// //           key="delete-modal"
// //           invoiceId={Id}
// //           onDelete={() => {
// //           setIsDeleteModalOpen(false);
// //           onDeleteButtonClick();
// //          }}
// //           setIsDeleteModalOpen={setIsDeleteModalOpen}
// //          />
// //          )}
// //         </AnimatePresence>
// //         {/* Render CreateInvoice2 for editing when isEditOpen is true */}
// //         <AnimatePresence>
// //           {isEditOpen && (
// //             <motion.div
// //               key="edit-modal"
// //               initial={{ opacity: 0 }}
// //               animate={{ opacity: 1 }}
// //               exit={{ opacity: 0 }}
// //             >
// //                <CreateInvoice2
// //         invoice={invoice} // Pass the current invoice data for editing
// //         onClose={() => setIsEditOpen(false)} // Close the modal when done
// //       />
// //             </motion.div>
// //           )}
// //         </AnimatePresence>
// //       </div>
// //     </div>
// //   );
// // }

// // export default InvoiceInfo2;
