export type ButtonFormData = {
    label: string;
    score: number | null;
}

export const ButtonModuleForm = ({
    index,
    queryText,
    data,
    handleAddButtonFormClick,
}: {
    index: number,
    queryText: string,
    data: ButtonFormData[],
    handleAddButtonFormClick: (index: number, add: boolean) => void,
}) => {

    const handleLabelChange = (label: string) => {
        console.log(label)
    }

    const handleScoreChange = (score: number) => {
        console.log(score);
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
            <div className="flex flex-row flex-wrap justify-center">
                {data.map((item, index) => (
                    <div key={index} className="group flex flex-col w-24 my-1 mx-1 border-2 border-black rounded-lg focus-within:border-amber-500">
                        <input
                            type="text"
                            id="label"
                            className="h-[30px] px-1 py-2 border-b-[1px] rounded-t-md outline-none bg-white bg-opacity-50 text-center text-lg font-bold"
                            // value={item.label}
                            placeholder="label"
                            autoComplete="off"
                            onChange={(e) => handleLabelChange(e.target.value)}
                        />
                        <input
                            type="number"
                            id="score"
                            className="h-[30px] px-1 py-2 pl-5 border-t-[1px] rounded-b-md outline-none bg-white bg-opacity-50 text-center text-lg font-semibold"
                            // value={item.label}
                            placeholder="score"
                            autoComplete="off"
                            onChange={(e) => handleScoreChange(Number(e.target.value))}
                        />
                    </div>
                ))}

                <div key={index} className="group flex flex-col w-24 h-16 my-1 mx-1 border-2 border-black rounded-lg bg-white bg-opacity-50">
                    <input
                        type="button"
                        id="addInputModuleForm"
                        className="h-[30px] border-b-[1px] rounded-t-md outline-none bg-white bg-opacity-50 text-black font-mono transition-colors duration-300 cursor-pointer"
                        onClick={() => {
                            console.log("+Button clicked")
                            handleAddButtonFormClick(index, true)
                        }}
                        value="+Button"
                    />
                    <input
                        type="button"
                        id="addInputModuleForm"
                        className="h-[30px] border-b-[1px] rounded-t-md outline-none bg-white bg-opacity-50 text-black font-mono transition-colors duration-300 cursor-pointer"
                        onClick={() => {
                            console.log("-Button clicked")
                            handleAddButtonFormClick(index, false)
                        }}
                        value="-Button"
                    />
                </div>



            </div>
        </>


    )
}