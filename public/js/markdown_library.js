
const arrayContentTags = [
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
];
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
const arrayStyleBySymbol = [
    [
        "`",
        "``",
    ],
    [
        "*",
        "**",
        "***",
    ],
    [
        "_",
        "__",
        "___",
    ],
    [
        "~~",
    ],
];
const listStyleMarkdown = {
    "`": "code",
    "``": "code",
    "*": "i",
    "_": "i",
    "**": "b",
    "__": "b",
    "***": "ib",
    "___": "ib",
    "~~": "del",
}

function getMarkdownDefault() {
    return "p";
}

function controllerMethod(mode_markdown) {
    switch (mode_markdown) {
    }
}
