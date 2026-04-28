console.clear();
console.log("TS мини‑песочница 🚀");

// suffix — опционален, внутри функции это string | undefined
function greet(name: string, suffix?: string): string {
    return `Hello, ${name}${suffix || ""}`; // дефолт даём через || (можно использовать "??")
}
greet("Samurai");      // "Hello, Samurai"
greet("Samurai", "!"); // "Hello, Samurai!"

console.log(greet("Samurai"))
console.log(greet("Samurai", "!"))

// Значение по умолчанию: параметр внутри уже точно не undefined
function repeat(s: string, times: number = 2): string {
    return s.repeat(times);
}

repeat('anna') //times внутри будет 2
repeat('anna', 15) //times внутри будет 15

console.log(repeat('anna1'));
console.log(repeat('anna2', 15));