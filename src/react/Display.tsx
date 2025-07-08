import type { BudgetEntry } from '../InterfaceBudgetEntry';

function Display({data}: {data: BudgetEntry[] | null}) {
    return  (
        //TODO: Displayt the data in a more user-friendly way
        <div className="h-full w-full mx-5 rounded-md">
            {Array.isArray(data) && data.length > 0 ? (
                data.map((entry, idx) => (
                    <div key={idx} className="font-mono text-sm border-b border-gray-200 py-1">
                        {JSON.stringify(entry)}
                    </div>
                ))
            ) : (
                <div></div>
            )}
        </div>
    )
}

export default Display;
