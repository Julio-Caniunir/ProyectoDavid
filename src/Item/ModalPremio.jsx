import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './ModalCupon.module.css';
import { FaTimes, FaCopy } from 'react-icons/fa';

const ModalPremio = ({ userName, code, onClose, ticketQR }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'auto'; };
  }, []);

  const modalContent = (
    <div className={styles.ticketOverlay}>
      <div className={styles.ticketModal}>
        <div className={styles.ticketCard}>
          <div className={styles.ticketHeader}>
            <img src="/logoProvider.png" alt="GRDS" style={{ height: 30 }} />
            <span>x</span>
            <img src="/LogoEstelarbet.png" alt="Estelarbet" style={{ height: 30 }} />
          </div>

          <h2 className={styles.ticketTitle}>FELICIDADES</h2>
          <p className={styles.ticketName}>{userName}</p>
          <p className={styles.ticketSub}>¡Ganaste una Smash Burger!</p>

          <ul className={styles.ticketList}>
            <li>Presenta este código en el local GRDS y obtén tu premio</li>
            <li>Este es un canje único</li>
            <li>Válido en todos los locales GRDS de Santiago</li>
          </ul>

          <div className={styles.ticketDivider}></div>

          <div className={styles.ticketCode}>
            <img src={ticketQR} alt="QR Code" className={styles.ticketQR} />
            <div className={styles.ticketCodeBox}>
              <span>Código:</span>
              <div className={styles.ticketCodeLine}>
                <strong>{code}</strong>
                <FaCopy />
              </div>
            </div>
          </div>

          <p className={styles.ticketFooter}>
            Válido hasta el 03 de marzo de 2025
          </p>
        </div>

        <button className={styles.ticketClose} onClick={onClose}>
          <FaTimes className={styles.FaTimes} />
        </button>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.getElementById('modal-root'));
};

export default ModalPremio;
