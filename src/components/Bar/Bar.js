import styles from './styles.module.css';

export const Bar = ({value, maxValue, label, alt}) => {
    const className = alt ? styles.valueAlt : styles.value
    return (
        <div className={styles.main}>
            <div className={styles.label}>{label}</div>
            <div className={styles.max}>
                <div
                    className={className}
                    style={{width: `${(value / maxValue) * 100}%`}}
                ></div>
            </div>
        </div>
    );
}
