const employeeNameGenerator = (strLen)=>{

	let result = '';
    while (result.length < strLen) {
        result += Math.random().toString(36).substring(2);
    }
    return result.substring(0, strLen);
}

module.exports = {
	employeeNameGenerator
}