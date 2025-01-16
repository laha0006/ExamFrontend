import renderHome from "./home.js";

function router(path) {
    const app = document.getElementById('app');
    switch (path) {
        case '/':
            app.innerHTML = renderHome();
            break;

        case '/test':
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