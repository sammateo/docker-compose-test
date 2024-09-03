import { mealInterface } from "@/app/api/meal/route";
import Navbar from "@/components/Navbar/Navbar";
import Link from "next/link";
import React from "react";

export default async function Page({ params }: { params: { slug: string } }) {
	let meals: mealInterface[] = await fetch(
		"http://192.168.1.250:3000/api/meal/",
		{
			method: "POST",
			body: JSON.stringify({ meal_id: params.slug }),
		}
	).then((res) => res.json());
	// console.log(meals);
	return (
		<div>
			<Navbar />
			<div className=" max-w-screen-md mx-auto">
				<div>
					{meals &&
						meals.map((meal) => (
							<div key={meal.idMeal} className="px-4">
								<p className="text-2xl text-center w-fit mx-auto border-b-4 border-slate-600 pb-2">
									{meal.strMeal}
								</p>

								<img
									className=" w-full h-80 object-cover object-center mx-auto rounded-lg my-4"
									src={meal.strMealThumb}
									alt={meal.strMeal}
								/>
								<div className="flex gap-2 my-2 font-medium">
									<Link
										className="underline"
										href={`/eats/categories/${meal.strCategory}`}
									>
										{meal.strCategory}
									</Link>
									<span>|</span>
									<p>{meal.strArea}</p>
								</div>
								<div className="flex flex-col gap-4">
									{meal.strInstructions
										.trim()
										.split(". ")
										.map((sentence, index) => (
											<p key={index}>{sentence}</p>
										))}
								</div>
							</div>
						))}
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
