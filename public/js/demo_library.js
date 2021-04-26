
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
    return returnText;
}

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
