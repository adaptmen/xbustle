const error_codes = require("./sendy_codes.json");

module.exports = (code, error) => {
	return {
		status_code: code,
		status_text: error_codes[code],
		error: error ? error : ""
	}
}