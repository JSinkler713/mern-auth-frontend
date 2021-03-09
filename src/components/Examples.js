import React, {useState, useEffect, useContext} from 'react'; 
import axios from 'axios';

const { REACT_APP_SERVER_URL } = process.env;

const Examples = ()=> { 
  const [examples, setExamples] = useState([])

  useEffect(()=> {
    const getExamples = async()=> {
      axios.get(`${REACT_APP_SERVER_URL}/examples`)
        .then(response => {
            console.log(response.data)
            setExamples(response.data)
        })
        .catch(error => {
            console.log('===> Error on login', error);
            alert('Either email or password is incorrect. Please try again');
        });
     }
    getExamples()
  }, [])

  const examplesList = examples.map((examp, index)=> {
    return <p key={index}>{examp.name}</p>
  })

  return ( 
     <div> 
       {examplesList}
     </div> 
  ) 
} 
export default Examples;
