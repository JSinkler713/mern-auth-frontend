import React, {useState} from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';

const { REACT_APP_SERVER_URL } = process.env;

const Profile = (props) => {
   const { handleLogout, user } = props;
   const { id, name, email, exp } = user;
   const expirationTime = new Date(exp * 1000);
   let currentTime = Date.now();

   const [newExample, setNewExample] = useState({
     name: '',
     completed: false
   })
   
   const handleName = (e)=> {
     setNewExample({
       name: e.target.value,
       completed: false
     })
   }
   const postNewExample = (e)=> {
     e.preventDefault()
     //call api and post to new example
    
    // axios.post(`${REACT_APP_SERVER_URL}/examples`, newExample)
    //   .then(response => {
    //       //const { token } = response.data;
    //       // save token to localStorage
    //       //localStorage.setItem('jwtToken', token);
    //       // set token to headers
    //       //setAuthToken(token);
    //       // decode token to get the user data
    //       //const decoded = jwt_decode(token);
    //       // set the current user
    //       //props.nowCurrentUser(decoded); // funnction passed down as props.
    //       console.log(response.data)
    //   })
    //   .catch(error => {
    //       console.log('===> Error on login', error);
    //       alert('Either email or password is incorrect. Please try again');
    //   });

   //with fetch
     const myHeaders = new Headers();
     myHeaders.append('Content-Type', 'application/json');
     const token = localStorage.getItem('jwtToken')
     //add the jwt token to header
     myHeaders.append('Authorization', token); 
     fetch(`${REACT_APP_SERVER_URL}/examples`, {
       method: 'POST',
       mode: 'cors',
       headers: myHeaders,
       body: JSON.stringify(newExample)
     })
       .then(response => response.json())
       .then(data => console.log(data))
       .catch(error => {
         console.log('---> error in post')
         console.error(error)
       })

   }



   // make a condition that compares exp and current time
   if (currentTime >= expirationTime) {
       handleLogout();
       alert('Session has ended. Please login to continue.');
   }

   const userData = user ?
   (<div>
       <h1>Profile</h1>
       <p>Name: {name}</p>
       <p>Email: {email}</p>
       <p>ID: {id}</p>
       <form onSubmit={ postNewExample }>
         <input onChange={handleName} value={newExample.name}></input>
         <input type={"hidden"} value={false}></input>
         <button className='btn' type="submit">Submit</button>
       </form>
   </div>) : <h2>Loading...</h2>

    const errorDiv = () => {
        return (
            <div className="text-center pt-4">
                <h3>Please <Link to="/login">login</Link> to view this page</h3>
            </div>
        );
    };
    
    return (
        <div className="text-center pt-4">
            {user ? userData : errorDiv()}
        </div>
    );

}

export default Profile;
