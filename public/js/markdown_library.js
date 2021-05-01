
const listTagsMarkdown = {
    "#": "h1",
    "##": "h2",
    "###": "h3",
    "####": "h4",
    "#####": "h5",
    "######": "h6",
};
const listLisMarkdown = {
    "-": "ul",
    "*": "ul",
    "+": "ul",
    "number.": "ol",
    "[ ]": "checklist",
    "[X]": "checklist",
}
const listStyleMarkdown = {
    "*": "i",
    "_": "i",
    "**": "b",
    "__": "b",
    "***": "ib",
    "___": "ib",
    "~~": "-",
}
const listCodeMarkdown = {
    "`": "world-code",
    "``": "line-code",
    "```": "all-code",
}

function getMarkdownDefault() {
    return "p";
}

function controllerMethod(mode_markdown) {
    switch (mode_markdown) {
    }
}
