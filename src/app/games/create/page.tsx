import StatModuleForm from "@/features/statmodules/components/statModuleForm";

/**
 * Page where users can create their own games.
 *
 * @returns Create form page
 */
const Create = () => {
    return (
        <main className="flex w-[288px] flex-col justify-center text-center md:w-[576px]">
            <h1 className="gap-2 text-center text-2xl font-black">CREATE</h1>
            <p>Add a game to Rankle!</p>
            <StatModuleForm />
        </main>
    );
};

export default Create;
