console.log('victor18');

const words1 = ['Мой кот', 'Моя собака', 'Мой попугай']
const words2 = ['любит есть', 'хочет погрызть', 'всегда ищет']
const words3 = ['морковку', 'макароны', 'косточку']

alert(makeRandomPhrase(words1, words2, words3));

function makeRandomPhrase(...arrays) {
    return arrays.map(arr => arr.length ?
        arr[Math.floor(Math.random() * arr.length)] :
        null
    ).filter(el => el !== null).join(' ');
}