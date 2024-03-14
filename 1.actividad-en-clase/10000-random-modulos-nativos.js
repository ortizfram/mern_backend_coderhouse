// generar 10.000 num aleatorios e rango de (1-20)
// crear objeto con keys (num:valor)
// print en consola
function generateNumbers() {
    const numbers = {};
    for (let i = 1; i <= 10000; i++) {
        const num = Math.floor(Math.random() * 20) + 1;
        numbers[i] = num;
    }
    return numbers;
}

const result = generateNumbers();
for (const key in result) {
    console.log(`N ${key}: ${result[key]}`);
}
