import React, { useState } from "react";
import actions from "../data/action.js";
import supports from "../data/support.js";
import Tracker from "./Tracker.jsx";

function Home() {
  const [selectedActions, setSelectedActions] = useState([]);
  const [selectedSupports, setSelectedSupports] = useState([]);

  const handleActionSelect = (action) => {
    setSelectedActions((prev) =>
      prev.includes(action)
        ? prev.filter((a) => a !== action)
        : [...prev, action]
    );
  };

  const handleSupportSelect = (support) => {
    setSelectedSupports((prev) =>
      prev.includes(support)
        ? prev.filter((s) => s !== support)
        : [...prev, support]
    );
  };

  const combinedSelections = [...selectedActions, ...selectedSupports];

  const handleOpenPopout = () => {
    sessionStorage.setItem(
      "combinedSelections",
      JSON.stringify(combinedSelections)
    );
    window.open(
      `${window.location.origin}/#/tracker`,
      "_blank",
      "toolbar=no,resizeable=yes,width=300,height=625"
    );
  };

  return (
    <div>
      <div className="abilities">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "900px",
          }}
        >
          <div
            className="actions"
            style={{ overflowY: "scroll", height: "400px", width: "45%" }}
          >
            <h2>Action</h2>
            <ul>
              {actions.map((action, index) => (
                <li
                  key={index}
                  onClick={() => handleActionSelect(action)}
                  style={{
                    cursor: "pointer",
                    backgroundColor: selectedActions.includes(action)
                      ? "rgb(247, 157, 30)"
                      : "rgb(0, 37, 66)",
                  }}
                >
                  {action}
                </li>
              ))}
            </ul>
          </div>
          <div
            className="supports"
            style={{ overflowY: "scroll", height: "400px", width: "45%" }}
          >
            <h2>Support</h2>
            <ul>
              {supports.map((support, index) => (
                <li
                  key={index}
                  onClick={() => handleSupportSelect(support)}
                  style={{
                    cursor: "pointer",
                    backgroundColor: selectedSupports.includes(support)
                      ? "rgb(247, 157, 30)"
                      : "rgb(0, 58, 26)",
                  }}
                >
                  {support}
                </li>
              ))}
            </ul>
          </div>
          <div
            className="tracker"
            style={{ overflowY: "scroll", height: "400px", width: "45%" }}
          >
            <h2>Tracker</h2>
            <Tracker combinedSelections={combinedSelections} />
            <button className="popout-button" onClick={handleOpenPopout}>
              Popout Tracker
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
