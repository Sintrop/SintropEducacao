import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "./Firebase";

interface UploadImageProps{
    file: Blob | null | undefined;
}
export async function uploadImage({file}: UploadImageProps): Promise<string>{
    if(file){
        const url = await uploadImageToFirebase(file);
        return url;
    }else{
        return '';
    }
}

async function uploadImageToFirebase(file: Blob): Promise<string> {
    const storageRef = ref(storage, `/images/${Number(Math.random() * 1225465542496864351).toFixed(0)}.png`);
    await uploadBytesResumable(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
}