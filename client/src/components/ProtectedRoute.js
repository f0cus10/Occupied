import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { setAuth } from '../store/user';
import { connect } from 'react-redux';

import Navbar from './Navbar';
import Cookies from 'js-cookie';
import axios from 'axios';

function ProtectedRoute({ component: Component }) {
  const [loaded, setLoad] = useState(false);
  const [auth, setAuth] = useState(false);
  const [data, setData] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get('/api/user/', {
          headers: {
            'access-token': Cookies.get('token')
          }
        })

        if (result.status === 200) {
          setData(result.data);
          setAuth(true)
        }

        setLoad(true);
      } catch (err) {
        setLoad(true);
        console.error(err);
      }
    }
    fetchData();
  }, [])

  if (loaded) {
    if (auth) {
      return (<>
        <h1> Occupied </h1>
        <Navbar username={data.username}/>
        <Component data={data} />
      </>)
    } else {
      return (<Redirect to="/" />)
    }
  } else {
    return "Loading..."
  }
}

export default ProtectedRoute;