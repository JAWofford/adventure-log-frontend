import { BASE_URL } from "../utils/baseURL";


export async function createLog(tripLogData) {
    const response = await fetch(`${BASE_URL}triplogs`, {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        credentials: "include",
        body: JSON.stringify(tripLogData)
    });

//pulling message from custom error sent from backend ErrorResponseDto ??
   

    return response.json();
}
