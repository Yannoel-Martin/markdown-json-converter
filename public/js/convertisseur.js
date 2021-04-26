
const retourLigne = '\n';
const charactereEchappement = '\\';
const retourLigne_html = charactereEchappement + "n";
const textIndictator = '"';
const tabulationJson = '  ';
const listTagsMarkdown = {
    "#": "h1",
    "##": "h2",
    "###": "h3",
    "####": "h4",
    "#####": "h5",
    "######": "h6",
    "```": "code",
    "-": "ul",
    "*": "ul",
    "+": "ul",
};

function importDefaultMarkdown() {
    let data_to_convert = document.getElementById("data_to_convert");
    let markdownText = "";
    markdownText += '# Titre du document' + retourLigne;
    markdownText += retourLigne;
    markdownText += 'Voici un paragraphe' + retourLigne;
    markdownText += retourLigne;
    markdownText += '## Titre de niveau 2' + retourLigne;
    markdownText += retourLigne;
    markdownText += 'Un nouveau paragraphe' + retourLigne;
    markdownText += 'Toujours le même paragraphe' + retourLigne;
    markdownText += retourLigne;
    markdownText += 'Et un nouveau paragraphe !' + retourLigne;
    markdownText += retourLigne;
    markdownText += '```' + retourLigne;
    markdownText += '# Un bloc de code en shell' + retourLigne;
    markdownText += 'echo "coucou les lapinous"' + retourLigne;
    markdownText += '```' + retourLigne;
    markdownText += retourLigne;
    markdownText += '### Un titre de niv 3' + retourLigne;
    markdownText += retourLigne;
    markdownText += '* une liste' + retourLigne;
    markdownText += '* à' + retourLigne;
    markdownText += '* puce' + retourLigne;
    data_to_convert.value = markdownText;
}

function convertToJson_Method() {
    let data_to_convert = document.getElementById("data_to_convert");
    let data_convert = document.getElementById("data_convert");
    let listLigneMarkdown = data_to_convert.value.split(retourLigne);
    let jsonArray = getJsonArray(listLigneMarkdown);
    data_convert.innerHTML = displayReturnJson(jsonArray);
}
function getJsonArray(listLigneMarkdown) {
    let arrayReturn = [];
    let text_ligne = "";
    let mode_markdown = "p";
    let ligneArray = [];
    listLigneMarkdown.forEach(ligneMarkdown => {
        if (ligneMarkdown !== "") {
            ligneArray = ligneMarkdown.split(" ");
            if (listTagsMarkdown[ligneArray[0]] && mode_markdown !== "code") {
                mode_markdown = listTagsMarkdown[ligneArray[0]];
            }
            if (text_ligne !== "") {
                text_ligne += retourLigne_html;
            }
            text_ligne = traitmentNewContentForJsonArray(mode_markdown, text_ligne, ligneArray, ligneMarkdown);
        } else {
            text_ligne = traitmentBeforePushIntoJsonArray(mode_markdown, text_ligne);
            arrayReturn.push({"tagJsonLine": mode_markdown, "contentJsonLine": text_ligne});
            text_ligne = "";
            mode_markdown = "p";
        }
    });
    return arrayReturn;
}
function traitmentNewContentForJsonArray(mode_markdown, text_ligne, ligneArray, ligneMarkdown) {
    let text_ligne_boucle = "";
    if (mode_markdown !== "code") {
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
function traitmentBeforePushIntoJsonArray(mode_markdown, text_ligne) {
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
            case "ul":
                let elemJsonUlArray = convertStringToArray(elemJson.contentJsonLine);
                textReturn += getTabulation(nivTabulation) + textIndictator + elemJson.tagJsonLine + textIndictator + ': [' + retourLigne;
                nivTabulation++;
                elemJsonUlArray.forEach(elemJsonUl => {
                    textReturn += getTabulation(nivTabulation) + textIndictator + '{ p' + textIndictator + ': ' + textIndictator + elemJsonUl + textIndictator + ' },' + retourLigne;
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
