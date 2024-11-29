function flagemojiToPNG(flag) {
	if (flag === undefined) return;
	var countryCode = Array.from(flag, (codeUnit) => codeUnit.codePointAt())
		.map((char) => String.fromCharCode(char - 127397).toLowerCase())
		.join('');
	return (
		<img
			src={`https://flagcdn.com/24x18/${countryCode}.png`}
			alt="flag"
		/>
	);
}

function convertToEmoji(countryCode) {
	const codePoints = countryCode
		.toUpperCase()
		.split('')
		.map((char) => 127397 + char.charCodeAt());
	return String.fromCodePoint(...codePoints);
}

function convertLinkToEmoji(emojiObj) {
	// take first two letter from coun
	const { props } = emojiObj;
	if (props.src === false) return;
	return (
		<img
			src={`${props.src}`}
			alt="flag"
		/>
	);
}

export { flagemojiToPNG, convertToEmoji, convertLinkToEmoji };
