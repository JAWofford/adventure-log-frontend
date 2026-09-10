import { BASE_URL } from "../utils/baseURL";
import { getXsrfToken } from "../utils/csrf";


export async function createLog(tripLogData) {
    const token = getXsrfToken(document.cookie);
    const response = await fetch(`${BASE_URL}triplogs`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-XSRF-TOKEN" : token},
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
