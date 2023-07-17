const {
    parse
} = require('node-html-parser');

let spwnx_to_spwn = (xmlString) => {

    // Regular expression to match content between <tree> and </tree>
    const regex = /<tree>([\s\S]*?)<\/tree>/;

    // Extract the content between <tree> and </tree>
    const match = regex.exec(xmlString);

    if (match) {
        const content = match[0];
        const xmlDoc = parse(content);

        let functions = {
            component: (tag) => {
                let name = tag.attributes.name;
                return `@spatial::component("${name}")`
            },
            obj: (tag) => {
                let attrs = tag.attributes;
                for (let i in attrs) {
                    attrs[i] = parseInt(attrs[i]);
                }
                return `obj ${JSON.stringify(attrs).replaceAll('"', '')}`
            },
            obj_group: (tag) => {
                if (!tag._rawText) {
                    tag.childNodes = tag.childNodes.filter(x => !x._rawText);
                    return `@spatial::objects("${tag.attributes.name ?? "My group"}", [
    ${Array.from(tag.childNodes).map(x => {
        return functions[x.rawTagName](x);
    }).join(',\n')}
])`
                }
            },
            text: (tag) => {
                let attrs = tag.attributes;
                let name = null;

                for (let i in attrs) {
                    if (i == 'name') {
                        name = i;
                        delete attrs[i];
                    } else {
                        attrs[i] = parseInt(attrs[i]);
                    }
                }
                return `@spatial::text("${name ?? "Unknown"}", "${tag.innerHTML.trim()}", ${JSON.stringify(attrs).replaceAll('"', '')})`
            }
        };

        let ids_expanded = {
            "user_coin": 1329,
            "h_block": 1859,
            "j_block": 1813,
            "s_block": 1829,
            "item_display": 1615,
            "d_block": 1755,
            "collision_block": 1816,
            "shake": 1520,
            "follow": 1347,
            "rotate": 1346,
            "count": 1611,
            "pulse": 1006,
            "hide": 1612,
            "pickup": 1817,
            "collision": 1815,
            "enable_trail": 32,
            "animate": 1585,
            "touch": 1595,
            "instant_count": 1811,
            "bg_effect_off": 1819,
            "toggle": 1049,
            "move": 901,
            "alpha": 1007,
            "show": 1613,
            "stop": 1616,
            "bg_effect_on": 1818,
            "follow_player_y": 1814,
            "color": 899,
            "spawn": 1268,
            "on_death": 1812,
            "disable_trail": 33,
            "speed_green": 202,
            "teleport": 747,
            "cube": 12,
            "mirror_off": 46,
            "wave": 660,
            "spider": 1331,
            "speed_red": 1334,
            "gravity_down": 10,
            "speed_blue": 201,
            "ufo": 111,
            "robot": 745,
            "mirror_on": 45,
            "gravity_up": 11,
            "dual_on": 286,
            "size_mini": 101,
            "ball": 47,
            "size_normal": 99,
            "ship": 13,
            "speed_pink": 203,
            "speed_yellow": 200,
            "dual_off": 287
        }

        for (let i in ids_expanded) {
            functions[i] = (tag) => {
                let attrs = tag.attributes;
                for (let i in attrs) {
                    if (i !== "OBJ_ID" || i !== "name") {
                        attrs[i] = parseInt(attrs[i]);
                    }
                }
                return `obj {OBJ_ID:${ids_expanded[i]},${JSON.stringify(attrs).replaceAll('"', '').trim().slice(1, -1)}}`
            }
        }

        let children = Array.from(xmlDoc.querySelector('tree').childNodes);
        let str = [`@spatial::create_tree([`]
        children.forEach((x, i) => {
            if (!x._rawText) {
                if (functions[x.tagName.toLowerCase()]) {
                    i !== children.length - 1 ? str.push(functions[x.tagName.toLowerCase()](x) + ',') : str.push(functions[x.tagName.toLowerCase()](x));
                } else {
					i !== children.length - 1 ? str.push(`@spatial::component("${x.tagName.toLowerCase()}"),`) : str.push(`@spatial::component("${x.tagName.toLowerCase()}")`);
                }
            }
        })
        str.push('])');
        str = str.join('\n');
        xmlString = xmlString.replace(content, str);
        return xmlString;
    }
}

module.exports = {
    compile: spwnx_to_spwn
};
