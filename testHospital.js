const db = require("./simple-db");
const hospitalService = require("./services/system/hospitalService");

async function test(){

await db.connect();

const existingHospital = await hospitalService.getHospital();

if(!existingHospital){

console.log("No hospital found. Creating one...");

await hospitalService.createHospital({
name: "Demo Clinic",
registration: "REG-001",
gst: "GST-001",
address: "Lucknow",
phone: "9999999999",
email: "clinic@example.com"
});

console.log("Hospital created successfully");

}else{

console.log("Hospital already exists");
console.log(existingHospital);

}

}

test();