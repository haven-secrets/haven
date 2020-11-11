const base64ToAscii = (base64Blob) => {
	return Buffer.from(base64Blob.Plaintext, "base64")
							 .toString("ascii");
}

export default base64ToAscii;