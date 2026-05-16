import React,{useContext, useEffect , useRef,useState} from 'react'
import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';
import Addnote from './Addnote';
import { useNavigate } from 'react-router-dom';
const Notes = (props) => {
  const context = useContext(noteContext);
  const navigate = useNavigate();
  const {notes,addNote,getNotes,editNote} = context;
  const [note,setNote] = useState({etitle:"",edescription:"",etag:""});
  useEffect(()=>{
    if(localStorage.getItem('token')){
      getNotes()
    }
    else{
      navigate("/login");
    }
    
  },[])
  const refclose = useRef(null);
  const updateNote = (currentNote) =>{
    console.log("clicked");
       ref.current.click();
       setNote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag})

  }
  const handleclick = (e) =>{
    console.log("Updating the note,",note);
      e.preventDefault();
      editNote(note.id,note.etitle,note.edescription,note.etag);
      refclose.current.click();
      props.setAlert("Updated Successfully","success")
  }
  const onChange = (e) => {
       setNote({...note,[e.target.name]:e.target.value});
  }
  const ref = useRef(null)
  return (
    <div>
      <Addnote setAlert={props.setAlert}/>
      <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal"  tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"><i className="fa-solid fa-x"></i></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" ref={refclose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.length<5 || note.edescription.length<5} type="button" className="btn btn-primary" onClick={handleclick}>Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <h1>Your Notes</h1>
      <div className="row my-3 ">
        <div className="container mx-2">
        {notes.length===0 &&'No Notes to display'}
        </div>
      {notes.map((note)=>{
        return <Noteitem key={note._id} updateNote={updateNote} note={note} setAlert={props.setAlert} />
      })}
      </div>
    </div>
  )
}

export default Notes
