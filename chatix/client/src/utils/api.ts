export interface IApiResponse<T>{
    isSuccess: boolean;
    error?: string;
    payload: T;
}

export const apiPath = 'http://localhost:4000';

export async function api<T>(route: string, body: any = {}, auth = true): Promise<IApiResponse<T>> {
    const headers: any = {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
    }

    // If query with auth check, add to header bearer access token
    if (auth) {
        const token = localStorage.getItem('authorization_access_token')
        headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(apiPath + route, {
        method: 'post',
        headers,
        mode: 'no-cors',
        credentials:'include',
        body: JSON.stringify(body)
    });

    console.log(await response);
    
    return await response.json();
}