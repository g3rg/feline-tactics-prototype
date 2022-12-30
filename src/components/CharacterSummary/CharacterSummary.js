import {Bar} from 'components';
import styles from './styles.module.css';

export const CharacterSummary = ({selectedCharDetails}) => {
    const specialName = Object.keys(selectedCharDetails.specials)[0]
    const special = selectedCharDetails.specials[specialName]
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
            <div className={styles.bar}>
                <Bar alt label="HP" value={selectedCharDetails.maxHealth} maxValue={100}/>
            </div>
            <div className={styles.bar}>
                <Bar label="ATK" value={selectedCharDetails.attack} maxValue={100}/>
            </div>
            <div className={styles.bar}>
                <Bar label="DEF" value={selectedCharDetails.defense} maxValue={100}/>
            </div>
            <div className={styles.bar}>
                <Bar label="HEAL" value={selectedCharDetails.healing} maxValue={100}/>
            </div>
            <div className={styles.info}>
                {specialName} - {special.desc}
            </div>
        </div>
    )
}
