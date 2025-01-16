import {makeOption} from "../utils.js";

export let deliveries = []

export async function fetchDeliveries() {
    let response = await fetch("http://localhost:8080/api/v1/deliveries");
    deliveries = await response.json();
    console.log(deliveries);
}


export async function createDrone() {
    let response = await fetch("http://localhost:8080/api/v1/drones/add");
}

export async function scheduleDrone(deliveryId) {
    let options = makeOption("POST",{deliveryId: deliveryId});
    let response = await fetch("http://localhost:8080/api/v1/deliveries/schedule",options);
}

export async function finishDelivery(deliveryId) {
    let response = await fetch("http://localhost:8080/api/v1/deliveries/"+deliveryId+"/finish");
}

export async function getPizzas() {
    let response = await fetch("http://localhost:8080/api/v1/pizzas");
    return await response.json();
}

export async function createDelivery(delivery) {
    let options = makeOption("POST",delivery);
    let response = await fetch("http://localhost:8080/api/v1/deliveries/add", options);
}