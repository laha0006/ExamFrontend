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


async function handleDeliveryTableClick(e) {
    const target = e.target;
    if (!target || target.tagName.toLowerCase() !== "button") {
        return false;
    }
    if (target.dataset.scheduleId) {
        const id = target.dataset.scheduleId
        await scheduleDrone(id);
        await fetchDeliveries();
        makeRows();
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
        <td>${d.drone ? d.drone.id + ' ' + '<button data-finish-id="'+ d.id + '" class="btn btn-success fw-bolder">Finish Delivery</button>' : '<button data-schedule-id="'+ d.id + '" class="btn btn-success fw-bolder">Add Drone</button>'}</td>
    <tr>
    `);
    console.log("rows")
    console.log(rows)

    deliveriesTableBody.innerHTML = rows.join("");
}

