import {
    FaBell,
    FaSearch,
    FaUserCircle
} from "react-icons/fa";

function Navbar() {

    return (

        <header className="h-16 bg-white border-b flex items-center justify-between px-8">

            <div className="relative">

                <FaSearch className="absolute left-3 top-3 text-gray-400"/>

                <input

                    type="text"

                    placeholder="Search..."

                    className="pl-10 pr-4 py-2 rounded-lg bg-gray-100 outline-none"

                />

            </div>

            <div className="flex items-center gap-6">

                <FaBell className="text-xl cursor-pointer"/>

                <FaUserCircle className="text-3xl text-gray-700"/>

            </div>

        </header>

    );

}

export default Navbar;