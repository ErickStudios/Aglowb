/**
 * Moderation.js
 * 
 * la moderacion
 */

/**
 * MalasList
 * 
 * lista de malas
 */
export var MalasList = [
    "putx",
    "pendejx",
    "estupidx",
    "verga",
    "mierda"
]

/**
 * ModerarGeneroDePalabra
 * 
 * modera la misma palabra para ambos generos
 * @param {string} texto el texto
 * @param {string} palabra la palabra
 * @returns 
 */
export function ModerarGeneroDePalabra(texto, palabra)
{
    return texto.replaceAll(palabra.replaceAll("x","a"), ("*").repeat(palabra.length)).replaceAll(palabra.replaceAll("x","o"), ("*").repeat(palabra.length));
}

/**
 * ModereText
 * 
 * modera el texto
 * @param {string} text el texto
 * @param {string[]} words las palabras
 */
export function ModereText(text, words)
{
    let result = text;
    words.forEach(element => {
        result = ModerarGeneroDePalabra(result, element)
    });

    return result;
}