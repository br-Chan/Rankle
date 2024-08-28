export type ButtonFormData = {
    label: string;
    score: number | null;
}

export const ButtonModuleForm = ({ queryText, data }: { queryText: string, data: ButtonFormData[] }) => {
    const handleLabelChange = (value: string) => {
        console.log(value)
    }

    return (
        <>
            {/* Query text input */}
            <input
                type="text"
                id="queryText"
                className="px-1 py-2 border rounded-lg outline-none bg-white bg-opacity-50 text-center text-xl font-bold focus:border-amber-500"
                // value={item.label}
                placeholder="query text"
                onChange={(e) => handleLabelChange(e.target.value)}
            />

            {/* Buttons input */}
            <div className="flex flex-row flex-wrap">
                {data.map((item) => (
                    <div className="flex flex-col mb-4">
                        <input
                            type="text"
                            id="label"
                            className="w-20 px-1 py-2 border rounded-lg outline-none bg-white bg-opacity-50 text-center text-2xl font-bold focus:border-amber-500"
                            // value={item.label}
                            placeholder="label"
                            onChange={(e) => handleLabelChange(e.target.value)}
                        />
                        <input
                            type="text"
                            id="score"
                            className="w-20 px-1 py-2 border rounded-lg outline-none bg-white bg-opacity-50 text-center text-2xl font-bold focus:border-amber-500"
                            // value={item.label}
                            placeholder="score"
                            onChange={(e) => handleLabelChange(e.target.value)}
                        />
                    </div>
                ))}
            </div>
        </>


    )
}