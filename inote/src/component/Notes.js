import React, { useEffect, useRef ,useState} from "react";
import { useContext } from "react";
import noteContext from "../context/notes/NoteContext";
import NoteItems from "./NoteItems";
import AddNotes from "./AddNotes";
import { useNavigate } from 'react-router-dom'
const Notes = (props) => {
  const [note,setNote]=useState({id:"", etitle:"",edescription:"",etags:""})
  const context = useContext(noteContext);
  const navigate = useNavigate()
  const { notes, getNotes,editNotes } = context;
  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes();
    }else{
      navigate('/login')
    }
  }, []);
  const ref = useRef(null);
  const refClose = useRef(null);

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({noteId:currentNote.noteId, etitle:currentNote.title,edescription:currentNote.description,etags:currentNote.tags})
  };
  const handleClick = (e) => {
    e.preventDefault();
    editNotes(note.noteId,note.etitle,note.edescription,note.etags)
    props.showAlert("Updated successfully",'success')
    refClose.current.click();

    // console.log('updating note ',note);
    // addNotes(note.title, note.description, note.tags);
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <>
       <AddNotes showAlert={props.showAlert}/>
      <button
        type="button"
        className="btn btn-primary d-none"
        ref={ref}
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">
                    title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    value={note.etitle}
                    aria-describedby="emailHelp"
                    onChange={onChange}
                  />
                  <div id="emailHelp" className="form-text"></div>
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    value={note.edescription}
                    name="edescription"
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="etags" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etags"
                    value={note.etags}
                    name="etags"
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
              ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button disabled={note.etitle.length<5||note.edescription.length<5} onClick={handleClick} type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h1> your Notes</h1>
        <div className="container">
        {notes.length===0 && 'No Notes to Display'}
        </div>
        {notes.map((note) => {
          return (
            <NoteItems key={note.noteId} updateNote={updateNote} showAlert={props.showAlert} note={note} />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
