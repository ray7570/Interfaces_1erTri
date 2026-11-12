import { useState } from "react";
import logoArkadia from "../assets/logo.png";
import "../styles/header.css";
import "../styles/app.css";

function Header() {
  const [hora, setHora] = useState(() => new Date().toLocaleTimeString());
  setInterval(() => {
    setHora(new Date().toLocaleTimeString());
  }, 1000);

  return (
    <div id="header">
      <div id="logoTit">
        <img id="logo" src={logoArkadia} alt="Logo de Arkadia" />
        <h1 id="titulo">ARKADIA</h1>
      </div>

      <div id="hora">
        <h2>{hora}</h2>
      </div>
    </div>
  );
}

export default Header;
