import React, { useState } from 'react';
import styles from './TicketPromo.module.css';
import ModalCupon from './ModalPremio';

const TicketPromo = ({ img, status, title, description, note }) => {
  const [showModal, setShowModal] = useState(false);

  const handleStatusClick = () => {
    setShowModal(true); // Muestra el modal
  };

  return (
    <>
      <div className={styles.ticket}>
        <div className={styles.left}>
          <img src={img || "/papasFritas.png"} alt="Icono" className={styles.icon} />
          <span className={styles.status} onClick={handleStatusClick}>
            {status || 'Pendiente'}
          </span>
        </div>

        <div className={styles.divider}></div>
        <div className={styles.right}>
          <h3 className={styles.title}>{title || 'PAPAS FRITAS'}</h3>
          <p className={styles.description}>{description || 'Regístrate y obtén el primer premio'}</p>
          <p className={styles.note}>{note || 'Válido hasta agotar existencia'}</p>
        </div>
      </div>

      {showModal && (
        <ModalCupon
          userName="David Salas"
          code="ESTELAR9203"
          ticketQR="/qr_img.png"
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default TicketPromo;
