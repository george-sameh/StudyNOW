import { Menu, CircleX, LayoutDashboard, Book, ListChecks, Timer, ChartColumn } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Sidebar = () => {
    const [open, setOpen] = useState(true);
    const menus = [
        { name: "Dashboard", icon: LayoutDashboard, link: "/" },
        { name: "Subjects", icon: Book, link: "/Subjects" },
        { name: "Tasks", icon: ListChecks, link: "/Tasks" },
        { name: "Timer", icon: Timer, link: "/Timer" },
        { name: "Statistics", icon: ChartColumn, link: "/Statistics" },
    ];
        const MenuIcon = open ? CircleX : Menu;

  return (
    <aside className={`${open ? "w-64" : "w-16"} h-screen bg-gray-800 text-white p-4 transition-all duration-300`}>
        <nav>
            <ul>
                <li className="mb-4 flex items-center justify-center">
                    <MenuIcon onClick={() => setOpen(!open)} className="cursor-pointer" size={20} />
                </li>
                {open ? menus?.map((menu, index) => (
                    <li className="mb-2 p-2 hover:bg-gray-600 transition-all rounded-md" key={index}>
                        <Link to={menu.link} className="flex items-center space-x-2">
                            <menu.icon size={20} />
                            <span>{menu.name}</span>
                        </Link>
                    </li>
                )) : menus?.map((menu, index) => (
                    <li className="mb-2 p-2 hover:bg-gray-600 transition-all rounded-md" key={index}>
                        <Link to={menu.link} className="flex items-center justify-center">
                            <menu.icon size={20} className="shrink-0"/>
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    </aside>
  );
}

export default Sidebar;