function DayTab({day, isFullSize}: {day: string, isFullSize: boolean}) {

    return (
         <div className = {`font-zain select-none bg-red-200 h-8 rounded-md flex items-center mb-1 max-w-96 cursor-pointer ${isFullSize? "p-5 w-1/3" : "p-2 justify-center"} `} > {day} </div>
    );
}
export default DayTab;
