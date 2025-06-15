import Menu from "./Menu";
import TitleBar from "./TitleBar";

function App() {

    return (
        <>
            <TitleBar />

            <div className="h-full flex flex-row">
                <Menu />
                <div className="h-full w-full mx-5 rounded-md"></div>
            </div>
        </>
    )
}

export default App
