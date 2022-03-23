import React, { useState } from "react";
import NoteContext from "./NoteContext";
const NoteState = (props) => {
  const host='http://localhost:4000'
  const noteInitial = [];
  const [notes, setNotes] = useState(noteInitial);
    // get note
    const getNotes=async()=>{
      console.log(`${host}/note`);

      const response = await fetch(`${host}/note`, {
        method: 'GET',
        headers: {
          "Authorization":localStorage.getItem('token')   },
      })
      const json=await response.json()
      console.log(json);
      setNotes(json.data)
    }
  //Add a notes
  const addNotes = async(title,description,tags) => {
      console.log("adding new note");
      // todo api call
      let  note={
        title: title,
        description: description,
        tags: tags,
      }
      let newdata=[]
      let data=notes.map((a)=>{
        newdata.push(a.title)
      })
      if(newdata.includes(note.title)){
        console.log('data already exist');
      }else{
        const response = await fetch(`${host}/note`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            "Authorization":localStorage.getItem('token')   },
          body: JSON.stringify({title,description,tags})      
        })
        setNotes([...notes,note])
        props.showAlert("Add successfully",'success')
      }
  };
  console.log(notes,';;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;');
  //Delete a notes
  const deleteNotes =async (id) => {
    console.log(id,'llllllllllllllllllllllllllllll');
    const response = await fetch(`${host}/note/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "Authorization":localStorage.getItem('token') },
    })
    const newNote=notes.filter((a)=>{
      return a.noteId!==id
    })
    setNotes(newNote)
    props.showAlert("Deleted successfully",'success')
  };
  //edit a notes
  const editNotes =async (noteId ,title,description,tags) => {
    const response = await fetch(`${host}/note/update/${noteId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "Authorization":localStorage.getItem('token') },
      body: JSON.stringify({title,description,tags})
      
    })
  const Json=await response.json()
  const newNotes= JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < newNotes.length; index++) {
      let element=newNotes[index]
      // console.log(element.noteId==noteId,'lllllllllllllllllllllllll');
      if(element.noteId==noteId){
        newNotes[index].title=title
        newNotes[index].description=description
        newNotes[index].tags=tags
        break
      } 
    }
    setNotes(newNotes)
  };
  return (
    <NoteContext.Provider value={{ notes,getNotes, setNotes,addNotes,deleteNotes,editNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
