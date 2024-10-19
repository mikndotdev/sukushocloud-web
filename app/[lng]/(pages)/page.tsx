export const runtime = "edge";

import Image from "next/image";
import { Heading } from "@/app/components/nUI/Heading";
import { Button } from "@/app/components/shadcn/ui/button";
import { auth, signIn } from "@/auth";

export default async function Home() {
    const session = await auth();

    if (!session?.user)
        return (
            <main>
                <div className="flex justify-center">
                    <Heading className="text-white" size="4xl">
                        Home
                    </Heading>
                    <form
                        action={async () => {
                            "use server";
                            await signIn();
                        }}
                    >
                        <Button type="submit">Sign in</Button>
                    </form>
                </div>
            </main>
        );

    return (
        <main>
            <div className="flex justify-center">
                <Heading className="text-white" size="4xl">
                    Home
                </Heading>
                <h1>Welcome back, {session.user.name}!</h1>
            </div>
        </main>
    );
}
