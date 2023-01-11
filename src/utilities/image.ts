import Resizer from "react-image-file-resizer";
import cryptoRandomString from "crypto-random-string";

import {
	deleteObject,
	getDownloadURL,
	ref,
	uploadBytes,
} from "firebase/storage";
import { storage } from "./firebaseSetup";

import { imageResize } from "./Resizer";

export const getRandomId = () => {
	return cryptoRandomString({ length: 10, type: "numeric" });
};

export const uploadImage = async (type: string, inputImages: File[]) => {
	var photoIds: string[] = [];

	for (const file of inputImages) {
		const id = getRandomId();
		// photoIds.push(id);
		// await uploadImage(id, file);
		const imgRef = ref(storage, `${type}/${id}`);
		const compressedImage = await imageResize(file);
		// const compressedImage = inputImage;
		// await uploadBytes(imgRef, compressedImage);
		await uploadBytes(imgRef, compressedImage)
			.then((snapshot) => {
				return getDownloadURL(snapshot.ref);
			})
			.then((downloadURL) => {
				photoIds.push(downloadURL);
			});
	}

	return photoIds;
};

const getIdFromUrl = (url: String) => {
	return url.slice(90, 100);
};

export const deleteImage = async (type: string, avatar: String) => {
	const imgId = getIdFromUrl(avatar);
	const imgRef = ref(storage, `${type}/${imgId}`);
	await deleteObject(imgRef)
		.then(() => {
			console.log("deleted");
		})
		.catch((error) => {
			console.log(error);
		});
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
