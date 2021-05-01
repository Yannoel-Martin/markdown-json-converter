
const retourLigne = '\n';
const charactereEchappement = '\\';
const retourLigne_html = charactereEchappement + "n";
const textIndictator = '"';
const tabulationJson = '  ';

function convertToJson_Method() {
    let data_to_convert = document.getElementById("data_to_convert");
    let data_convert = document.getElementById("data_convert");
    let listLigneMarkdown = data_to_convert.value.split(retourLigne);
    let jsonArray = getJsonArray(listLigneMarkdown);
    data_convert.innerHTML = displayReturnJson(jsonArray);
}

/* Functions for the Json Array */
function getJsonArray(listLigneMarkdown) {
    let arrayReturn = [];
    let text_ligne = "";
    let mode_markdown = getMarkdownDefault();
    listLigneMarkdown.forEach(ligneMarkdown => {
        if (ligneMarkdown !== "") {
            let ligneArray = ligneMarkdown.split(" ");
            mode_markdown = chechNewModeMarkdown(ligneArray, mode_markdown);
            text_ligne = traitmentNewContentForTextLine(ligneArray, ligneMarkdown, mode_markdown, text_ligne);
        } else {
            text_ligne = traitmentTextLineBeforePush(mode_markdown, text_ligne);
            arrayReturn.push({"tagJsonLine": mode_markdown, "contentJsonLine": text_ligne});
            text_ligne = "";
            mode_markdown = getMarkdownDefault();
        }
    });
    return arrayReturn;
}
function chechNewModeMarkdown(ligneArray, mode_markdown) {
    if (listTagsMarkdown[ligneArray[0]] && mode_markdown !== "code") {
        mode_markdown = listTagsMarkdown[ligneArray[0]];
    } else {
        let numberOl = parseInt(ligneArray[0].split('.')[0]);
        if (!isNaN(numberOl)) {
            mode_markdown = "ol";
        }
    }
    return mode_markdown;
}
function traitmentNewContentForTextLine(ligneArray, ligneMarkdown, mode_markdown, text_ligne) {
    if (text_ligne !== "") {
        text_ligne += retourLigne_html;
    }
    if (mode_markdown !== "code") {
        let text_ligne_boucle = "";
        ligneArray.forEach(elem_ligne => {
            if (text_ligne_boucle !== "") {
                text_ligne_boucle += " ";
            }
            if (elem_ligne !== ligneArray[0]) {
                text_ligne_boucle += elem_ligne;
            }
        })
        text_ligne += text_ligne_boucle;
    } else {
        text_ligne += ligneMarkdown;
    }
    return text_ligne;
}
function traitmentTextLineBeforePush(mode_markdown, text_ligne) {
    let text_ligne_temp = "";
    switch (mode_markdown) {
        case "code":
            text_ligne_temp = text_ligne.split(retourLigne_html);
            text_ligne = '';
            text_ligne_temp.forEach(ligne_temp => {
                if (ligne_temp !== "```") {
                    if (text_ligne !== "") {
                        text_ligne += retourLigne_html;
                    }
                    let ligne_temp_array = ligne_temp.split('"');
                    let ligne_temp_text = "";
                    if (ligne_temp_array.length > 1) {
                        ligne_temp_array.forEach(ligne_temp_ => {
                            if (ligne_temp_text !== "") {
                                ligne_temp_text += charactereEchappement + '"';
                            }
                            ligne_temp_text += ligne_temp_;
                        })
                    } else {
                        ligne_temp_text += ligne_temp;
                    }
                    text_ligne += ligne_temp_text;
                }
            });
            text_ligne = '"' + text_ligne + '"';
            break;
        case "ol":
        case "ul":
            text_ligne_temp = text_ligne.split(retourLigne_html);
            text_ligne = '';
            text_ligne_temp.forEach(ligne_temp => {
                if (text_ligne !== "") {
                    text_ligne += ', ';
                }
                text_ligne += '"' + ligne_temp + '"';
            });
            text_ligne = '[' + text_ligne + ']';
            break;
        default:
            text_ligne = '"' + text_ligne + '"';
            break;
    }
    return text_ligne;
}

