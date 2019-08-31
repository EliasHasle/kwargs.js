# kwargs.js
Experimental eat/spit pattern for JS parameter object, similar to Python's kwargs.pop(key, default)

Installation:
````
npm install EliasHasle/kwargs.js
````

Import like this:
````
import {eat, spit} from "kwargs.js";
````

`eat(pars, key, defaultValue=undefined, required=false, throwOnMissing=true)` will pop named properties from the parameter object, optionally filling with defaults, and optionally throwing an error when a value is not set. The function can optionally take array inputs. See the code for more details.

`spit(pars)` will complain on all remaining pars.

A typical pattern will be to use this with inheritance, such that subclasses `eat` the arguments that belong to them and forward the remaining ones to the superclass. Finally, the superclass will `spit` invalid arguments.
