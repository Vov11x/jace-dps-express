let util = require("util");
let _ = require("lodash-node");

let TimePointsImplError = function(message) {
    this.message = message;
    this.name = "Command 'collection.map' implementation error";
}
TimePointsImplError.prototype = Object.create(Error.prototype);
TimePointsImplError.prototype.constructor = TimePointsImplError;


module.exports = {
    name: "timeline.points",
    synonims: {
        "timeline.points": "timeline.points",
        "time.points": "timeline.points",
        "t.points": "timeline.points",
        "timeline.ticks": "timeline.points",
        "time.ticks": "timeline.points",
        "t.ticks": "timeline.points"
        
    },

    "internal aliases": {
        "options": "options"
    },

    defaultProperty: {
        "timeline.points": "options",
        "time.points": "options",
        "t.points": "options",
        "timeline.ticks": "options",
        "time.ticks": "options",
        "t.ticks": "options"
          
    },

    execute: function(command, state, config) {
        
        if(!command.settings.options)
            throw new IndicatorImplError("Undefined event indicator options")
        
        
        try {

            state.head = {
                data: require("./utils/events").timePoints(command.settings.options),
                type: "json"
            }

        } catch (e) {
            throw new IndicatorImplError(e.toString())
        }

        return state;
    },

    help: {
        synopsis: "Build groups from context via javascript callback",

        name: {
            "default": "group",
            synonims: []
        },
        input:["json"],
        output:"json",
        "default param": "mapper",

        params: [{
            name: "transform",
            synopsis: "javascript callback function(item){<return {key, value}>} via bindable (required)",
            type:["bindable"],
            synonims: [],
            "default value": "none"
        }],

        example: {
            description: "Build list of tags",
            code:   "<?javascript\r\n   \r\n   $context.mapper = function(d){\r\n       return {\r\n           key:d, \r\n           value:d\r\n           \r\n       }\r\n   };\r\n   \r\n   $context.transform = function(d){\r\n        return {\r\n            key:d.key, \r\n            count: d.values.length\r\n        }\r\n   };\r\n   \r\n   $context.criteria = function(a,b){\r\n       return b.count-a.count\r\n   };\r\n   \r\n?>\r\n\r\nmeta('$..dataset.topics.*')\r\n\r\ngroup({{mapper}})\r\nmap({{transform}})\r\nsort({{criteria}})\r\n\r\nextend()\r\ntranslate()\r\n"

        }
    }
}
