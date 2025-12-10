import styles from './Modal.module.css';

export const FullTextModal = ({ title, onClose, children }) => {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h3 className={styles.header}>{title}</h3>

        <div className={styles.content}>{children}</div>

        <button className={styles.closeBtn} onClick={onClose}>
          Закрыть
        </button>
      </div>
    </div>
  );
};
