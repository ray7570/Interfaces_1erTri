import { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Personal from "./components/Personal";
import Inventario from "./components/Inventario";
import Incidencias from "./components/Incidencias";
import "./styles/app.css";

function App() {
  const [seccion, setSeccion] = useState("Personal");

  return (
    <>
      <div id="general">

        <Header />

        <div id="body">

          <div id="sidebar">
            <Sidebar seccion={seccion} setSeccion={setSeccion} />
          </div>

          <div id="canva">
            <main id="panel_central">
              {seccion === "Personal" && <Personal />}
              {seccion === "Inventario" && <Inventario />}
              {seccion === "Incidencias" && <Incidencias />}
            </main>
          </div>

        </div>
      </div>
    </>
  );
}

export default App;
