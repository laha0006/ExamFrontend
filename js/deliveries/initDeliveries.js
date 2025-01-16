import {deliveries, fetchDeliveries, createDrone, scheduleDrone, finishDelivery, createDelivery} from "./api.js";



export default async function initDeliveries() {
    setupHandlers()
    await fetchDeliveries();
    makeRows();
}

function setupHandlers() {
    document.getElementById("createDroneBtn").addEventListener("click", async () => {
        await createDrone()
        console.log("drone created");
    })
    document.getElementById("deliveries-table-body").onclick = handleDeliveryTableClick;
    document.getElementById("createDeliveryBtn").onclick = showModal;
    document.getElementById("saveDeliveryBtn").onclick = handleModalSubmit;
    document.getElementById("addManualDrone").onclick = handleDroneModalSubmit;
}

async function handleDroneModalSubmit(e) {
    e.preventDefault();
    console.log("HANDLE DRONE MODAL SUBMIT")
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
    await fetchDeliveries();
    makeRows();

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
    await fetchDeliveries();
    makeRows();

    console.log("delivery v");
    console.log(delivery);

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
        await fetchDeliveries();
        makeRows();
    }
    if (target.dataset.scheduleManualId) {
        showDroneModal(target.dataset.scheduleManualId);
    }

    if (target.dataset.finishId) {
        const id = target.dataset.finishId
        await finishDelivery(id);
        await fetchDeliveries();
        makeRows();
    }
}

function makeRows() {
    console.log("make rows")
    console.log(deliveries);
    const deliveriesTableBody = document.getElementById("deliveries-table-body");
    const rows = deliveries.map(d => `
    <tr>
        <td>${d.id}</td>
        <td>${d.estimatedDeliveryTime}</td>
        <td>${d.pizza.title}</td>
        <td>${d.address}</td>
        <td>${d.drone ? d.drone.id : 
        '<button data-schedule-manual-id="'+ d.id + '" class="btn btn-warning fw-bolder">Manual Assign</button> <button data-schedule-id="'+ d.id + '" class="btn btn-warning fw-bolder">Smart Assign</button>' }</td>
        <td><button data-finish-id="${d.id}" class="btn btn-success fw-bolder">Finish Delivery</button></td>
    <tr>
    `);
    console.log("rows")
    console.log(rows)

    deliveriesTableBody.innerHTML = rows.join("");
}

