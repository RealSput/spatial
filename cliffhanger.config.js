const colors = require('@colors/colors/safe');
const compiler = require('./src/spwnx.js');
const fs = require('fs');

let result = null;
let spatial_code = () => `// FUNCTIONS
ascii_table = ['AA==', 'AQ==', 'Ag==', 'Aw==', 'BA==', 'BQ==', 'Bg==', 'Bw==', 'CA==', 'CQ==', 'Cg==', 'Cw==', 'DA==', 'DQ==', 'Dg==', 'Dw==', 'EA==', 'EQ==', 'Eg==', 'Ew==', 'FA==', 'FQ==', 'Fg==', 'Fw==', 'GA==', 'GQ==', 'Gg==', 'Gw==', 'HA==', 'HQ==', 'Hg==', 'Hw==', 'IA==', 'IQ==', 'Ig==', 'Iw==', 'JA==', 'JQ==', 'Jg==', 'Jw==', 'KA==', 'KQ==', 'Kg==', 'Kw==', 'LA==', 'LQ==', 'Lg==', 'Lw==', 'MA==', 'MQ==', 'Mg==', 'Mw==', 'NA==', 'NQ==', 'Ng==', 'Nw==', 'OA==', 'OQ==', 'Og==', 'Ow==', 'PA==', 'PQ==', 'Pg==', 'Pw==', 'QA==', 'QQ==', 'Qg==', 'Qw==', 'RA==', 'RQ==', 'Rg==', 'Rw==', 'SA==', 'SQ==', 'Sg==', 'Sw==', 'TA==', 'TQ==', 'Tg==', 'Tw==', 'UA==', 'UQ==', 'Ug==', 'Uw==', 'VA==', 'VQ==', 'Vg==', 'Vw==', 'WA==', 'WQ==', 'Wg==', 'Ww==', 'XA==', 'XQ==', 'Xg==', 'Xw==', 'YA==', 'YQ==', 'Yg==', 'Yw==', 'ZA==', 'ZQ==', 'Zg==', 'Zw==', 'aA==', 'aQ==', 'ag==', 'aw==', 'bA==', 'bQ==', 'bg==', 'bw==', 'cA==', 'cQ==', 'cg==', 'cw==', 'dA==', 'dQ==', 'dg==', 'dw==', 'eA==', 'eQ==', 'eg==', 'ew==', 'fA==', 'fQ==', 'fg==', 'fw==', 'woA=', 'woE=', 'woI=', 'woM=', 'woQ=', 'woU=', 'woY=', 'woc=', 'wog=', 'wok=', 'woo=', 'wos=', 'wow=', 'wo0=', 'wo4=', 'wo8=', 'wpA=', 'wpE=', 'wpI=', 'wpM=', 'wpQ=', 'wpU=', 'wpY=', 'wpc=', 'wpg=', 'wpk=', 'wpo=', 'wps=', 'wpw=', 'wp0=', 'wp4=', 'wp8=', 'wqA=', 'wqE=', 'wqI=', 'wqM=', 'wqQ=', 'wqU=', 'wqY=', 'wqc=', 'wqg=', 'wqk=', 'wqo=', 'wqs=', 'wqw=', 'wq0=', 'wq4=', 'wq8=', 'wrA=', 'wrE=', 'wrI=', 'wrM=', 'wrQ=', 'wrU=', 'wrY=', 'wrc=', 'wrg=', 'wrk=', 'wro=', 'wrs=', 'wrw=', 'wr0=', 'wr4=', 'wr8=', 'w4A=', 'w4E=', 'w4I=', 'w4M=', 'w4Q=', 'w4U=', 'w4Y=', 'w4c=', 'w4g=', 'w4k=', 'w4o=', 'w4s=', 'w4w=', 'w40=', 'w44=', 'w48=', 'w5A=', 'w5E=', 'w5I=', 'w5M=', 'w5Q=', 'w5U=', 'w5Y=', 'w5c=', 'w5g=', 'w5k=', 'w5o=', 'w5s=', 'w5w=', 'w50=', 'w54=', 'w58=', 'w6A=', 'w6E=', 'w6I=', 'w6M=', 'w6Q=', 'w6U=', 'w6Y=', 'w6c=', 'w6g=', 'w6k=', 'w6o=', 'w6s=', 'w6w=', 'w60=', 'w64=', 'w68=', 'w7A=', 'w7E=', 'w7I=', 'w7M=', 'w7Q=', 'w7U=', 'w7Y=', 'w7c=', 'w7g=', 'w7k=', 'w7o=', 'w7s=', 'w7w=', 'w70=', 'w74=', 'w78=']

charCodeAt = (char: @string) {
  if char.length == 1 {
    b64 = $.b64encode(char)
    return ascii_table.index(b64)
  } else {
    throw "Parameter 'char' must be a single character."
  }
}

fromCharCode = (int: @number) {
  if int < 256 {
    return $.b64decode(ascii_table[int])
  } else {
    throw "Ascii code cannot be bigger than 255."
  }
}

getFirstChars = (arr, range) {
	let n_arr = [];
	for i in range {
		n_arr.push(arr[i]);
	}
	return n_arr;
}

add_props = (let object, d) {
	for i in d {
		object = object.with(obj_props[i[0]], i[1]);
	}
	return object;
}

isEven = (n) => !((n % 2) as @bool)

// FILE FORMAT KEYWORDS
let prop_separator = 0x8a;
let obj_separator = 0x9a;
let component_separator = 0x99;
let sptl_separator = 0x9B;
let ent_separator = 0x9C;

let magic_types = {
	sptlb: [0xDE, 0xCF, 0xBF, 0xEF, 0x6f, 0xA],
	sptlc: [0xDE, 0xCF, 0xBF, 0xEF, 0x7f, 0xA],
	sptl: [0xDE, 0xCF, 0xBF, 0xEF, 0x8f, 0xA],
};

for i in magic_types {
	let magic_types[i[0]] = i[1].map(x => fromCharCode(x)).join('');
}

prop_separator = fromCharCode(prop_separator);
obj_separator = fromCharCode(obj_separator);
component_separator = fromCharCode(component_separator);
sptl_separator = fromCharCode(sptl_separator);
ent_separator = fromCharCode(ent_separator);

// MAIN CODE

let imported = null;
let raw_imported = null;

funcs = {
	create_sptlb: (let objects) {
		let str = magic_types.sptlb;
		objects = objects.map(x => x as @string)
		
		for i in objects {
			i = i.replace(';', obj_separator)
			i = i.split(',');
			let prop = false;
			for x in i {
				if (!prop) { 
					prop = true;
					str += fromCharCode(x as @number);
				} else {
					prop = false;
					str += x + prop_separator;
				};
			}
		}
		
		return str;
	},
	create_sptlc: (components) {
		let str = magic_types.sptlc;
		for i in components {
			str += i[0] + component_separator + i[1] + component_separator;
		}
		return str;
	},
	parse_sptlc: (self, let file) {
		if (!(magic_types.sptlc.split('').map(x => charCodeAt(x)) == getFirstChars(file.split('').map(x => charCodeAt(x)), 0..6))) {
			throw "File is not in .sptlc file fornat!"
		} else {
			let c_name = null;
			let c_dict = {};
			file = file.split(magic_types.sptlc)[1];
			file = file.split(component_separator);
			file.pop();
			for i in 0..file.length {
				let ent = file[i];
				isComponentName = isEven(i);
				if (isComponentName) {
					c_name = ent;
					let c_dict[c_name] = null;
				} else {
					c_dict[c_name] = self.parse_group(ent);
				}
			}
			return c_dict;
		}
	},
	parse_group: (let file) {				
		if (!(magic_types.sptlb.split('').map(x => charCodeAt(x)) == getFirstChars(file.split('').map(x => charCodeAt(x)), 0..6))) {
			throw "File is not in .sptlb file fornat!"
		} else {
			let objects = [];
			let file = file.split(magic_types.sptlb)[1].split(obj_separator)
			for i in 0..file.length {
				let ent = file[i];
				if (ent[0] == prop_separator) {
					let spl = ent.split('');
					spl.shift();
					file[i] = spl.join('');
				}
				file = file.filter(x => x != '')				
			}
			file = file.map(x => x.split(prop_separator))
			for i in file {
				let object = obj {};
				for d in i {
					d = d.split('');
					let prop = charCodeAt(d.shift());
					d = d.join('');
					$.edit_obj(object, prop, d)
				}
				objects.push(object);
			}
			return objects;
		}
	},
	create_sptl: (self, tree) {
		let str = magic_types.sptl;
		if (raw_imported != null) {
			str += "_type" + sptl_separator + "import" + sptl_separator + "value" + sptl_separator + raw_imported + sptl_separator + ent_separator;
		}
		for x in tree {
			for i in x {
				let key = i[0];
				let entry = i[1];
				if (key == "_type" || key == "name") {
					str += key + sptl_separator + entry + sptl_separator;
				} else if (key == "value") {
					if (entry.type == @array) {
						str += key + sptl_separator + self.create_sptlb(entry) + sptl_separator;
					} else if (entry.type == @object) {
						str += key + sptl_separator + self.create_sptlb([entry]) + sptl_separator;
					} else {
						str += key + sptl_separator + entry + sptl_separator
					}
				}
			}
			str += ent_separator;
		}
		return str;
	},
	parse_sptl: (let file) {
		if (!(magic_types.sptl.split('').map(x => charCodeAt(x)) == getFirstChars(file.split('').map(x => charCodeAt(x)), 0..6))) {
			throw "File is not in .sptl file fornat!"
		} else {
			let res_arr = [];
			file = file.split(magic_types.sptl)[1].split(ent_separator).map(x => x.split(sptl_separator))
			for i in 0..file.length {
				let ent = file[i];
				ent.pop();
				file[i] = ent;
			}
			file = file.filter(x => x != []);
			for x in file {
				let dict = {};
				for i in 0..x.length {
					let isProperty = isEven(i);
					let val = x[i];
					if (isProperty) {
						dict[val] = null;
					} else {
						let dict[x[i - 1]] = val;
					}
				}
				res_arr.push(dict);
			}
			return res_arr;
		}
	}
}

let n_fn_lst = { group: funcs.create_sptlb, parse_group: funcs.parse_group, parse_components: funcs.parse_sptlc, components: funcs.create_sptlc };

type @spatial;
impl @spatial {
	new: () {				
		return n_fn_lst;
	},
	objects: (name, o) {
		return { name, _type: "object", value: o };
	},
	set_import: (filename) {
		raw_imported = $.readfile(filename)
		res = n_fn_lst.parse_components(raw_imported);
		imported = res;
	},
	component: (name: @string) {
		return { _type: "component", value: name }
	},
	text: (name: @string, let str: @string, props = {}) {
		str = str.to_obj();
		str = add_props(str, props);
		
		return { name, _type: "text", value: str };
	},
	create_tree: (s) {
		return funcs.create_sptl(s)
	},
	parse: (tree) {
		return funcs.parse_sptl(tree);
	},
	add: (let tree) {
		tree = funcs.parse_sptl(tree);
		let curr_imp = null;
		let result = [];
		for i in tree {
			if (i._type == "import") {
				curr_imp = funcs.parse_sptlc(i.value);
			} else if (i._type == "component") {
				for x in curr_imp[i.value] {
					result.push(x);
				}
			} else if (i._type == "object" || i._type == "text") {
				let group = funcs.parse_group(i.value);
				for x in group {
					result.push(x);
				}
			}
		}
		for i in result {
			$.add(i);
		}
		return result;
	}
}`;


