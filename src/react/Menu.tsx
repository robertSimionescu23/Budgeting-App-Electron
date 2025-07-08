import { useState, useEffect, useRef} from 'react';
import { ChevronLeftIcon,ChevronRightIcon, PlusIcon } from '@heroicons/react/24/solid';
import type { BudgetEntry } from '../InterfaceBudgetEntry';
import YearTab from './YearTab';
import BudgetTab from "./BudgetTab";

function Menu ({setDisplayData}: {setDisplayData: (data: BudgetEntry[]) => void}) {
    //Current date
    const sysDate = new Date();

    //State varaibles
    const [addedDate     , setAddedDate]          = useState(sysDate);
    const [addedEntryData, setAddedEntryData]     = useState<{amount: number, category: string, description?: string}>({amount: 0, category: "test"});
    const [yearsToRefresh, setYearsToRefresh]     = useState<Record<number, boolean>>({});
    const [isFullSize    , setIsFullSize]         = useState(true);
    const [showAddTab    , setShowAddTab]         = useState(false);
    const [yearTabs      , setYearTabs]           = useState<number[]>([]);
    type  SelectedType = { year: number; month?: string; day?: string } | null;
    const [selected, setSelected] = useState<SelectedType>(null);

    const toggleRefreshForYear = (year: number) => {
        setYearsToRefresh(prev => ({
            ...prev,
            [year]: !prev[year],
        }));
    };

    //Read the JSON save files to generate the year tabs.
    useEffect(() => {
        window.electronAPI.getSubmittedYears().then((years: number[]) => {
            setYearTabs(years.sort((a, b) => a - b));
        });
    }, []);


    function handleSubmit(e: React.FormEvent) {
        setShowAddTab(false); //Close the add year box once submit is pressed

        setYearTabs(prev => {
            const newYear = addedDate.getFullYear();
            let yearTabsToDisplay: number[];

            if (!prev.includes(newYear)) //Check if the year about to be added already is shown.
                yearTabsToDisplay = [...prev, newYear].sort((a, b) => a - b); //Append new year than sort ascending if it's unique
            else
                yearTabsToDisplay = [...prev]; //Give the old array if not

            return yearTabsToDisplay;
        });

        const data = [{
                date: addedDate.toISOString().split('T')[0], //The date object is formated like "1970-01-01T00:00:00.000Z". By calling this, we can get the date in YYYY-MM-DD format
                amount: addedEntryData.amount,        //TODO: Add amount handling
                category: addedEntryData.category, //TODO: Add category handling
            }];
        window.electronAPI.saveJson(addedDate.getFullYear(), data); //Save to the sava data JSON

        setAddedDate(sysDate); //Reset the date to the current date
        toggleRefreshForYear(addedDate.getFullYear()); //Toggle a refresh when data is added to the year. It will do nothing if the year tab is not selected
    }


    return (
        <div className={`bg-gray-100 overflow-y-auto box-content rounded-2xl p-5 flex flex-col items-start ${isFullSize ? 'w-2/4' : 'w-20'}`}>
            <div className={`w-full flex flex-row ${isFullSize? "justify-end" : "justify-center"} mb-2`}>
                {isFullSize &&
                <PlusIcon //Add entry button
                    onClick = {() => setShowAddTab(!showAddTab)}
                    className="w-4 h-4 text-gray-600 cursor-pointer"
                />}

                <ChevronLeftIcon //Minimize tray button
                    onClick = {() => setIsFullSize(!isFullSize)}
                    className={`w-4 h-4 text-gray-600 cursor-pointer ${isFullSize ? '' : 'rotate-180'}`}
                />
            </div>
            <BudgetTab
                isFullSize={isFullSize}
                selected={selected}
                setSelected={setSelected}
                setDisplayData={setDisplayData}
            />
            <div className = "w-full">
                    {yearTabs.map(year => (
                        <YearTab
                            key={year}
                            isFullSize={isFullSize}
                            year={year}
                            setDisplayData={setDisplayData}
                            needsRefresh={!!yearsToRefresh[year]}
                            toggleRefresh={() => toggleRefreshForYear(year)}
                            selected={selected}
                            setSelected={setSelected}
                        />
                    ))}
            </div>

            {showAddTab &&
            <div
                onClick = {() => {setShowAddTab(false); setAddedDate(sysDate)}}
                className = {"z-2 absolute inset-0 bg-gray-500 w-full h-full opacity-20"}>
            </div>}

            {showAddTab &&
            <div className='font-zain text-gray-800 text-lg pt-4 absolute inset-1/2 lg:w-1/2 md:w-120 sm: w-80 h-1/2 -translate-x-1/2 -translate-y-1/2 bg-white z-3 rounded-md flex flex-col items-center '>
                <div className='w-fit text-nowrap text-3xl'> Add an entry manually</div>
                <form
                    className="font-zain text-xl text-gray-800 m-4 w-2/3  flex flex-col items-center text-center "
                    onSubmit={handleSubmit}
                >
                    <div className="w-full  h-10 flex flex-row items-center justify-between  bg-gray-100 opacity-90 rounded-md ring-2 ring-gray-400">
                        <input
                            className="text-2xl mx-auto text-gray-800 self-center cursor-pointer text-center "
                            type="date"
                            value={addedDate.toISOString().split('T')[0]}
                            onChange={e => setAddedDate(new Date(e.target.value))}
                        />
                        <button
                            className="h-full w-12 bg-green-200 cursor-pointer flex items-center justify-center rounded-r-md self-end p-1"
                            type="submit"
                        >
                            <ChevronRightIcon className="w-6 h-6 text-gray-800 cursor-pointer" />
                        </button>
                    </div>
                    <div className="my-2 w-full flex flex-col lg:flex-row items-center justify-between ">
                        <div className='flex flex-col lg:flex-row'>
                            <div className="text-2xl lg:mr-6 ">Amount</div>
                            <input
                                className="lg:mr-6 w-15 text-gray-800 self-center cursor-pointer text-center bg-gray-100 opacity-90 rounded-md ring-2 ring-gray-400"
                                type="number"
                                value={addedEntryData.amount > 0? addedEntryData.amount : ''}
                                onChange={e => setAddedEntryData(prev => ({
                                  ...prev,
                                  amount: Number(e.target.value)
                                }))}
                            />
                        </div>
                        <div className = "flex flex-col lg:flex-row ">
                            <div className="text-2xl lg:mr-6">Category</div>
                            <input
                                className="lg:mr-6 w-25 text-gray-800 self-center cursor-pointer text-center bg-gray-100 opacity-90 rounded-md ring-2 ring-gray-400"
                                type="text"
                                onChange={e => setAddedEntryData(prev => ({
                                  ...prev,
                                  category: String(e.target.value)
                                }))}
                                />
                        </div>
                    </div>
                </form>
            </div>
            }
        </div>
    )
}

export default Menu
