import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "./Firebase";

interface UploadPdfProps{
    file: Blob | null | undefined;
}
export async function uploadPdf({file}: UploadPdfProps): Promise<string>{
    if(file){
        const url = await uploadPdfToFirebase(file);
        return url;
    }else{
        return '';
    }
}

async function uploadPdfToFirebase(file: Blob): Promise<string> {
    const storageRef = ref(storage, `/ebooks/${Number(Math.random() * 1225465542).toFixed(0)}.pdf`);
    await uploadBytesResumable(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
}