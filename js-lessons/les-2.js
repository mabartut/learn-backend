let names = ['Alex', 'Bob', 'Ivan', 'Sasha']

const total = names.push('NewPerson')

console.clear()
console.log('names=', names)
console.log('total=', total)

const pop = names.pop()
console.log('pop=', pop)
console.log('names=', names)

const shift = names.shift()
console.log('shift=', shift)
console.log('names=', names)

const unshift = names.unshift('oldPerson')
console.log('unshift=', unshift)
console.log('names=', names)

console.log('names.reverse=', names.reverse())
console.log('names.join(--)=', names.join(''))
console.log('names.join(--).split(=', names.join('---').split('', 2))

const telephoneNumber = '123456789'
console.log('telephoneNumber=', telephoneNumber.split('').reverse().join(''))


const arr1 = [1, 2]
const arr2 = [3, 4]
const arr3 = [5, 6]
const res = arr1.concat(12, arr2, 14)

console.log('res', res) // [ 1, 2, 3, 4, 5, 6 ]


const arr12 = [1, 2]
const arr22 = [3, 4]

const nestedArr = [
    [5, [89, 90, 91]],
    [7, 8],
]

const res2 = arr12.concat(arr22, nestedArr, '234')

console.log('res2', res2)
// console.log('flat', res2.flat())

const resInf = res2.flat(Infinity)
console.log('resInf=', resInf.join(', '))

const arr = [1, 2, 3, 4, 5]
let sum = 0

arr.forEach((el, _i, _array) => {
    sum += el
})

console.log('sum=', sum)

let doubleArray = []
arr.forEach((el, i, _array) => {
    doubleArray[i] = el * 2
})

console.log('doubleArray=', doubleArray)

arr.forEach((el, i, array) => {
    array[i] = el * 2
})
console.log('arr=', arr)

const arrForIndexOf = [1, 2, 3, 3, 3, 4, 5]
const indexOf = arrForIndexOf.indexOf(3)
const lastIndexOf = arrForIndexOf.lastIndexOf(3, 5)
const indexOfAfter4 = arrForIndexOf.indexOf(3, 4)

console.log('indexOf=', indexOf)
console.log('lastIndexOf=', lastIndexOf)
console.log('indexOfAfter4=', indexOfAfter4)

const arrFind = ['abc', 'defg', 'kl', 'mn']

arrFindEl = arrFind.find(el => el.length === 2)
console.log('arrFindEl=', arrFindEl)

const arrEven = [1, 2, 3, 4, 5]

findIndex = arrEven.findIndex(el => el % 2 === 0)
findLastIndex = arrEven.findLastIndex(el => el % 2 === 0)
console.log('findIndex=', findIndex)
console.log('findLastIndex=', findLastIndex)

const arrIncludes = [1, 2, 3, 4, 5]
console.log('arrIncludes?', arrIncludes.includes(3))
console.log('arrIncludes?', arrIncludes.includes(0))

let str = 'abc-qwe-rt-tyu-xcvgdf'
console.log('str.split=', str.split('-'))
console.log('str.split2=', str.split('-', 2))