import "./styles.css";
import React, { useState } from "react";
import SavedNote from "./savedNote";
import { generateID, sortNotes, data } from "./tools";

export default function App() {
  const [noteTitle, setTitle] = useState("");
  const [noteContent, setcontent] = useState("");
  const [notesList, setList] = useState(data);
  const [noteRank, setRank] = useState(1);
  const [isCreatedNote, setIscreated] = useState(false);
  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleContentChange = (e) => setcontent(e.target.value);
  const HandleRankChange = (e) => setRank(e.target.value);
  console.log(notesList);
  function createNote() {
    setTitle("");
    setcontent("");
    setIscreated(true);
  }

  function addNotes(e) {
    let newNotesList = notesList.slice();
    if (noteTitle && noteContent && isCreatedNote) {
      newNotesList.push({
        title: noteTitle,
        content: noteContent,
        id: generateID(),
        click: false,
        rank: noteRank,
      });
      if (newNotesList.length > 1) {
        newNotesList = sortNotes(newNotesList);
      }
    }
    setList(newNotesList);
    setTitle("");
    setcontent("");
    console.log(notesList);
    setIscreated(false);
  }

  function deleteSavedNotes(e) {
    const newNotesList = notesList.slice();
    setIscreated(false);
    for (let i = 0; i < notesList.length; i++) {
      if (notesList[i].click === true) {
        newNotesList.splice(i, 1);
      }
    }
    setList(newNotesList);
    console.log(notesList);
  }

  function liftUpState(newState) {
    const newNotesList = notesList.slice();
    for (let i = 0; i < newNotesList.length; i++) {
      console.log(newNotesList[i].click, newNotesList[i].title, newState[1]);
      if (newNotesList[i].id === newState[0] && newState[1] === false) {
        newNotesList[i].click = true;
      } else if (newNotesList[i].id === newState[0] && newState[1] === true) {
        newNotesList[i].click = false;
      }
    }
    setList(newNotesList);
  }
  function notesToDisplay() {
    setIscreated(false);
    let titleToDisplay = "";
    let contentToDispaly = "";
    for (let i = 0; i < notesList.length; i++) {
      if (notesList[i].click === true) {
        titleToDisplay = notesList[i].title;
        contentToDispaly = notesList[i].content;
      }
    }
    setTitle(titleToDisplay);
    setcontent(contentToDispaly);
  }

  return (
    <div className="App">
      <img
        onClick={notesToDisplay}
        className="top-img"
        src="https://cdn-icons-png.flaticon.com/512/5824/5824223.png"
        alt="note"
      />
      <div className="note-area">
        <input
          type="text"
          placeholder=" title of your note here.."
          value={noteTitle}
          onChange={handleTitleChange}
        ></input>
        <input
          type="number"
          className="ranking"
          min="1"
          max="5"
          placeholder="1"
          value={noteRank}
          onChange={HandleRankChange}
        ></input>
        <textarea
          className="note-content"
          value={noteContent}
          onChange={handleContentChange}
          placeholder=" content of your note here.."
        ></textarea>
        <div className="btn-container">
          <button
            onClick={createNote}
            style={{ backgroundColor: isCreatedNote ? "#cfd1cc" : "" }}
          >
            Create
          </button>
          <button onClick={addNotes}>Save</button>
          <button onClick={deleteSavedNotes}>Delete</button>
        </div>
      </div>
      {isCreatedNote ? (
        <img
          onClick={notesToDisplay}
          className="bottom-img"
          src="https://cdn-icons-png.flaticon.com/512/702/702797.png"
          alt=""
        />
      ) : (
        ""
      )}
      (
      <div className="saved-notes">
        {notesList.map((note) => (
          <SavedNote
            title={note.title}
            content={note.content}
            id={note.id}
            click={note.click}
            toDelete={note.toDelete}
            dClick={note.doubleClick}
            rank={note.rank}
            toLiftUp={liftUpState}
          />
        ))}
      </div>
    </div>
  );
}
