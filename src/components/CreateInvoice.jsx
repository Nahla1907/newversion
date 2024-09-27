import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import AddItem from './AddItem';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Select from 'react-select';
import { v4 as uuidv4 } from 'uuid';
import {
  validateInvoicenumber,
  validateCLientPhone,
  validateCLientName,
  validateClientCity,
  validateStatus,
  validateClientStreetAddress,
  validateItemName,
  validateItemPrice,
  validateClientCountry,
} from '../function/createInvoiceValidator';

const CreateInvoice = ({ setOpenCreateInvoice, type, invoice, onClose, isEditMode }) => {
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [isValidatorActive, setIsValidatorActive] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const deliveryTimes = [
    { text: 'Next 1 month', value: 30 },
    { text: 'Next 3 months', value: 93 },
    { text: 'Next 6 months', value: 186 },
    { text: 'Next 1 year', value: 372 },
  ];

  const STATUS = [
    { label: 'غير مكتمل', value: 'pending' },
    { label: 'مكتمل', value: 'paid' },
    { label: 'حالة خاصة', value: 'draft' },
  ];

  const [invoiceData, setInvoiceData] = useState({
    Invoicenumber: '',
    clientName: '',
    clientPhone: '',
    clientStreet: '',
    clientCity: '',
    clientstatus: '',
    clientCountry: '',
    description: '',
    selectDeliveryDate: '',
    selectDeliveryDatefrom: '',
    selectDeliveryDateto: '',
    paymentTerms:'',
    items: [
      {
        itemName: '',
        months: 1,
        Delay: 0,
        price: 0,
        total: 0,
        stampmoney: 0,
        TVA: 0,
        new1: 0,
        new2: 0,
        new3: 0,
        FinalP: 0,
        id: uuidv4(),
      },
    ],
  });

  // Load invoice data for edit mode
  useEffect(() => {
    if (type === 'edit' && isFirstLoad && invoice) {
      setInvoiceData({
        ...invoice,
        items: invoice.items || [], // Ensure items is an array
      });
      setIsFirstLoad(false);
    }
  }, [invoice, isFirstLoad, type]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setInvoiceData((prev) => ({ ...prev, [id]: value }));
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setIsLoading(true); // Set loading state

  //   // if (!validator()) {

  //   //   setIsValidatorActive(true);
  //   //   setIsValid(false);
  //   //   setIsLoading(false);
  //   //   return;
  //   // }

  //   // const formattedItems = invoiceData.items.map((item) => ({
  //   //   Invoicenumber: invoiceData.Invoicenumber,
  //   //   clientName: invoiceData.clientName,
  //   //   clientPhone: invoiceData.clientPhone,
  //   //   clientStreet: invoiceData.clientStreet,
  //   //   clientCity: invoiceData.clientCity,
  //   //   clientstatus: invoiceData.clientstatus,
  //   //   clientCountry: invoiceData.clientCountry,
  //   //   description: invoiceData.description,
  //   //   selectDeliveryDate: invoiceData.selectDeliveryDate,
  //   //   selectDeliveryDatefrom: invoiceData.selectDeliveryDatefrom,
  //   //   selectDeliveryDateto: invoiceData.selectDeliveryDateto,
  //   //   paymentTerms: invoiceData.paymentTerms,
  //   //   FinalP: invoiceData.FinalP,
  //   //   items: invoiceData.items.map((item) => ({
  //   //     itemName: item.itemName,
  //   //     months: item.months,
  //   //     Delay: item.Delay,
  //   //     price: item.price,
  //   //     total: item.total,
  //   //     stampmoney: item.stampmoney,
  //   //     TVA: item.TVA,
  //   //     new1: item.new1,
  //   //     new2: item.new2,
  //   //     new3: item.new3,
  //   //     FinalP: item.FinalP,
  //   //   })),
  //   // }));
    
  //   const formattedItems = invoiceData.items.map((item) => ({
  //     Invoicenumber: invoiceData.Invoicenumber || 'N/A',
  //     clientName: invoiceData.clientName || 'N/A',
  //     clientPhone: invoiceData.clientPhone || 'N/A',
  //     clientStreet: invoiceData.clientStreet || 'N/A',
  //     clientCity: invoiceData.clientCity || 'N/A',
  //     clientstatus: invoiceData.clientstatus || 'N/A',
  //     clientCountry: invoiceData.clientCountry || 'N/A',
  //     description: invoiceData.description || 'N/A',
  //     selectDeliveryDate: invoiceData.selectDeliveryDate || new Date(),
  //     selectDeliveryDatefrom: invoiceData.selectDeliveryDatefrom || new Date(),
  //     selectDeliveryDateto: invoiceData.selectDeliveryDateto || new Date(),
  //     paymentTerms: invoiceData.paymentTerms || 'N/A',
  //     FinalP: invoiceData.FinalP || '0.00',
  //     items: invoiceData.items.map((item) => ({
  //       itemName: item.itemName || 'N/A',
  //       months: item.months || 0,
  //       Delay: item.Delay || 0,
  //       price: item.price || '0.00',
  //       total: item.total || '0.00',
  //       stampmoney: item.stampmoney || '0.00',
  //       TVA: item.TVA || '0.00',
  //       new1: item.new1 || '0',
  //       new2: item.new2 || '0',
  //       new3: item.new3 || '0',
  //       FinalP: item.FinalP || '0.00',
  //     })),
  //      }));

  //   try {
  //     console.log("Invoice ID:", invoice);

  //     if (type === 'edit') {
  //       await axios.put(`http://localhost:5000/api/invoices/${invoice.invoiveId}`, { formattedItems });
  //       console.log('Invoice edited successfully');
        
  //     } else {
  //       const response = await axios.post('http://localhost:5000/api/invoices', { formattedItems });
  //       console.log('Invoice added successfully:', response.data);
  //     }
  //     onClose();
  //   } catch (error) {
  //     console.error('Error submitting form:', error);
  //   } finally {
  //     setIsLoading(false); // Reset loading state
  //   }
   
  // };
 
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading state

    // if (!validator()) {
    //   setIsValidatorActive(true);
    //   setIsValid(false);
    //   setIsLoading(false);
    //   return;
    // }

    const formattedItems = invoiceData.items.map((item) => ({
      Invoicenumber: invoiceData.Invoicenumber,
      clientName: invoiceData.clientName,
      clientPhone: invoiceData.clientPhone,
      clientStreet: invoiceData.clientStreet,
      clientCity: invoiceData.clientCity,
      clientstatus: invoiceData.clientstatus,
      clientCountry: invoiceData.clientCountry,
      description: invoiceData.description,
      selectDeliveryDate: invoiceData.selectDeliveryDate,
      selectDeliveryDatefrom: invoiceData.selectDeliveryDatefrom,
      selectDeliveryDateto: invoiceData.selectDeliveryDateto,
      paymentTerms: invoiceData.paymentTerms,
      FinalP: invoiceData.FinalP,
      items: invoiceData.items.map((item) => ({
        itemName: item.itemName,
        months: item.months,
        Delay: item.Delay,
        price: item.price,
        total: item.total,
        stampmoney: item.stampmoney,
        TVA: item.TVA,
        
        FinalP: item.FinalP,
      })),
    }));

    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL;
      if (type === 'edit') {
        await axios.post(`${backendUrl}/api/invoices/${invoice.invoiceId}`, { formattedItems });
        console.log('Invoice edited successfully');
      } else {
        const response = await axios.post(`${backendUrl}/api/invoices`, { formattedItems });
        console.log('Invoice added successfully:', response.data);
      }
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };
// Separate function to handle editing an invoice
const editInvoice = async (invoiceId, formattedItems) => {
  if (formattedItems.length === 0) {
      console.error('No items to update for invoice:', invoiceId);
      return;
  }

  await axios.put(`http://localhost:5000/api/invoices/${invoiceId}`, { formattedItems });
  console.log('Invoice edited successfully');
};
// Helper function to format items
const formatItems = (items) => {
  return items.map((item) => ({
      itemName: item.itemName,
      months: item.months,
      Delay: item.Delay,
      price: item.price,
      total: item.total,
      stampmoney: item.stampmoney,
      TVA: item.TVA,
      FinalP: item.FinalP,
  }));
};

  const onDelete = (id) => {
    setInvoiceData((prevData) => ({
      ...prevData,
      items: prevData.items.filter((item) => item.id !== id),
    }));
  };

  const handleCancel = () => {
    if (typeof onClose === 'function') {
      onClose();
    } else {
      console.error('onClose is not a function');
    }
  };

  const handelOnChange = (id, e) => {
    let data = [...invoiceData.items];
    let foundData = data.find((el) => el.id === id);

    if (['months', 'Delay', 'price', 'total', 'stampmoney', 'TVA', 'FinalP', 'new1', 'new2', 'new3'].includes(e.target.name)) {
      foundData[e.target.name] = e.target.value;
      
      // Ensure numeric calculations are handled correctly
      foundData['new1'] = Number(foundData.months);
      foundData['new2'] = Number(foundData.months);
      foundData['new3'] = Number(foundData.months);

      // Calculate total based on months and price
      foundData['total'] = Number(foundData.months) * Number(foundData.price);

      // Calculate stamp money (example calculation; adjust as needed)
      foundData['stampmoney'] = Number(foundData.stampmoney);

      // Calculate Delay
      foundData['Delay'] = Number(foundData.Delay);

      // Calculate TVA (Tax)
      foundData['TVA'] = Number(foundData.total) * 0.09;

      // Calculate FinalP (Final Price)
      foundData['FinalP'] = Number(foundData.total) + Number(foundData.TVA);
    } else {
      foundData[e.target.name] = e.target.value;
    }

    setInvoiceData((prevData) => ({ ...prevData, items: data }));
  };

  function itemsValidator() {
    const itemName = invoiceData.items.map((i) => validateItemName(i.itemName));
    const itemCount1 = invoiceData.items.map((i) => validateItemCount1(i.months));
    const itemCount = invoiceData.items.map((i) => validateItemCount(i.Delay));
    const itemPrice = invoiceData.items.map((i) => validateItemPrice(i.price));
    const allItemsElement = itemName.concat(itemCount1, itemCount, itemPrice);
    return !allItemsElement.includes(false);
  }

  function validator() {
    return (
      validateCLientPhone(invoiceData.clientPhone) &&
      validateCLientName(invoiceData.clientName) &&
      validateInvoicenumber(invoiceData.Invoicenumber) &&
      validateClientCity(invoiceData.clientCity) &&
      validateStatus(invoiceData.clientstatus) &&
      validateClientStreetAddress(invoiceData.clientStreet) &&
      validateClientCountry(invoiceData.clientCountry) &&
      itemsValidator()
    );
  }
  return (
    <form onSubmit={handleSubmit}>
      <div
        onClick={(e) => {
          if (e.target !== e.currentTarget) {
            return;
          }
          setOpenCreateInvoice(false);
        }}
        className='fixed top-0 bottom-0 left-0 right-0 bg-[#000005be]'>
        <motion.div
          key='createInvoice-sidebar'
          initial={{ x: -500, opacity: 0 }}
          animate={{ opacity: 1, x: 0, transition: { type: 'spring', stiffness: 300, damping: 40, duration: 0.4 } }}
          exit={{ x: -700, transition: { duration: 0.2 } }}
          className='scrollbar-hide flex flex-col dark:text-white dark:bg-[#434343] bg-white md:pl-[150px] py-16 px-6 h-screen md:w-[768px] md:rounded-r-3xl'>
          <h1 className='font-semibold dark:text-white text-3xl'>
            {type === 'edit' ? 'Edit' : 'Create'} Invoice
          </h1>
          
          <div className='overflow-y-scroll scrollbar-hide my-14'>
          <div className='grid grid-cols-1 mx-5 space-y-9'>
          <div className='flex flex-col ml-auto-2 col-span-2'>
        <label className='text-Black-400 font-light text-right'> رقم الفاتورة </label>
       <input
        type='text'
        id='Invoicenumber'
        value={invoiceData.Invoicenumber}
        onChange={(e) => setInvoiceData((prev) => ({ ...prev, Invoicenumber: e.target.value }))}
        className={`text-right dark:bg-[#FAEBCD] py-2 px-4 text-black border-[.2px] w-full max-w-[600px] focus:outline-none rounded-lg focus:outline-yellow-400 border-gray-300 ${
          isValidatorActive && !validateInvoicenumber(invoiceData.Invoicenumber) && 'border-red-500 dark:border-red-500 outline-red-500 border-2'
        } dark:border-gray-800 ml-auto`}
        />
      </div>

     <div className='flex flex-col ml-auto-2 col-span-2'>
      <label className='text-Black-400 font-light text-right'> :إسم السيد/ة  </label>
      <input
        type='text'
        id='ClientsName'
        value={invoiceData.clientName}
        onChange={(e) => setInvoiceData((prev) => ({ ...prev, clientName: e.target.value }))}
        className={`text-right dark:bg-[#FAEBCD] py-2 px-4 text-black border-[.2px] w-full max-w-[600px] focus:outline-none rounded-lg focus:outline-yellow-400 border-gray-300 ${
          isValidatorActive && !validateCLientName(invoiceData.clientName) && 'border-red-500 dark:border-red-500 outline-red-500 border-2'
        } dark:border-gray-800 ml-auto`}
      />
     </div>

     <div className='flex flex-col ml-auto-2 col-span-2'>
      <label className='text-Black-400 font-light text-right'> :رقم الهاتف </label>
      <input
        type='text'
        id='ClientPhone'
        value={invoiceData.clientPhone}
        onChange={(e) => setInvoiceData((prev) => ({ ...prev, clientPhone: e.target.value }))}
        className={`text-right dark:bg-[#FAEBCD] py-2 px-4 text-black border-[.2px] w-full max-w-[600px] focus:outline-none rounded-lg focus:outline-yellow-400 border-gray-300 ${
          isValidatorActive && !validateCLientPhone(invoiceData.clientPhone) && 'border-red-500 dark:border-red-500 outline-red-500 border-2'
        } dark:border-gray-800 ml-auto`}
      />
     </div>

     <div className='flex flex-col ml-auto-2 col-span-2'>
      <label className='text-Black-400 font-light text-right'> :عنوان المسكن </label>
      <input
        type='text'
        id='ClientStreet'
        value={invoiceData.clientStreet}
        onChange={(e) => setInvoiceData((prev) => ({ ...prev, clientStreet: e.target.value }))}
        className={`text-right dark:bg-[#FAEBCD] py-2 px-4 text-black border-[.2px] w-full max-w-[600px] focus:outline-none rounded-lg focus:outline-yellow-400 border-gray-300 ${
          isValidatorActive && !validateClientStreetAddress(invoiceData.clientStreet) && 'border-red-500 dark:border-red-500 outline-red-500 border-2'
        } dark:border-gray-800 ml-auto`}
      />
     </div>

     <div className='flex flex-col ml-auto-2 col-span-2'>
      <label className='text-Black-400 font-light text-right'> :البلدية </label>
      <input
        type='text'
        id='ClientCity'
        value={invoiceData.clientCity}
        onChange={(e) => setInvoiceData((prev) => ({ ...prev, clientCity: e.target.value }))}
        className={`text-right dark:bg-[#FAEBCD] py-2 px-4 text-black border-[.2px] w-full max-w-[600px] focus:outline-none rounded-lg focus:outline-yellow-400 border-gray-300 ${
          isValidatorActive && !validateClientCity(invoiceData.clientCity) && 'border-red-500 dark:border-red-500 outline-red-500 border-2'
        } dark:border-gray-800 ml-auto`}
      />
     </div>

    

     <div className='flex flex-col ml-auto-2 col-span-2'>
      <label className='text-Black-400 font-light text-right'> :حالة الدفع </label>
      <Select
        id='Clientstatus'
        options={STATUS}
        onChange={(selectedOption) =>
          setInvoiceData((prev) => ({
            ...prev,
            clientstatus: selectedOption.value,
          }))
        }
        className={`text-right dark:bg-[#FAEBCD] py-2 px-4 text-black border-[.2px] w-full max-w-[600px] focus:outline-none rounded-lg focus:outline-yellow-400 border-gray-300 dark:border-gray-800 ${
          isValidatorActive && !validateStatus(invoiceData.clientstatus) && 'border-red-500 dark:border-red-500 outline-red-500 border-2'
        } dark:border-gray-800 ml-auto`}
      />
     </div>

    

     <div className='flex flex-col ml-auto-2 col-span-2'>
      <label className='text-Black-400 font-light text-right'>:تاريخ إصدار الفاتورة</label>
      <input
        type='date'
        id='SelectDeliveryDate'
        value={invoiceData.selectDeliveryDate}
        onChange={(e) => setInvoiceData((prev) => ({ ...prev, selectDeliveryDate: e.target.value }))}
        className={`text-right dark:bg-[#FAEBCD] py-2 px-4 text-black border-[.2px] w-full max-w-[600px] focus:outline-none rounded-lg focus:outline-yellow-400 border-gray-300 ${
          isValidatorActive && !validateClientCity(invoiceData.clientCity) && 'border-red-500 dark:border-red-500 outline-red-500 border-2'
        } dark:border-gray-800 ml-auto`}
      />
     </div>

      <div className='flex flex-col ml-auto-2 col-span-2'>
      <label className='text-Black-400 font-light text-right'> : المبلغ المسدد1 </label>
      <input
        type='text'
        id='ClientCountry'
        value={invoiceData.clientCountry}
        onChange={(e) => setInvoiceData((prev) => ({ ...prev, clientCountry: e.target.value }))}
        className={`text-right dark:bg-[#FAEBCD] py-2 px-4 text-black border-[.2px] w-full max-w-[600px] focus:outline-none rounded-lg focus:outline-yellow-400 border-gray-300 ${
          isValidatorActive && !validateClientCountry(invoiceData.clientCountry) && 'border-red-500 dark:border-red-500 outline-red-500 border-2'
        } dark:border-gray-800 ml-auto`}
      />
     </div> 

     <div className='flex flex-col ml-auto-2 col-span-2'>
      <label className='text-Black-400 font-light text-right'> :  المبلغ المسدد2  </label>
      <input
        type='text'
        id='ClientCity'
        value={invoiceData.clientCity}
        onChange={(e) => setInvoiceData((prev) => ({ ...prev, clientCity: e.target.value }))}
        className={`text-right dark:bg-[#FAEBCD] py-2 px-4 text-black border-[.2px] w-full max-w-[600px] focus:outline-none rounded-lg focus:outline-yellow-400 border-gray-300 ${
          isValidatorActive && !validateClientCity(invoiceData.clientCity) && 'border-red-500 dark:border-red-500 outline-red-500 border-2'
        } dark:border-gray-800 ml-auto`}
      />
     </div>

     <div className='flex flex-col ml-auto-2 col-span-2'>
      <label className='text-Black-400 font-light text-right'> :  المبلغ المسدد3  </label>
      <input
        type='text'
        id='PaymentTerms'
        value={invoiceData.paymentTerms}
        onChange={(e) => setInvoiceData((prev) => ({ ...prev, paymentTerms: e.target.value }))}
        className={`text-right dark:bg-[#FAEBCD] py-2 px-4 text-black border-[.2px] w-full max-w-[600px] focus:outline-none rounded-lg focus:outline-yellow-400 border-gray-300 ${
          isValidatorActive && !validateClientCity(invoiceData.paymentTerms) && 'border-red-500 dark:border-red-500 outline-red-500 border-2'
        } dark:border-gray-800 ml-auto`}
      />
     </div>

     <div className='flex flex-col ml-auto-2 col-span-2'>
      <label className='text-Black-400 font-light text-right'> :تاريخ تسديد من</label>
      <input
        type='date'
        id='SelectDeliveryDatefrom'
        value={invoiceData.selectDeliveryDatefrom}
        onChange={(e) => setInvoiceData((prev) => ({ ...prev, selectDeliveryDatefrom: e.target.value }))}
        className={`text-right dark:bg-[#FAEBCD] py-2 px-4 text-black border-[.2px] w-full max-w-[600px] focus:outline-none rounded-lg focus:outline-yellow-400 border-gray-300 ${
          isValidatorActive && !validateClientCity(invoiceData.clientCity) && 'border-red-500 dark:border-red-500 outline-red-500 border-2'
        } dark:border-gray-800 ml-auto`}
      />
     </div>

     
    

     

     <div className='flex flex-col ml-auto-2 col-span-2'>
      <label className='text-Black-400 font-light text-right'>:إلى</label>
      <input
        type='date'
        id='SelectDeliveryDateto'
        value={invoiceData.selectDeliveryDateto}
        onChange={(e) => setInvoiceData((prev) => ({ ...prev, selectDeliveryDateto: e.target.value }))}
        className={`text-right dark:bg-[#FAEBCD] py-2 px-4 text-black border-[.2px] w-full max-w-[600px] focus:outline-none rounded-lg focus:outline-yellow-400 border-gray-300 ${
          isValidatorActive && !validateClientCity(invoiceData.selectDeliveryDateto) && 'border-red-500 dark:border-red-500 outline-red-500 border-2'
        } dark:border-gray-800 ml-auto`}
      />
     </div>

     
              {/* <div className='flex flex-col mr-4 col-span-2'> 
                <label className='text-Black-400 font-light'>Payment Terms</label>
                <Select
                  id='PaymentTerms19'
                  options={deliveryTimes}
                  onChange={(selectedOption) =>
                    setInvoiceData((prev) => ({
                      ...prev,
                      paymentTerms19: selectedOption.value,
                    }))
                  }
                  className={`dark:bg-[#32407B] py-2 px-4 border-[.2px] max-w-[400px] focus:outline-none rounded-lg focus:outline-blue-400 border-gray-300 dark:border-gray-800 ${
                    isValidatorActive && !validateStatus19(invoiceData.clientstatus19) && 'border-red-500 dark:border-red-500 outline-red-500 border-2'
                  } dark:border-gray-800`}
                />
              </div>  */}

     <div className='flex flex-col ml-auto-2 col-span-2'>
      <label className='text-Black-400 font-light text-right'>:التعيين</label>
      <textarea
        id='Description'
        value={invoiceData.description}
        onChange={(e) => setInvoiceData((prev) => ({ ...prev, description: e.target.value }))}
        className={`text-right dark:bg-[#FAEBCD] py-2 px-4 text-black border-[.2px] w-full max-w-[600px] focus:outline-none rounded-lg focus:outline-yellow-400 border-gray-300 ${
          isValidatorActive && !validateDescription(invoiceData.description) && 'border-red-500 dark:border-red-500 outline-red-500 border-2'
        } dark:border-gray-800 ml-auto`}
      />
     </div>

            <div className='my-4'>
                    <h2 className='text-Black-400 font-light text-lg'>Invoice Items</h2>

                    {invoiceData.items.map((itemDetails, index) => (
                        <AddItem
                            key={itemDetails.id}
                            itemDetails={itemDetails}
                            setItem={setInvoiceData}
                            isValidatorActive={isValidatorActive}
                            onDelete={onDelete}
                            handelOnChange={handelOnChange}
                        />
                    ))}

                    <button
                        onClick={() => {
                            setInvoiceData((prevData) => ({
                                ...prevData,
                                items: [
                                    ...prevData.items,
                                    {
                                        name: '',
                                        months: 1,
                                        Delay: 0,
                                        stampmoney: 0,
                                        TVA: 0,
                                        price: 0,
                                        total: 0,
                                        new1:0,
                                        new2:0,
                                        new3:0,
                                        FinalP: 0,
                                        id: uuidv4(),
                                    },
                                ],
                            }));
                        }}
                        className='mt-4 bg-[#C07F00] hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded'
                    >
                        Add Item
                    </button>
                </div>
                </div>

              
            </div>
            <div className='flex justify-between'>
           


              <button
                onClick={() => {
                  handleCancel();
                  console.log("Button clicked");
                  
                  setOpenCreateInvoice(false);
                }}
                type="button" // Ensure this button does not submit the form
                //  onClick={handleCancel}
                className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded'>
                Cancel
              </button>
                
                <button
                  //  type="submit"
                    onClick={handleSubmit}
                   
                   className='bg-[#C07F00] hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded'
                >
                        {type === 'edit' ? 'Update Invoice' : 'Save'} 
                </button>
              
       
            </div>
          
        </motion.div>
     </div>
    </form>
  );
};

export default CreateInvoice;
