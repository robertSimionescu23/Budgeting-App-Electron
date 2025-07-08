import Menu from "./Menu";
import TitleBar from "./TitleBar";
import Display from "./Display";
import {useState} from 'react';
import { BudgetEntry } from "../InterfaceBudgetEntry";


function App() {

    const [displayData, setDisplayData] = useState<BudgetEntry[]>(null);

    return (
        <>
            <TitleBar />

            <div className="h-full flex flex-row">
                <Menu setDisplayData={(data: BudgetEntry[]) => setDisplayData(data)}/>
                <Display data = {displayData}/>
            </div>
        </>
    )
}

export default App