module.exports = (proc) => ({
    name: "spatial",
    version: "1.0",
    description: "CLI for the Spatial SPWN framework",
    flags: {
        input: {
            short: "-i",
            description: "SPWNX file to compile",
            amount_of_args: 1,
            init: (filename) => {
                const file = fs.readFileSync(filename).toString();
                result = compiler.compile(file);
            },
        },
        output: {
            short: "-o",
            description: "Output of compiled SPWNX file",
            amount_of_args: 1,
            init: (filename) => {
                if (!result) {
                    console.log(colors.red("ERROR: -i flag not used!"));
                    return;
                }
                fs.writeFileSync(filename, result);
                l
                console.log(colors.green("SUCCESS: Succesfully compiled .spwnx file to SPWN!"))
            },
        },
        install: {
            short: "-d",
            description: "Installs the Spatial framework for global usage in SPWNX scripts",
            amount_of_args: 0,
            init: () => {
                try {
                    let spatial_dir = 'C:/Program Files/spwn/libraries/spatial'
                    fs.mkdirSync(spatial_dir);
                    fs.writeFileSync(spatial_dir + '/lib.spwn', spatial_code());
                    console.log(colors.green('SUCCESS: Spatial has been succesfully installed! Use `import spatial` to start using it!'));
                } catch {
                    console.log(colors.red("ERROR: The installation of Spatial has failed! Make sure you are running as administrator or that you have not already installed it."));
                }
            },
        }
    },
});
