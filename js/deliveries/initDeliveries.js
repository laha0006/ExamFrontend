import {
    deliveries,
    completed,
    fetchCompletedDeliveries,
    fetchDeliveries,
    createDrone,
    scheduleDrone,
    finishDelivery,
    createDelivery
} from "./api.js";

import {timeStampConverter} from "../utils.js"

let intervalSet = false
let handlersSet = false

export default async function initDeliveries() {
    setupHandlers();
    await fetchAndUpdateDeliveries();
    if (!intervalSet) {
        intervalSet = true;
        setInterval(fetchAndUpdateDeliveries, 60000)
    }
}


export async function initCompletedDeliveries() {
    setupCompletedHandlers()
    await fetchCompletedDeliveries();
    makeCompletedRows()

}

async function fetchAndUpdateDeliveries() {
    console.log("##### fetchAndUpdateDeliveries #######");
    await fetchDeliveries();
    makeRows();
}

function setupCompletedHandlers() {

}

function setupHandlers() {
    // console.log("####################### SETUP #################")
    document.getElementById("createDroneBtn").addEventListener("click", async () => {
        await createDrone()
        // console.log("drone created");
    })
    document.getElementById("deliveries-table-body").onclick = handleDeliveryTableClick;
    document.getElementById("createDeliveryBtn").onclick = showModal;
    document.getElementById("saveDeliveryBtn").onclick = handleModalSubmit;
    document.getElementById("addManualDrone").onclick = handleDroneModalSubmit;
}

async function handleDroneModalSubmit(e) {
    e.preventDefault();
    // console.log("HANDLE DRONE MODAL SUBMIT")
    const droneModal = document.getElementById('droneModalForm');
    if (!droneModal.checkValidity()) {
        droneModal.reportValidity();
        return false;
    }

    const deliveryId = document.getElementById("input-delivery-id").value;
    const droneId = document.getElementById("inputDrone").value;
    const scheduleRequest = {
        deliveryId: deliveryId,
        droneId: droneId,
        option: "MANUAL"
    }

    await scheduleDrone(scheduleRequest);
    await fetchAndUpdateDeliveries();

    const modal = document.getElementById("droneModal");
    const bootstrapModal = bootstrap.Modal.getInstance(modal);
    bootstrapModal.hide();

}


async function handleModalSubmit(e) {
    e.preventDefault();
    const deliveryForm = document.getElementById('deliveryForm');
    if (!deliveryForm.checkValidity()) {
        deliveryForm.reportValidity();
        return false;
    }

    const delivery = {
        pizza: {
            id: deliveryForm.inputPizza.value
        },
        address: deliveryForm.inputAddress.value
    }

    await createDelivery(delivery);
    await fetchAndUpdateDeliveries();

    // console.log("delivery v");
    // console.log(delivery);

    const modal = document.getElementById("deliveryModal");
    const bootstrapModal = bootstrap.Modal.getInstance(modal);
    bootstrapModal.hide();

}


function showModal() {
    const myModal = new bootstrap.Modal(document.getElementById('deliveryModal'))
    myModal.show()
}

function showDroneModal(deliveryId) {
    const myModal = new bootstrap.Modal(document.getElementById('droneModal'))
    document.getElementById("input-delivery-id").value = deliveryId;
    myModal.show()
}


async function handleDeliveryTableClick(e) {
    const target = e.target;
    if (!target || target.tagName.toLowerCase() !== "button") {
        return false;
    }
    if (target.dataset.scheduleId) {
        const id = target.dataset.scheduleId
        const scheduleRequest = {
            deliveryId: id,
            droneId: null,
            option: "SMART"
        }
        await scheduleDrone(scheduleRequest);
        await fetchAndUpdateDeliveries();
    }
    if (target.dataset.scheduleManualId) {
        showDroneModal(target.dataset.scheduleManualId);
    }

    if (target.dataset.finishId) {
        const id = target.dataset.finishId
        await finishDelivery(id);
        await fetchAndUpdateDeliveries();
    }
}

function makeCompletedRows() {
    const completedTableBody = document.getElementById('completeDeliveriesTableBody');
    const rows = completed.map(cd => `
    <tr>
    <td>${cd.id}</td>
    <td>${timeStampConverter(cd.estimatedDeliveryTime)}</td>
    <td>${timeStampConverter(cd.actualDeliveryTime)}</td>
    <td>${cd.address}</td>
    <td>${cd.pizza.title}</td>
    <td>${cd.drone ? cd.drone.id : '???'}</td>
</tr>
    `)
    completedTableBody.innerHTML = rows.join("");
}

function makeRows() {
    // console.log("make rows")
    // console.log(deliveries);
    const deliveriesTableBody = document.getElementById("deliveries-table-body");
    const rows = deliveries.map(d => `
    <tr>
        <td>${d.id}</td>
        <td>${timeStampConverter(d.estimatedDeliveryTime)}</td>
        <td>${d.pizza.title}</td>
        <td>${d.address}</td>
        <td>${d.drone ? d.drone.id :
        '<button data-schedule-manual-id="' + d.id + '" class="btn btn-warning fw-bolder">Manual Assign</button> <button data-schedule-id="' + d.id + '" class="btn btn-warning fw-bolder">Smart Assign</button>'}</td>
        <td><button data-finish-id="${d.id}" class="btn btn-success my-btn">Finish Delivery</button></td>
    <tr>
    `);
    // console.log("rows")
    // console.log(rows)

    deliveriesTableBody.innerHTML = rows.join("");
}

