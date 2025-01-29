// Função para codificar a mensagem com a Cifra de César
function cifraCesarCodificar(texto, deslocamento) {
  const resultado = [];

  for (let i = 0; i < texto.length; i++) {
    let char = texto[i];
    let codigo = texto.charCodeAt(i);

    // Verifica se é uma letra maiúscula
    if (codigo >= 65 && codigo <= 90) {
      resultado.push(
        String.fromCharCode(((codigo - 65 + deslocamento) % 26) + 65)
      );
    }
    // Verifica se é uma letra minúscula
    else if (codigo >= 97 && codigo <= 122) {
      resultado.push(
        String.fromCharCode(((codigo - 97 + deslocamento) % 26) + 97)
      );
    } else {
      // Se não for letra, apenas mantém o caractere
      resultado.push(char);
    }
  }

  return resultado.join("");
}

// Função para decodificar a mensagem com a Cifra de César
function cifraCesarDecodificar(texto, deslocamento) {
  return cifraCesarCodificar(texto, 26 - deslocamento);
}

// Exemplo de uso
const textoOriginal = "Mensagem secreta!";
const deslocamento = 90; // Podemos alterar para qualquer valor de deslocamento

const textoCodificado = cifraCesarCodificar(textoOriginal, deslocamento);
const textoDecodificado = cifraCesarDecodificar(textoCodificado, deslocamento);

console.log("Texto Original:", textoOriginal);
console.log("Texto Codificado:", textoCodificado);
console.log("Texto Decodificado:", textoDecodificado);
