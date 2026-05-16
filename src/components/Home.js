import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';
import Notes from './Notes';

const Home = (props) => {
  const {setAlert} = props;
  return (
    <div >
      <Notes setAlert={setAlert} />
    </div>
  )
}

export default Home
