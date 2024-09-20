import { getContents } from "../_services/Content";

export default async function Home() {
    const response = await getContents();
    
    return (
        <div className="">
            Sintrop education
        </div>
    );
}
