export const runtime = "edge";
import { Heading } from "@/app/components/nUI/Heading";

interface Props {
    params: {
        lng: string;
    };
}

export default function Delete({ params: { lng } }: Props) {
    return (
        <div className="flex min-h-screen items-center justify-center p-4">
            <div className="text-center">
                <Heading size="2xl" className="text-white">
                    Delete Page
                </Heading>
                <p className="text-white mt-4">
                    This page is under construction. Please check back later.
                </p>
            </div>
        </div>
    );
}
