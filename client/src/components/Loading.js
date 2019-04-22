import React from 'react';
import '../styles/Loading.css';

const Loading = ({ loading }) => {
  return (
    loading ?
    <div className="loading">
      <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
    </div>
    : 
    "Loading"
  )
}

export default Loading