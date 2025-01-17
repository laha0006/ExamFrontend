import {handleHttpErrors} from "../utils.js";

export let drones = [];

export async function getDrones() {
    try {
        let response = await fetch("http://localhost:8080/api/v1/drones");
        await handleHttpErrors(response);
        drones = await response.json();
    } catch (error) {
        console.log(error);
    }
}


export async function enableDrone(id) {
    try {
        let response = await fetch("http://localhost:8080/api/v1/drones/enable?id="+id);
        await handleHttpErrors(response);
    } catch (error) {
        console.log(error);
    }
}

export async function disableDrone(id) {
    try {
        let response = await fetch("http://localhost:8080/api/v1/drones/disable?id="+id);
        await handleHttpErrors(response);
    } catch (error) {
        console.log(error);
    }
}

export async function retireDrone(id) {
    try {
        let response = await fetch("http://localhost:8080/api/v1/drones/retire?id="+id);
        await handleHttpErrors(response);
    } catch (error) {
        console.log(error);
    }
}