import React, { useState } from 'react';
import styles from './SearchDesktop.module.css';
import { FaSearch, } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { io } from "socket.io-client";
import useSocket from '../Hooks/useSocket';
import Boleto from './../Item/Boleto'


const socket = io("https://bc-api.estelarbet.net");

// 🔧 Limpia puntos y guiones del RUT
const limpiarRUT = (rut) => rut.replace(/\./g, '').replace(/-/g, '').toLowerCase();

// ✅ Permite RUT con o sin guion
const validarRUT = (rut) => {
  const rutLimpio = limpiarRUT(rut);
  const regexRUT = /^[0-9]{7,8}[0-9Kk]$/; // sin puntos, sin guion
  return regexRUT.test(rutLimpio);
};

//  Formatea a XX.XXX.XXX-Y
const formatearRUT = (rut) => {
  const clean = rut.replace(/\D/g, '');
  const cuerpo = clean.slice(0, -1);
  const dv = clean.slice(-1);
  let cuerpoFormateado = '';
  for (let i = cuerpo.length - 1, j = 1; i >= 0; i--, j++) {
    cuerpoFormateado = cuerpo[i] + cuerpoFormateado;
    if (j % 3 === 0 && i !== 0) cuerpoFormateado = '.' + cuerpoFormateado;
  }
  return `${cuerpoFormateado}-${dv}`;
};

const SearchDesktop = () => {
  const { members } = useSocket(socket, 'campaign-1'); // igual que en mobile
  const [rut, setRut] = useState('');
  const [user, setUser] = useState(null);
  const [rewards, setRewards] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);


  const handleSearch = () => {
    setLoading(true); // Inicia loader

    setTimeout(() => { // Simula tiempo de espera suave
      if (rut.trim() === '') {
        setError("El campo RUT no puede estar vacío.");
        setUser(null);
        setRewards([]);
        setLoading(false);
        return;
      }

      if (!validarRUT(rut)) {
        setError("Ingrese un RUT válido. Ej: 12.345.678-9 o 123456789.");
        setUser(null);
        setRewards([]);
        setLoading(false);
        return;
      }

      const encontrado = members.find(
        (u) => limpiarRUT(u.rut) === limpiarRUT(rut)
      );

      if (encontrado) {
        setUser({
          name: encontrado.fullName,
          rut: formatearRUT(encontrado.rut)
        });

        const premios = [
          {
            title: 'PAPAS FRITAS',
            description: 'Regístrate y obtén el primer premio',
            status: encontrado.isRegistered === 'true' ? 'Ganado' : 'Pendiente',
            icon: '/icons/fries.png'
          },
          {
            title: 'BEBIDA A ELECCIÓN',
            description: 'Verifica tu cuenta',
            status: encontrado.isVerified === 'true' ? 'Ganado' : 'Pendiente',
            icon: '/icons/drink.png'
          },
          {
            title: 'SMASH BURGER',
            description: 'Haz un recargo mínimo',
            status: encontrado.didDeposit === 'true' ? 'Ganado' : 'Pendiente',
            icon: '/icons/burger.png'
          }
        ];

        setRewards(premios);
        setError('');
      } else {
        setUser(null);
        setRewards([]);
        setError("No se encontró ningún participante con ese RUT.");
      }

      setLoading(false); // Detiene loader
    }, 1000); // Delay animación
  };




  return (
    <section className={styles['checker-container']}>
      <div className={styles['checker-box']}>
        <div className={`${styles['checker-content']} ${user ? styles['start'] : styles['center']}`}>

          <div>
            <FaSearch className={styles['checker-icon']} />
            <h2>VERIFICA TU PARTICIPACIÓN</h2>
            <p className={styles['checker-text']}>Busca con tu rut y verifica tu estado para cobrar los premios</p>

            {user && (
              <div className={styles['checker-user']}>
                <div><strong>Usuario</strong></div>
                <div>{user.name}</div>
                <div><strong>Rut</strong></div>
                <div>{user.rut}</div>
              </div>
            )}

            <div className={styles['checker-input-group']}>
              <input
                type="text"
                placeholder="Ingresa tu rut"
                value={rut}
                onChange={(e) => setRut(e.target.value)}
              />
            
                <button className={styles['clear-btn']} > <CiSearch />
 </button>
              

              <button className={styles['search-btn']} onClick={handleSearch}>Buscar</button>
            </div>

            {loading && <div className={styles.loader}></div>}


            {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
          </div>

          {user && rewards.length > 0 && (
            <div className={`${styles['rewards-box']} ${rewards.length > 0 ? styles['rewards-box-enter'] : ''}`}>


              <h3>PREMIOS POR GANAR</h3>
              {rewards.map((reward, index) => (
                <Boleto key={index} />
              ))}

            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SearchDesktop;




{/* <div key={index} className={styles['reward-card']}>
<div className={styles['reward-status']}>{reward.status}</div>
<div className={styles['reward-info']}>
  <img src={reward.icon} alt={reward.title} />
  <div>
    <strong>{reward.title}</strong>
    <p>{reward.description}</p>
    <span>Válido hasta agotar existencia</span>
  </div>
</div>
</div> */}