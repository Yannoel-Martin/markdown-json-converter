
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
        // exception mode_markdown
        let numberOl = parseInt(ligneArray[0].split('.')[0]);
        if (!isNaN(numberOl)) {
            mode_markdown = "ol";
        }
        if (ligneArray[0].substr(0, 1) === ">") {
            mode_markdown = "quote";
        }
    }
    return mode_markdown;
}
function traitmentNewContentForTextLine(ligneArray, ligneMarkdown, mode_markdown, text_ligne) {
    let text_ligne_boucle = "";
    if (text_ligne !== "") {
        text_ligne += retourLigne_html;
    }
    switch (mode_markdown) {
        case "p":
        case "code":
            text_ligne += ligneMarkdown;
            break;
        case "quote":
            if (ligneMarkdown.substr(0, 1) !== ">") {
                text_ligne += ligneMarkdown;
            } else {
                text_ligne += getTabulation() + ligneMarkdown.substr(1, (ligneMarkdown.length - 1));
            }
            break;
        default:
            let text_ligne_ctr = 0;
            ligneArray.forEach(elem_ligne => {
                if (text_ligne_boucle !== "") {
                    text_ligne_boucle += " ";
                }
                if (elem_ligne !== ligneArray[0] || text_ligne_ctr !== 0) {
                    text_ligne_boucle += elem_ligne;
                }
                text_ligne_ctr++;
            });
            text_ligne += text_ligne_boucle;
            break;
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
        case "checklist":
            text_ligne_temp = text_ligne.split(retourLigne_html);
            text_ligne = '';
            text_ligne_temp.forEach(ligne_temp => {
                if (text_ligne !== "") {
                    text_ligne += ',' + retourLigne;
                }
                if (ligne_temp.substr(0, 2) !== "] " && ligne_temp.substr(0, 4) !== "[ ] ") {
                    text_ligne += '{ "isCheked": true, "p": "' + ligne_temp + '" }';
                } else {
                    if (ligne_temp.substr(0, 2) === "] ") {
                        text_ligne += '{ "isCheked": false, "p": "' + ligne_temp.substr(2, (ligne_temp.length - 2)) + '" }';
                    }
                    if (ligne_temp.substr(0, 4) === "[ ] ") {
                        text_ligne += '{ "isCheked": false, "p": "' + ligne_temp.substr(4, (ligne_temp.length - 4)) + '" }';
                    }
                }
            });
            text_ligne = '[' + retourLigne + text_ligne + retourLigne + ']';
            break;
        case "quote":
            let text_ligne_ctr = 1;
            text_ligne_temp = text_ligne.split(retourLigne_html);
            text_ligne = '';
            text_ligne_temp.forEach(ligne_temp => {
                if (text_ligne !== "") {
                    text_ligne += retourLigne_html;
                }
                if (text_ligne_ctr !== text_ligne_temp.length) {
                    if (ligne_temp.substr(0, 2) !== getTabulation()) {
                        text_ligne += getTabulation();
                    }
                }
                text_ligne += ligne_temp;
                text_ligne_ctr++;
            });
            text_ligne = '"' + text_ligne + '"';
            break;
        default:
            text_ligne = '"' + text_ligne + '"';
            break;
    }
    return text_ligne;
}
function isImpair(numberToTest) {
    if (numberToTest % 2 === 1) {
        return true;
    }
    return false;
}

/* Functions for Json Return */
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
    let textReturn = "";
    let ctrJsonArray = 1;
    jsonArray.forEach(elemJson => {
        if (elemJson.tagJsonLine === "checklist") {
            let contentJsonLineArray = elemJson.contentJsonLine.split(retourLigne);
            let ctrJsonLineArray = contentJsonLineArray.length;
            textReturn += getTabulation() + textIndictator + elemJson.tagJsonLine + textIndictator + ': ';
            contentJsonLineArray.forEach(jsonTextLine => {
                if (ctrJsonLineArray !== 1 && ctrJsonLineArray !== contentJsonLineArray.length) {
                    textReturn += getTabulation();
                }
                if (ctrJsonLineArray !== contentJsonLineArray.length) {
                    textReturn += getTabulation();
                }
                textReturn += jsonTextLine;
                if (ctrJsonLineArray === 1) {
                    textReturn += displayEndElemArray(ctrJsonArray, jsonArray);
                } else {
                    textReturn += retourLigne;
                }
                ctrJsonLineArray--;
            });
        } else {
            textReturn += getTabulation() + textIndictator + elemJson.tagJsonLine + textIndictator + ': ' + elemJson.contentJsonLine + displayEndElemArray(ctrJsonArray, jsonArray);
        }
        ctrJsonArray++;
    });
    return textReturn;
}
function constructStructuredJsonText(jsonArray) {
    let textReturn = "";
    let ctrJsonArray = 1;
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
                textReturn += getTabulation(nivTabulation) + ']' + displayEndElemContentArray(ctrJsonArray, jsonArray);
                break;
            case "checklist":
                let elemJsonChecklistArray = elemJson.contentJsonLine.split(retourLigne);
                let elemChecklistArray = [];
                let ctrChecklistArray = 1;
                textReturn += getTabulation(nivTabulation) + textIndictator + elemJson.tagJsonLine + textIndictator + ': [' + retourLigne;
                nivTabulation++;
                elemJsonChecklistArray.forEach(elemJsonCheklist => {
                    if (elemJsonCheklist !== "[" && elemJsonCheklist !== "]") {
                        textReturn += getTabulation(nivTabulation) + '{' + retourLigne;
                        nivTabulation++;
                        elemChecklistArray = elemJsonCheklist.split(", \"p\"");
                        textReturn += getTabulation(nivTabulation) + elemChecklistArray[0].substr(2, (elemChecklistArray[0].length - 2)) + ',' + retourLigne;
                        textReturn += getTabulation(nivTabulation) + '"p"' + elemChecklistArray[1].substr(0, (elemChecklistArray[1].length - 2)) + retourLigne;
                        nivTabulation--;
                        textReturn += getTabulation(nivTabulation) + '}' + displayEndElemArray(ctrChecklistArray, elemChecklistArray);
                        ctrChecklistArray++;
                    }
                })
                nivTabulation--;
                textReturn += getTabulation(nivTabulation) + ']' + displayEndElemContentArray(ctrJsonArray, jsonArray);
                break;
            default:
                textReturn += getTabulation(nivTabulation) + textIndictator + elemJson.tagJsonLine + textIndictator + ': ' + elemJson.contentJsonLine + displayEndElemContentArray(ctrJsonArray, jsonArray);
                break;
        }
        ctrJsonArray++;
    });
    /* ferme les accolades non fermées */
    if (nivTabulation > 1) {
        textReturn += closeAccoladeLevel(nivTabulation);
    }
    return textReturn;
}
function displayEndElemArray(position, array) {
    if (position !== array.length) {
        return "," + retourLigne;
    }
    return retourLigne;
}
function displayEndElemContentArray(position, array) {
    if (position !== array.length) {
        let nextTag = array[position].tagJsonLine;
        let nextTagTitle = false;
        arrayContentTags.forEach(contentTag => {
            if (contentTag === nextTag) {
                nextTagTitle = true;
            }
        });
        if (!nextTagTitle) {
            return "," + retourLigne;
        }
    }
    return retourLigne;
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
    let textReturn = "";
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
