
function importTitleHierarchy() {
    let returnText = "";
    returnText += '# Demo : Title hierarchy' + retourLigne;
    returnText += retourLigne;
    returnText += '## 1. My title' + retourLigne;
    returnText += retourLigne;
    returnText += '### 1.1. My first subtitle' + retourLigne;
    returnText += retourLigne;
    returnText += '#### So that\'s' + retourLigne;
    returnText += retourLigne;
    returnText += '##### all you' + retourLigne;
    returnText += retourLigne;
    returnText += '###### can do' + retourLigne;
    returnText += retourLigne;
    returnText += '### 1.2. My second subtitle' + retourLigne;
    returnText += retourLigne;
    returnText += '#### No ;)' + retourLigne;
    returnText += retourLigne;
    returnText += '### 1.3. My third subtitle' + retourLigne;
    returnText += retourLigne;
    returnText += '#### Good =)' + retourLigne;
    return returnText;
}
function importUlList() {
    let returnText = "";
    returnText += '# Demo : Ul list' + retourLigne;
    returnText += retourLigne;
    returnText += '* first elem with *' + retourLigne;
    returnText += '* second elem with *' + retourLigne;
    returnText += '* third elem with *' + retourLigne;
    returnText += retourLigne;
    returnText += '* elem 4 with +' + retourLigne;
    returnText += '* elem 5 with +' + retourLigne;
    returnText += '* elem 6 with +' + retourLigne;
    returnText += retourLigne;
    returnText += '* the seven elem with -' + retourLigne;
    returnText += '* the eight elem with -' + retourLigne;
    returnText += '* the nine elem with -' + retourLigne;
    return returnText;
}
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
function importDefaultMarkdown(type_import) {
    let markdownText = "";
    let data_to_convert = document.getElementById("data_to_convert");
    switch (type_import) {
        case "title-hierarchy":
            markdownText += importTitleHierarchy();
            break;
        case "ul-list":
            markdownText += importUlList();
            break;
        default:
            markdownText += importTitleExampleFromWebsite();
            break;
    }
    data_to_convert.value = markdownText;
}
