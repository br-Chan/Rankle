/**
 * The site navigation bar and app title located along the top of the screen.
 *
 * @returns navigation bar
 */
export default function TopNav() {
    return (
        <div className="flex justify-between items-center w-full">
            <div className="w-96">
                <button>hihi</button>
            </div>
            <h1 className="text-4xl text-black font-bold">RANKLE</h1>
            <div className="flex justify-end w-96">
                <button>hi</button>
            </div>
        </div>
    );
}
