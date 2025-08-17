import type { JSX } from "react";
import { useState } from "react";

const navItems = [
    {label: "Storefront", href: "/storefront"},
    {label: "Social", href: "/social"},
    {label: "Ranked", href: "/ranked"},
    {label: "Match History", href: "/matches"},
    {label: "Stats", href: "/stats"}
]

export default function Navbar(): JSX.Element {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="fixed top-0 w-full">
            <ul className="hidden md:flex flex-col md:flex-row md:gap-5 mt-10 items-center justify-center">
                <div className="bg-white w-20 h-1 rounded-full"></div>
                { navItems.map(item => (
                    <li className="hover:scale-[0.9] transition">
                        <a className=" text-xl font-[val] text-white " href={item.href}>
                            {item.label}
                        </a>
                    </li>
                )) }
                <div className="bg-white w-20 h-1 rounded-full"></div>
            </ul>

            <div className="flex w-full justify-end items-center">
                <button
                    aria-label="Abrir menú de navegación"
                    aria-controls="mobile-menu"
                    aria-expanded={menuOpen}
                    className="md:hidden p-2 text-white focus:outline-none z-20 mt-5 mr-10"
                    id="mobile-menu-button"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <svg
                        id="icon-hamburger"
                        className={`w-6 h-6 cursor-pointer ${menuOpen ? "hidden" : "block"}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>

                    <svg
                        id="icon-close"
                        className={`w-6 h-6 cursor-pointer ${menuOpen ? "block" : "hidden"}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
                {menuOpen && (
                    <ul className="md:hidden flex flex-col gap-4 bg-[#151515] text-white absolute top-16 left-0 w-full p-5 rounded font-[val] font-bold text-xl shadow-lg z-10">
                      {navItems.map(item => (
                        <li key={item.href} className="hover:scale-[0.95] transition">
                          <a href={item.href}>{item.label}</a>
                        </li>
                      ))}
                    </ul>
                )}
            </div> 
            
        </nav>
    )
}