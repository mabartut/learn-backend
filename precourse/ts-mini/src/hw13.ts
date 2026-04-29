// 1. Создай переменные age1/title1/isReady1 с типами number/string/boolean
let age1: number = 34
const title: string = 'qwe'
const isReady1: boolean = true

// 2. Опиши литеральный тип Mode, который может иметь значения "light или "dark"
// и переменную currentMode этого типа
type Mode = 'light' | 'dark'
let currentMode: Mode = 'light'

// 3. Создай тип ID как объединение number | string и две переменные с разными значениями
type ID = number | string
let id1: ID = 4
let id2: ID = '4'

// 4. Создай переменные nums (массив чисел) и names (массив строк). Явно их типизируй
let nums: Array<number>
let names: string[]

// 5. Создай объект product и задай тип «на месте»: product имеет id (число), name (строка), price (число)
let product: { id: number, name: string, price: number } = {id: 2, name: 'qw', price: 4}

// 6. Дай имя типу Person, у которого id число, name строка и создай переменную p этого типа
type Person = { id: number, name: string }
let p: Person = {id: 1, name: 'qw'};

// 7. Напиши функцию sizeOf: принимает string | number → возвращает number (длина строки или само число)
const sizeOf = (n: string | number = 5): number => (typeof n === 'number') ? n : n.length

// 8. Опиши тип User: id — number, name — string, nickname — опционально (string)
type User = { id: number, name: string, nickname?: string }

// 9. Функция hello: принимает User → возвращает "Hi, Ann (@ann)" или "Hi, Ann" (если нет nickname). Реализуй ее

const hello = (u: User): string => u.nickname ? `Hi, ${u.name} (${u.nickname})` : `Hi, ${u.name}`

console.log(hello({id: 1, name: 'Ann', nickname: '@ann'}))
console.log(hello({id: 2, name: 'Ann'}))

// 10. Типизируй стрелочную функцию lower: принимает string → возвращает string
type Lower = (s: string) => string
const lower: Lower = (s) => s
const lower2 = (s: string): string => s;

// 11. Опиши тип функции Calc: принимает 2 аргумента number (a, b), возвращает number
type Calc = (a: number, b: number) => number;

// 12. Реализуй 2 функции: add (складывает 2 числа) и mul (перемножает) с типом Calc
const add: Calc = (a, b) => a + b
const mul: Calc = (a, b) => a * b

// 13. Напиши функцию log: принимает message (строка), ничего не возвращает (void). Просто логирует message в консоль
const log = (message: string): void => console.log(message)

// 14. Напиши и типизируй функцию firstEven: принимает массив чисел
// и возвращает первое четное число или undefined (если в массиве нет четных)
const firstEven = (arr: number[]): number | undefined => arr.find(el => el % 2 === 0)

// 15. Опиши тип Profile2 (id число, name: строка, age опциональное поле число);
// напиши функцию ageLabel(p:Profile2):string (с проверкой undefined)
type Profile2 = { id: number, name: string, age?: number }

function ageLabel(p: Profile2): string {
    return p.age ? `${p.age}` : `age unknown`
}

// 16. Напиши и типизируй функцию createPagination. Принимает 3 аргумента page число, pageSize число
// sortBy строка со значением по умолчанию 'createdAt'.
// Функция возвращает объект
// { page: number;
//   pageSize: number,
//   sortBy: string }
function createPagination(page: number, pageSize: number, sortBy = 'createdAt'): {
    page: number,
    pageSize: number,
    sortBy: string
} {
    return {page, pageSize, sortBy}
}

// 17. Создай литеральный тип Result и функцию isOk которая принимает Result
// и возвращает boolean (true если "ok" и false если "fail")
type Result = 'ok' | 'fail'

function isOk(status: Result): boolean {
    return status === 'ok'
}