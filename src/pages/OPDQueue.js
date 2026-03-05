import React, { useEffect, useState } from "react";
import OPDService from "../services/opdService";

function OPDQueue() {

const [queue, setQueue] = useState([]);

async function loadQueue() {

const data = await OPDService.getTodayQueue();
setQueue(data);

}

useEffect(() => {

loadQueue();

const interval = setInterval(loadQueue, 5000);

return () => clearInterval(interval);

}, []);

async function callPatient(id) {

await OPDService.callPatient(id);
loadQueue();

}

async function finishPatient(id) {

await OPDService.finishConsultation(id);
loadQueue();

}

return (

<div>

<h2>OPD Queue</h2>

<table border="1" cellPadding="10">

<thead>
<tr>
<th>Token</th>
<th>Patient</th>
<th>Status</th>
<th>Action</th>
</tr>
</thead>

<tbody>

{queue.map((visit) => (

<tr key={visit.id}>

<td>{visit.token_number}</td>

<td>
{visit.first_name} {visit.last_name}
</td>

<td>{visit.status}</td>

<td>

{visit.status === "WAITING" && (
<button onClick={() => callPatient(visit.id)}>
Call
</button>
)}

{visit.status === "IN_CONSULTATION" && (
<button onClick={() => finishPatient(visit.id)}>
Finish
</button>
)}

</td>

</tr>

))}

</tbody>

</table>

</div>

);

}

export default OPDQueue;