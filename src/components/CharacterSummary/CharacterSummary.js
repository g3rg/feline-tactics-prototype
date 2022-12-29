import {Bar} from 'components';
import styles from './styles.module.css';

export const CharacterSummary = ({selectedCharDetails}) => {
    return (
        <div className={styles.characterView}>
            <div className={styles.info}>
                <div className={styles.playerOneSprite}>
                    <img
                        alt={selectedCharDetails.name}
                        src={selectedCharDetails.img}
                    />
                </div>
            </div>
            <div className={styles.info}>
                <div className={styles.name}>{selectedCharDetails.name}</div>
            </div>
            <div className={styles.health}>
                <Bar alt label="HP" value={selectedCharDetails.maxHealth} maxValue={100}/>
            </div>
            <div className={styles.atk}>
                <Bar label="ATK" value={selectedCharDetails.attack} maxValue={100}/>
            </div>
            <div className={styles.def}>
                <Bar label="DEF" value={selectedCharDetails.defense} maxValue={100}/>
            </div>
            <div className={styles.power}>
                <Bar label="POW" value={selectedCharDetails.maxPower} maxValue={100}/>
            </div>
            <div className={styles.heal}>
                <Bar label="HEAL" value={selectedCharDetails.healing} maxValue={100}/>
            </div>

        </div>
    )
}
