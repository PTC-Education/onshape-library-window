import { OnshapeDocument } from "./models/OnshapeDocument";
import { OnshapeInsertable } from "./models/OnshapeInsertable";

async function request<T>(endpoint: string): Promise<T> {
    endpoint = 'https://mkcad.julias.ch/api/' + endpoint;
    console.log(endpoint);
    const res = await fetch(endpoint, {
        mode: 'no-cors'
    });
    console.log(res);
    console.log(res.text());
    const body = await res.json();
    console.log(body);
    console.log('everything done with fetch');
    return body;
}

async function postRequest<T>(endpoint: string, body: Object, contentType: string = 'application/json'): Promise<T> {
    const resp = await fetch(endpoint, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': contentType
        }
    });
    const res = await resp.json();
    return res;
}


export async function getMkcadDocsFromApi(): Promise<OnshapeDocument[]> {
    const docs = await request<OnshapeDocument[]>("mkcadDocs");
    console.log(docs);
    return docs;
}

export async function getOnshapeInsertablesFromApi(): Promise<OnshapeInsertable[]> {
    const docs = await request<OnshapeInsertable[]>("data");
    console.log(docs);
    return docs;
}

export async function getOnshapeThumbsFromApi(insertables: OnshapeInsertable[]): Promise<OnshapeInsertable[]> {
    const items = await postRequest<OnshapeInsertable[]>('thumbs', insertables);
    return items;
}

// getOnshapeInsertablesFromApi();