import {useState, useEffect} from 'react';
import type { BudgetEntry } from '../InterfaceBudgetEntry';
import DayTab from './DayTab';

type SelectedType = { year: number; month?: string; day?: string } | null;
function MonthTab({
  month,
  isFullSize,
  dayList,
  setDisplayData,
  year,
  selected,
  setSelected
}: {
  month: string;
  isFullSize: boolean;
  dayList: BudgetEntry[];
  setDisplayData: (data: BudgetEntry[]) => void;
  year: number;
  selected: SelectedType;
  setSelected: (sel: SelectedType) => void;
}) {
    const [isExpanded, setIsExpanded] = useState(false);

    // Map month number to name and color
    const monthInfo: Record<string, { name: string; color: string }> = {
        "01": { name: "January"  , color: "bg-blue-300"  },
        "02": { name: "February" , color: "bg-blue-400"  },
        "03": { name: "March"    , color: "bg-green-200" },
        "04": { name: "April"    , color: "bg-green-300" },
        "05": { name: "May"      , color: "bg-green-400" },
        "06": { name: "June"     , color: "bg-yellow-200"},
        "07": { name: "July"     , color: "bg-yellow-300"},
        "08": { name: "August"   , color: "bg-yellow-400"},
        "09": { name: "September", color: "bg-orange-200" },
        "10": { name: "October"  , color: "bg-orange-300" },
        "11": { name: "November" , color: "bg-orange-400" },
        "12": { name: "December" , color: "bg-blue-200"  }
    };
    const { name, color } = monthInfo[month] || { name: month, color: "" };
    const isSelected = selected?.year === year && selected?.month === month && !selected?.day;

    // Set display data when yearReport is loaded and tab is selected
    useEffect(() => {
            if (isSelected) {
                setDisplayData(dayList);
            }
        }, [isSelected, dayList]);


    // Filter to unique entries by date, keeping the first occurrence
    let uniqueDayList =  Array.from(new Set(dayList.map((entry: BudgetEntry) => entry.date.split("-")[2])));
    uniqueDayList = uniqueDayList.sort((a, b) => parseInt(a) - parseInt(b));
    // Determine if this month tab is selected (highlighted)
    return (
        <>
            <div
                onClick={() => {
                    setIsExpanded(exp => !exp);
                    setSelected({ year, month });
                }}
                className={`font-zain select-none ${color} h-10 rounded-md flex items-center mb-1 max-w-96 cursor-pointer ${isFullSize ? "ml-2 p-4 w-2/3" : "p-2 justify-center w-4/5"} ${isSelected ? 'ring-3 ring-pink-400' : ''}`}
            >
                {isFullSize ? name : name.slice(0, 3)}
            </div>
            {isExpanded && uniqueDayList.map((day, index) => (
                <DayTab
                    key={index}
                    day={day}
                    setDisplayData={setDisplayData}
                    data={dayList.filter((entry: BudgetEntry) => entry.date && entry.date.split("-")[2] === day)}
                    isFullSize={isFullSize}
                    year={year}
                    month={month}
                    selected={selected}
                    setSelected={setSelected}
                />
            ))}
        </>
    );
}

export default MonthTab;
