/**
 * Aglowb.js
 * 
 * el principal
 */

import * as literature from './AglowbLib/Literature.js';
import * as comunitary from './AglowbLib/ComunitaryApi.js';
import * as github from "./github.js";
import * as moderation from "./AglowbLib/Moderation.js"

var User = "ErickStudios";
var Repo = "Aglowb";
var Token = "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";
var Server =  ".server/ListOfSaves.txt";
var LikesList = ".server/ListOfLikes.txt";
var PostNumber = 0;

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

async function Reload()
{
    document.body.innerHTML = originhtml;

    let Psts = await github.getGithubFile({file: Server, repo: Repo, username: User});
    let Posts = Psts.split("<!--@MarkOffPost-->\n");

    PostNumber = 0;
    Posts.forEach(element => {
         document.body.innerHTML += element
         document.body.innerHTML += "<h6>Votos: ?</h6>"
        PostNumber++;
    });
}

window.realoadPosts = Reload;

/**
 * likeadd
 * 
 * cuando alguien le da like
 * @param {number} to a que publicacion
 */
window.likeadd = async function (to) {
        
    let ps = [
        to
    ]
    let resultado = LiteratureC.syntax("#{%number()}|+{%number()}{Enum.Chars.NewLine}", ps);

    await github.editGitHubFile({
        file: LikesList,
        content: (
            (await github.getGithubFile({file: LikesList, repo: Repo, username: User})) + resultado
        ),
        repo: Repo,
        username: User,
        token: Token
    })
}

window.publicar = async function() {
    let texto = document.getElementById("input").value;
                
    let date = new Date();

    let ps = [comunitary.PushAnuncio(moderation.ModereText(texto, moderation.MalasList)), date.getDay(), date.getMonth(), date.getFullYear(), date.getHours(), date.getMinutes(), date.getSeconds()];
      
    let resultado = "<!--@MarkOffPost-->\n" + LiteratureC.syntax(Template, ps);

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
}

Reload();