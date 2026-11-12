import { useState } from "react";
import "../styles/personal.css";
import "../styles/app.css";

interface Empleado {
  id: number;
  name: string;
  email: string;
  address: { city: string };
}
interface EmployeeCardProps {
  nombre: string;
  correo: string;
  ciudad: string;
}

function EmployeeCard({ nombre, correo, ciudad }: EmployeeCardProps) {
  return (
    <article className="card">
      <div className="avatar">{nombre.charAt(0)}</div>
      <div className="card-info">
        <h3>{nombre}</h3>
        <p>{correo}</p>
        <p>{ciudad}</p>
      </div>
    </article>
  );
}

function Personal() {
  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const [pedido, setPedido] = useState(false);
   const [busqueda, setBusqueda] = useState("");

  async function obtenerEmpleados(): Promise<void> {
    try {
      const respuesta = await fetch("https://jsonplaceholder.typicode.com/users");
      const datos = await respuesta.json();
      setEmpleados(datos);
    } catch (error) {
      console.error("Error de red:", error);
    }
  }

  if (!pedido) {
    setPedido(true);
    obtenerEmpleados();
  }

  function Buscar() {
    const input = document.querySelector(".buscador") as HTMLInputElement;
    setBusqueda(input.value.trim().toLowerCase());
  }

  const empleadosFiltrados = empleados.filter((e) =>
    e.name.toLowerCase().includes(busqueda)
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

      <h2 className="titulo">Personal</h2>

      <div className="lista">
        {empleadosFiltrados.map((e) => (
          <EmployeeCard
            key={e.id}
            nombre={e.name}
            correo={e.email}
            ciudad={e.address.city}
          />
        ))}
      </div>
    </>
  );
}

export default Personal;
