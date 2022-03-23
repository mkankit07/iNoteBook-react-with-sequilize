import React from "react";
import noteContext from "../context/notes/NoteContext";
import { useContext,useState } from "react";
const AddNotes = (props) => {
  const context = useContext(noteContext);
  const { addNotes } = context;
const [note,setNote]=useState({title:"",description:"",tags:""})
  const handleClick = (e) => {
      e.preventDefault()
      addNotes(note.title,note.description,note.tags)
      setNote({title:"",description:"",tags:""})
      props.showAlert('Added successfully', 'success')
  };
  const onChange=(e)=>{
    setNote({...note,[e.target.name]:e.target.value})
  }
  return (
    <div>
      <div className="container my-3">
        <h1>Add a Notes</h1>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              aria-describedby="emailHelp"
              minLength={5}
              value={note.title}
              required
              onChange={onChange}
            />
            <div id="emailHelp" className="form-text"></div>
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              minLength={5}
              value={note.description}
              required
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tags" className="form-label">
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="tags"
              name="tags"
              value={note.tags}
              onChange={onChange}
            />
          </div>
          <button disabled={note.title.length<5||note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>
            Add Note
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNotes;
