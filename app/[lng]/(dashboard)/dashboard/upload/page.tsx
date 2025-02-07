export const runtime = "edge";

import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface Props {
    params: {
        lng: string;
    };
}

export default async function Home({ params: { lng } }: Props) {
    return (
        <div className="flex min-h-screen w-full flex-col items-center justify-center p-4">
            <input type="file" id="fileInput" name="fileInput" />
            <button className="mt-4 rounded bg-blue-500 px-4 py-2 text-white">
                Upload
            </button>
        </div>
    );
}
