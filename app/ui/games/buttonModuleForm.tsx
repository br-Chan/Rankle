import { z } from "zod";

export const ButtonFormDataSchema = z.object({
    label: z.string(),
    score: z.number(),
});

/**
 * Data type for button forms, to use when collecting data from the user in the Create form.
 */
export type ButtonFormData = z.infer<typeof ButtonFormDataSchema>;

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
                className="w-full rounded-lg border-2 bg-white bg-opacity-50 px-1 py-2 text-center text-xl font-bold outline-none focus:border-amber-500 dark:placeholder-gray-600"
                placeholder="Query text"
                autoComplete="off"
                onChange={(e) =>
                    handleButtonModuleFormChange("queryText", e.target.value, index, null)
                }
                required
            />

            {/* Buttons input */}
            <div className="flex flex-row flex-wrap justify-center">
                {data.map((item, i) => (
                    <div
                        key={i}
                        className="group mx-1 my-1 flex w-24 flex-col rounded-lg border-2 border-gray-200 focus-within:border-amber-500"
                    >
                        <input
                            type="text"
                            id={`${i}_label`}
                            className="h-[30px] rounded-t-md border-b-[1px] bg-white bg-opacity-50 px-1 py-2 text-center text-lg font-bold outline-none dark:placeholder-gray-600"
                            // value={i.label}
                            placeholder="label"
                            autoComplete="off"
                            onChange={(e) =>
                                handleButtonModuleFormChange("label", e.target.value, index, i)
                            }
                            required
                        />
                        <input
                            type="number"
                            id={`${i}_score`}
                            className="h-[30px] rounded-b-md border-t-[1px] bg-white bg-opacity-50 px-1 py-2 pl-5 text-center text-lg text-gray-700 outline-none dark:text-white dark:placeholder-gray-600"
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
                            required
                        />
                    </div>
                ))}

                <div
                    key={index}
                    className="group mx-1 my-1 flex w-24 flex-col rounded-lg border-2 border-black"
                >
                    <input
                        type="button"
                        id="addInputModuleForm"
                        className="h-[30px] cursor-pointer rounded-t-md border-b-[1px] border-amber-200 bg-amber-300 font-mono text-black outline-none hover:bg-amber-500"
                        onClick={() => {
                            handleAddButtonFormClick(index, true);
                        }}
                        value="+Button"
                    />
                    <input
                        type="button"
                        id="removeInputModuleForm"
                        className="h-[30px] cursor-pointer rounded-b-md border-t-[1px] border-amber-200 bg-amber-300 font-mono text-black outline-none hover:bg-amber-500"
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
