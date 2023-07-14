const { parse } = require('node-html-parser');

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

        let children = Array.from(xmlDoc.querySelector('tree').childNodes);
        let str = [`@spatial::create_tree([`]
        children.forEach((x, i) => {
			if (!x._rawText) {
				if (functions[x.tagName.toLowerCase()]) {
					i !== children.length - 1 ? str.push(functions[x.tagName.toLowerCase()](x) + ',') : str.push(functions[x.tagName.toLowerCase()](x));
				} else {
					throw new Error(`SPWNX tag <${x.tagName.toLowerCase()}> not found!`)
				}
			}
        })
        str.push('])');
        str = str.join('\n');
        xmlString = xmlString.replace(content, str);
        return xmlString;
    }
}

module.exports = { compile: spwnx_to_spwn };
