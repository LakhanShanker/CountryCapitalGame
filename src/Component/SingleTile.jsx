import React from 'react'
import './style.css'
function SingleTile( {country, index,select=null, handleSelect}) {
  return (
    <div style={{ padding: '10px', border: '1px solid blue'}} className = {select===index ? 'selected' : null} onClick={()=>handleSelect(index)}>{country}</div>
  )
}

export default SingleTile