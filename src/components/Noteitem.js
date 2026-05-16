import React,{useContext} from 'react'
import noteContext from '../context/notes/noteContext';

const Noteitem = (props) => {
    const { note,updateNote } = props;
    const context = useContext(noteContext);
    const {deleteNote} = context;
    return (
        <div className='col-md-3 mx-3 my-3'> 
            <div className="card " style={{width: "18rem"}}>
                <img src="https://plus.unsplash.com/premium_photo-1772778772863-e3e133bc6b4b?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="card-img-top" alt="..."/>
                    <div className="card-body">
                        <h5 className="card-title">{note.title}</h5>
                        <p className="card-text"> {note.description}</p>
                        <button className="btn btn-primary mx-2" onClick={()=>{deleteNote(note._id);props.setAlert("Deleted Successfully","success")}}><i className="fa-solid fa-trash-can "></i> Delete</button>
                        <button className="btn btn-primary mx-2" onClick={()=>{updateNote(note)}}><i className="fa-solid fa-pen-to-square mx-2" ></i> Edit</button>
                    </div>
            </div>
        </div>
    )
}

export default Noteitem
