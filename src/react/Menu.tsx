import YearTab from './YearTab';

function Menu() {
    return (
        <div className="bg-gray-100 h-full w-2/5 rounded-2xl p-5 pr-1 flex items-start justify-between">
        <div className = "w-11/12">
            <YearTab year = {2024} />
        </div>
            <svg className="h-3 w-3  self-center rotate-270" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 490 490">
            <polygon points="245,456.701 490,33.299 0,33.299" fill='#4d4d4d'/>
            </svg>
        </div>
    )
}

export default Menu
