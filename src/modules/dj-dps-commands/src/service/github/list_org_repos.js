let Promise = require("bluebird")
const GithubError = require("./gh_error")


module.exports = {
    name: "service.github.org.repos",

    synonims: {
    },

    "internal aliases": {
        "provider": "provider",
        // "selector": "query",
        // "filter": "query",
        // "sort": "sort",
        // "orderBy":"sort",
        // "aggregate": "aggregate",
        "org":"org",
    },

    defaultProperty: {
        // "service.mongodb": "query",
        // "service.mongodb.find": "query"
    },

    execute: function(command, state, config) {
        
        let gh = command.settings.provider
        let org = command.settings.org
        return new Promise((resolve, reject) => {

                gh.repos.listForOrg({org})
                    .then( response => {
                        state.head = {
                            type: "json",
                            data: response
                        }
                        resolve(state)
                    })
                    .catch ( e => {
                        reject(new GithubError(e.toString()))
                    })
    
        })
    },


    help: {
        synopsis: "Tokenize document",

        name: {
            "default": "rank",
            synonims: []
        },
        input: ["table"],
        output: "table",
        "default param": "indexes",
        params: [{
            name: "direction",
            synopsis: "Direction of iteration (optional)",
            type: ["Rows", "row", "Columns", "col"],
            synonims: ["direction", "dir", "for"],
            "default value": "Columns"
        }, {
            name: "indexes",
            synopsis: "Array of 0-based indexes of items that will be ranked (optional)",
            type: ["array of numbers"],
            synonims: ["indexes", "items"],
            "default value": []
        }, {
            name: "asc",
            synopsis: "Define order (optional)",
            type: ["A-Z", "az", "direct", "Z-A", "za", "inverse"],
            synonims: ["order", "as"],
            "default value": "A-Z"
        }],
        example: {
            description: "Rank first column values",
            code: "load(\r\n    ds:'47611d63-b230-11e6-8a1a-0f91ca29d77e_2016_02',\r\n    as:\"dataset\"\r\n)\r\nproj([\r\n  { dim:'time', role:'row', items:[] },\r\n  { dim:'indicator', role:'col', items:[] }\r\n])\r\n\r\nrank(for:\"col\",items:[0],as:\"az\")\r\n\r\norder(by:0, as:\"az\")\r\n\r\n"
        }
    }
}