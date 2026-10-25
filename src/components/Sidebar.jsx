import { Menu, CircleX, LayoutDashboard, Book, ListChecks, Timer, ChartColumn } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useState } from "react";

const Sidebar = () => {
    const [open, setOpen] = useState(false);
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
                <li className={`mb-2 p-2 flex items-center ${open ? "space-x-2" : "justify-center"}`}>
                    <MenuIcon onClick={() => setOpen(!open)} className="cursor-pointer shrink-0" size={20} />
                </li>
                {menus?.map((menu, index) => (
                    <li key={index}>
                        <NavLink to={menu.link} className={({ isActive }) => `
                        flex items-center mb-2 p-2 hover:bg-gray-600 transition-all rounded-md
                        ${open ? "space-x-2" : "justify-center"}
                        ${isActive ? "bg-gray-700" : ""}`}>
                            <menu.icon size={20} className="shrink-0" />
                            {open && <span>{menu.name}</span>}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    </aside>
  );
}

export default Sidebar;