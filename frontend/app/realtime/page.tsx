"use client";
import React, { useState, useEffect, Suspense } from "react";
import { systemInfoInterface } from "../system/page";
import Navbar from "@/components/Navbar/Navbar";

export default function Page() {
	const [ws, setWs] = useState<WebSocket | undefined>(undefined);
	const [systemInfo, setSystemInfo] = useState<
		systemInfoInterface | undefined
	>();
	useEffect(() => {
		const socket = new WebSocket("ws://192.168.1.250:8080");
		setWs(socket);
		socket.onopen = () => {
			console.log("opened");
		};
		socket.onmessage = (msg) => {
			setSystemInfo(JSON.parse(msg.data));
		};
		socket.onerror = (error) => {
			console.log(error);
		};
		return () => {
			socket.close();
		};
	}, []);
	return (
		<div>
			<Navbar />
			{!systemInfo && (
				<div className="flex justify-center items-center h-[80vh]">
					<p>Connecting..</p>
				</div>
			)}

			{systemInfo && (
				<div className=" w-5/6 md:w-3/6 mx-auto">
					<div className="flex flex-col gap-5 my-4  ">
						<p className="mx-auto w-full border-l-4 px-8 py-4 rounded-none cursor-pointer transition-all duration-300 hover:border-blue-600 hover:bg-gray-100">
							Operating System: {systemInfo.operating_system}
						</p>
						<div className="flex flex-col gap-y-2 mx-auto w-full border-l-4 px-8 py-4 rounded-none cursor-pointer transition-all duration-300 hover:border-blue-600 hover:bg-gray-100">
							<p>
								Free Memory: {systemInfo.free_memory}/
								{systemInfo.total_memory}{" "}
								{systemInfo.memory_unit}
							</p>
							<div className="w-full bg-neutral-200 dark:bg-neutral-600 rounded-full flex justify-end">
								<div
									className="bg-green-600 p-0.5 text-center text-xs font-medium leading-none text-white rounded-full"
									style={{
										width: `${(
											(systemInfo.free_memory /
												systemInfo.total_memory) *
											100
										).toFixed(2)}%`,
									}}
								>
									{(
										(systemInfo.free_memory /
											systemInfo.total_memory) *
										100
									).toFixed(2)}
									%
								</div>
							</div>
							<p>
								Used Memory:{" "}
								{(
									systemInfo.total_memory -
									systemInfo.free_memory
								).toFixed(2)}
								/{systemInfo.total_memory}{" "}
								{systemInfo.memory_unit}
							</p>
							<div className="w-full bg-neutral-200 dark:bg-neutral-600 rounded-full">
								<div
									className="bg-blue-600 p-0.5 text-center text-xs font-medium leading-none text-white rounded-full"
									style={{
										width: `${(
											((systemInfo.total_memory -
												systemInfo.free_memory) /
												systemInfo.total_memory) *
											100
										).toFixed(2)}%`,
									}}
								>
									{(
										((systemInfo.total_memory -
											systemInfo.free_memory) /
											systemInfo.total_memory) *
										100
									).toFixed(2)}
									%
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
			)}
		</div>
	);
}
