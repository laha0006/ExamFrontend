import {deliveryModal, droneModal} from "./modals.js";


export default async function renderDeliveries() {
    return `<h1>Deliveries</h1>
<table class="table text-center align-middle">
    <thead>
        <tr>
        <td>Id</td>
        <td>Estimated Time</td>
        <td>Pizza</td>
        <td>Address</td>
        <td>Drone</td>
        <td>#</td>
        </tr>
    </thead>
    <tbody id="deliveries-table-body">
    </tbody>
</table>
<button id="createDroneBtn" class="btn btn-primary my-btn">Create Drone</div></button>
<button id="createDeliveryBtn" class="btn btn-primary my-btn">Create Delivery</button>
${await deliveryModal()}${await droneModal()}`;
}

export async function renderCompleteDeliveries() {
    return `<h1>Completed Deliveries</h1>
<table class="table text-center align-middle">
    <thead>
        <tr>
        <td>Id</td>
        <td>Estimated Time</td>
        <td>Actual Delivery Time</td>
        <td>Pizza</td>
        <td>Address</td>
        <td>Drone</td>
        </tr>
    </thead>
    <tbody id="completeDeliveriesTableBody">
    </tbody>
</table>`
}