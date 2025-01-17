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