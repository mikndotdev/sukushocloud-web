export const runtime = "edge";
import { Button } from "@/app/components/shadcn/ui/button";

interface Props {
    params: {
        lng: string;
    };
}

export default async function Home({ params: { lng } }: Props) {
    return (
        <div className="flex min-h-screen w-full flex-col items-center justify-center p-4">
            <input type="file" id="fileInput" name="fileInput" />
            <Button className="mt-4 rounded px-4 py-2 text-white">
                Upload
            </Button>
        </div>
    );
}
