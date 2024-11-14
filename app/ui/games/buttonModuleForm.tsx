/**
 * Data type for button forms, to use when collecting data from the user in the Create form.
 */
export type ButtonFormData = {
    label: string | null;
    score: number | null;
};

/**
 * A 'form' for inputting data for a single button in a button module.
 * 
 * @param props Component props
 * @returns Button module form
 */
export const ButtonModuleForm = ({
    index,
    data,
    handleAddButtonFormClick,
    handleButtonModuleFormChange,
}: {
    index: number;
    data: ButtonFormData[];
    handleAddButtonFormClick: (index: number, add: boolean) => void;
    handleButtonModuleFormChange: (
        fieldType: string,
        newValue: string | number,
        buttonModuleIndex: number,
        buttonIndex: number | null
    ) => void;
}) => {
    return (
        <>
            {/* Query text input */}
            <input
                type="text"
                id="queryText"
                className="px-1 py-2 border-2 rounded-lg outline-none bg-white bg-opacity-50 text-center text-xl font-bold focus:border-amber-500"
                placeholder="Query text"
                autoComplete="off"
                onChange={(e) =>
                    handleButtonModuleFormChange("queryText", e.target.value, index, null)
                }
            />

            {/* Buttons input */}
            <div className="flex flex-row flex-wrap justify-center">
                {data.map((item, i) => (
                    <div
                        key={i}
                        className="group flex flex-col w-24 my-1 mx-1 border-2 border-black rounded-lg focus-within:border-amber-500"
                    >
                        <input
                            type="text"
                            id={`${i}_label`}
                            className="h-[30px] px-1 py-2 border-b-[1px] rounded-t-md outline-none bg-white bg-opacity-50 text-center text-lg font-bold"
                            // value={i.label}
                            placeholder="label"
                            autoComplete="off"
                            onChange={(e) =>
                                handleButtonModuleFormChange("label", e.target.value, index, i)
                            }
                        />
                        <input
                            type="number"
                            id={`${i}_score`}
                            className="h-[30px] px-1 py-2 pl-5 border-t-[1px] rounded-b-md outline-none bg-white bg-opacity-50 text-center text-lg text-gray-700"
                            // value={i.score}
                            placeholder="score"
                            autoComplete="off"
                            onChange={(e) =>
                                handleButtonModuleFormChange(
                                    "score",
                                    Number(e.target.value),
                                    index,
                                    i
                                )
                            }
                        />
                    </div>
                ))}

                <div
                    key={index}
                    className="group flex flex-col w-24 my-1 mx-1 border-2 border-black rounded-lg"
                >
                    <input
                        type="button"
                        id="addInputModuleForm"
                        className="h-[30px] border-b-[1px] border-amber-200 rounded-t-md outline-none bg-amber-300 hover:bg-amber-500 text-black font-mono cursor-pointer"
                        onClick={() => {
                            handleAddButtonFormClick(index, true);
                        }}
                        value="+Button"
                    />
                    <input
                        type="button"
                        id="removeInputModuleForm"
                        className="h-[30px] border-t-[1px] border-amber-200 rounded-b-md outline-none bg-amber-300 hover:bg-amber-500 text-black font-mono cursor-pointer"
                        onClick={() => {
                            handleAddButtonFormClick(index, false);
                        }}
                        value="-Button"
                    />
                </div>
            </div>
        </>
    );
};
