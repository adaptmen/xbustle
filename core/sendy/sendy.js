const error_codes = require("./sendy_codes.json");

module.exports = (code, result) => {
	return {
		status_code: code,
		status_text: error_codes[code],
		result: result ? result : ""
	}
}