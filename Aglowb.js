/**
 * Aglowb.js
 * 
 * el principal
 */

import * as literature from './AglowbLib/Literature.js';
import * as comunitary from './AglowbLib/ComunitaryApi.js';

/**
 * LiteratureC
 * 
 * la literatura
 */
const LiteratureC = new literature.AglowbLiterature();

/**
 * Template
 * 
 * la plantilla
 */
var Template = `{//(/**
* Module Name:
*
*    ReaderSyntax.literature
*
* Abstract:
*
*   Sintaxis para la literatura
*
*/)}

{//(
	lo importante
)}

{//(el texto que dice)}
<h4>{%xmlEncodedString()}</h4>{Enum.Chars.NewLine}

{//(
	fecha
)}

{//(cuando se creo)}
<h6>--el {%number()}/{%number()}/{%number()} 
{//(a que horas se creo)}
a las {%number()}:{%number()}:{%number()}</h6> {Enum.Chars.NewLine}`;


window.publicar = function() {
    let texto = document.getElementById("input").value;
                
    let date = new Date();

    let ps = [comunitary.PushAnuncio(texto), date.getDay(), date.getMonth(), date.getFullYear(), date.getHours(), date.getMinutes(), date.getSeconds()];
      
    let resultado = LiteratureC.syntax(Template, ps);
    document.body.innerHTML += resultado;
}