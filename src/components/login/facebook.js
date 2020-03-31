import React, { useContext } from 'react';
import UserProvider from '../../context/userProvider';
const FacebookLoggedIn = () =>{
    const userData = useContext(UserProvider.context);
   console.log('user Data',userData)
    return (
        <div>
        </div>
    )
}
export default FacebookLoggedIn;