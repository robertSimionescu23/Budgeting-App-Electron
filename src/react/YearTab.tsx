import MonthTab from "./MonthTab";
import { useState, useEffect } from "react";
import type { BudgetEntry } from '../InterfaceBudgetEntry';
// TODO: Add a way to choose colors for year tabs and month tabs
function YearTab({ year, isFullSize, needsRefresh, toggleRefresh } :{year: number; isFullSize: boolean; needsRefresh: boolean; toggleRefresh: () => void}) {
                                     // Add a way to trigger a refresh from the parent component, for whe nwe are adding an element while the year tab is maximized
    const [isSelected, setIsSelected] = useState(false);
    const [monthList, setMonthList] = useState<string[]>([]);
    const [report, setReport] = useState<BudgetEntry[]>(null);


    useEffect(() => {
        if ((isSelected && report == null) || (needsRefresh && isSelected)) {
            window.electronAPI.getYearReport(year).then((data: BudgetEntry[]) => {
                setReport(data);
            });
            if(needsRefresh) toggleRefresh(); //If refresh was needed, toggle it off as it was called.
        }
    }, [isSelected, needsRefresh]);

    useEffect(() => {
        if(report != null && Array.isArray(report)) {
            let monthList = Array.from(
                new Set(report.map((entry: BudgetEntry) => entry.date.split('-')[1])) //Convert to Set to remove duplicate values with new Set. Use Array.from to conver back to array.
            );
            monthList = monthList.sort((a, b) => parseInt(a) - parseInt(b)); //Sort months numerically (They are strings).
            monthList = monthList.map(month => {
                switch(month) { //Get the actual month names
                    case '01': return 'January';
                    case '02': return 'February';
                    case '03': return 'March';
                    case '04': return 'April';
                    case '05': return 'May';
                    case '06': return 'June';
                    case '07': return 'July';
                    case '08': return 'August';
                    case '09': return 'September';
                    case '10': return 'October';
                    case '11': return 'November';
                    case '12': return 'December';
                    default: return month;
                }
            });
            setMonthList(monthList);
        }
    }, [report]);

    return (
        <div className={`mb-4 ${isFullSize ? '' : 'flex flex-col items-center justify-center'}`}>
            <div onClick={()=>{setIsSelected(!isSelected); }} className={`font-zain select-none bg-green-200 w-full h-12 rounded-md flex items-center mb-1 max-w-96 cursor-pointer ${isFullSize? "p-5" : "p-2 justify-center"} `}>
                {isFullSize? year : year.toString().slice(-2)}
            </div>

            {isSelected && monthList.map(month => <MonthTab key={month} month = {month} isFullSize = {isFullSize}></MonthTab>)}
        </div>
    )
}

export default YearTab
