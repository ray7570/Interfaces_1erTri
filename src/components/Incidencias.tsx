import { useState } from "react";
import "../styles/incidencias.css";
import "../styles/app.css";

interface Incidencia {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

interface IncidentCardProps {
  id: number;
  titulo: string;
  departamento: number;
  completada: boolean;
}

function IncidentCard({ id, titulo, departamento, completada }: IncidentCardProps) {
  return (
    <article className={completada ? "card resuelta" : "card pendiente"}>
      <div className="card-info">
        <h3>Incidencia #{id}</h3>
        <p>{titulo}</p>
        <p>Departamento {departamento}</p>
        <span className={completada ? "etiqueta ok" : "etiqueta warn"}>
          {completada ? "Resuelta" : "Pendiente"}
        </span>
      </div>
    </article>
  );
}

function Incidencias() {
  const [incidencias, setIncidencias] = useState<Incidencia[]>([]);
  const [pedido, setPedido] = useState(false);
  const [busqueda, setBusqueda] = useState("");

  async function obtenerIncidencias(): Promise<void> {
    try {
      const respuesta = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=12");

      const datos = await respuesta.json();
      setIncidencias(datos);
    } catch (error) {
      console.error("Error de red:", error);
    }
  }

  if (!pedido) {
    setPedido(true);
    obtenerIncidencias();
  }

  function Buscar(){
    const input = document.querySelector(".buscador") as HTMLInputElement;
    setBusqueda(input.value.trim().toLowerCase());
  }
  const incidenciasFiltradas = incidencias.filter((i) =>
    i.title.toLowerCase().includes(busqueda)
  );

  return (
    <>
      <div className="botonBuscar">      
        <input
          className="buscador"
          type="text"
          placeholder="Buscar en el inventario"
        />
        <button id="botonDeBuscador" onClick={Buscar}>Buscar</button>
      </div>

      <h2 className="titulo">Registro de incidencias</h2>
      <div className="lista">
        {incidenciasFiltradas.map((i) => (
          <IncidentCard
            key={i.id}
            id={i.id}
            titulo={i.title}
            departamento={i.userId}
            completada={i.completed}
          />
        ))}
      </div>
    </>
  );
}

export default Incidencias;
