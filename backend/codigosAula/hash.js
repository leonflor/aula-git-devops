const crypto = require("crypto");

// Função que gera o hash de uma string
function generateHash(inputString) {
  // Usando o algoritmo SHA-256
  const hash = crypto.createHash("sha256");
  hash.update(inputString);
  return hash.digest("hex"); // Retorna o hash em formato hexadecimal
}

// Exemplo de uso
const inputString = "Exemplo de string para hashing";
const hashedString = generateHash(inputString);

console.log(`String original: ${inputString}`);
console.log(`Hash gerado: ${hashedString}`);
