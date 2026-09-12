import { BASE_URL } from "../utils/baseURL";


export async function createLog(tripLogData) {
        const response = await fetch(`${BASE_URL}triplogs`, {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        credentials: "include",
        body: JSON.stringify(tripLogData)
    });

//pulling message from custom error sent from backend ErrorResponseDto
 if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Action failed");
    }
   

    return response.json();
}

export async function addRouteLeg(tripId, leg) {
        const response = await fetch(`${BASE_URL}triplogs/${tripId}/legs`, {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        credentials: "include",
        body: JSON.stringify(leg)
    });

//pulling message from custom error sent from backend ErrorResponseDto
 if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Action failed");
    }
   

    return response.json();
}

export async function getUserTripLogs() {
        const response = await fetch(`${BASE_URL}triplogs/user`, {
        method: "GET",
        credentials: "include",
    });

//pulling message from custom error sent from backend ErrorResponseDto
 if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Action failed");
    }
   

    return response.json();
}


