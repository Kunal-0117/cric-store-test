/*
A simple wrapper over the fetch api,
by default we are preventing the cache behavior of next js, can easily add a option to
enable it if needed.
*/
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

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }

    return res.json();
}