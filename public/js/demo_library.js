
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
function importListCheck() {
    let returnText = "";
    returnText += '# Demo : List Ol / Ul - Checklist' + retourLigne;
    returnText += retourLigne;
    returnText += '## Ol list :' + retourLigne;
    returnText += retourLigne;
    returnText += '1. I am' + retourLigne;
    returnText += '2. a beautiful' + retourLigne;
    returnText += '3. ol list' + retourLigne;
    returnText += retourLigne;
    returnText += '13. I am' + retourLigne;
    returnText += '15. also an' + retourLigne;
    returnText += '18. ol list' + retourLigne;
    returnText += retourLigne;
    returnText += '## Ul list :' + retourLigne;
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
    returnText += retourLigne;
    returnText += '## Checklist :' + retourLigne;
    returnText += retourLigne;
    returnText += '[ ] I am not checked :(' + retourLigne;
    returnText += '[X] I am checked :)' + retourLigne;
    returnText += '[ ] I wait for my turn :|' + retourLigne;
    return returnText;
}
function imporEncapsulation() {
    let returnText = "";
    returnText += '# Demo : Encapsulation content' + retourLigne;
    returnText += retourLigne;
    returnText += '## Italic :' + retourLigne;
    returnText += retourLigne;
    returnText += 'Who are you *stranger* ? I am an italic text from *' + retourLigne;
    returnText += retourLigne;
    returnText += 'I am the *future* of an other italic text, from _' + retourLigne;
    returnText += retourLigne;
    returnText += '## Bold :' + retourLigne;
    returnText += retourLigne;
    returnText += '**What the hell ?** The is no future except for bold text from **' + retourLigne;
    returnText += retourLigne;
    returnText += '**Stop yelling !** I know everybody prefer me, a bold text from __' + retourLigne;
    returnText += retourLigne;
    returnText += '## Bold and Italic :' + retourLigne;
    returnText += retourLigne;
    returnText += 'No, I am the original text, bold and italic text from ***' + retourLigne;
    returnText += retourLigne;
    returnText += 'Tssh, you\'re just the prototype of me, a text from ___' + retourLigne;
    returnText += retourLigne;
    returnText += '## Crossed out :' + retourLigne;
    returnText += retourLigne;
    returnText += 'I am a ~~censured~~ text, just close your eyes' + retourLigne;
    returnText += retourLigne;
    returnText += 'Shhhhhh, everthing will ~~end~~ be **fine** now' + retourLigne;
    return returnText;
}
function importQuoteContent() {
    let returnText = "";
    returnText += '# Demo : Quotation' + retourLigne;
    returnText += retourLigne;
    returnText += '>Somebody say this.' + retourLigne;
    returnText += '>but also this' + retourLigne;
    returnText += retourLigne;
    returnText += '>Somebody else told that.' + retourLigne;
    returnText += 'and that of course without ">"' + retourLigne;
    returnText += 'But hell no this sentence !' + retourLigne;
    return returnText;
}
function importCodeContent() {
    let returnText = "";
    returnText += '# Demo : Code content' + retourLigne;
    returnText += retourLigne;
    returnText += 'I have some `code data` there.' + retourLigne;
    returnText += retourLigne;
    returnText += 'I am a simple text line' + retourLigne;
    returnText += '``I am a code line``' + retourLigne;
    returnText += 'I am another simple text line' + retourLigne;
    returnText += retourLigne;
    returnText += '```' + retourLigne;
    returnText += 'I am a code' + retourLigne;
    returnText += 'with multiple lines' + retourLigne;
    returnText += 'and all that you can do' + retourLigne;
    returnText += 'is to copy me in your\'s' + retourLigne;
    returnText += '```' + retourLigne;
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
        case "list-check":
            markdownText += importListCheck();
            break;
        case "encapsulation":
            markdownText += imporEncapsulation();
            break;
        case "quotation":
            markdownText += importQuoteContent();
            break;
        case "code-content":
            markdownText += importCodeContent();
            break;
        default:
            markdownText += importTitleExampleFromWebsite();
            break;
    }
    data_to_convert.value = markdownText;
}
