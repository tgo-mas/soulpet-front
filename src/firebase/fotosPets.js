import { storage } from "./config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export async function uploadFotoPet(imagem) {
    const filename = imagem.name;
    const imageRef = ref(storage, `Pets/${filename}`);
    const result = await uploadBytes(imageRef, imagem);
    return await getDownloadURL(result.ref);
}

