"use client";
export const runtime = "edge";
import { Button } from "@/app/components/shadcn/ui/button";
import { useState, useEffect } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface Props {
    params: {
        lng: string;
    };
}

export default function Home({ params: { lng } }: Props) {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchUserData() {
            try {
                const response = await fetch('/api/userinfo');
                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }
                const data = await response.json();
                setUserData(data);
            } catch (error) {
                console.error("Error fetching user ", error);
                // Handle error appropriately (e.g., display an error message)
            } finally {
                setLoading(false);
            }
        }

        fetchUserData();
    }, []);

    if (loading) {
        return (
            <div className="flex min-h-screen w-full items-center justify-center p-4">
                <AiOutlineLoading3Quarters className="w-12 h-12 animate-spin text-white" />
            </div>
        );
    }

    return (
        <div className="flex min-h-screen w-full flex-col items-center justify-center p-4">
            {userData && <p>User ID: {userData.id}</p>}
            <input type="file" id="fileInput" name="fileInput" />
            <Button className="mt-4 rounded px-4 py-2 text-white">
                Upload
            </Button>
        </div>
    );
}
