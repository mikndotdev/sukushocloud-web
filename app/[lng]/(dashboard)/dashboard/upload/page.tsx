export const runtime = "edge";

import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface Props {
    params: {
        lng: string;
    };
}

export default async function Home({ params: { lng } }: Props) {
        return (
            <div className="flex min-h-screen items-center justify-center p-4">
                <AiOutlineLoading3Quarters className="w-12 h-12 animate-spin text-white"/>
            </div>
        );
}