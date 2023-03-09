import {useState} from "react"
import "./App.css";
import Sidebar from "./sidebar";
import Main from "./main";
import uuid from "react-uuid";


function App() {
  const [notes, setNotes] = useState([]);
  const onAddNote = () =>{
    const newNote = {
      id: uuid(),
      title:"Untitled",
      body:"",
      lastModified: Date.now(),
    };

    setNotes([newNote, ...notes]);
  };
  
  
  return ( <div className="App">Lotion
  <Sidebar notes={notes}  onAddNote ={onAddNote}/>
  <Main />
  </div>
  );
}

export default App;
