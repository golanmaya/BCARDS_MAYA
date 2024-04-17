import { jwtDecode } from 'jwt-decode'
import { IUserSigninJwtPayload, IUserSignup, IUserUpdate } from '../interfaces/IUser'
import { IUserDetails } from '../interfaces/IUser'
import { apiBase } from '../config'

/* ----------------------------------------------------------------------------------------------------- */

// handle the actual sign-in mechanism

export const doSignIn = async (email: string, password: string): Promise<{ error: string | null, result?: IUserDetails | undefined }> => {
    try {
        // send the email & password to the server,
        // if all goes well we should receive a token (string)
        const response = await fetch(`${apiBase}/users/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })

        // let's get the response text (error message -or- token)
        const data = await response.text()

        // the server returned status code not in the 200-299 range, so quit and return an error message
        if (!response.ok) return { error: data }

        // no error, let's save the token in local storage
        await saveToken(data)

        // let's try to fetch user details from the server
        let { error, result } = await fetchUserDetails();
        // there's an error, return it
        if (error) return { error }
        // no error- return result
        return { error: null, result }
    } catch (err) {
        // there's an error, return it
        const errMessage = (err as Error).message
        return { error: errMessage }
    }
}

/* ----------------------------------------------------------------------------------------------------- */

// handle the actual sign-up mechanism

export const doSignUp = async (userData: IUserSignup): Promise<{ error: string | undefined }> => {
    try {
        // send the email & password to the server,
        // if all goes well we should receive a token (string)
        const response = await fetch(`${apiBase}/users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        })

        // let's get the response text (error message -or- token)
        const data = await response.json()

        // the server returned status code not in the 200-299 range, so quit and return an error message
        if (!response.ok) return { error: data }

        // if no errors
        return { error: undefined }

    } catch (err) {
        // there's an error, return it
        const errMessage = (err as Error).message
        return { error: errMessage }
    }
}

/* ----------------------------------------------------------------------------------------------------- */

export const doUpdate = async (token: string, user: IUserUpdate, userId: string): Promise<{ error: string | undefined }> => {

    try {
        // send the email & password to the server,
        // if all goes well we should receive a token (string)
        const response = await fetch(`${apiBase}/users/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token
            },
            body: JSON.stringify(user)
        })

        // let's get the response text (error message -or- token)
        const data = await response.json()

        // the server returned status code not in the 200-299 range, so quit and return an error message
        if (!response.ok) return { error: data }

        // if no errors
        return { error: undefined }

    } catch (err) {
        // there's an error, return it
        const errMessage = (err as Error).message
        return { error: errMessage }
    }
}



/* ----------------------------------------------------------------------------------------------------- */

// save the token to local storage

const saveToken = async (token: string): Promise<void> => {
    localStorage.setItem('userToken', token)
}

/* ----------------------------------------------------------------------------------------------------- */

// remove the token to local storage

export const removeToken = async (): Promise<void> => {
    localStorage.removeItem('userToken')
}


export const getToken = async (): Promise<string | null> => {
    const token = localStorage.getItem('userToken')
    if (token) {
        return token
    } else {
        return null
    }
}

const decodeToken = async (token: string): Promise<IUserSigninJwtPayload> => {
    return jwtDecode<IUserSigninJwtPayload>(token)
}



export const fetchUserDetails = async (): Promise<{ error: string | null, result?: IUserDetails | undefined }> => {
    const token = await getToken()
    if (!token) return { error: `Can't read token from local storage` }
    const { _id } = await decodeToken(token)
    try {
        const response = await fetch(`${apiBase}/users/${_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token
            }
        })
        if (!response.ok) return { error: `Error fetching the user's details (${response.statusText})` }
        const userDetails: IUserDetails = await response.json()
        return { error: null, result: userDetails }
    } catch (err) {
        const errMessage = (err as Error).message
        return { error: `Error fetching the user's details (${errMessage})` }
    }
}


export const doDeleteUser = async (token: string, idToDelete: string): Promise<{ error: string | undefined }> => {
    try {
        const response = await fetch(`${apiBase}/users/${idToDelete}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token
            },
        })

        const data = await response.json()

        if (!response.ok) return { error: data }

        return { error: undefined }

    } catch (err) {
        const errMessage = (err as Error).message
        return { error: errMessage }
    }
}