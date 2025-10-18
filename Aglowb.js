/**
 * Aglowb.js
 * 
 * el principal
 */

import * as literature from './AglowbLib/Literature.js';
import * as comunitary from './AglowbLib/ComunitaryApi.js';
import * as github from "./github.js";

var User = "ErickStudios";
var Repo = "Aglowb";
var Token = "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";
var Server =  ".server/ListOfSaves.txt";

var originhtml = document.body.innerHTML;

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


window.publicar = async function() {
    let texto = document.getElementById("input").value;
                
    let date = new Date();

    let ps = [comunitary.PushAnuncio(texto), date.getDay(), date.getMonth(), date.getFullYear(), date.getHours(), date.getMinutes(), date.getSeconds()];
      
    let resultado = LiteratureC.syntax(Template, ps);

    let originm = await github.getGithubFile({file: Server, repo: Repo, username: User});

    await github.editGitHubFile({
        file: Server,
        content: (
            (await github.getGithubFile({file: Server, repo: Repo, username: User})) + resultado
        ),
        repo: Repo,
        username: User,
        token: Token
    })

    document.body.innerHTML += resultado;
}

document.body.innerHTML = originhtml;
 document.body.innerHTML += await github.getGithubFile({file: Server, repo: Repo, username: User});