/* Function for Json Return */
function displayReturnJson(jsonArray) {
    let textReturn = "";
    let radioButtonOptionBasic = document.getElementById("return_json_basic");
    let isChekedButtonBasicJson = radioButtonOptionBasic.checked;
    textReturn += '{' + retourLigne;
    if (isChekedButtonBasicJson) {
        textReturn += constructBasicJsonText(jsonArray);
    } else {
        textReturn += constructStructuredJsonText(jsonArray);
    }
    textReturn += '}';
    return textReturn;
}
function constructBasicJsonText(jsonArray) {
    textReturn = "";
    jsonArray.forEach(elemJson => {
        textReturn += getTabulation() + textIndictator + elemJson.tagJsonLine + textIndictator + ': ' + elemJson.contentJsonLine + retourLigne;
    });
    return textReturn;
}
function constructStructuredJsonText(jsonArray) {
    console.log(jsonArray);
    let textReturn = "";
    let nivTabulation = 1;
    jsonArray.forEach(elemJson => {
        switch (elemJson.tagJsonLine) {
            case "h1":
                textReturn += testAccoladeLevel(nivTabulation, 1);
                textReturn += getTabulation(1) + textIndictator + elemJson.tagJsonLine + textIndictator + ': {' + retourLigne;
                textReturn += getTabulation(2) + textIndictator + "label" + textIndictator + ': ' + elemJson.contentJsonLine + retourLigne;
                textReturn += getTabulation(2) + textIndictator + "content" + textIndictator + ': {' + retourLigne;
                nivTabulation = 3;
                break;
            case "h2":
                textReturn += testAccoladeLevel(nivTabulation, 3);
                textReturn += getTabulation(3) + textIndictator + elemJson.tagJsonLine + textIndictator + ': {' + retourLigne;
                textReturn += getTabulation(4) + textIndictator + "label" + textIndictator + ': ' + elemJson.contentJsonLine + retourLigne;
                textReturn += getTabulation(4) + textIndictator + "content" + textIndictator + ': {' + retourLigne;
                nivTabulation = 5;
                break;
            case "h3":
                textReturn += testAccoladeLevel(nivTabulation, 5);
                textReturn += getTabulation(5) + textIndictator + elemJson.tagJsonLine + textIndictator + ': {' + retourLigne;
                textReturn += getTabulation(6) + textIndictator + "label" + textIndictator + ': ' + elemJson.contentJsonLine + retourLigne;
                textReturn += getTabulation(6) + textIndictator + "content" + textIndictator + ': {' + retourLigne;
                nivTabulation = 7;
                break;
            case "h4":
                textReturn += testAccoladeLevel(nivTabulation, 7);
                textReturn += getTabulation(7) + textIndictator + elemJson.tagJsonLine + textIndictator + ': {' + retourLigne;
                textReturn += getTabulation(8) + textIndictator + "label" + textIndictator + ': ' + elemJson.contentJsonLine + retourLigne;
                textReturn += getTabulation(8) + textIndictator + "content" + textIndictator + ': {' + retourLigne;
                nivTabulation = 9;
                break;
            case "h5":
                textReturn += testAccoladeLevel(nivTabulation, 9);
                textReturn += getTabulation(9) + textIndictator + elemJson.tagJsonLine + textIndictator + ': {' + retourLigne;
                textReturn += getTabulation(10) + textIndictator + "label" + textIndictator + ': ' + elemJson.contentJsonLine + retourLigne;
                textReturn += getTabulation(10) + textIndictator + "content" + textIndictator + ': {' + retourLigne;
                nivTabulation = 11;
                break;
            case "h6":
                textReturn += testAccoladeLevel(nivTabulation, 11);
                textReturn += getTabulation(11) + textIndictator + elemJson.tagJsonLine + textIndictator + ': {' + retourLigne;
                textReturn += getTabulation(12) + textIndictator + "label" + textIndictator + ': ' + elemJson.contentJsonLine + retourLigne;
                textReturn += getTabulation(12) + textIndictator + "content" + textIndictator + ': {' + retourLigne;
                nivTabulation = 13;
                break;
            case "ol":
            case "ul":
                let elemJsonOlUlArray = convertStringToArray(elemJson.contentJsonLine);
                textReturn += getTabulation(nivTabulation) + textIndictator + elemJson.tagJsonLine + textIndictator + ': [' + retourLigne;
                nivTabulation++;
                elemJsonOlUlArray.forEach(elemJsonUl => {
                    textReturn += getTabulation(nivTabulation) + '{ ' + textIndictator + 'p' + textIndictator + ': ' + textIndictator + elemJsonUl + textIndictator + ' },' + retourLigne;
                })
                nivTabulation--;
                textReturn += getTabulation(nivTabulation) + ']' + retourLigne;
                break;
            default:
                textReturn += getTabulation(nivTabulation) + textIndictator + elemJson.tagJsonLine + textIndictator + ': ' + elemJson.contentJsonLine + retourLigne;
                break;
        }
    });
    /* ferme les accolades non fermées */
    if (nivTabulation > 1) {
        textReturn += closeAccoladeLevel(nivTabulation);
    }
    return textReturn;
}
function getTabulation(nbTabulation = 1) {
    let textReturn = "";
    for (let i = 0; i < nbTabulation; i++) {
        textReturn += tabulationJson;
    }
    return textReturn;
}
function testAccoladeLevel(nivTabulationActuel, nivTabulationFutur) {
    let textReturn = "";
    let levelOk = false;
    if (nivTabulationActuel === nivTabulationFutur) {
        levelOk = true;
    }
    if (!levelOk) {
        textReturn = closeAccoladeLevel(nivTabulationActuel, nivTabulationFutur, true);
    }
    return textReturn;
}
function convertStringToArray(string) {
    let arrayReturn = [];
    let stringSansCrochet = string.slice(1, string.length - 1);
    let stringToArray = stringSansCrochet.split(textIndictator);
    stringToArray.forEach(stringPart => {
        if (stringPart !== "" && stringPart !== ", ") {
            arrayReturn.push(stringPart);
        }
    })
    return arrayReturn;
}
function closeAccoladeLevel(nivTabulation, lvlLimite = 1, isVirgule = false) {
    textReturn = "";
    for (let i = nivTabulation; i > lvlLimite; i--) {
        nivTabulation--;
        textReturn += getTabulation(nivTabulation) + '}'
        if (isVirgule && nivTabulation === lvlLimite) {
            textReturn += ',';
        }
        textReturn += retourLigne;
    }
    return textReturn;
}
