export const dynamic = "force-dynamic";

import Navbar from "@/components/Navbar/Navbar";
import React from "react";
import { mealCategoryInterface } from "../../api/meal/categories/route";
import Link from "next/link";
//https://www.themealdb.com/api.php?ref=public_apis
export default async function Page() {
	let mealCategories: mealCategoryInterface[] = await fetch(
		"http://192.168.1.250:3000/api/meal/categories"
	).then((res) => res.json());
	// console.log(mealCategories);
	return (
		<div>
			<Navbar />
			<div className="mb-4">
				<h1 className=" text-4xl my-4 mx-auto w-fit border-b-4 border-slate-600 pb-2 px-4">
					Categories
				</h1>
				<div className="flex flex-wrap mx-8 gap-8 justify-center">
					{mealCategories &&
						mealCategories.map((category) => (
							<Link
								href={`/eats/categories/${category.strCategory}`}
								key={category.idCategory}
								className="max-w-sm rounded-md flex flex-col gap-2 cursor-pointer relative shadow-md"
							>
								{/* <img
									className="w-20 h-20 object-cover border-2 border-slate-600 rounded-full absolute -left-7 -top-5 bg-white"
									src={category.strCategoryThumb}
									alt={category.strCategory}
								/> */}
								<img
									className="w-full h-32 object-contain bg-gray-200 rounded-t-md"
									src={category.strCategoryThumb}
									alt={category.strCategory}
								/>
								<div className="px-4 pt-4 pb-6">
									<p className=" text-2xl">
										{category.strCategory}
									</p>
									<p className=" text-gray-500 line-clamp-3">
										{category.strCategoryDescription}
									</p>
								</div>
							</Link>
						))}
				</div>
			</div>
		</div>
	);
}
