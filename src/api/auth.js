
import { BASE_URL } from "../utils/baseURL";


export async function registerUser(registrationData) {
    const response = await fetch(`${BASE_URL}auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        credentials: "include",
        body: JSON.stringify(registrationData)
    });

//pulling message from custom error sent from backend ErrorResponseDto
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
    }

    return response.json();
}

export async function loginUser(formData) {
    const response = await fetch(`${BASE_URL}auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        credentials: "include",
        body: JSON.stringify(formData)
    });

//pulling message from custom error sent from backend ErrorResponseDto
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
    }

    return response.json();
}

export async function logoutUser() {
        const response = await fetch(`${BASE_URL}auth/logout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include"
    });

    if (!response.ok) {
        throw new Error("Logout failed. Please try again.");
    }
}

//checking user session
export async function checkCurrentUser() {
    const response = await fetch(`${BASE_URL}auth/me`, {
        method: "GET",
        credentials: "include"
    });

    if (!response.ok) {
        return null;
    }
    return await response.json();
}
