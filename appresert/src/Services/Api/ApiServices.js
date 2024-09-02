

const BASE_URL = "http://192.168.1.103:8000/api/v1/";

export default async function RequestDashboard(link, method, form, token) {
    let headers = {};
    let request = {};
    let url = BASE_URL + link;
    let body = JSON.stringify(form);

    headers = {
        "Accept": "application/json",
        "Content-type": "application/json;charset=UTF-8",
    };
    
    if (form instanceof FormData) {
        headers = {
            Accept: "application/json",
        };
        body = form;
    }
    if (token) {
        document.cookie = `access_token=${token};path=/`;
        headers = { ...headers, Authorization: `Bearer ${token}` };
    }

    request = new Request(url, {
        mode: "cors",
        method: method,
        headers: headers,
    });
    if (method !== "GET" && method !== "HEAD") {
        request = new Request(url, {
            mode: "cors",
            method: method,
            headers: headers,
            body,
        });
    }

    let resp = await fetch(request);
    // Si aucune donnée n'est présente, on renvoie un message par défaut
    let data;
    try {
        data = await resp?.json(); // Essaye de parser la réponse JSON
    } catch (error) {
        data = null; // Si la réponse n'est pas un JSON valide, considère qu'il n'y a pas de données
    }

    if (data === null || data === undefined) {
        return ApiResponse(resp.status, { message: "No content available" });
    }

    return ApiResponse(resp.status, data);
}

function ApiResponse(status, data) {
    let response = {
        status: status,
        response: data,
    };

    return response;
}
