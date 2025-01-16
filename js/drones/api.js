export let drones = [];

export async function getDrones() {
    let response = await fetch("http://localhost:8080/api/v1/drones");
    drones = await response.json();
}