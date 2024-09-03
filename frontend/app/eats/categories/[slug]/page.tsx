import { mealByCategoryInterface } from "@/app/api/meal/categories/route";
import Navbar from "@/components/Navbar/Navbar";
import Link from "next/link";
import React from "react";

export default async function Page({ params }: { params: { slug: string } }) {
	let mealByCategories: mealByCategoryInterface[] = await fetch(
		"http://192.168.1.250:3000/api/meal/categories",
		{
			method: "POST",
			body: JSON.stringify({ category: params.slug }),
		}
	).then((res) => res.json());
	// console.log(mealCategories);
	return (
		<div>
			<Navbar />
			<div className="mb-4">
				<h1 className=" text-4xl my-4 mx-auto w-fit border-b-4 border-slate-600 pb-2 px-4">
					{params.slug}
				</h1>
				<div className="flex flex-wrap justify-center items-stretch gap-5">
					{mealByCategories &&
						mealByCategories.map((meal) => (
							<Link
								href={`/eats/meals/${meal.idMeal}`}
								key={meal.idMeal}
								className=" rounded-md cursor-pointer basis-64 shadow-sm shadow-slate-600"
							>
								{/* <img
									src={meal.strMealThumb}
									alt={meal.strMeal}
									className="w-20 h-20 object-cover border-2 mx-auto -top-5 border-slate-600 rounded-full relative bg-white"
								/> */}
								<img
									src={meal.strMealThumb}
									alt={meal.strMeal}
									className="w-full h-32 object-cover mx-auto rounded-t-md"
								/>
								<p className=" max-w-64 text-center px-2 my-4 line-clamp-2 mx-auto">
									{meal.strMeal}
								</p>
							</Link>
						))}

					{!mealByCategories && (
						<div className="text-center h-[50vh] flex flex-col items-center justify-center">
							<p>Not found</p>
						</div>
					)}
				</div>
				<Link
					href="/eats/categories"
					className="underline block mx-auto my-5 w-fit"
				>
					{"<-"} Back to Eats
				</Link>
			</div>
		</div>
	);
}
