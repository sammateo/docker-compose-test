import Navbar from "@/components/Navbar/Navbar";
import React, { Suspense } from "react";
import { unstable_noStore as noStore } from "next/cache";

export interface systemInfoInterface {
	operating_system: string;
	uptime: string;
	platform: string;
	free_memory: number;
	total_memory: number;
	memory_unit: string;
	cpu_cores: number;
}

export default async function page() {
	return (
		<div>
			<Navbar />
			<h1 className="w-fit mx-auto text-2xl md:text-4xl">
				System Information
			</h1>
			<Suspense fallback={<div>Loading...</div>}>
				<SystemInfo />
			</Suspense>
		</div>
	);
}

async function SystemInfo() {
	noStore(); // This component should run dynamically
	let systemInfo: systemInfoInterface = await fetch(
		"http://192.168.1.250:3000/api/system"
	).then((res) => res.json());
	// setInterval(async () => {
	// 	systemInfo = await fetch("http://192.168.1.250:3000/api/system").then(
	// 		(res) => res.json()
	// 	);
	// }, 1000);
	const usedMemory: number = systemInfo.total_memory - systemInfo.free_memory;
	const usedMemoryPercentage = (usedMemory / systemInfo.total_memory) * 100;
	return (
		<div className="w-3/6 mx-auto">
			<div className="flex flex-col gap-5 my-4  ">
				<p className="mx-auto w-full border-l-4 px-8 py-4 rounded-none cursor-pointer transition-all duration-300 hover:border-blue-600 hover:bg-gray-100">
					Operating System: {systemInfo.operating_system}
				</p>
				<div className="mx-auto w-full border-l-4 px-8 py-4 rounded-none cursor-pointer transition-all duration-300 hover:border-blue-600 hover:bg-gray-100">
					<p>
						Free Memory: {systemInfo.free_memory}/
						{systemInfo.total_memory} {systemInfo.memory_unit}
					</p>
					<div className="w-full bg-neutral-200 dark:bg-neutral-600 rounded-full flex justify-end">
						<div
							className="bg-green-600 p-0.5 text-center text-xs font-medium leading-none text-white rounded-full"
							style={{
								width: `${(100 - usedMemoryPercentage).toFixed(
									2
								)}%`,
							}}
						>
							{(100 - usedMemoryPercentage).toFixed(2)}%
						</div>
					</div>
					<p>
						Used Memory: {usedMemory.toFixed(2)}/
						{systemInfo.total_memory} {systemInfo.memory_unit}
					</p>
					<div className="w-full bg-neutral-200 dark:bg-neutral-600 rounded-full">
						<div
							className="bg-blue-600 p-0.5 text-center text-xs font-medium leading-none text-white rounded-full"
							style={{
								width: `${usedMemoryPercentage.toFixed(2)}%`,
							}}
						>
							{usedMemoryPercentage.toFixed(2)}%
						</div>
					</div>
				</div>
				<p className="mx-auto w-full border-l-4 px-8 py-4 rounded-none cursor-pointer transition-all duration-300 hover:border-blue-600 hover:bg-gray-100">
					Uptime: {systemInfo.uptime}
				</p>
				<p className="mx-auto w-full border-l-4 px-8 py-4 rounded-none cursor-pointer transition-all duration-300 hover:border-blue-600 hover:bg-gray-100">
					CPU Cores: {systemInfo.cpu_cores}
				</p>
			</div>
			<div></div>
		</div>
	);
}
