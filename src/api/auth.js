
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