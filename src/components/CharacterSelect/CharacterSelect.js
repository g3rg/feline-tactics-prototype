import {useEffect, useState} from "react";
import styles from './styles.module.css';
import {characters} from "shared";

export const CharacterSelect = ({onClick}) => {
    const [selectedCharacter, setSelectedCharacter] = useState(0)

    const setPrevChar = () => {
        if (selectedCharacter > 0) {
            setSelectedCharacter(selectedCharacter - 1)
        } else {
            setSelectedCharacter(Object.keys(characters).length - 1)
        }
    }

    const setNextChar = () => {
        if (selectedCharacter === (Object.keys(characters).length - 1)) {
            setSelectedCharacter(0)
        } else {
            setSelectedCharacter(selectedCharacter + 1)
        }
    }

    const getCharacter = (idx) => {
        const charKey = Object.keys(characters)[idx]
        return characters[charKey]
    }

    return (
        <>
            <div className={styles.gameHeader}>Select Your Character!</div>
            <div className={styles.characterSelection}>
                <div className={styles.prevCharacter}>
                    <button className={styles.startButton} onClick={setPrevChar}>&lt;</button>
                </div>
                <div className={styles.characterView}>{getCharacter(selectedCharacter).name}</div>
                <div className={styles.nextCharacter}>
                    <button className={styles.startButton} onClick={setNextChar}>&gt;</button>
                </div>
            </div>
            <div>
                <button className={styles.startButton}
                        onClick={() => onClick(getCharacter(selectedCharacter).name)}>Start!
                </button>
            </div>
        </>
    )
}