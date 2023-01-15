const ENDPOINT = "https://jsonplaceholder.typicode.com/users/";

export const getUsers = () => {
    return fetch( ENDPOINT ).then( res => {
        if ( !res.ok ) throw Error( res.statusText )
        return res.json()
    } ).then( res => res )
}
