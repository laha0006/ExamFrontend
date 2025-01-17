import renderHome from "./home.js";
import renderDeliveries, {renderCompleteDeliveries} from "./deliveries/deliveries.js";
import initDeliveries, {initCompletedDeliveries} from "./deliveries/initDeliveries.js";
import initDrones from "./drones/initDrones.js";
import renderDrones from "./drones/drones.js";

async function router(path) {
    console.log("ROUTED PATH: " + path);
    const app = document.getElementById('app');
    switch (path) {
        case '/':
            // app.innerHTML = await renderHome();
            app.innerHTML = await renderDeliveries();
            initDeliveries();

            break;

        case '/drones':
            app.innerHTML = await renderDrones();
            initDrones();
            break;

        case '/completed':
            app.innerHTML = await renderCompleteDeliveries();
            await initCompletedDeliveries();
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

    const navLinks = document.querySelectorAll('.nav-link[data-link]');

    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            // Remove the 'active' class from all links
            navLinks.forEach(link => link.classList.remove('active'));

            // Add the 'active' class to the clicked link
            event.target.classList.add('active');
        });
    });


});