module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": "react",
    "plugins": [
        "immutable"
    ],
    "parserOptions": {
        "sourceType": "module"
    },
    "rules": {
        "indent": [
            "error",
            "tab"
        ],
        "linebreak-style": [
            "error",
            "windows"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
        "immutable/no-let": 2,
        "immutable/no-this": 2,
        "immutable/no-mutation": 2
    }
};