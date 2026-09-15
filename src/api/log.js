import { BASE_URL } from "../utils/baseURL";

//--------------POST FUNCTIONS------------------
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

//--------------------GET FUNCTIONS----------------------
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

export async function getTripLogById(tripId) {
        const response = await fetch(`${BASE_URL}triplogs/${tripId}`, {
        method: "GET",
        credentials: "include"
    });

//pulling message from custom error sent from backend ErrorResponseDto
 if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Action failed");
    }
   

    return response.json();
}

//---------------PUT FUNCTIONS--------------------------
export async function updateLog(tripId, tripLogData) {
        const response = await fetch(`${BASE_URL}triplogs/${tripId}`, {
        method: "PUT",
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

export async function updateRouteLeg(tripId,legId, legData) {
        const response = await fetch(`${BASE_URL}triplogs/${tripId}/legs/${legId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json"},
        credentials: "include",
        body: JSON.stringify(legData)
    });

//pulling message from custom error sent from backend ErrorResponseDto
 if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Action failed");
    }
   

    return response.json();
}

//------------------DELETE FUNCTIONS------------------------
export async function deletLog(tripId) {
        const response = await fetch(`${BASE_URL}triplogs/${tripId}`, {
        method: "DELETE",
        credentials: "include",
       
    });

//pulling message from custom error sent from backend ErrorResponseDto
 if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Action failed");
    }
   

    return true;
}