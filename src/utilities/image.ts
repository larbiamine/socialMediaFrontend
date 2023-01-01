import Resizer from "react-image-file-resizer";
import cryptoRandomString from "crypto-random-string";

import { ref, uploadBytes } from "firebase/storage";
import { app, storage } from "./firebaseSetup";

const compressFile = (file: File) =>
	new Promise((resolve) => {
		Resizer.imageFileResizer(
			file,
			500,
			300,
			"JPEG",
			100,
			0,
			(uri) => {
				resolve(uri);
			},
			"file",
			300,
			100
		);
	});

export const getRandomId = () => {
	return cryptoRandomString({ length: 10, type: "numeric" });
};

export const uploadImage = async (imgId: string, inputImage: File) => {
	const imgRef = ref(storage, `postImages/${imgId}`);
	const compressedImage = await compressFile(inputImage);

	// const compressedImage = inputImage;
	uploadBytes(imgRef, compressedImage).then((snapshot) => {
		console.log("Uploaded a blob or file!");
	});
};
