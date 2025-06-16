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
            {chooseYear && <div onClick = {() => setChooseYear(false)}className = {"z-2 absolute inset-0 bg-gray-500 w-full h-full opacity-20"}></div>}
            {chooseYear && <div className='absolute inset-1/2 w-1/2 h-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-100 z-3 rounded-md flex flex-row items-center justify-between px-40'>
               {/* Add a Calendar */}
                <div>12</div>
                <div>Aug</div>
                <div>2024</div>
            </div>}
        </div>
    )
}

export default Menu
