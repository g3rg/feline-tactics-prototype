import {Bar} from 'components';
import styles from './styles.module.css';

export const CharacterSummary = ({selectedCharDetails}) => {
    return (
        <>
            <div className={styles.info}>
                <div className={styles.name}>{selectedCharDetails.name}</div>
            </div>

            <div className={styles.health}>
                <Bar alt label="HP" value={selectedCharDetails.maxHealth} maxValue={200}/>
            </div>
            <div className={styles.power}>
                <Bar label="POW" value={selectedCharDetails.maxPower} maxValue={200}/>
            </div>

        </>)
}