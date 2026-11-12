import "../styles/sidebar.css";
import "../styles/app.css";

interface SidebarProps {
  seccion: string;
  setSeccion: (seccion: string) => void;
}

function Sidebar({ seccion, setSeccion }: SidebarProps) {
  return (
    <>
      <button
        className={seccion === "Personal" ? "boton activo" : "boton"}
        onClick={() => setSeccion("Personal")}
      >
        Personal
      </button>

      <button
        className={seccion === "Inventario" ? "boton activo" : "boton"}
        onClick={() => setSeccion("Inventario")}
      >
        Inventario
      </button>

      <button
        className={seccion === "Incidencias" ? "boton activo" : "boton"}
        onClick={() => setSeccion("Incidencias")}
      >
        Incidencias
      </button>
    </>
  );
}

export default Sidebar;
