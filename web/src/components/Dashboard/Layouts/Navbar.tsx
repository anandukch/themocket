const Navbar = () => {
    return (
        <nav className="flex flex-row items-center justify-between h-[40px]">
            <div className="mx-8 max-w-xl flex-1">
                <div className="relative">
                    <input
                        type="text"
                        value={""}
                        placeholder="Search APIs..."
                        className="w-full rounded-md bg-gray-800 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <svg
                            className="h-5 w-5 text-gray-400"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
