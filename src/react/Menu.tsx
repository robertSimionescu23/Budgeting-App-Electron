import { useState } from 'react';
import { ChevronLeftIcon, PlusIcon } from '@heroicons/react/24/solid';

import YearTab from './YearTab';

function Menu() {
    const [isFullSize, setIsFullSize] = useState(true);
    const [chooseYear, setChooseYear] = useState(false);

    return (
        <div className={`bg-gray-100 h-full rounded-2xl p-5 flex flex-col items-start ${isFullSize ? 'w-2/5' : 'w-24'}`}>
            <div className={`w-full flex flex-row ${isFullSize? "justify-end" : "justify-center"} mb-2`}>
                {isFullSize && <PlusIcon onClick = {() => setChooseYear(!chooseYear)}  className="w-4 h-4 text-gray-600 cursor-pointer" />}
                <ChevronLeftIcon onClick = {() => setIsFullSize(!isFullSize)} className={`w-4 h-4 text-gray-600 cursor-pointer ${isFullSize ? '' : 'rotate-180'}`} />
            </div>
            <div className = "w-full">
                <YearTab isFullSize = {isFullSize} year = {2024} />
            </div>
            {chooseYear && <div onClick = {() => setChooseYear(false)} className = {"z-2 absolute inset-0 bg-gray-500 w-full h-full opacity-20"}></div>}
            {chooseYear &&
            <div className='font-zain text-gray-800 text-lg pt-4 absolute inset-1/2 w-1/2 h-1/2 -translate-x-1/2 -translate-y-1/2 bg-white z-3 rounded-md flex flex-col items-center '>
                <div className='w-fit text-nowrap'> Add an entry manually</div>
                <div className = "font-zain text-xl text-gray-800 m-4 w-2/3 px-4 h-10 bg-gray-100 opacity-90 flex flex-row items-center justify-between text-center rounded-md">
                    <input className='w-12 text-gray-800 cursor-pointer text-center' placeholder = "dd"/>
                    <div>/</div>
                    <input className='w-12 text-gray-800 cursor-pointer text-center' placeholder = "mm"/>
                    <div>/</div>
                    <input className='w-12 text-gray-800 cursor-pointer text-center' placeholder = "yyyy"/>
                    {/* <div className='text-gray-400 cursor-pointer'>mm</div>
                    <div className='text-gray-400 cursor-pointer'>yyyy</div> */}
                </div>
            </div>
            }
        </div>
    )
}

export default Menu
