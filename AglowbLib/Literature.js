/**
 * Literature.js
 * 
 * la literatura y como funciona
 */

/**
 * AglowbLiterature
 * 
 * el modulo
 */
class AglowbLiterature {

    /**
     * syntax_encodeXml
     * 
     * codifica en xml
     * @param {string} str 
     * @returns 
     */
    syntax_encodeXml(str)
    {
        return str.replaceAll(/&/g, "&amp;").replaceAll(/</g, "&lt;").replaceAll(/>/g, "&gt;").replaceAll("\n","&NewLine;");
    }

    /**
     * syntax_get
     * 
     * obtiene algo
     * @param {any[]} args los argumentos
     * @param {number} id el id
     * @returns {any} el argumento
     */
    syntax_get(args, id)
    {
        if (args.length <= id) return undefined;
        return args[id];
    }

    /**
     * syntax
     * 
     * hace una sintaxis personalizada
     * @param {string} txt el texto original
     * @param {any[]} args los argumentos
     * @returns {string} el string modificado
     */
    syntax(txt, args)
    {
        let result = "";
        let CurrArg = 0;

        for (let index = 0; index < txt.length; index++) {
            let elmnt = txt[index];
            
            if (elmnt == "{")
            {
                let str = "";
                index++;
                while (txt[index] != "}" && index < txt.length) str += txt[index++];
            
                if (str == '%encodedUrlString()') {

                    let stringa = this.syntax_get(args, CurrArg);

                    if (stringa != undefined) result += encodeURIComponent(stringa);
                    else result += encodeURIComponent("(undefined)");

                    CurrArg++;
                }
                else if (str == '%xmlEncodedString()') {

                    let stringa = this.syntax_get(args, CurrArg);

                    if (stringa != undefined) result += this.syntax_encodeXml(stringa);
                    else result += this.syntax_encodeXml("(undefined)");

                    CurrArg++;
                }
                else if (str == '%number()') {
                    /**
                     * @type {number}
                     */
                    let num = this.syntax_get(args, CurrArg);

                    if (num != undefined) result += encodeURIComponent(num.toString(10));
                    else result += encodeURIComponent("(undefined)");

                    CurrArg++;
                }
                else if (str == '%hexnumber()') {
                    /**
                     * @type {number}
                     */
                    let num = this.syntax_get(args, CurrArg);

                    if (num != undefined) result += encodeURIComponent(num.toString(16));
                    else result += encodeURIComponent("(undefined)");

                    CurrArg++;
                }
                else if (str == "Enum.Chars.NewLine") result += "\n";
                else if (str == "Enum.Chars.Tab") result += "\t";

                else if (str.startsWith("//(") && str.endsWith(")")) {
                }
                else {
                    console.error("Syntax Error");
                }
            }
            else if (elmnt == "\n" || elmnt == "\t" || elmnt == "\r");
            else {
                result += elmnt;
            }

        }

        return result;
    }

    constructor()
    { }
}

export { AglowbLiterature };