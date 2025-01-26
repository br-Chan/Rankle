const LoadingGamesBar = () => {
    return (
        <div className="flex flex-col rounded-xl bg-amber-300 px-16 py-1 text-center font-mono text-2xl text-black lg:flex-row">
            <span>Loading games</span>
            <span>...</span>
        </div>
    );
};

export default LoadingGamesBar;
