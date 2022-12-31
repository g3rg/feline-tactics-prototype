import styles from './styles.module.css';

export const Bar = ({value, maxValue, label, alt}) => {
    const pcVal = (value / maxValue) * 100

    let classType = alt ? 'valueAlt' : 'value'
    if (pcVal === 100) {
        classType += 'Full'
    }
    const className = styles[classType]
    
    return (
        <div className={styles.main}>
            <div className={styles.label}>{label}</div>
            <div className={styles.max}>
                <div
                    className={className}
                    style={{width: `${pcVal}%`}}
                ></div>
            </div>
        </div>
    );
}
