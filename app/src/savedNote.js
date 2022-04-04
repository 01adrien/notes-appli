import React, { useState } from "react";

export default function SavedNote({
  title,
  id,
  click,
  toDelete,
  rank,
  toLiftUp,
}) {
  const [clicked, setClicked] = useState(click);
  const [deleteState, setDelete] = useState(toDelete);

  function selected() {
    clicked ? setClicked(false) : setClicked(true);
    toLiftUp([id, clicked]);
  }
  return (
    <p
      style={{
        backgroundColor: clicked ? "#cfd1cc" : "#e7edef",
        width: deleteState ? "70%" : "initial",
        color: deleteState ? "red" : "black",
        border: rank === "5" ? "3px solid green" : "3px solid black",
      }}
      className="saved-note"
      onClick={selected}
    >
      {title}
    </p>
  );
}
