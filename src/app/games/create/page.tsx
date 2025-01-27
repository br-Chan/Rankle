import StatModuleForm from "@/features/statmodules/components/statModuleForm";

/**
 * Page where users can create their own games.
 *
 * @returns Create form page
 */
const Create = () => {
    return (
        <>
            <h1 className="gap-2 text-2xl font-black">CREATE</h1>
            <p>Add a game to Rankle!</p>

            <div className="pt-6 w-full flex justify-center">
                <StatModuleForm />
            </div>
        </>
    );
};

export default Create;
