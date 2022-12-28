import styles from './styles.module.css';

export const BattleMenu = ({onAttack, onDefend, onHeal, onSpecial}) => (
    <div className={styles.main}>
        <div onClick={onAttack} className={styles.option}>
            Attack
        </div>
        <div onClick={onDefend} className={styles.option}>
            Defend
        </div>
        <div onClick={onHeal} className={styles.option}>
            Heal
        </div>
        <div onClick={onSpecial} className={styles.option}>
            Special
        </div>
    </div>
);
