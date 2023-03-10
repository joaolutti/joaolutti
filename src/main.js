import React, { useState } from "react";
import ReactMarkdown from "react-markdown";

const Main = ({ activeNote, onUpdateNote }) => {
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const onEditField = (key, value) => {
    onUpdateNote({
      ...activeNote,
      [key]: value,
      lastModified: Date.now(),
    });
  };

  const toggleBold = () => {
    setIsBold(!isBold);
  };

  const toggleItalic = () => {
    setIsItalic(!isItalic);
  };

  const toggleUnderline = () => {
    setIsUnderline(!isUnderline);
  };

  const handleSave = () => {
    setIsEditing(false);
    onEditField("body", getMarkdown());
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  if (!activeNote)
    return <div className="no-active-note">Select a note, or create a new one.</div>;

  const formatDate = (timestamp) => {
    const options = {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return new Date(timestamp).toLocaleDateString("en-US", options);
  };

  const getMarkdown = () => {
    let markdown = activeNote.body;
    if (isBold) {
      markdown = `**${markdown}**`;
    }
    if (isItalic) {
      markdown = `_${markdown}_`;
    }
    if (isUnderline) {
      markdown = `<u>${markdown}</u>`;
    }
    return markdown;
  };

  return (
    <div className="app-main">
      <div className="app-main-note-edit">
        <input
          type="text"
          id="title"
          value={activeNote.title}
          onChange={(e) => onEditField("title", e.target.value)}
          autoFocus
        />
        <p className="note-date">{formatDate(activeNote.lastModified)}</p>
        <div className="format-buttons">
          <button onClick={toggleBold}>
            <strong>B</strong>
          </button>
          <button onClick={toggleItalic}>
            <em>I</em>
          </button>
          <button onClick={toggleUnderline}>
            <u>U</u>
          </button>
        </div>
        {isEditing ? (
          <div>
            <textarea
              id="body"
              placeholder="Your Note Here"
              value={getMarkdown()}
              onChange={(e) => onEditField("body", e.target.value)}
              className="note-textarea"
            />
            <button className="save-btn" onClick={handleSave}>Save</button>
          </div>
        ) : (
          <div>
            <ReactMarkdown className="markdown-preview">
              {activeNote.body}
            </ReactMarkdown>
            <button className="edit-btn" onClick={handleEdit}>Edit</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Main;
