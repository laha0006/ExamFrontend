import {disableDrone, drones, enableDrone, getDrones, retireDrone} from "./api.js";



export default async function initDrones() {
    setupHandlers();
    await fetchDronesAndUpdate();
}


async function fetchDronesAndUpdate() {
    await getDrones();
    makeRows();
}

function setupHandlers() {
    document.getElementById("dronesTableBody").onclick = handleDroneTableClick;

}

async function handleDroneTableClick(e) {
    e.preventDefault();
    const target = e.target;
    if(!target || target.tagName.toLowerCase() !== "button") {
        return false;
    }

    if (target.dataset.enableId) {
        await enableDrone(target.dataset.enableId)
    }
    if (target.dataset.disableId) {
        await disableDrone(target.dataset.disableId)
    }
    if (target.dataset.retireId) {
        await retireDrone(target.dataset.retireId)
    }
    await fetchDronesAndUpdate();
}

function makeRows() {
    const dronesTableBody = document.getElementById("dronesTableBody")
    const rows = drones.map(d => `
    <tr>
    <td>${d.id}</td>
    <td>${d.uuid}</td>
    <td>${d.status}</td>
    <td>${d.station.id}</td>
    <td>
    <button data-enable-id="${d.id}" class="btn btn-success my-btn">Enable</button>
    <button data-disable-id="${d.id}" class="btn btn-warning my-btn">Disable</button>
    <button data-retire-id="${d.id}" class="btn btn-danger my-btn">Retire</button>
</td>
</tr>
    `)
    dronesTableBody.innerHTML = rows.join("");
}
