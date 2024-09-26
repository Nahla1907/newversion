import React from 'react';
import { TrashIcon } from '@heroicons/react/24/solid';
import { validateItemCount, validateItemName, validateItemPrice } from '../function/createInvoiceValidator';

function AddItem({ itemDetails, setItem, isValidatorActive, onDelete, handelOnChange }) {
if (!itemDetails) {
return null; // or a loading spinner, or some fallback UI
}return (
    <div>
        <div className='flex dark:text-white justify-between items-center'>
            <div className='flex flex-wrap w-full'>

                {/* Monthly Rent and Delay */}
                <div className='flex w-full md:w-1/2 px-2 py-2 flex-col items-start'>
                    <h1>:السعر الوحدوي</h1>
                    <input
                        name='price'
                        type='number'
                        onChange={(e) => { handelOnChange(itemDetails.id, e) }}
                        value={itemDetails.price}
                        min={0}
                        className={`dark:text-black py-2 w-full px-4 border-[.2px] rounded-lg focus:outline-yellow-400 border-gray-300 focus:outline-none ${isValidatorActive && !validateItemPrice(itemDetails.price) && 'border-red-500 dark:border-red-500 outline-red-500 border-2'} dark:border-gray-800`}
                    />
                </div>

               

                {/* Months and Total/Delay */}
                <div className='flex w-full md:w-1/2 px-2 py-2 flex-col items-start'>
                    <h1>:المساحة</h1>
                    <input
                        name='months'
                        type='number'
                        onChange={(e) => { handelOnChange(itemDetails.id, e) }}
                        value={itemDetails.months}
                        min={0}
                        className={`dark:text-black  py-2 w-full px-4 border-[.2px] rounded-lg focus:outline-yellow-400 border-gray-300 focus:outline-none ${isValidatorActive && !validateItemCount(itemDetails.months) && 'border-red-500 dark:border-red-500 outline-red-500 border-2'} dark:border-gray-800`}
                    />
                </div>

                <div className='flex w-full md:w-1/2 px-2 py-2 flex-col items-start'>
                    <h1>: المجموع خارج الرسوم</h1>
                    <div className='dark:bg-white w-full dark:text-black  py-2 px-4 border-[.2px] rounded-lg focus:outline-none focus:outline-yellow-400 border-gray-300 dark:border-gray-800 '>
                        {itemDetails.total}
                    </div>
                </div>

                {/* Stamp Money and TVA */}
               
                <div className='flex w-full md:w-1/2 px-2 py-2 flex-col items-start'>
                    <h1>:القيمة المضافة %09</h1>
                    <div className='w-full dark:bg-white dark:text-black  py-2 px-4 border-[.2px] rounded-lg focus:outline-none focus:outline-yellow-400 border-gray-300 dark:border-gray-800 '>
                        {itemDetails.TVA}
                    </div>
                </div>

                <div className='flex w-full md:w-1/2 px-2 py-2 flex-col items-start'>
            <h1>:المبلغ المسدد 4</h1>
            <input
              name='Delay'
              type='number'
              onChange={(e) => { handelOnChange(itemDetails.id, e) }}
              value={itemDetails.Delay}
              min={0}
              className={`dark:bg-white dark:text-black py-2 w-full px-4 border-[.2px] rounded-lg focus:outline-blue-400 border-gray-300 focus:outline-none ${isValidatorActive && !validateItemCount(itemDetails.months19) && 'border-red-500 dark:border-red-500 outline-red-500 border-2'} dark:border-gray-800`}
            />
          </div>
          <div className='flex w-full md:w-1/2 px-2 py-2 flex-col items-start'>
            <h1>:المبلغ المسدد 5</h1>
            <input
              name='stampmoney'
              type='number'
              onChange={(e) => { handelOnChange(itemDetails.id, e) }}
              value={itemDetails.stampmoney}
              min={0}
              className={`dark:bg-white dark:text-black py-2 w-full px-4 border-[.2px] rounded-lg focus:outline-blue-400 border-gray-300 focus:outline-none ${isValidatorActive && !validateItemCount(itemDetails.months19) && 'border-red-500 dark:border-red-500 outline-red-500 border-2'} dark:border-gray-800`}
            />
          </div>
          {/* <div className='flex w-full md:w-1/2 px-2 py-2 flex-col items-start'>
            <h1>:المبلغ المسدد الثالث</h1>
            <input
              name='new1'
              type='number'
              onChange={(e) => { handelOnChange(itemDetails.id, e) }}
              value={itemDetails.new1}
              min={0}
              className={`dark:bg-white dark:text-black py-2 w-full px-4 border-[.2px] rounded-lg focus:outline-blue-400 border-gray-300 focus:outline-none ${isValidatorActive && !validateItemCount(itemDetails.months19) && 'border-red-500 dark:border-red-500 outline-red-500 border-2'} dark:border-gray-800`}
            />
          </div>
          <div className='flex w-full md:w-1/2 px-2 py-2 flex-col items-start'>
            <h1>:المبلغ المسدد الرابع</h1>
            <input
              name='new2'
              type='number'
              onChange={(e) => { handelOnChange(itemDetails.id, e) }}
              value={itemDetails.new2}
              min={0}
              className={`dark:bg-white dark:text-black py-2 w-full px-4 border-[.2px] rounded-lg focus:outline-blue-400 border-gray-300 focus:outline-none ${isValidatorActive && !validateItemCount(itemDetails.months19) && 'border-red-500 dark:border-red-500 outline-red-500 border-2'} dark:border-gray-800`}
            />
          </div>
          <div className='flex w-full md:w-1/2 px-2 py-2 flex-col items-start'>
            <h1>:المبلغ المسدد الخامس</h1>
            <input
              name='new3'
              type='number'
              onChange={(e) => { handelOnChange(itemDetails.id, e) }}
              value={itemDetails.new3}
              min={0}
              className={`dark:bg-white dark:text-black py-2 w-full px-4 border-[.2px] rounded-lg focus:outline-blue-400 border-gray-300 focus:outline-none ${isValidatorActive && !validateItemCount(itemDetails.months19) && 'border-red-500 dark:border-red-500 outline-red-500 border-2'} dark:border-gray-800`}
            />
          </div> */}


                {/* Final Price */}
                <div className='w-full'>
                    <div className='flex px-2 py-2 flex-col items-start'>
                        <h1>:المجموع بكل الرسوم</h1>
                        <div className='w-full dark:bg-white dark:text-black  py-2 px-4 border-[.2px] rounded-lg focus:outline-none focus:outline-yellow-400 border-gray-300 dark:border-gray-800 '>
                            {itemDetails.FinalP}
                        </div>
                    </div>
                </div>

            </div>

            <button onClick={() => { onDelete(itemDetails.id) }}>
                <TrashIcon className='text-gray-500 hover:text-red-500 cursor-pointer mt-4 h-6 w-6' />
            </button>
        </div>
    </div>
);}

export default AddItem;