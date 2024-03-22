import { PiPenNibStraightBold } from "react-icons/pi";

export const NavBar: React.FC = () => {
    return (
        <nav className="sticky rounded-full top-5 z-30 bg-opacity-60 mx-5 bg-gray-200 backdrop-filter backdrop-blur-md px-10 border-[1px] border-gray-200">
            <div className="max-w-8xl mx-auto px-0">
                <div className="flex items-center justify-between h-14">
                    <span className="text-2xl text-gray-900 font-semibold">
                        <PiPenNibStraightBold className="h-8 w-8 text-black" />
                    </span>
                    <div className="flex space-x-5 text-gray-900">
                        <a href="#">Projects</a>
                        <a href="#">Upload Documents</a>
                        <a href="#">Theme</a>
                    </div>
                </div>
            </div>
        </nav>
    );
};
