import React from 'react'

function PaidStatus({type}) {
    const classNames = {
        paid :  ['text-[#808836] bg-[#CAE6B2]' , 'bg-[#365E32]' ],
        pending : ['text-[#800000] bg-[#D9ABAB]' , 'bg-[#A91D3A]'],
        draft : ['text-[#030637] bg-[#9EB8D9]' , 'bg-[#dfe3fa]']
    }
  return (
    <div className={`${type === "paid" ? classNames.paid[0] : type === 'pending' ? classNames.pending[0] : classNames.draft[0]  } flex justify-center space-x-2 rounded-lg  items-center px-4 py-2`}>
        <div className={` h-3 w-3 rounded-full  ${type === "paid" ? classNames.paid[1] : type==='pending' ? classNames.pending[1] : classNames.draft[1]} `}/>
         <p>
            {type}
         </p>
    </div>
  )
}

export default PaidStatus