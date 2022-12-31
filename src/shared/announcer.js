import {getRandomFromArray} from "./helpers";

export const attackStrings = [
    '`${attacker.name} has chosen to attack!`',
    '`Here comes ${attacker.name}`',
]

export const defendedStrings = [
    '`${receiver.name} defended well!`',
    '`Great defense from ${receiver.name}`'
]

export const damagedStrings = [
    "`${receiver.name} felt that!`",
    '`${attacker.name} hurt ${receiver.name}!`'
]

export const turnStrings = [
    "`Now it's ${receiver.name}'s turn!`",
    "`What's ${receiver.name} going to do about that!`"
]

export const defendStrings = [
    "`${attacker.name} has chosen to defend!`",
    "`${attacker.name} is going to defend!`"
]

export const defendingStrings = [
    "`${attacker.name} is ready!`",
    "`${attacker.name} is prepared!`"
]

export const healingStrings = [
    "`${attacker.name} has chosen to heal!`",
    "Time to heal for `${attacker.name}!`"
]

export const healedStrings = [
    "`${attacker.name} has recovered health.`",
    "`${attacker.name} feels better!`"
]

export const cantHealStrings = [
    "`${attacker.name} couldn't heal!`",
    "`Not enough power for healing!`"
]