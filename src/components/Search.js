import React from 'react'

const Search = props => {
  
  return (
    <div onKeyPress={(e) => props.handleKeyPress(e)} className="ui search">
      <div className="ui icon input">
        <input onChange={(e) => props.setInputValState(e.target.value)} className="prompt"/>
        <i className="search icon" />
      </div>
    </div>
  )
}

export default Search
