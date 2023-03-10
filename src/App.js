import {useEffect, useState} from "react"
import "./App.css";
import Sidebar from "./sidebar";
import Main from "./main";
import uuid from "react-uuid";


function App() {
  const [notes, setNotes] = useState(
    localStorage.notes ? JSON.parse(localStorage.notes) : []
  );
  const [activeNote, setActiveNote] = useState(false);

  useEffect(()=>{
    localStorage.setItem("notes",JSON.stringify(notes))
  }, [notes]);

  const onAddNote = () => {
    const newNote = {
      id: uuid(),
      title:"Untitled",
      body:"",
      lastModified: Date.now(),
    };

    setNotes([newNote, ...notes]);
  };

  const onUpdateNote = (updatedNote) => {
    const updatedNotesArray = notes.map((note) =>{
      if(note.id === activeNote){
        return updatedNote;
      }

      return note;
    });

    setNotes(updatedNotesArray);
  };

  const onDeleteNote = (idToDel) => {
    setNotes(notes.filter((note) => note.id !== idToDel))

  };

  const getActiveNote = () =>{
    return notes.find((note) => note.id === activeNote);
  }
  
  
  return ( <div className="App">
  <Sidebar 
    notes={notes}  
    onAddNote ={onAddNote} 
    onDeleteNote={onDeleteNote}
    activeNote = {activeNote}
    setActiveNote = {setActiveNote}
    />
  <Main activeNote ={getActiveNote()} onUpdateNote ={onUpdateNote}/>
  </div>
  );
}

export default App;
