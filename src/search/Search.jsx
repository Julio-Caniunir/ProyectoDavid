import React, { useState, useEffect } from 'react';
import Item from '../Item/Item';
import './search.css';
import { FaSearch } from "react-icons/fa";

const limpiarRUT = (rut) => rut.replace(/\./g, '').replace(/-/g, '').toLowerCase();

const validarRUT = (rut) => {
  const rutLimpio = limpiarRUT(rut);
  const regexRUT = /^[0-9]{7,8}[0-9Kk]$/;
  return regexRUT.test(rutLimpio);
};

const Search = () => {
  const [members, setMembers] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [resultados, setResultados] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://socket-proxy-2dre.onrender.com/members")
      .then((res) => res.json())
      .then((data) => setMembers(data))
      .catch((err) => {
        console.error("Error al obtener miembros:", err);
        setError("No se pudo conectar al servidor.");
      });
  }, []);

  const manejarCambio = (e) => {
    setBusqueda(e.target.value);
    setError("");
  };

  const ejecutarBusqueda = () => {
    if (busqueda.trim() === "") {
      setError("El campo RUT no puede estar vacío.");
      setResultados([]);
      return;
    }

    if (!validarRUT(busqueda)) {
      setError("Ingrese un RUT válido. Ej: 12.345.678-9 o 123456789.");
      setResultados([]);
      return;
    }

    const resultadosFiltrados = members.filter(participante =>
      limpiarRUT(participante.rut) === limpiarRUT(busqueda)
    );

    setResultados(resultadosFiltrados);

    if (resultadosFiltrados.length === 0) {
      setError("No se encontró ningún participante con ese RUT.");
    }
  };

  return (
    <div className="SearchContainer">
      <div className='searchHeader'>
        <FaSearch className="searchIcon" />
        <h2>verifica tu participación</h2>
        <p>Busca con tu rut y verifica tu estado para cobrar los premios</p>
      </div>

      <div className="inputContainer">
        <input
          type="text"
          placeholder="Ingresa tu RUT"
          value={busqueda}
          onChange={manejarCambio}
          className="search-input"
        />
        <FaSearch className="inputIcon" />
      </div>

      <button onClick={ejecutarBusqueda} className="search-button">Buscar</button>

      {error && <p className="error-message">{error}</p>}

      {resultados.map((participante, index) => (
        <Item
          key={index}
          clientId={participante.id}
          clientName={participante.fullName}
          clientRUT={participante.rut}
          promotionCode={participante.promotionCode}
          isRegistered={true}
          isVerified={participante.isVerified === "true"}
          didDeposit={false}
        />
      ))}
    </div>
  );
};

export default Search;
