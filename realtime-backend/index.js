const WebSocketServer = require("ws");
const os = require("node:os");

const wss = new WebSocketServer.Server({ port: 8080 });

wss.on("connection", function connection(ws) {
	ws.on("message", function message(data) {
		console.log("received: %s", data);
	});

	setInterval(async () => {
		const osType = os.platform();
		const machineType = os.machine();
		const platform = os.platform();
		const freeMemory = os.freemem() / 1024 / 1024; //MB
		const totalMemory = os.totalmem() / 1024 / 1024; //MB
		const cpuCores = os.cpus().length;
		const hostname = os.hostname();
		const cupInfo = os.cpus();
		const networkInterfaces = os.networkInterfaces();
		const uptime = os.uptime(); //seconds

		const response = {
			operating_system: osType,
			uptime: `${(uptime / 60).toFixed(2)} minutes`,
			machine: machineType,
			platform: platform,
			free_memory: freeMemory.toFixed(2),
			total_memory: totalMemory.toFixed(2),
			memory_unit: "MB",
			cpu_cores: cpuCores,
			cpu_info: cupInfo,
			hostname: hostname,
			network_interfaces: networkInterfaces,
		};
		const sysDetails = JSON.stringify(response);
		ws.send(sysDetails);
	}, 1000);
});
