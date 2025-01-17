import {handleHttpErrors, makeOption} from "../utils.js";

export let deliveries = []

export async function fetchDeliveries() {
    try {
        let response = await fetch("http://localhost:8080/api/v1/deliveries");
        await handleHttpErrors(response);
        deliveries = await response.json();
    } catch (error) {
        console.error(error);
    }
}


export async function createDrone() {
    try {
        let response = await fetch("http://localhost:8080/api/v1/drones/add");
        await handleHttpErrors(response);
    } catch (error) {
        console.log(error)
    }
}

export async function scheduleDrone(scheduleRequest) {
    let options = makeOption("POST",scheduleRequest);
    try {
        let response = await fetch("http://localhost:8080/api/v1/deliveries/schedule",options);
        await handleHttpErrors(response);
    } catch (error) {
        console.log(error);
    }
}

export async function finishDelivery(deliveryId) {
    try {
        let response = await fetch("http://localhost:8080/api/v1/deliveries/finish?id="+deliveryId);
        await handleHttpErrors(response);
    } catch (error) {
        console.error(error);
    }
}

export async function getPizzas() {
    try {
        let response = await fetch("http://localhost:8080/api/v1/pizzas");
        await handleHttpErrors(response);
        return await response.json();
    } catch (error) {
        console.error(error);
    }
}

export async function createDelivery(delivery) {
    let options = makeOption("POST",delivery);
    try {
        let response = await fetch("http://localhost:8080/api/v1/deliveries/add", options);
        await handleHttpErrors(response);
    } catch (error) {
        console.error(error);
    }
}

