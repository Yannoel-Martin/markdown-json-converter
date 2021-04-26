
function importTitleExampleFromWebsite() {
    let returnText = "";
    returnText += '# Titre du document' + retourLigne;
    returnText += retourLigne;
    returnText += 'Voici un paragraphe' + retourLigne;
    returnText += retourLigne;
    returnText += '## Titre de niveau 2' + retourLigne;
    returnText += retourLigne;
    returnText += 'Un nouveau paragraphe' + retourLigne;
    returnText += 'Toujours le même paragraphe' + retourLigne;
    returnText += retourLigne;
    returnText += 'Et un nouveau paragraphe !' + retourLigne;
    returnText += retourLigne;
    returnText += '```' + retourLigne;
    returnText += '# Un bloc de code en shell' + retourLigne;
    returnText += 'echo "coucou les lapinous"' + retourLigne;
    returnText += '```' + retourLigne;
    returnText += retourLigne;
    returnText += '### Un titre de niv 3' + retourLigne;
    returnText += retourLigne;
    returnText += '* une liste' + retourLigne;
    returnText += '* à' + retourLigne;
    returnText += '* puce' + retourLigne;
    return returnText;
}
function importTitleHierarchy() {
    let returnText = "";
    returnText += '# Demo : Title hierarchy' + retourLigne;
    return returnText;
}
function importListOlUl() {
    let returnText = "";
    returnText += '# Demo : List ol / ul' + retourLigne;
    return returnText;
}
function importDefaultMarkdown(type_import) {
    let markdownText = "";
    let data_to_convert = document.getElementById("data_to_convert");
    switch (type_import) {
        case "title-hierarchy":
            markdownText += importTitleHierarchy();
            break;
        case "list-ol-ul":
            markdownText += importListOlUl();
            break;
        case "inner-content":
            // *, **, ***, _, __, ___
            break;
        case "text-with-tab":
            // >
            break;
        default:
            markdownText += importTitleExampleFromWebsite();
            break;
    }
    data_to_convert.value = markdownText;
}
