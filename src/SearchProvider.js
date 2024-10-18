

import React, { createContext, useState } from 'react'

export const SearchContext = createContext()
const SearchProvider = ({ children }) => {
    const [searchInputText, setSearchInputText] = useState('')
    return (
        <SearchContext.Provider value={{searchInputText, setSearchInputText}}>
            {children}
        </SearchContext.Provider>
    )

}

export default SearchProvider