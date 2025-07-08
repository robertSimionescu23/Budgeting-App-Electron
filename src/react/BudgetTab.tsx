import {useState} from 'react';
import { BudgetEntry } from '../InterfaceBudgetEntry';

type SelectedType = { year: number; month?: string; day?: string } | null;

function BudgetTab( {
    isFullSize,
    selected,
    setSelected,
    setDisplayData
    }:{
    setDisplayData: (data: BudgetEntry[]) => void;
    isFullSize: boolean;
    selected: SelectedType;
    setSelected: (sel: SelectedType) => void;
    }) {


    const isSelected = selected == null? true : false;
    return (
        <div
            onClick={() => {
                setSelected(null);
                setDisplayData([]); // Clear display data when budgets tab is selected
            }}
           className={`text-2xl font-zain select-none w-full h-12 rounded-md flex items-center max-w-96 cursor-pointer bg-purple-200 mb-2 ${isFullSize ? "p-5" : "p-2 justify-center"} ${isSelected ? ' ring-3 ring-pink-400' : ''}`}
        >
            Budgets
        </div>
    )
}

export default BudgetTab
