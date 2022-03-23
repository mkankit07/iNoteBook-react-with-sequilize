import React from 'react'
import noteContext from '../context/notes/NoteContext'
import { useContext } from 'react'
const NoteItems = props => {
  const { note, updateNote } = props
  const context = useContext(noteContext)
  const { deleteNotes } = context
  return (
    <div className='col-md-3 mt-3'>
      <div className='card'>
        <div className='card-body'>
          <h5 className='card-title'>{note.title}</h5>
          <p className='card-text'>{note.description}</p>
          <i
            className='fa-solid fa-trash-can mx-2'
            onClick={() => {
              deleteNotes(note.noteId)
              props.showAlert('deleted successfully', 'danger')
            }}
          ></i>
          <i
            className='fa-solid fa-pen-to-square mx-2 '
            onClick={() => {
              updateNote(note)
            }}
          ></i>
        </div>
      </div>
    </div>
  )
}

export default NoteItems
