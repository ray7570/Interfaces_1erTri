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

  return (
    <>
      <input
        className="buscador"
        type="text"
        placeholder="Buscar empleado por nombre..."
      />

      <div className="lista">
        {empleados.map((e) => (
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
