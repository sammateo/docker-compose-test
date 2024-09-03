export interface mealCategoryInterface {
	idCategory: string;
	strCategory: string;
	strCategoryThumb: string;
	strCategoryDescription: string;
}

export interface mealByCategoryInterface {
	strMeal: string;
	strMealThumb: string;
	idMeal: string;
}
export async function GET() {
	const res = await fetch(
		"https://www.themealdb.com/api/json/v1/1/categories.php",
		{
			// headers: {
			//   'Content-Type': 'application/json',
			//   'API-Key': process.env.DATA_API_KEY||"",
			// },
		}
	);
	const rawData = await res.json();
	const data: mealCategoryInterface[] = await rawData.categories;

	return Response.json(data);
}

export async function POST(req: Request) {
	const { category } = await req.json();

	const res = await fetch(
		`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
	);
	const rawData = await res.json();
	const data: mealByCategoryInterface[] = await rawData.meals;

	return Response.json(data);
}
