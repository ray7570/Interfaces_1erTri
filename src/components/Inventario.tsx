import { useState } from "react";
import "../styles/inventario.css";
import "../styles/app.css";

interface Activo {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
}

interface AssetCardProps {
  titulo: string;
  categoria: string;
  precio: number;
  imagen: string;
}

function AssetCard({ titulo, categoria, precio, imagen }: AssetCardProps) {
  return (
    <article className="card">
      <img className="card-img" src={imagen} alt={titulo} />
      <div className="card-info">
        <h3>{titulo}</h3>
        <p>{categoria}</p>
        <p className="precio">{precio} $</p>
      </div>
    </article>
  );
}

function Inventario() {
  const [activos, setActivos] = useState<Activo[]>([]);
  const [pedido, setPedido] = useState(false);

  async function obtenerActivos(): Promise<void> {
    try {
      const respuesta = await fetch("https://fakestoreapi.com/products?limit=20");

      const datos = await respuesta.json();
      setActivos(datos);
    } catch (error) {
      console.error("Error de red:", error);
    }
  }

  if (!pedido) {
    setPedido(true);
    obtenerActivos();
  }

  return (
    <>

      <input
        className="buscador"
        type="text"
        placeholder="Buscar en el inventario"
      />

      <h2 className="titulo">Inventario de activos</h2>

      <div className="lista">
        {activos.map((a) => (
          <AssetCard
            key={a.id}
            titulo={a.title}
            categoria={a.category}
            precio={a.price}
            imagen={a.image}
          />
        ))}
      </div>
    </>
  );
}

export default Inventario;
