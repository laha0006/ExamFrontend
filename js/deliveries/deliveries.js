import {deliveryModal} from "./modals.js";


export default async function renderDeliveries() {
    return `<h1>deliveries page </h1>
<table class="table">
    <thead>
        <tr>
        <td>Id</td>
        <td>Estimated Time</td>
        <td>Pizza</td>
        <td>Address</td>
        <td>Drone</td>
        </tr>
    </thead>
    <tbody id="deliveries-table-body">
    </tbody>
</table>
<button id="createDroneBtn" class="btn btn-primary">Create Drone</button>
<button id="createDeliveryBtn" class="btn btn-primary">Create Delivery</button>
<a href="/" data-link>Go home</a> ${await deliveryModal()}`;
}