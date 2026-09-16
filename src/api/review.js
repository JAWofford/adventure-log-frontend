import { BASE_URL } from "../utils/baseURL";
import {handleApiError} from "./apiHelpers.js";

//-----------POST FUNCTIONS--------------
export async function createReview(reviewData) {
        const response = await fetch(`${BASE_URL}campgroundreviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        credentials: "include",
        body: JSON.stringify(reviewData)
    });

if (!response.ok) {
    await handleApiError(response);
}

    return response.json();
}

export async function addReviewStay(campgroundId, stay) {
        const response = await fetch(`${BASE_URL}campgroundreviews/${campgroundId}/stays`, {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        credentials: "include",
        body: JSON.stringify(stay)
    });

if (!response.ok) {
    await handleApiError(response);
}

    return response.json();
}

//--------------GET FUNCTIONS-------------------
export async function getUserReviews() {
        const response = await fetch(`${BASE_URL}campgroundreviews/user`, {
        method: "GET",
        credentials: "include",
    });

if (!response.ok) {
    await handleApiError(response);
}

    return response.json();
}

export async function getReviewById(campgroundId) {
        const response = await fetch(`${BASE_URL}campgroundreviews/${campgroundId}`, {
        method: "GET",
        credentials: "include"
    });

if (!response.ok) {
    await handleApiError(response);
}

    return response.json();
}

//---------------PUT FUNCTIONS--------------------------
export async function updateReview(campgroundId, reviewData) {
        const response = await fetch(`${BASE_URL}campgroundreviews/${campgroundId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json"},
        credentials: "include",
        body: JSON.stringify(reviewData)
    });

if (!response.ok) {
    await handleApiError(response);
}

    return response.json();
}

//------------------DELETE FUNCTIONS------------------------
export async function deleteReview(campgroundId) {
        const response = await fetch(`${BASE_URL}campgroundreviews/${campgroundId}`, {
        method: "DELETE",
        credentials: "include",
       
    });

if (!response.ok) {
    await handleApiError(response);
}

    return true;
}