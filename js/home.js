import renderDeliveries from "./deliveries/deliveries.js"
import renderDrones from "./drones/drones.js";

export default async function renderHome() {
    return `${await renderDeliveries()}
    ${await renderDrones()}`;
}