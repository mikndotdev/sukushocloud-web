import { toast } from "sonner";
import { useClientTranslation } from "@/app/i18n/client";
import { Card, CardContent } from "./shadcn/ui/card";
import { Button } from "./shadcn/ui/button";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "./shadcn/ui/alertdialog";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Props {
    date: string;
    id: string;
    name: string;
    shortUrl: string;
    size: number;
    url: string;
    lng: string;
    isPremium: boolean;
}

import { FaCircleXmark, FaLink, FaImage, FaTrash } from "react-icons/fa6";
import { MdOutlinePhotoSizeSelectLarge } from "react-icons/md";

export function FileComponent({
    date,
    id,
    name,
    shortUrl,
    size,
    url,
    lng,
    isPremium,
}: Props) {
    const { t } = useClientTranslation(lng, "dashboard/fileComponent");
    const en = lng === "en";
    const [isOpen, setIsOpen] = useState(false);

    const copyUrl = (url: string) => {
        navigator.clipboard.writeText(url);
        toast.success(t("urlCopied"));
    };

    const copyLink = (shortUrl: string) => {
        navigator.clipboard.writeText(shortUrl);
        toast.success(t("linkCopied"));
    };

    return (
        <main>
            <AlertDialog open={isOpen}>
                <AlertDialogContent className="bg-inherit text-white border-primary">
                    <AlertDialogHeader>
                        <div className="flex items-center justify-between w-full">
                            <AlertDialogTitle>{name}</AlertDialogTitle>
                            <Button
                                className="bg-red-600 hover:bg-red-700"
                                onClick={() => setIsOpen(false)}
                            >
                                <FaCircleXmark className="w-6 h-6" />
                            </Button>
                        </div>
                    </AlertDialogHeader>
                    <AlertDialogDescription>
                        {t("uploadedAt")} {new Date(date).toLocaleString()}
                    </AlertDialogDescription>
                    <div className="flex items-center justify-center w-full h-full">
                        <Image
                            src={url}
                            alt={name}
                            width={400}
                            height={400}
                            unoptimized
                        />
                    </div>
                    <AlertDialogFooter>
                        <Button
                            className="bg-primary hover:bg-primary"
                            onClick={() => copyUrl(url)}
                        >
                            <FaImage className="w-6 h-6" />
                            {t("copyUrl")}
                        </Button>
                        <Button
                            className="bg-primary hover:bg-primary"
                            onClick={() => copyLink(shortUrl)}
                        >
                            <FaLink className="w-6 h-6" />
                            {t("copyLink")}
                        </Button>
                    </AlertDialogFooter>
                    <AlertDialogFooter>
                        {isPremium ? (
                            <Link href={`/dashboard/manage/edit/${id}`}>
                                <Button className="bg-primary hover:bg-primary">
                                    <MdOutlinePhotoSizeSelectLarge className="w-6 h-6" />
                                    {t("edit")}
                                </Button>
                            </Link>
                        ) : (
                            <Link href="/dashboard/manage/plan">
                                <Button className="bg-yellow-600 hover:bg-yellow-600 animate-pulse">
                                    <MdOutlinePhotoSizeSelectLarge className="w-6 h-6" />
                                    {t("upgrade")}
                                </Button>
                            </Link>
                        )}
                        <Link href={`/dashboard/manage/delete/${id}`}>
                            <Button className="bg-red-600 hover:bg-red-700">
                                <FaTrash className="w-6 h-6" />
                            </Button>
                        </Link>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            <Card
                onClick={() => setIsOpen(true)}
                className="bg-inherit border-primary"
            >
                <div className="flex items-center justify-center h-full px-5 py-5 hover:brightness-50 transition-transform duration-300 ease-in-out transform hover:scale-105">
                    <div className="flex items-center justify-center w-full h-full">
                        <Image
                            src={url}
                            alt={name}
                            width={400}
                            height={400}
                            unoptimized
                        />
                    </div>
                </div>
            </Card>
        </main>
    );
}
