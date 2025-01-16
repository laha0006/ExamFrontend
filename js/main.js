import renderHome from "./home.js";
import renderDeliveries from "./deliveries/deliveries.js";
import initDeliveries from "./deliveries/initDeliveries.js";

async function router(path) {
    console.log("ROUTED PATH: " + path);
    const app = document.getElementById('app');
    switch (path) {
        case '/':
            // app.innerHTML = renderHome();
            app.innerHTML = await renderDeliveries();
            initDeliveries();
            break;

        case '/deliveries':
            app.innerHTML = renderDeliveries();
            initDeliveries();
            break;

        case '/tested':
            break;

        default:
            break;
    }
}


function navigate(path) {
    history.pushState({}, '', path);
    router(path);
}

window.addEventListener('popstate', () => {
    router(window.location.pathname);
});

document.body.addEventListener('click', (event) => {
    const target = event.target.closest('a');
    if (target && target.matches('[data-link]')) {
        event.preventDefault();
        navigate(target.getAttribute('href'));
    }
});

document.addEventListener('DOMContentLoaded', () => {
    router(window.location.pathname);
});