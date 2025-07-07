import MonthTab from "./MonthTab";
import { useState, useEffect } from "react";
import type { BudgetEntry } from '../InterfaceBudgetEntry';
// TODO: Add a way to choose colors for year tabs and month tabs
type SelectedType = { year: number; month?: string; day?: string } | null;
function YearTab({
  year,
  isFullSize,
  needsRefresh,
  toggleRefresh,
  setDisplayData,
  selected,
  setSelected
}: {
  year: number;
  isFullSize: boolean;
  needsRefresh: boolean;
  toggleRefresh: () => void;
  setDisplayData: (data: BudgetEntry[]) => void;
  selected: SelectedType;
  setSelected: (sel: SelectedType) => void;
}) {
                                     // Add a way to trigger a refresh from the parent component, for whe nwe are adding an element while the year tab is maximized


    //State Variables
    const [isExpanded, setIsExpanded] = useState(false);
    const [monthList , setMonthList]  = useState<string[]>([]);
    const [dayList   , setDayList]    = useState<Record<string, BudgetEntry[]>>({});
    const [yearReport, setYearReport] = useState<BudgetEntry[]>(null);

    useEffect(() => {
        if ((isExpanded && yearReport == null) || (needsRefresh && isExpanded)) { //If the year tab is selected and the report is not loaded, or if a refresh is needed and the tab is selected
            window.electronAPI.getYearReport(year).then(
                (data: BudgetEntry[]) => {
                    setYearReport(data);
                }
            );

            if(needsRefresh) toggleRefresh(); //If refresh was needed, toggle it off as it was called.
        }
    }, [isExpanded, needsRefresh]);

    useEffect(() => {
        if(yearReport != null && Array.isArray(yearReport)) { //Parse the year report into smaller chuncks

            let monthList = Array.from(
                new Set(yearReport.map((entry: BudgetEntry) => entry.date.split('-')[1])) //Convert to Set to remove duplicate values with new Set. Use Array.from to convert back to array.
            );
            monthList = monthList.sort((a, b) => parseInt(a) - parseInt(b)); //Sort months numerically (They are strings).

            setMonthList(monthList);

            monthList.forEach(month => {
                const dayEntriedPerMonth = yearReport.filter(entry => entry.date && entry.date.split('-')[1] === month); //Get each day entry for the month in question
                setDayList(prev => ({ ...prev, [month]: dayEntriedPerMonth })); //Set the dayList with the month as key and the entries as value
            });
        }
    }, [yearReport]);

    // Determine if this year tab is selected (highlighted)
    const isSelected = selected?.year === year && !selected?.month && !selected?.day;

    // Set display data when yearReport is loaded and tab is selected
    useEffect(() => {
        if (isSelected && yearReport) {
            setDisplayData(yearReport);
        }
    }, [isExpanded, yearReport]);


    return (
        <div className={`mb-4 ${isFullSize ? '' : 'flex flex-col items-center justify-center'}`}>
            <div
                onClick={() => {
                    setIsExpanded(exp => !exp);
                    setSelected({ year });
                }}
                className={`font-zain select-none w-full h-12 rounded-md flex items-center mb-1 max-w-96 cursor-pointer bg-green-200 ${isFullSize ? "p-5" : "p-2 justify-center"} ${isSelected ? ' ring-3 ring-pink-400' : ''}`}
            >
                {isFullSize ? year : year.toString().slice(-2)}
            </div>

            {isExpanded && monthList.map(month => (
                <MonthTab
                    key={month}
                    month={month}
                    isFullSize={isFullSize}
                    setDisplayData={setDisplayData}
                    dayList={dayList[month] || []}
                    year={year}
                    selected={selected}
                    setSelected={setSelected}
                />
            ))}
        </div>
    );
}

export default YearTab
