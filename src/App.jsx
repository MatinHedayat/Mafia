import { Route, Routes } from "react-router-dom";
import {
  Launcher,
  AddPlayers,
  // RandomizeRoles,
  // SelectingRoles,
} from "./components/pages/exporter";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function App() {
  const players = useSelector((core) => core.players);

  useEffect(() => {
    localStorage.setItem("players", JSON.stringify(players));
  }, [players]);

  return (
    <>
      <div className='app'>
        <Routes>
          <Route path='/' element={<Launcher />} />
          <Route path='add-players' element={<AddPlayers />} />
          {/* <Route path='selecting-roles' element={<SelectingRoles />} /> */}
          {/* <Route path='randomize-roles' element={<RandomizeRoles />} /> */}
        </Routes>
      </div>
    </>
  );
}
