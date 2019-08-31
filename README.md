# kwargs.js
Experimental eat/spit pattern for JS literal parameter object, similar to Python's `kwargs.pop(key, default)`.

Installation:
````
npm install EliasHasle/kwargs.js
````

Import like this:
````
import {eat, spit} from "kwargs.js";
````

`eat(pars, key, defaultValue=undefined, required=false, throwOnMissing=true)` will pop named properties from the parameter object, optionally filling with defaults, and optionally throwing an error when a value is not set. If `key` is a string or symbol, the function returns a single value. If `key` is an array of keys, the function will return an object with keys and values.

If `key` is an array of keys, the function will try to distribute the other arguments if they are arrays, or otherwise use the same value for all. This can go wrong in the unusual case that the intention is to assign the same array as default value to multiple outputs. See the code.

`spit(pars, throwError=true)` will complain on all remaining pars.

A typical pattern will be to use this with inheritance, such that subclasses `eat` the arguments that belong to them and forward the remaining ones to the superclass. Finally, the superclass will `spit` invalid arguments. Note that with classes, the call to `super` must happen before any reference to `this`. Therefore, the output of `eat` must be stored in the local scope _before_ `super(pars)`, and _then_ stored on the object (if desired).
