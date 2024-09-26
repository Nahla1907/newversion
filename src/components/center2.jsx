// import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useAnimation } from 'framer-motion';
import arrowDown from '../assets/icon-arrow-down.svg';
import plus from '../assets/plus.png';
import InvoiceCard2 from './InvoiceCard2';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInvoices19 } from '../redux/invoiceActions';
import { filterInvoice } from '../redux/invoiceSlice';
import CreateInvoice2 from './CreateInvoice2';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Center2() {
  const location = useLocation();
  const controls = useAnimation();
  const dispatch = useDispatch();
  const filter = ['paid', 'pending', 'draft'];
  const [isDropdown, setIsDropdown] = useState(false);
  const [openCreateInvoice, setOpenCreateInvoice] = useState(false);
  const [filterValue, setfilterValue] = useState('');

  const invoices = useSelector((state) => state.invoices.filteredInvoice);

  useEffect(() => {
    dispatch(filterInvoice({ clientstatus: filterValue }));
  }, [filterValue, dispatch]);

  useEffect(() => {
    dispatch(fetchInvoices19());
  }, [dispatch]);

  useEffect(() => {
    controls.start({
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 20,
      },
    });
  }, [controls]);

  const transition = {
    stiffness: 200,
  };

  const varients = {
    open: { opacity: 1, x: -20, duration: 200, transition },
    close: { opacity: 0, x: -100, duration: 500, transition },
  };

  return (
    <div>
      <div className='dark:bg-[#2B2B28] scrollbar-hide duration-300 min-h-screen bg-[#FAEBCD] py-[34px] px-2 md:px-8 lg:px-12 lg:py-[72px]'>
        <motion.div
          key={location.pathname}
          initial={{ x: '0' }}
          animate={{ x: 0 }}
          exit={{ x: '-150%' }}
          transition={{ duration: 0.5 }}
          className='max-w-3xl flex flex-col mx-auto my-auto'
        >
          {/* Center Header */}
          <div className='min-w-full max-h-[64px] flex items-center justify-between'>
            <div>
            <h1 className='lg:text-4xl md:text-2xl text-xl dark:text-white tracking-wide font-semibold'>فواتير %19</h1>
            <p className='text-black dark:text-white font-light'>  يوجد إجمالي {invoices.length} فواتير</p>
            </div>
            <div className='flex max-h-full items-center'>
              <div className='flex items-center'>
                <p className='hidden md:block dark:text-white font-medium'>
                  Filter by status
                </p>
                <p className='md:hidden dark:text-white font-medium'>
                  Filter
                </p>
                <div onClick={() => { setIsDropdown((state) => !state); }} className='cursor-pointer ml-3'>
                  <motion.img src={arrowDown} animate={isDropdown ? { transition, rotate: -180 } : { transition, rotate: 0 }} />
                </div>
              </div>
              {isDropdown &&
                <motion.div as='select' variants={varients} animate={
                  isDropdown ? 'open' : 'close'
                } className='w-40 bg-white dark:bg-[#C07F00] dark:text-white flex px-6 py-4 flex-col top-[160px] lg:top-[120px] absolute shadow-2xl rounded-xl space-y-2'>
                  {filter.map((item, i) => (
                    <div key={i} onClick={() => { item === filterValue ? setfilterValue('') : setfilterValue(item); }} className='items-center cursor-pointer flex space-x-2'>
                      <input value={item} checked={filterValue === item} type='checkbox' className='accent-[#4C3D3D] hover:accent-[#4C3D3D]' />
                      <p>{item}</p>
                    </div>
                  ))}
                </motion.div>}
              <div className='flex space-x-2 px-3'>
                <button onClick={() => setOpenCreateInvoice(true)} className='hover:opacity-80 flex items-center py-2 px-3 bg-[#4C3D3D] dark:bg-[#C07F00] rounded-md'>
                  <img src={plus} alt='' className='w-5 h-5 mr-1' />
                  <p className='md:block hidden text-white font-semibold text-sm'>invoice 19%</p>
                  <p className='md:hidden block text-white font-semibold text-sm'>New</p>
                </button>
              </div>
            </div>
          </div>
          
          {/* Invoice Cards */}
          <div className='mt-10 space-y-4'>
            {invoices && invoices.slice().reverse().map((invoice19, index) => (
              <motion.div
                key={invoice19.Id}
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0, transition: { delay: index * 0.2 } }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.5 }}
              >
                <InvoiceCard2 invoice19={invoice19} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      <AnimatePresence>
        {openCreateInvoice &&
          <CreateInvoice2 openCreateInvoice={openCreateInvoice} setOpenCreateInvoice={setOpenCreateInvoice} />
        }
      </AnimatePresence>
    </div>
  );
}

export default Center2;
