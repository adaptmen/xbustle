const error_codes = require("./error-codes.json");

module.exports = (errNum, error) => {
	return {
		errorCode: errNum,
		errorText: error_codes[errNum],
		error: error ? error : ""
	}
}