export function getIdFromURI(uri: string): Number {
    return Number(uri.split('/').at(-1));
}