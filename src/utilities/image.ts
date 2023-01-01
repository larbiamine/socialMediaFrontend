import Resizer from "react-image-file-resizer";
import cryptoRandomString from "crypto-random-string";

import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
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

export const uploadImage = async (inputImages: File[]) => {
	var photoIds: string[] = [];

	for (const file of inputImages) {
		const id = getRandomId();
		// photoIds.push(id);
		// await uploadImage(id, file);
		const imgRef = ref(storage, `postImages/${id}`);
		const compressedImage = await compressFile(file);
		// const compressedImage = inputImage;
		// await uploadBytes(imgRef, compressedImage);
		await uploadBytes(imgRef, compressedImage)
			.then((snapshot) => {
				return getDownloadURL(snapshot.ref);
			})
			.then((downloadURL) => {
				console.log("Download URL", downloadURL);
				photoIds.push(downloadURL);
			});
	}
	console.log(`uploaded ${inputImages.length} images`);

	return photoIds;
};

export const downloadImages = async (inputImgIds: string[]) => {
	var imgUrls: string[] = [];
	for (const id of inputImgIds) {
		const pathReference = ref(storage, id);
		getDownloadURL(pathReference).then((url) => {
			imgUrls.push(url);
		});
	}
	return imgUrls;
};

export const downloadImage = async (inputImgId: string) => {
	const pathReference = ref(storage, `postImages/${inputImgId}`);

	const imgUrl = await getDownloadURL(pathReference).catch((err) => {
		console.log(err);
	});
	return imgUrl;
};