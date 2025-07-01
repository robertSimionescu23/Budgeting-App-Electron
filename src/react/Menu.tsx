import { useState, useEffect, useRef} from 'react';
import { ChevronLeftIcon,ChevronRightIcon, PlusIcon } from '@heroicons/react/24/solid';
import YearTab from './YearTab';


function Menu() {
    const sysDate = new Date();
    const [currentDate, setCurrentDate] = useState(sysDate);

    const [yearsToRefresh, setYearsToRefresh] = useState<Record<number, boolean>>({});

    const toggleYear = (year: number) => { //Add an array for keeping track of what year needs a refresh
        setYearsToRefresh(prev => ({
            ...prev,
            [year]: !prev[year],
        }));
    };

    const [isFullSize, setIsFullSize] = useState(true);
    const [chooseYear, setChooseYear] = useState(false);
    const [yearTabs, setYearTabs] = useState<number[]>([]);

    useEffect(() => {
        window.electronAPI.getSubmittedYears().then((years: number[]) => {
            setYearTabs(years.sort((a, b) => a - b));
        });
    }, []);



    function handleSubmit(e: React.FormEvent) {
        setChooseYear(false);
        setYearTabs(prev => {
            const newYear = currentDate.getFullYear();
            if (!prev.includes(newYear)) {
                return [...prev, newYear].sort((a, b) => a - b);
            }
            return prev;
        });
        const data = [{
                date: currentDate.toISOString().split('T')[0],
                amount: 0,
                category: "test",
            }];
        window.electronAPI.saveJson(currentDate.getFullYear(), data);
        setCurrentDate(sysDate);
        toggleYear(currentDate.getFullYear()); //Toggle a refresh when data is added to the year. It will do nothing if the year tab is not selected
    }


    return (
        <div className={`bg-gray-100 h-full rounded-2xl p-5 flex flex-col items-start ${isFullSize ? 'w-2/5' : 'w-24'}`}>
            <div className={`w-full flex flex-row ${isFullSize? "justify-end" : "justify-center"} mb-2`}>
                {isFullSize && <PlusIcon onClick = {() => setChooseYear(!chooseYear)}  className="w-4 h-4 text-gray-600 cursor-pointer" />}
                <ChevronLeftIcon onClick = {() => setIsFullSize(!isFullSize)} className={`w-4 h-4 text-gray-600 cursor-pointer ${isFullSize ? '' : 'rotate-180'}`} />
            </div>
            <div className = "w-full">
                    {yearTabs.map(year => (
                        <YearTab
                         key={year}
                         isFullSize={isFullSize}
                         year={year}
                         needsRefresh = {!!yearsToRefresh[year]}
                         toggleRefresh = {() => toggleYear(year)}
                         />
                    ))}
            </div>
            {chooseYear && <div onClick = {() => {setChooseYear(false); setCurrentDate(sysDate)}} className = {"z-2 absolute inset-0 bg-gray-500 w-full h-full opacity-20"}></div>}
            {chooseYear &&
            <div className='font-zain text-gray-800 text-lg pt-4 absolute inset-1/2 w-1/2 h-1/2 -translate-x-1/2 -translate-y-1/2 bg-white z-3 rounded-md flex flex-col items-center '>
                <div className='w-fit text-nowrap'> Add a n entry manually</div>
                <form className = "font-zain text-xl text-gray-800 m-4 w-2/3 h-10 bg-gray-100 opacity-90 flex flex-row items-center justify-between text-center rounded-md"
                    onSubmit={handleSubmit}
                >
                    <input className={`mx-auto text-gray-800 self-center cursor-pointer text-center`}
                        type = "date"
                        value={currentDate.toISOString().split('T')[0]}
                        onChange={(e)=>{
                            setCurrentDate(new Date(e.target.value));
                        }}
                    />
                    <button className='h-full w-12 bg-green-200 cursor-pointer flex items-center justify-center rounded-r-md self-end'
                        type = "submit"
                    ><ChevronRightIcon  className={`w-4 h-4 text-gray-800 cursor-pointer`} /></button>
                </form>
            </div>
            }
        </div>
    )
}

export default Menu
