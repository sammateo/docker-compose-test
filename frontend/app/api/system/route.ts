import { unstable_noStore as noStore } from "next/cache";

export async function GET() {
	noStore(); // This component should run dynamically

	const res = await fetch("http://192.168.1.250:3001/sys" || "", {
		// headers: {
		//   'Content-Type': 'application/json',
		//   'API-Key': process.env.DATA_API_KEY||"",
		// },
	});
	const data = await res.json();

	return Response.json(data);
}
