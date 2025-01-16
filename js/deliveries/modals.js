import {getPizzas} from "./api.js";
import {drones,getDrones} from "../drones/api.js";

export async function deliveryModal() {
    return `<div id="deliveryModal" class="modal" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5  class="modal-title">Create Delivery</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form id="deliveryForm" class="form-control">
            <input id="input-boat-id" type="hidden">
            <div class="mb-3">            
                <label for="inputAddress" class="form-label">Address</label>
                <input id="inputAddress" type="text" class="form-control" placeholder="Address" required>
            </div>
            <div class="mb-3">            
                <label for="inputPizza" class="form-label">Boat Type</label>
                <select id="inputPizza" class="form-select" aria-label="Pizza Selection" required>
                    ${await makeOptions()}
                </select>
            </div>
        
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button id="saveDeliveryBtn" type="submit" class="btn btn-primary" data-dismiss="modal">Place Delivery</button>
      </div>
      </form>
    </div>
  </div>
</div>`;
}


async function makeOptions() {
    let pizzas = await getPizzas();
    console.log(pizzas);
    let options = pizzas.map(p => `<option value="${p.id}">${p.title} ${p.price}.-</option>`);
    console.log(options)
    return options.join("");
}




export async function droneModal() {
    return `<div id="droneModal" class="modal" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5  class="modal-title">Assign Drone</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form id="droneModalForm" class="form-control">
            <input id="input-delivery-id" type="hidden">
            <div class="mb-3">            
                <label for="inputDrone" class="form-label">Drone</label>
                <select id="inputDrone" class="form-select" aria-label="Pizza Selection" required>
                    ${await makeDroneOptions()}
                </select>
            </div>
        
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button id="addManualDrone" type="submit" class="btn btn-primary" data-dismiss="modal">Assign Drone</button>
      </div>
      </form>
    </div>
  </div>
</div>`;
}

async function makeDroneOptions() {
    await getDrones();
    let rows = drones.map(d => `
    <option value="${d.id}">${d.id} | ${d.uuid}</option>
    `)
    return rows.join("")
}