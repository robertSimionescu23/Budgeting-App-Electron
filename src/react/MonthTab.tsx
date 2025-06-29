function MonthTab({ month, isFullSize } :{month: string; isFullSize: boolean}) {


    return (
        <>
            <div className = {`font-zain select-none bg-purple-200 h-8 rounded-md flex items-center mb-1 max-w-96 cursor-pointer ${isFullSize? "p-5 w-2/3" : "p-2 justify-center w-4/5"} `} > {isFullSize? month : month.slice(0,3)} </div>
        </>
    )
}

export default MonthTab;
