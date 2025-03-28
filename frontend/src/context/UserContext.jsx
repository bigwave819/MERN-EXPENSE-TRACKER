import React, { Children, createContext, useState } from 'react'

export const userContext = createContext();

const userProvider = ({ Children }) => {
    const [ user, setUser ] = useState(null)
    
    const updateUser = (userData) => {
        setUser(userData)
    }

    const clearUser = () => {
        setUser(null)
    }
    return(
        <userContext.Provider
            value={{
                user,
                updateUser,
                clearUser
            }}
        >
            { Children }
        </userContext.Provider>
    )
}

export default userProvider;