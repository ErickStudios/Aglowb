/**
 * ComunitaryApi.js
 * 
 * la api para lanzar anuncios de vez y cuando, pero no anuncios que interrupen la lectura
 * si no que promueven la comunidad de escritores y apoyo mutuo
 */

var ComunitaryMessage = "Eyeyeye, les robo un segundo para que vayan a los votos de las publicaciones y voten una que les guste!, todos merecemos un likesito y de paso apoyense a la coumidad, ahora si continuemos"
var LongitudMinimaParaAnuncios = 500;
var CadaCuantosCaracteres = 800;

/**
 * PushAnuncio
 * 
 * pone la invitacion de apoyarse para aunque haya vandalicacion hacer una comunidad fuerte que se apoye y que le den la bienvenida a nuevos escritores
 * @param {*} texto 
 * @returns 
 */
export function PushAnuncio(texto)
{
    if (texto.length < LongitudMinimaParaAnuncios) return texto;

    let resultado = "";
    for (let index = 0; index < texto.length; index++) {
        const element = texto[index];
        
        if (index != 0 &&index % CadaCuantosCaracteres == 0) resultado += "...\n-" + ComunitaryMessage + "-...\n";
        resultado += element;
    }

    return resultado
}