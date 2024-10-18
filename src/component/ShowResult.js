import React, { useContext, useState } from 'react'
import { SearchContext } from '../SearchProvider'


const ShowResult = () => {


const {searchInputText,setSearchInputText}=useContext(SearchContext);
const [localInput, setLocalInput]=useState('')



  return (
    <div>ShowResult</div>
  )
}

export default ShowResult