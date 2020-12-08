const base64ToAscii = (plaintext) => {
	return Buffer.from(plaintext, "base64").toString("ascii");
};

export default base64ToAscii;
