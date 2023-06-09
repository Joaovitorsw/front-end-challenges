import React from "react";

import playersList from "../../players.json";
import PlayerDetail from "../player-info";
export default function TeamSelection() {
  const [players] = React.useState([...playersList]);
  const [selectedPlayers, setSelectedPlayers] = React.useState([]);
  const [showPlayerDetail, setShowPlayerDetail] = React.useState(false);
  const [idx, setIdx] = React.useState(null);
  const [welcome, setWelcome] = React.useState(true);
  const [noBat, setNoBat] = React.useState(0);
  const [noBowl, setNoBowl] = React.useState(0);
  const [noAR, setNoAR] = React.useState(0);
  const [noWk, setNoWK] = React.useState(0);
  console.log(noWk);
  const addPlayer = (index) => {
    if (noBat >= 6) {
      alert("Batsmen can not be more than 6");
    }

    if (players[index].type == "Batsman") {
      setNoBat(noBat + 1);
    }

    if (noBowl >= 6) {
      alert("Bowlers can not be more than 6");
    }

    if (players[index].type == "Bowler") {
      setNoBowl(noBowl + 1);
    }

    if (noAR >= 4) {
      alert("All Rounders can not be more than 4");
    }

    if (players[index].type == "AllRounder") {
      setNoAR(noAR + 1);
    }
    if (noWk > 1) {
      alert("Only 1 wicket keeper is allowed in a team");
    }
    if (players[index].type == "WicketKeeper") {
      setNoWK(noWk + 1);
    }

    if (selectedPlayers.length === 11) return alert("Only 11 players are allowed in a team");

    setSelectedPlayers([...selectedPlayers, players[index]]);
    setShowPlayerDetail(false);
  };

  const removePlayer = (index) => {
    const player = selectedPlayers[index];

    if (player.type == "Batsman") {
      setNoBat(noBat - 1);
    }

    if (player.type == "Bowler") {
      setNoBowl(noBowl - 1);
    }

    if (player.type == "AllRounder") {
      setNoAR(noAR - 1);
    }

    if (player.type == "WicketKeeper") {
      setNoWK(noWk - 1);
    }

    const newSelectedPlayers = [...selectedPlayers];
    newSelectedPlayers.splice(index, 1);
    setSelectedPlayers(newSelectedPlayers);
  };

  const showPlayerDetailsCard = (i) => {
    setIdx(i);
    setShowPlayerDetail(true);
  };

  const closeCard = () => {
    setShowPlayerDetail(false);
  };

  return (
    <div className="mt-50 layout-column justify-content-center align-items-center">
      <div style={{ display: "flex", width: "80%" }}>
        {showPlayerDetail && (
          <PlayerDetail
            selectedPlayers={selectedPlayers}
            i={idx}
            id="details-card"
            close={() => closeCard()}
            index={1}
            addPlayer={(i) => addPlayer(i)}
          />
        )}
        <div
          className="card outlined mt-0"
          style={{
            width: "50%",
            marginRight: "10px",
            overflow: "scroll",
            height: "80vh",
          }}
        >
          <div className="card-text">
            <h4 style={{ textAlign: "center" }}>Available Players</h4>
            <table>
              <thead>
                <tr>
                  <th data-testid="available-players-name">Name</th>
                  <th>Role</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody data-testid="available-players-table-body">
                <tr>
                  <td data-testid="selection-rules" colSpan="3" className="card pb-20">
                    <p
                      data-testid="close-welcome"
                      style={{ textAlign: "right" }}
                      onClick={(event) => {
                        event.target.parentElement.remove();
                        setWelcome(false);
                      }}
                    >
                      X
                    </p>
                    <h3 style={{ textAlign: "center" }}>
                      <strong>Welcome to Team Selection</strong>
                    </h3>
                    11 players are required in a team <br />
                    3-6 batsmen and bowlers are allowed in a team
                    <br />
                    Only 1 Wicket Keeper required in a team
                    <br />
                    1-4 All Rounders are allowed in a team
                  </td>
                </tr>
                {players.map((player, index) => {
                  return (
                    <tr data-testid={`available-${player.name.split(" ").join("-")}-row`} key={index}>
                      <td data-testid={`available-${player.name.split(" ").join("-")}-name`} onClick={() => showPlayerDetailsCard(index)}>
                        {player.name}
                      </td>
                      <td onClick={() => showPlayerDetailsCard(index)}>{player.type}</td>
                      <td>
                        <button
                          data-testid={`available-${player.name.split(" ").join("-")}-select`}
                          onClick={() => addPlayer(index)}
                          disabled={selectedPlayers.indexOf(player) !== -1}
                          className="btn btn-primary text"
                        >
                          Select
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div
          className="card outlined mt-0"
          style={{
            width: "50%",
            marginRight: "10px",
            overflow: "scroll",
            height: "80vh",
          }}
        >
          <div className="card-text">
            <h4 style={{ textAlign: "center" }}>Selected Players</h4>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody data-testid="selected-players-table-body">
                {selectedPlayers.map((player, index) => {
                  return (
                    <tr data-testid={`selected-${player.name.split(" ").join("-")}-row`} key={index}>
                      <td>{player.name}</td>
                      <td>{player.type}</td>
                      <td>
                        <button
                          data-testid={`selected-${player.name.split(" ").join("-")}-remove`}
                          onClick={() => removePlayer(index)}
                          className="btn danger text"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
