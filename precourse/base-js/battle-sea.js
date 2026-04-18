console.log('battle-sea');

const battleSea = () => {
    let shots = 0
    let hits = 0
    let guess
    const cells = new Set([0, 1, 2, 3, 4, 5, 6])
    const location1 = Math.floor(Math.random() * 5)
    const locations = new Set([location1, location1 + 1, location1 + 2])
    const bodyShip = new Set([location1, location1 + 1, location1 + 2])

    while (bodyShip.size) {
        guess = 7

        while (!cells.has(guess)) {
            guess = +prompt('Введите цифру от 0 до 6', '1')
        }
        shots++

        if (locations.has(guess)) {
            bodyShip.delete(guess)
            hits++
            alert('hit')
        } else {
            alert('miss')
        }
    }
    alert(`Поздравляем! Количество выстрелов: ${shots}`)
}
battleSea()