export type ButtonFormData = {
    label: string;
    score: number | null;
}

export const ButtonModuleForm = ({ queryText, data }: { queryText: string, data: ButtonFormData[] }) => {
    const handleLabelChange = (value: string) => {
        console.log(value)
    }

    const addButtonForm = () => {
        console.log("blee")
    }

    return (
        <>
            {/* Query text input */}
            <input
                type="text"
                id="queryText"
                className="px-1 py-2 border-2 rounded-lg outline-none bg-white bg-opacity-50 text-center text-xl font-bold focus:border-amber-500"
                // value={item.label}
                placeholder="Query text"
                onChange={(e) => handleLabelChange(e.target.value)}
            />

            {/* Buttons input */}
            <div className="flex flex-row flex-wrap">
                {data.map((item, index) => (
                    <div key={index} className="group flex flex-col mb-4 border-2 border-black rounded-lg focus-within:border-amber-500">
                        <input
                            type="text"
                            id="label"
                            className="w-20 h-[30px] px-1 py-2 border-b-[1px] rounded-t-md outline-none bg-white bg-opacity-50 text-center text-lg font-bold"
                            // value={item.label}
                            placeholder="label"
                            autoComplete="off"
                            onChange={(e) => handleLabelChange(e.target.value)}
                        />
                        <input
                            type="text"
                            id="score"
                            className="w-20 h-[30px] px-1 py-2 border-t-[1px] rounded-b-md outline-none bg-white bg-opacity-50 text-center text-lg font-semibold"
                            // value={item.label}
                            placeholder="score"
                            onChange={(e) => handleLabelChange(e.target.value)}
                        />
                    </div>
                ))}
                <input
                    type="button"
                    id="addInputModuleForm"
                    className="w-20 h-16 border-2 border-black rounded-lg bg-white bg-opacity-50 text-black font-semibold transition-colors duration-300 cursor-pointer"
                    onClick={addButtonForm}
                    value="+Button"
                />
            </div>
        </>


    )
}