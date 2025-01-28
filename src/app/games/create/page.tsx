import StatModuleForm from "@/features/statmodules/components/statModuleForm";

/**
 * Page where users can create their own games.
 *
 * @returns Create form page
 */
const Create = () => {
    return (
        <>
            <h1 className="text-2xl font-black">CREATE</h1>
            <p>Add a game to Rankle!</p>

            <div className="mt-6 flex flex-col w-full items-center">
                <StatModuleForm />
            </div>
        </>
    );
};

export default Create;
