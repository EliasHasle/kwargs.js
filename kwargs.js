function eat(pars={}, key, defaultValue, required=false, throwOnMissing=true) {
	if (key === undefined) throw new Error("eat: key is undefined");
	
	if (Array.isArray(key)) {
		//Not for nested arrays. Assignment to `output[k]` fails if k is an array.
		let dIsArray = Array.isArray(defaultValue);
		let rIsArray =	Array.isArray(required);
		let tIsArray = Array.isArray(throwOnMissing);
		let output = {};
		for (let i = 0; i < key.length; i++) {
			let k = key[i];
			let d = dIsArray ? defaultValue[i] : defaultValue;
			let r = rIsArray ? required[i] : required;
			let t = tIsArray ? throwOnMissing[i] : throwOnMissing;
			output[k] = eat(pars, k, d, r, t);
		}
		return output;
	}
	
	let value = defaultValue;
	if (key in pars) {
		if (pars[key] !== undefined) {
			value = pars[key];
		}
		delete pars[key];
	} else if (required && defaultValue===undefined) {
		let errorMsg = "eat: Missing value for required keyword argument "+key;
		if (throwOnMissing) {
			throw new Error(errorMsg);
		} else {
			console.warn(errorMsg);
		}
	}

	return value;
}

function spit(pars, throwError=true) {
	let errors = ["spit: Invalid keyword arguments received: "];
	var hasErrors = false;
	for (let key in pars) {
		hasErrors = true;
		errors.push(key+", ");
		delete pars[key];
	}
	if (hasErrors) {
		let errorMsg = errors.join("");
		if (throwError) {
			throw new Error(errorMsg);
		} else {
			console.warn(errorMsg);
		}
	}
}

export {eat, spit};