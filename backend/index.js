const express = require("express");
const path = require("path");
const app = express();
const fs = require("fs");
var temp = require("pi-temperature");

const roadTripImageFolder = "./images";

app.use(express.json()); // for parsing application/json

app.post("/msg", (req, res, next) => {
	const message = req.body.message;
	res.json({ receivedMessage: message });
});

app.get("/test", (req, res, next) => {
	res.json({ message: "Hello World." });
});

app.get("/img", (req, res) => {
	let filePathList = [];
	fs.readdir(roadTripImageFolder, (err, files) => {
		files.forEach((file) => {
			filePathList.push(`${roadTripImageFolder}/${file}`);
			console.log(file);
			console.log(filePathList);
		});
	});
	res.sendFile(
		// path.join(__dirname,`${roadTripImageFolder}/testingzips.zip`)
		path.join(__dirname, `${roadTripImageFolder}/DSC_0746.JPG`)
	);
});

// app.get("/temp",(req,res)=>{
//   temp.measure(function(err, temp) {
//     if (err) {
//       console.error(err);
//       res.status(500).send('Unable to measure temperature.')
//     }
//     else {
//       console.log("It's " + temp + " celsius.");

//       res.json({temperature:temp, unit:"celsius"})
//     }
//   });

// })

app.get("/sys", (req, res) => {
	const os = require("node:os");

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

	// console.log(response)
	res.json(response);
});

app.listen(3001, () => {
	console.log("Server running on port 3001");
});
