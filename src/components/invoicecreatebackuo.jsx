import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import AddItem2 from './AddItem2';
import { createInvoice19 } from '../redux/invoiceActions';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'; // Import axios
import Select from 'react-select';
import { v4 as uuidv4 } from 'uuid';
import {
  validateInvoicenumber19,
  validateCLientPhone19,
  validateCLientName19,
  validateClientCity19,
  validateStatus19,
  validateClientStreetAddress19,
  //validateItemCount19,
  //validateItemCount119,
  validateItemName19,
  validateItemPrice19,
  validateClientCountry19,
} from '../function/createInvoiceValidator';

const CreateInvoice = ({ setOpenCreateInvoice, type, invoice, onClose  }) => {
  const dispatch = useDispatch();
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [isValidatorActive, setIsValidatorActive] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [filterValue, setFilterValue] = useState('');
  const deliveryTimes = [
    { text: 'Next 1 months', value: 30 },
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
    Invoicenumber19: '',
    clientName19: '',
    clientPhone19: '',
    clientStreet19: '',
    clientCity19: '',
    clientstatus19: '',
    clientCountry19: '',
    description19: '',
    selectDeliveryDate19: '',
    selectDeliveryDatefrom19: '',
    selectDeliveryDateto19: '',
    paymentTerms19: deliveryTimes[0].value,
    items: [
      {
        itemName19: '',
        months19: 1,
        Delay19: 1,
        price19: 0,
        total19: 0,
        stampmoney19: 0,
        TVA19: 0,
        add1: 0,
        add2: 0,
        add3: 0,
        FinalP19: 0,
        id: uuidv4(),
      },
    ],
  });
  const handleCancel = () => {
    console.log('Cancel button clicked');
    // Ensure onClose is a function before calling it
    if (typeof onClose === 'function') {
      onClose();
    } else {
      console.error('onClose is not a function');
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  //   if (!validator()) {
  //     setIsValidatorActive(true);
  //     setIsValid(false);
  //     return;
  // }
    const formattedItems = invoiceData.items.map((item) => ({
      ...invoiceData,
      itemName19: item.itemName19,
      months19: item.months19,
      Delay19: item.Delay19,
      price19: item.price19,
      total19: item.total19,
      stampmoney19: item.stampmoney19,
      TVA19: item.TVA19,
      add1: item.add1,
      add2: item.add2,
      add3: item.add3,
      FinalP19: item.FinalP19,
    }));
    try {
      const response = await axios.post('http://localhost:5000/api/invoices19', { formattedItems });
      console.log('Form submitted successfully:', response.data);
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  handleSubmit();

  const onDelete = (id) => {
    setInvoiceData((prevData) => ({
      ...prevData,
      items: prevData.items.filter((item) => item.id !== id),
    }));
  };

  const handelOnChange = (id, e) => {
    let data = [...invoiceData.items];
    let foundData = data.find((el) => el.id === id);

    if (['months19', 'Delay19', 'price19', 'total19', 'stampmoney19', 'TVA19', 'FinalP19', 'add1', 'add2', 'add3'].includes(e.target.name)) {
      foundData[e.target.name] = e.target.value;
      foundData['total19'] = (
        Number(foundData.months19) * Number(foundData.price19) 
        // Number(foundData.months19) * Number(foundData.price19) * Number(foundData.Delay19) * 0.05
      ).toFixed(2);
      // foundData['stampmoney19'] = (
      //   (Number(foundData.months19) * Number(foundData.price19) - 100) * 0.015 + 4.5
      // ).toFixed(2);
      foundData['TVA19'] = (Number(foundData.months19) * Number(foundData.price19) * 0.19).toFixed(2);
      foundData['FinalP19'] = (
        Number(foundData.total19)  + Number(foundData.TVA19)
      ).toFixed(2);
    } else {
      foundData[e.target.name] = e.target.value;
    }

    setInvoiceData((prevData) => ({ ...prevData, items: data }));
  };

  useEffect(() => {
    if (type === 'edit' && isFirstLoad) {
      const updatedItemsArray = invoice.items.map((obj, index) => ({ ...obj, id: index + 1 }));

      setInvoiceData({
        Invoicenumber19: invoice.Invoicenumber19,
        clientName19: invoice.clientName19,
        clientPhone19: invoice.clientPhone19,
        clientStreet19: invoice.clientStreet19,
        clientCity19: invoice.clientCity19,
        clientstatus19: invoice.clientstatus19,
        clientCountry19: invoice.clientCountry19,
        description19: invoice.description19,
        selectDeliveryDate19: invoice.selectDeliveryDate19,
        selectDeliveryDatefrom19: invoice.selectDeliveryDatefrom19,
        selectDeliveryDateto19: invoice.selectDeliveryDateto19,
        paymentTerms19: invoice.paymentTerms19,
        items: updatedItemsArray,
      });

      setIsFirstLoad(false);
    }
  }, [invoice, isFirstLoad, type]);

  function itemsValidator() {
    const itemName = invoiceData.items.map((i) => validateItemName19(i.itemName19));
    const itemCount1 = invoiceData.items.map((i) => validateItemCount119(i.months19));
    const itemCount = invoiceData.items.map((i) => validateItemCount19(i.Delay19));
    const itemPrice = invoiceData.items.map((i) => validateItemPrice19(i.price19));
    const allItemsElement = itemName.concat(itemCount1, itemPrice);
    return !allItemsElement.includes(false);
  }

  function validator() {
    return (
      validateCLientPhone19(invoiceData.clientPhone19) &&
      validateCLientName19(invoiceData.clientName19) &&
      validateInvoicenumber19(invoiceData.Invoicenumber19) &&
      validateClientCity19(invoiceData.clientCity19) &&
      validateStatus19(invoiceData.clientstatus19) &&
      validateClientStreetAddress19(invoiceData.clientStreet19) &&
      validateClientCountry19(invoiceData.clientCountry19) &&
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
            {type === 'edit' ? 'Edit' : 'Create'} :الفواتير
          </h1>

          <div className='overflow-y-scroll scrollbar-hide my-14'>
            <div className='grid grid-cols-1 mx-5 space-y-9'>
              <div className='flex flex-col ml-auto-2 col-span-2'>
                <label className='text-Black-400 font-light text-right'>:رقم الفاتورة</label>
                <input
                  type='text'
                  id='Invoicenumber19'
                  value={invoiceData.Invoicenumber19}
                  onChange={(e) => setInvoiceData((prev) => ({ ...prev, Invoicenumber19: e.target.value }))}
                  className={`text-right dark:bg-[#FAEBCD] py-2 px-4 text-black border-[.2px] w-full max-w-[600px] focus:outline-none rounded-lg focus:outline-yellow-400 border-gray-300 ${
                    isValidatorActive && !validateInvoicenumber19(invoiceData.Invoicenumber19) && 'border-red-500 dark:border-red-500 outline-red-500 border-2'
                  } dark:border-gray-800 ml-auto`}
                />
              </div>

              <div className='flex flex-col ml-auto-2 col-span-2'>
                <label className='text-Black-400 font-light text-right'>:إسم السيد/ة </label>
                <input
                  type='text'
                  id='ClientsName19'
                  value={invoiceData.clientName19}
                  onChange={(e) => setInvoiceData((prev) => ({ ...prev, clientName19: e.target.value }))}
                  className={`text-right dark:bg-[#FAEBCD] py-2 px-4 text-black border-[.2px] w-full max-w-[600px] focus:outline-none rounded-lg focus:outline-yellow-400 border-gray-300 ${
                    isValidatorActive && !validateCLientName19(invoiceData.clientName19) && 'border-red-500 dark:border-red-500 outline-red-500 border-2'
                  } dark:border-gray-800 ml-auto`}
                />
              </div>

              <div className='flex flex-col ml-auto-2 col-span-2'>
                <label className='text-Black-400 font-light text-right'>:رقم الهاتف</label>
                <input
                  type='text'
                  id='ClientPhone19'
                  value={invoiceData.clientPhone19}
                  onChange={(e) => setInvoiceData((prev) => ({ ...prev, clientPhone19: e.target.value }))}
                  className={`text-right dark:bg-[#FAEBCD] py-2 px-4 text-black border-[.2px] w-full max-w-[600px] focus:outline-none rounded-lg focus:outline-yellow-400 border-gray-300 ${
                    isValidatorActive && !validateCLientPhone19(invoiceData.clientPhone19) && 'border-red-500 dark:border-red-500 outline-red-500 border-2'
                  } dark:border-gray-800 ml-auto`}
                />
              </div>

              <div className='flex flex-col ml-auto-2 col-span-2'>
                <label className='text-Black-400 font-light text-right'>:عنوان المسكن </label>
                <input
                  type='text'
                  id='ClientStreet19'
                  value={invoiceData.clientStreet19}
                  onChange={(e) => setInvoiceData((prev) => ({ ...prev, clientStreet19: e.target.value }))}
                  className={`text-right dark:bg-[#FAEBCD] py-2 px-4 text-black border-[.2px] w-full max-w-[600px] focus:outline-none rounded-lg focus:outline-yellow-400 border-gray-300 ${
                    isValidatorActive && !validateClientStreetAddress19(invoiceData.clientStreet19) && 'border-red-500 dark:border-red-500 outline-red-500 border-2'
                  } dark:border-gray-800 ml-auto`}
                />
              </div>

              

              <div className='flex flex-col ml-auto-2 col-span-2'>
                <label className='text-Black-400 font-light text-right'>:حالة الدفع </label>
                <Select
                  id='Clientstatus19'
                  options={STATUS}
                  onChange={(selectedOption) =>
                    setInvoiceData((prev) => ({
                      ...prev,
                      clientstatus19: selectedOption.value,
                    }))
                  }
                  className={`text-right dark:bg-[#FAEBCD] py-2 px-4 text-black border-[.2px] w-full max-w-[600px] focus:outline-none rounded-lg focus:outline-yellow-400 border-gray-300 dark:border-gray-800 ${
                    isValidatorActive && !validateStatus19(invoiceData.clientstatus19) && 'border-red-500 dark:border-red-500 outline-red-500 border-2'
                  } dark:border-gray-800 ml-auto`}
                />
              </div>

              

              <div className='flex flex-col ml-auto-2 col-span-2'>
                <label className='text-Black-400 font-light text-right'>:تاريخ إصدار الفاتورة</label>
                <input
                  type='date'
                  id='SelectDeliveryDate19'
                  value={invoiceData.selectDeliveryDate19}
                  onChange={(e) => setInvoiceData((prev) => ({ ...prev, selectDeliveryDate19: e.target.value }))}
                  className={`text-right dark:bg-[#FAEBCD] py-2 px-4 text-black border-[.2px] w-full max-w-[600px] focus:outline-none rounded-lg focus:outline-yellow-400 border-gray-300 ${
                    isValidatorActive && !validateClientCity19(invoiceData.clientCity19) && 'border-red-500 dark:border-red-500 outline-red-500 border-2'
                  } dark:border-gray-800 ml-auto`}
                />
              </div>

              <div className='flex flex-col ml-auto-2 col-span-2'>
                <label className='text-Black-400 font-light text-right'>:وصل بنكي رقم (1)</label>
                <input
                  type='text'
                  id='ClientCountry19'
                  value={invoiceData.clientCountry19}
                  onChange={(e) => setInvoiceData((prev) => ({ ...prev, clientCountry19: e.target.value }))}
                  className={`text-right dark:bg-[#FAEBCD] py-2 px-4 text-black border-[.2px] w-full max-w-[600px] focus:outline-none rounded-lg focus:outline-yellow-400 border-gray-300 ${
                    isValidatorActive && !validateClientCountry19(invoiceData.clientCountry19) && 'border-red-500 dark:border-red-500 outline-red-500 border-2'
                  } dark:border-gray-800 ml-auto`}
                />
              </div>

              <div className='flex flex-col ml-auto-2 col-span-2'>
                <label className='text-Black-400 font-light text-right'>:بتاريخ</label>
                <input
                  type='date'
                  id='SelectDeliveryDatefrom19'
                  value={invoiceData.selectDeliveryDatefrom19}
                  onChange={(e) => setInvoiceData((prev) => ({ ...prev, selectDeliveryDatefrom19: e.target.value }))}
                  className={`text-right dark:bg-[#FAEBCD] py-2 px-4 text-black border-[.2px] w-full max-w-[600px] focus:outline-none rounded-lg focus:outline-yellow-400 border-gray-300 ${
                    isValidatorActive && !validateClientCity19(invoiceData.clientCity19) && 'border-red-500 dark:border-red-500 outline-red-500 border-2'
                  } dark:border-gray-800 ml-auto`}
                />
              </div>

              
    {/* <div className='flex flex-col ml-auto-2 col-span-2'>
      <label className='text-Black-400 font-light text-right'> :المبلغ المسدد </label>
      <input
        type='text'
        id='Delay19'
        value={invoiceData.Delay19}
        onChange={(e) => setInvoiceData((prev) => ({ ...prev, Delay: e.target.value }))}
        className={`text-right dark:bg-[#FAEBCD] py-2 px-4 text-black border-[.2px] w-full max-w-[600px] focus:outline-none rounded-lg focus:outline-yellow-400 border-gray-300 ${
          isValidatorActive && !validateClientDelay(invoiceData.Delay19) && 'border-red-500 dark:border-red-500 outline-red-500 border-2'
        } dark:border-gray-800 ml-auto`}
      />
    </div> */}

              <div className='flex flex-col ml-auto-2 col-span-2'>
                <label className='text-Black-400 font-light text-right'>:وصل بنكي رقم (2)</label>
                <input
                  type='text'
                  id='ClientCity19'
                  value={invoiceData.clientCity19}
                  onChange={(e) => setInvoiceData((prev) => ({ ...prev, clientCity19: e.target.value }))}
                  className={`text-right dark:bg-[#FAEBCD] py-2 px-4 text-black text-black border-[.2px] w-full max-w-[600px] focus:outline-none rounded-lg focus:outline-yellow-400 border-gray-300 ${
                    isValidatorActive && !validateClientCity19(invoiceData.clientCity19) && 'border-red-500 dark:border-red-500 outline-red-500 border-2'
                  } dark:border-gray-800 ml-auto`}
                />
              </div>

              <div className='flex flex-col ml-auto-2 col-span-2'>
                <label className='text-Black-400 font-light text-right'>:بتاريخ</label>
                <input
                  type='date'
                  id='SelectDeliveryDateto19'
                  value={invoiceData.selectDeliveryDateto19}
                  onChange={(e) => setInvoiceData((prev) => ({ ...prev, selectDeliveryDateto19: e.target.value }))}
                  className={`text-right dark:bg-[#FAEBCD] py-2 px-4 text-black border-[.2px] w-full max-w-[600px] focus:outline-none rounded-lg focus:outline-yellow-400 border-gray-300 ${
                    isValidatorActive && !validateClientCity19(invoiceData.clientCity19) && 'border-red-500 dark:border-red-500 outline-red-500 border-2'
                  } dark:border-gray-800 ml-auto`}
                />
              </div>

              
    {/* <div className='flex flex-col ml-auto-2 col-span-2'>
      <label className='text-Black-400 font-light text-right'> :المبلغ المسدد </label>
      <input
        type='text'
        id='stampmoney19'
        value={invoiceData.stampmoney19}
        onChange={(e) => setInvoiceData((prev) => ({ ...prev, Delay: e.target.value }))}
        className={`text-right dark:bg-[#FAEBCD] py-2 px-4 text-black border-[.2px] w-full max-w-[600px] focus:outline-none rounded-lg focus:outline-yellow-400 border-gray-300 ${
          isValidatorActive && !validateClientStampmoney19(invoiceData.stampmoney19) && 'border-red-500 dark:border-red-500 outline-red-500 border-2'
        } dark:border-gray-800 ml-auto`}
      />
    </div> */}

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
                  id='Description19'
                  value={invoiceData.description19}
                  onChange={(e) => setInvoiceData((prev) => ({ ...prev, description19: e.target.value }))}
                  className={`text-right dark:bg-[#FAEBCD] py-2 px-4 text-black border-[.2px] w-full max-w-[600px] focus:outline-none rounded-lg focus:outline-yellow-400 border-gray-300 ${
                    isValidatorActive && !validateClientCity19(invoiceData.clientCity19) && 'border-red-500 dark:border-red-500 outline-red-500 border-2'
                  } dark:border-gray-800 ml-auto `}
                />
              </div>

            <div className='my-4'>
                    <h2 className='text-Black-400 font-light text-lg'>Invoice Items</h2>

                    {invoiceData.items.map((itemDetails, index) => (
                        <AddItem2
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
                                        Delay: 1,
                                        stampmoney: 0,
                                        TVA: 0,
                                        price: 0,
                                        total: 0,
                                        add1:0,
                                        add2:0,
                                        add3:0,
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
                        Save
                </button>
       
            </div>
          
        </motion.div>
      </div>
    </form>
  );
};

export default CreateInvoice;





  // const handelOnChange = (id, e) => {
  //   const { name, value } = e.target;
  //   setInvoiceData((prevData) => {
  //     const items = prevData.items.map((item) =>
  //       item.id === id
  //         ? {
  //             ...item,
  //             [name]: value,
  //             total19: name === 'months19' || name === 'price19'
  //               ? (Number(item.months19) * Number(item.price19)).toFixed(2)
  //               : item.total19,
  //             TVA19: name === 'total19' 
  //               ? (Number(item.total19)  * 0.09).toFixed(2)
  //               : item.TVA19,
  //               add1: name === 'add1'
  //               ? (Number(item.add1) * 1).toFixed(2)
  //               : item.add1,  
  //             FinalP19: name === 'total19' || name === 'price19'
  //               ? (Number(item.total19) + Number(item.TVA19)).toFixed(2)
  //               : item.FinalP19,
  //           }
  //         : item
  //     );
  //     return { ...prevData, items };
  //   });
  // };
