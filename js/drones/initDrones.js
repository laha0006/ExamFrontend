import {drones, getDrones} from "./api.js";


export default async function initDrones() {
    await getDrones();
    makeRows()
}

function makeRows() {
    const dronesTableBody = document.getElementById("dronesTableBody")
    const rows = drones.map(d => `
    <tr>
    <td>${d.id}</td>
    <td>${d.uuid}</td>
    <td>${d.status}</td>
    <td>${d.station.id}</td>
</tr>
    `)
    dronesTableBody.innerHTML = rows.join("");
}
