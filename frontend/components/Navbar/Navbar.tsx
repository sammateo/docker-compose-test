import Link from "next/link";
import React from "react";
interface navLinkInterface {
	name: string;
	link: string;
}
export default function Navbar() {
	const navLinks: navLinkInterface[] = [
		{
			name: "Home",
			link: "/",
		},
		{
			name: "Hello World",
			link: "/hello",
		},
		{
			name: "Recipes",
			link: "/eats/categories",
		},
		{
			name: "System",
			link: "/system",
		},
		{
			name: "Realtime",
			link: "/realtime",
		},
	];
	return (
		<div className="flex flex-wrap w-full justify-center gap-x-5 py-5">
			{navLinks.map((navItems) => (
				<Link
					href={navItems.link}
					key={navItems.name}
					className="border-2 px-2 text-center rounded-full border-transparent hover:border-slate-600 transition-all duration-300 ease-in-out active:bg-slate-500 active:text-white"
				>
					{navItems.name}
				</Link>
			))}
		</div>
	);
}
