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

  return (
    <>
      <input
        className="buscador"
        type="text"
        placeholder="Buscar incidencia"
      />

      <h2 className="titulo">Registro de incidencias</h2>
      <div className="lista">
        {incidencias.map((i) => (
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
