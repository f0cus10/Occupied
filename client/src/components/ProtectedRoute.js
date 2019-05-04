import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../components/Loading';
import PageLayout from '../components/PageLayout'

import Cookies from 'js-cookie';
import axios from 'axios';

function ProtectedRoute({ component: Component, back, match }) {
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
      const { blueprintId, profileId } = match.params;
      return (<>
        <h1> Occupied </h1>
        <PageLayout
          data={data}
          back={back}
          component={Component}
          blueprintId={blueprintId}
          profileId={profileId}
        />
      </>)
    } else {
      Cookies.remove('token');
      return (<Redirect to="/" />)
    }
  } else {
    return (<>
      <h1> Occupied </h1>
      <Loading loading />
    </>)
  }
}

export default ProtectedRoute;