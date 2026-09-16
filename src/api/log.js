import { BASE_URL } from "../utils/baseURL";
import {handleApiError} from "./apiHelpers.js";

//Future: Create one generic api call helper function

//--------------POST FUNCTIONS------------------
export async function createLog(tripLogData) {
        const response = await fetch(`${BASE_URL}triplogs`, {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        credentials: "include",
        body: JSON.stringify(tripLogData)
    });

 if (!response.ok) {
    await handleApiError(response);
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

if (!response.ok) {
    await handleApiError(response);
} 

    return response.json();
}

//--------------------GET FUNCTIONS----------------------
export async function getUserTripLogs() {
        const response = await fetch(`${BASE_URL}triplogs/user`, {
        method: "GET",
        credentials: "include",
    });

if (!response.ok) {
    await handleApiError(response);
}
    return response.json();
}

export async function getTripLogById(tripId) {
        const response = await fetch(`${BASE_URL}triplogs/${tripId}`, {
        method: "GET",
        credentials: "include"
    });

if (!response.ok) {
    await handleApiError(response);
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

if (!response.ok) {
    await handleApiError(response);
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

if (!response.ok) {
    await handleApiError(response);
}
    return response.json();
}

//------------------DELETE FUNCTIONS------------------------
export async function deleteLog(tripId) {
        const response = await fetch(`${BASE_URL}triplogs/${tripId}`, {
        method: "DELETE",
        credentials: "include",
       
    });

if (!response.ok) {
    await handleApiError(response);
}

    return true;
}