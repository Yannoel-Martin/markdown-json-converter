
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
    "number.": "ol",
    "[ ]": "checklist",
    "[X]": "checklist",
    ">": "quote",
};
const listInnerContentMarkdown = {
    "`": "part-code",
    "``": "part-code",
    "*": "i",
    "_": "i",
    "**": "b",
    "__": "b",
    "***": "ib",
    "___": "ib",
    "~~": "-",
}

function getMarkdownDefault() {
    return "p";
}

function controllerMethod(mode_markdown) {
    switch (mode_markdown) {
    }
}
