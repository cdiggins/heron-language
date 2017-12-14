
function HeronTokenize(text)
{
	var re = /([_a-zA-Z][_a-zA-Z0-9]*)|([+-]?\d+[.]?\d*)|(\s+)/g
	
	var results = []; 
	while (match = re.exec(text))
	{
		results.push(match.index + " = " + match[1]);
	}
	return results;
}

// Now: for each match, set the type.


