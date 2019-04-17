// async function ProtectedRoute ({ component: Component, ...rest }) {
//   const authenticated = await axios.get('/api/user/get', {
//     headers: {
//       'access-token': Cookies.get('token')
//     }
//   });
//   if (authenticated.status === 200) {
//     return (<>
//       <h1> Occupied </h1>
//       <Navbar />
//       <Route {...rest} render={(props) => <Component {...props} data={authenticated.data} />} />
//     </>)
//   } else {
//     return (<Redirect to="/" />)
//   }
// }
// export default ProtectedRoute;
import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

function ProtectedRoute({ component: Component }) {
  const [auth, setAuth] = useState(false);
  const [data, setData] = useState({});
  useEffect(async () => {
    const authenticated = await axios.get('/api/user/get', {
      headers: {
        'access-token': Cookies.get('token')
      }
    })
    if (authenticated.status === 200) {
      setAuth(true)
      setData(authenticated.data);
    } 
  }, [])
  if (auth) {
    return (
      <Component data={data} />
    )
  } else {
    return (<Redirect to="/" />)
  }
}

export default ProtectedRoute;