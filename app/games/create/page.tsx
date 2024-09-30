import { CreateForm } from "@/app/ui/games/createForm";

/**
 * Page where users can create their own games.
 * 
 * @returns Create form page
 */
export default function Home() {
    return (
        <main className="flex flex-col justify-center w-[288px] md:w-[576px] text-center">
            <h1 className="gap-2 text-center text-2xl font-black">CREATE</h1>
            <p>Add a game to Rankle!</p>
            <CreateForm />
        </main>
    );
}
