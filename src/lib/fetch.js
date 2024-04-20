export async function makeRequest(endpoint = "/", options = { method: 'GET', data: {} }) {

    let { method, data } = options;
    method = method.toUpperCase();

    const fetchOptions = {
        cache: "no-cache",
        method: method.toLowerCase(),
        body: data,
        credentials: "include",
    }
    if (method === 'GET' || method === 'HEAD') {
        delete fetchOptions.body;
    }

    const res = await fetch(
        process.env.NEXT_PUBLIC_API_URL + endpoint,
        fetchOptions
    )
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }

    return res.json();
}