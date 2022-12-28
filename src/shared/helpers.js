export const wait = ms =>
    new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, ms);
    });

export const attack = ({attacker, receiver, receiverDefenseBonus = 1}) => {
    const receivedDamage =
        attacker.attack - (attacker.level - receiver.level) * 1.25;

    const finalDamage = receivedDamage - (receiver.defense * receiverDefenseBonus) / 2;

    return finalDamage;
};
export const magic = ({attacker, receiver}) => {
    const receivedDamage =
        attacker.magic - (attacker.level - receiver.level) * 1.25;

    const finalDamage = receivedDamage - receiver.magicDefense / 2;

    return finalDamage;
};
export const heal = ({receiver}) => {
    return receiver.magic + receiver.level * 0.25;
};

export const defend = ({receiver}) => {
    // TODO?
    return 0;
}

export const special = ({attacker, receiver, receiverDefenseBonus = 1}) => {
    const receivedDamage =
        attacker.attack - (attacker.level - receiver.level) * 1.25;

    const finalDamage = (receivedDamage - (receiver.defense * receiverDefenseBonus) / 2) * 1.75;

    return finalDamage;
}