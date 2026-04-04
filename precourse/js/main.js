// let sum = 1000;
// let count = 0;
// const percent = 15
// const period = prompt('Введите период', '1')
// let [name,age]=period.split(',')
// console.log(name,age)
// console.log( period)
// while (count < period) {
//     sum += sum * percent / 100
//     // alert(sum)
//     count++;
// }

console.log('main.js')

function lesson1(){

    const INITIAL_ENERGY = 10
    const MIN_ENERGY = 0
    const LOW_ENERGY_THRESHOLD = 3 // THRESHOLD(англ.) - порог

    let energy = INITIAL_ENERGY

    while (energy >= MIN_ENERGY) {
        console.log(`Текущий уровень энергии: ${energy}`)

        if (energy === MIN_ENERGY) {
            console.log("Робот грустит... 😢 Нужно подзарядить!");
            break;

        } else

        if (energy <= LOW_ENERGY_THRESHOLD) {
            console.log("Робот начинает чувствовать усталость... 🥱")
        } else {
            console.log("Робот счастлив и бодрствует! 😊")
        }

        energy--;

    }

    console.log("Программа завершена. Робот отдыхает.")
}

lesson1()
