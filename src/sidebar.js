import { useState } from "react";

function Sidebar({ notes, onAddNote, onDeleteNote, activeNote, setActiveNote }) {
  const sortedNotes = notes.sort((a, b) => b.LastModified - a.LastModified);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleDeleteNote = (note) => {
    const confirmed = window.confirm("Are you sure you want to delete this note?");
    if (confirmed) {
      onDeleteNote(note);
    }
  };

  return (
    <div className="app-sidebar">
      <div className="app-sidebar-header">
        <h1>Notes</h1>
        <div className="button-container">
          {activeNote && (
            <button
              className="delete-button"
              onClick={() => handleDeleteNote(activeNote)}
            >
              DELETE
            </button>
          )}
          <button className="plus-button" onClick={onAddNote}>
            +
          </button>
        </div>
      </div>
      <div className="app-sidebar-notes">
        {sortedNotes.map((note) => (
          <div
            key={note.id}
            className={`app-sidebar-note ${
              note.id === activeNote && "active"
            }`}
            onClick={() => setActiveNote(note.id)}
          >
            <div className="sidebar-note-title">
              <strong>{note.title}</strong>
            </div>

            <p>{note.body && note.body.substr(0, 50) + "..."}</p>

            <small className="note-meta">
              {new Date(note.LastModified).toLocaleString("en-US", {
                 month: "long",
                 day: "numeric",
                 year: "numeric",
                 hour: "numeric",
                 minute: "numeric",
                 hour12: true,
              })}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
