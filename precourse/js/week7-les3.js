// Объявляем глобальную переменную для хранения золота
let gold = 100

createBuilding('Tower', 30)
createBuilding('Blacksmith', 140)

gold = increaseResource(gold)
console.log(`New amount of gold: ${gold}`)
gold = increaseResource(gold, 100)
console.log(`New amount of gold: ${gold}`)

function createBuilding(buildingName, costGold) {
    const hasEnoughGold = gold >= costGold

    if (hasEnoughGold) {
        gold -= costGold
        console.log(`${buildingName}: work complete!`)
    } else {
        console.log(`${buildingName}: not enough resources!`)
    }
}

function increaseResource(currentAmount, increment = 10) {
    return currentAmount + increment
}

console.log('====================================================')
let resource = 'lumber'

manageResources()

function manageResources() {
    let resource = 'crystals'
    if (true) {
        let resource = 'stone'
        console.log(resource) // Вывод 1 stone
    }
    console.log(resource) // Вывод 2 crystals
}

console.log(resource) // Вывод 3 lumber

if (true) {
    resource = 'gold'
    console.log(resource) // Вывод 4 gold
}
console.log(resource) // Вывод 5 gold