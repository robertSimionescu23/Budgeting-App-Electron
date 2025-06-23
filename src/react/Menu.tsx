import { useState } from 'react';
import { ChevronLeftIcon, PlusIcon } from '@heroicons/react/24/solid';

import YearTab from './YearTab';

function Menu() {
    const [currentEntry, setCurrentEntry] = useState<{ day: number; month: number; year: number }>({
        day: 0,
        month: 0,
        year: 0
    });

    const [Date, setDate] = useState<{ day: number; month: number; year: number }>();
    const [isFullSize, setIsFullSize] = useState(true);
    const [chooseYear, setChooseYear] = useState(false);
    const [yearTabs, setYearTabs] = useState<number[]>([]);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        setCurrentEntry({day: currentEntry.day === 0 ? -1 : currentEntry.day,
                         month: currentEntry.month === 0 ? -1 : currentEntry.month,
                         year: currentEntry.year === 0 ? -1: currentEntry.year}); //Set to -1 to indicate invalid input

        if( currentEntry.day > 0 && currentEntry.month > 0 && currentEntry.year > 0){
            setDate(currentEntry);
            setYearTabs([...yearTabs, currentEntry.year ]);
            setChooseYear(false);
            setCurrentEntry({day: 0, month: 0, year: 0});
        }
    }


    function handleDayInput(day: number, ){
    if( day < 0 || day > 31 || Number.isNaN(day)){
        setCurrentEntry({ ...currentEntry, day: -1 });
    }
    else
        setCurrentEntry({ ...currentEntry, day: day });
}
    function handleMonthInput(month: number){
        if( month < 0 || month > 12 || Number.isNaN(month)){
            setCurrentEntry({ ...currentEntry, month: -1 });
        }
        else
            setCurrentEntry({ ...currentEntry, month: month });
    }

    function handleYearInput(year: number){
        if( year < 0 || year > 9999 || Number.isNaN(year)){
            setCurrentEntry({ ...currentEntry, year: -1 });
        }
        else
            setCurrentEntry({ ...currentEntry, year: year });
    }


    return (
        <div className={`bg-gray-100 h-full rounded-2xl p-5 flex flex-col items-start ${isFullSize ? 'w-2/5' : 'w-24'}`}>
            <div className={`w-full flex flex-row ${isFullSize? "justify-end" : "justify-center"} mb-2`}>
                {isFullSize && <PlusIcon onClick = {() => setChooseYear(!chooseYear)}  className="w-4 h-4 text-gray-600 cursor-pointer" />}
                <ChevronLeftIcon onClick = {() => setIsFullSize(!isFullSize)} className={`w-4 h-4 text-gray-600 cursor-pointer ${isFullSize ? '' : 'rotate-180'}`} />
            </div>
            <div className = "w-full">
                    {yearTabs.map(year => (
                        <YearTab key={year} isFullSize={isFullSize} year={year} />
                    ))}
            </div>
            {chooseYear && <div onClick = {() => {setChooseYear(false); setCurrentEntry({day: 0, month: 0, year: 0})}} className = {"z-2 absolute inset-0 bg-gray-500 w-full h-full opacity-20"}></div>}
            {chooseYear &&
            <div className='font-zain text-gray-800 text-lg pt-4 absolute inset-1/2 w-1/2 h-1/2 -translate-x-1/2 -translate-y-1/2 bg-white z-3 rounded-md flex flex-col items-center '>
                <div className='w-fit text-nowrap'> Add a n entry manually</div>
                <form className = "font-zain text-xl text-gray-800 m-4 w-2/3 h-10 bg-gray-100 opacity-90 flex flex-row items-center justify-between text-center rounded-md"
                    onSubmit={handleSubmit}
                >
                    <div className={'h-full w-0 opacity-0'}></div>
                    <input className={`${currentEntry.day == -1? "bg-red-200" : ""} w-12 text-gray-800 cursor-pointer text-center`}
                        type = "number"
                        min = {1}
                        max = {31}
                        placeholder = "dd"
                        onChange={e => {
                            e.target.value = e.target.value.slice(0,2); //Ensure only two digits are entered
                            handleDayInput(Number(e.target.value))
                        }}
                    />
                    <div>/</div>
                    <input className={`${currentEntry.month == -1? "bg-red-200" : ""} w-12 text-gray-800 cursor-pointer text-center`}
                        placeholder = "mm"
                        type = "number"
                        min = {1}
                        max = {12}
                        onChange={e => {e.target.value = e.target.value.slice(0,2); //Ensure only two digits are entered
                                       handleMonthInput(Number(e.target.value))}}
                    />
                    <div>/</div>
                    <input className={`${currentEntry.year == -1? "bg-red-200" : ""} w-12 text-gray-800 cursor-pointer text-center`}
                        type = "number"
                        min = {1}
                        max = {9999}
                        placeholder = "yyyy"
                        onChange={e => { e.target.value = e.target.value.slice(0,4); //Ensure only four digits are entered
                                        handleYearInput(Number(e.target.value))
                        }}
                    />
                    <button className='h-full w-12 bg-green-200 cursor-pointer flex items-center justify-center rounded-r-md'
                        type = "submit"
                    >{'>'}</button>
                </form>
            </div>
            }
        </div>
    )
}

export default Menu
