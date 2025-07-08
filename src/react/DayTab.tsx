import type { BudgetEntry } from '../InterfaceBudgetEntry';


type SelectedType = { year: number; month?: string; day?: string } | null;
function DayTab({
  day,
  isFullSize,
  data,
  setDisplayData,
  year,
  month,
  selected,
  setSelected
}: {
  day: string;
  isFullSize: boolean;
  data?: BudgetEntry[];
  setDisplayData: (data: BudgetEntry[]) => void;
  year: number;
  month: string;
  selected: SelectedType;
  setSelected: (sel: SelectedType) => void;
}) {

    // Determine if this day tab is selected (highlighted)
    const isSelected = selected?.year === year && selected?.month === month && selected?.day === day;
    return (
        <div
            onClick={() => {
                setDisplayData(data);
                setSelected({ year, month, day });
            }}
            className={`font-zain select-none aspect-square rounded-md flex justify-center items-center mb-1 max-w-96 cursor-pointer bg-red-200 ${isFullSize ? "ml-4 h-12" : "h-8"} ${isSelected ? 'ring-3 ring-pink-400' : ''}`}
        >
            {day}
        </div>
    );
}
export default DayTab;
