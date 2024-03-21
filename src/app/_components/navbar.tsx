export const NavBar: React.FC = () => {
    return (
        <nav className="sticky top-0 z-10 bg-opacity-30 bg-white backdrop-filter backdrop-blur-lg ">
            <div className="max-w-8xl mx-auto px-4">
                <div className="flex items-center justify-between h-14">
                    <span className="text-2xl text-gray-900 font-semibold">
                        FPR
                    </span>
                    <div className="flex space-x-4 text-gray-900">
                        <a href="#">Dashboard</a>
                        <a href="#">About</a>
                        <a href="#">Projects</a>
                        <a href="#">Contact</a>
                    </div>
                </div>
            </div>
        </nav>
    );
};
