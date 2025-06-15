import { useState } from 'react';
import { ChevronLeftIcon, PlusIcon } from '@heroicons/react/24/solid';

import YearTab from './YearTab';

function Menu() {
    const [isFullSize, setIsFullSize] = useState(true);

    return (
        <div className={`bg-gray-100 h-full rounded-2xl p-5 flex flex-col items-start ${isFullSize ? 'w-2/5' : 'w-24'}`}>
            <div className={`w-full flex flex-row ${isFullSize? "justify-end" : "justify-center"} mb-2`}>
                {isFullSize && <PlusIcon  className="w-4 h-4 text-gray-600 " />}
                <ChevronLeftIcon onClick = {() => setIsFullSize(!isFullSize)} className={`w-4 h-4 text-gray-600 ${isFullSize ? '' : 'rotate-180'}`} />
            </div>
            <div className = "w-full">
                <YearTab isFullSize = {isFullSize} year = {2024} />
            </div>
        </div>
    )
}

export default Menu
