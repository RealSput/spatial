# spatial
A SPWN framework for componentizing your SPWN code.

Spatial comes with an HTML-like flavor of SPWN named SPWNX. Here's a Spatial example:
```tsx
extract obj_props;
import spatial;

@spatial::set_import("../spwn/all_components.sptlc")

let my_tree = <tree>
	<component name="some_blocks"/>
	<text name="My text"> Hello, world! </text>
</tree> 

@spatial::add(my_tree)
```

# Compatibility
As of right now, the Spatial CLI only works on Windows. You should be able to use the Spatial library without the CLI, but you will not be able to write SPWNX code without the Spatial CLI. I plan to add support for more platforms later.

# Installation
Fuck you

# Usage
First, install the Spatial framework globally by running:
```
spatial -d
```
Then, after you have written your Spatial code (in SPWNX) and want to compile it to SPWN, run:
```
spatial -i code.spwnx -o output.spwn
```
