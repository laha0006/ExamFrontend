export function makeOption(httpMethod, body) {
    const option = {
        method: httpMethod.toUpperCase(),
        headers: {
            "Content-type": "application/json",
            "Accept": "application/json"
        }
    }
    if (body) {
        option.body = JSON.stringify(body);
    }
    return option;
}



function showErrorAlert(message) {
    const alertBox = document.getElementById("error-alert");
    const errorMessage = document.getElementById("error-message");

    errorMessage.textContent = message; // Set the error message
    alertBox.style.display = "block";  // Show the alert
    alertBox.classList.add("show");    // Ensure it fades in
}

export async function handleHttpErrors(res) {
    if (!res.ok) {
        const errorDto = await res.json();
        showErrorAlert(errorDto.errorMessage);
    }
}