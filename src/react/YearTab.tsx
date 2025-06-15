function YearTab({ year, isFullSize } :{year: number; isFullSize: boolean}) {

  return (
      <div className={`bg-green-200 w-full h-12 rounded-md flex items-center ${isFullSize? "p-5" : "p-2 justify-center"} `}>
       {isFullSize? year : year.toString().slice(-2)}
      </div>
  )
}

export default YearTab
