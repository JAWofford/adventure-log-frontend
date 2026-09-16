

export async function handleApiError(response) {
    //handle session logout for 401(unauthorized) and 403(forbidden)
    if (response.status === 401 || response.status === 403) {
        window.location.href = '/login';
        return; // stop here; redirect is already in progress
    }


    let message = "Action failed";
    // Try to get a more specific error message from the server.
    // If the response doesn't contain valid JSON, use the default message.
    try {
        const errorData = await response.json();
        message = errorData.message || message;
    } catch {
        // no JSON body to parse — keep the default message
    }
    throw new Error(message);
}