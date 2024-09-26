import React from 'react';
import { Link } from 'react-router-dom';
import rightArrow from '../assets/icon-arrow-right.svg';
import PaidStatus from './PaidStatus';

const InvoiceCard2 = ({ invoice19 }) => {
  return (
    <Link to={`/invoice19/${invoice19.Id}`}>
      {/* Big Screen */}
      <div className='hidden md:flex cursor-pointer duration-100 ease-in-out hover:border border-blue-500 py-1 shadow-sm px-6 dark:bg-[#F8F8F8] bg-white rounded-lg items-center justify-between'>
        <div className='flex items-center'>
          <h2 className='dark:text-black'>
            <span className='text-[#C07F00]'>#</span>
            {invoice19.Id}
          </h2>
          
          <h2 className='text-sm text-black-400 dark:text-black font-light ml-10'>
            {invoice19.clientName19}
          </h2>
          <h2 className='text-sm text-black-400 dark:text-black font-light ml-6'>
            Contact {invoice19.clientPhone19}
          </h2>
        </div>
        <h2 className='dark:text-black'>
            <span className='text-black-400'>Nbr : </span>
            {invoice19.Invoicenumber19}
          </h2>
        <div className='flex items-center'>
          <h1 className='text-xl mr-8 dark:text-black'>
             {invoice19.FinalP19} DZD
          </h1>
          <PaidStatus type={invoice19.clientstatus19} />
          <img src={rightArrow} className='ml-4' alt='arrow' />
        </div>
      </div>
      {/* Phone Screen */}
      <div className='md:hidden flex cursor-pointer hover:border border-blue-500 py-4 shadow-sm px-6 dark:bg-[#1E2139] bg-white rounded-lg items-center justify-between'>
        <div className='flex flex-col'>
          <h2 className='dark:text-black'>
            <span className='text-[#C07F00]'>#</span>
            {invoice19.Id}
          </h2>
          <h2 className='text-sm text-black-400 dark:text-black font-light mt-3'>
            Contact {invoice19.clientPhone19}
          </h2>
          <h1 className='text-xl dark:text-black'>
            DZD {invoice19.FinalP19}
          </h1>
        </div>
        <div className='flex flex-col'>
          <h2 className='text-sm mb-4 text-black-400 dark:text-black font-light text-right'>
            {invoice19.clientName19}
          </h2>
          <PaidStatus type={invoice19.clientstatus19} />
        </div>
      </div>
    </Link>
  );
};

export default InvoiceCard2;
