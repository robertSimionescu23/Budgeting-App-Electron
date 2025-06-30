import {useState} from 'react';
import { BudgetEntry } from '../InterfaceBudgetEntry';

function MonthTab({ month, isFullSize, dayList}: { month: string; isFullSize: boolean, dayList: BudgetEntry[] }) {
    //TODO: add visiuals for days and way to update them if the tab is open
    function monthName() {
        switch(month) {
            case "01": return "January";
            case "02": return "February";
            case "03": return "March";
            case "04": return "April";
            case "05": return "May";
            case "06": return "June";
            case "07": return "July";
            case "08": return "August";
            case "09": return "September";
            case "10": return "October";
            case "11": return "November";
            case "12": return "December";
            default: return month;
        }
    }

    return (
        <>
            <div onClick={() => dayList.forEach(day => console.log(day.date))} className = {`font-zain select-none bg-purple-200 h-8 rounded-md flex items-center mb-1 max-w-96 cursor-pointer ${isFullSize? "p-5 w-2/3" : "p-2 justify-center w-4/5"} `} > {isFullSize? monthName() : monthName().slice(0,3)} </div>

        </>
    )
}

export default MonthTab;
