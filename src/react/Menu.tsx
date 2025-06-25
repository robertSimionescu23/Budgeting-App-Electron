import { useState, useEffect } from 'react';
import { ChevronLeftIcon,ChevronRightIcon, PlusIcon } from '@heroicons/react/24/solid';
import YearTab from './YearTab';

declare global {
    interface Window {
        electronAPI: {
            saveJson: (filename: string, data: any) => Promise<string>;
            getUserDataPath: () => Promise<string>;
        };
    }
}

function Menu() {
    const [saveFolder, setSaveFolder] = useState<string>("");
    const sysDate = new Date();

    const yearString  = String(sysDate.getFullYear());
    const monthString = String(sysDate.getMonth() + 1).padStart(2, '0');
    const dayString   = String(sysDate.getDate()).padStart(2, '0');

    const [currentEntry, setCurrentEntry] = useState<{ day: string; month: string; year: string }>({
        day: dayString,
        month: monthString,
        year: yearString
    });

    const [isFullSize, setIsFullSize] = useState(true);
    const [chooseYear, setChooseYear] = useState(false);
    const [yearTabs, setYearTabs] = useState<number[]>([]);


    async function saveAllYearTabs() {
        for (const year of yearTabs) {
            const data = { year };
            const filename = `year_${year}.json`;
            await window.electronAPI.saveJson(filename, data);
        }
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        console.log(`Saved year tabs: ${saveFolder}`);
        setChooseYear(false);
        setYearTabs(prev => {
            const newYear = parseInt(currentEntry.year);
            if (!prev.includes(newYear)) {
                return [...prev, newYear].sort((a, b) => a - b);
            }
            return prev;
        });
        setCurrentEntry({ day: dayString, month: monthString, year: yearString });
    }

    // Effect to run after yearTabs changes
    useEffect(() => {
        saveAllYearTabs();
    }, [yearTabs]);

    useEffect(() => {
        window.electronAPI.getUserDataPath().then(setSaveFolder); //All IPC calls are promises. I need to wait for them to resolve
    }, []);

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
            {chooseYear && <div onClick = {() => {setChooseYear(false); setCurrentEntry({day: dayString, month: monthString, year: yearString})}} className = {"z-2 absolute inset-0 bg-gray-500 w-full h-full opacity-20"}></div>}
            {chooseYear &&
            <div className='font-zain text-gray-800 text-lg pt-4 absolute inset-1/2 w-1/2 h-1/2 -translate-x-1/2 -translate-y-1/2 bg-white z-3 rounded-md flex flex-col items-center '>
                <div className='w-fit text-nowrap'> Add a n entry manually</div>
                <form className = "font-zain text-xl text-gray-800 m-4 w-2/3 h-10 bg-gray-100 opacity-90 flex flex-row items-center justify-between text-center rounded-md"
                    onSubmit={handleSubmit}
                >
                    <input className={`mx-auto text-gray-800 self-center cursor-pointer text-center`}
                        type = "date"
                        value={currentEntry.year + '-' + currentEntry.month + '-' + currentEntry.day}
                        onChange={(e)=>{
                            const day: string = e.target.value.split('-')[2];
                            const month: string = e.target.value.split('-')[1];
                            const year: string = e.target.value.split('-')[0];

                            setCurrentEntry({ day, month, year });
                        }}
                    />
                    <button className='h-full w-12 bg-green-200 cursor-pointer flex items-center justify-center rounded-r-md self-end'
                        type = "submit"
                    ><ChevronRightIcon onClick = {() => setIsFullSize(!isFullSize)} className={`w-4 h-4 text-gray-800 cursor-pointer ${isFullSize ? '' : 'rotate-180'}`} /></button>
                </form>
            </div>
            }
        </div>
    )
}

export default Menu
