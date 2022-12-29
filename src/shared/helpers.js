export const wait = ms =>
    new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, ms);
    });

export const getRandomFromArray = arr => {
    return arr[Math.floor(Math.random() * arr.length)];
}


export const limitToMax = (value, maxValue) => {
    if (value > maxValue) {
        console.log('Limiting...')
        return maxValue;
    }
    return value;
}

export const attack = ({attacker, receiver, receiverDefenseBonus = 1}) => {
    const receivedDamage =
        attacker.attack - (attacker.level - receiver.level) * 1.25;

    const finalDamage = receivedDamage - (receiver.defense * receiverDefenseBonus) / 2;

    return finalDamage;
};

export const heal = ({receiver, receiverPower}) => {
    if (receiverPower > 0) {

        const healing = receiver.healing + receiver.level * 0.25;
        return [healing, 25];
    } else {
        return [0, 0]
    }
};

export const defend = ({receiver}) => {
    // TODO?
    return 0;
}

export const special = ({attacker, receiver, receiverDefenseBonus = 1, attackerPower}) => {
    if (attackerPower >= attacker.maxPower) {
        const receivedDamage =
            attacker.attack - (attacker.level - receiver.level) * 1.25;

        const finalDamage = (receivedDamage - (receiver.defense * receiverDefenseBonus) / 2) * 1.75;

        return finalDamage;
    } else {
        return 0;
    }
}