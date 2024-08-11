import React, { useState, useEffect } from "react";
import locations from "../data/locations.js";

function Tracker({ combinedSelections }) {
  const [inputValues, setInputValues] = useState(
    combinedSelections.map(() => "")
  );
  const [suggestions, setSuggestions] = useState(
    combinedSelections.map(() => [])
  );
  const [activeSuggestion, setActiveSuggestion] = useState(null);

  //   useEffect(() => {
  //     if (window.opener && window.opener.combinedSelections) {
  //       setInputValues(window.opener.combinedSelections);
  //       setSuggestions(window.opener.combinedSelections.map(() => []));
  //     }
  //   }, []);

  function handleInputChange(event, index) {
    const { value } = event.target;
    const newInputValues = [...inputValues];
    newInputValues[index] = value;
    setInputValues(newInputValues);

    if (value.trim() === "") {
      const newSuggestions = [...suggestions];
      newSuggestions[index] = [];
      setSuggestions(newSuggestions);
    } else {
      const filteredSuggestions = locations.filter((item) =>
        item.toLowerCase().includes(value.toLowerCase())
      );
      const newSuggestions = [...suggestions];
      newSuggestions[index] = filteredSuggestions;
      setSuggestions(newSuggestions);
    }
  }

  function handleSuggestionClick(suggestion, index) {
    const newInputValues = [...inputValues];
    newInputValues[index] = suggestion;
    setInputValues(newInputValues);
    const newSuggestions = [...suggestions];
    newSuggestions[index] = [];
    setSuggestions(newSuggestions);
  }

  function handleKeyDown(event, index) {
    const newSuggestions = [...suggestions];
    const suggestionCount = newSuggestions[index]?.length || 0;

    switch (event.key) {
      case "ArrowDown":
        setActiveSuggestion((prev) =>
          prev === null ? 0 : (prev + 1) % suggestionCount
        );
        break;
      case "ArrowUp":
        setActiveSuggestion((prev) =>
          prev === null
            ? suggestionCount - 1
            : (prev - 1 + suggestionCount) % suggestionCount
        );
        break;
      case "Enter":
        if (activeSuggestion !== null) {
          handleSuggestionClick(newSuggestions[index][activeSuggestion], index);
          setActiveSuggestion(null);
        }
        break;
      default:
        break;
    }
  }

  return (
    <div className="hints">
      {combinedSelections.map((selection, index) => (
        <div className="hint-item" key={index}>
          <span>{selection}</span>
          <br></br>
          <input
            type="text"
            value={inputValues[index]}
            onChange={(e) => handleInputChange(e, index)}
            placeholder="Location"
            onKeyDown={(e) => handleKeyDown(e, index)}
          />
          <ul>
            {suggestions[index]?.map((suggestion, subIndex) => (
              <li
                key={subIndex}
                className={activeSuggestion === subIndex ? "active" : ""}
                onClick={() => handleSuggestionClick(suggestion, index)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default Tracker;
