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
                <AlertDialogContent className="bg-inherit text-white border-primary max-w-3xl w-[95vw] mx-auto p-4 md:p-6">
                    <AlertDialogHeader className="space-y-4">
                        <div className="flex items-center justify-between w-full gap-4">
                            <AlertDialogTitle className="text-lg md:text-xl font-semibold truncate">
                                {name}
                            </AlertDialogTitle>
                            <Button
                                className="bg-red-600 hover:bg-red-700 shrink-0"
                                onClick={() => setIsOpen(false)}
                            >
                                <FaCircleXmark className="w-5 h-5" />
                            </Button>
                        </div>
                        <AlertDialogDescription className="text-sm md:text-base opacity-80">
                            {t("uploadedAt")} {new Date(date).toLocaleString()}
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <div className="relative w-full my-4 rounded-lg overflow-hidden aspect-square md:aspect-auto md:h-[60vh]">
                        <Image
                            src={url}
                            alt={name}
                            fill
                            className="object-contain"
                            unoptimized
                        />
                    </div>

                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                            <Button
                                className="bg-primary hover:bg-primary/90 w-full"
                                onClick={() => copyUrl(url)}
                            >
                                <FaImage className="w-4 h-4 mr-2" />
                                <span className="truncate">{t("copyUrl")}</span>
                            </Button>
                            <Button
                                className="bg-primary hover:bg-primary/90 w-full"
                                onClick={() => copyLink(shortUrl)}
                            >
                                <FaLink className="w-4 h-4 mr-2" />
                                <span className="truncate">{t("copyLink")}</span>
                            </Button>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            {isPremium ? (
                                <Link href={`/dashboard/manage/edit/${id}`} className="w-full">
                                    <Button className="bg-primary hover:bg-primary/90 w-full">
                                        <MdOutlinePhotoSizeSelectLarge className="w-4 h-4 mr-2" />
                                        <span className="truncate">{t("edit")}</span>
                                    </Button>
                                </Link>
                            ) : (
                                <Link href="/dashboard/manage/plan" className="w-full">
                                    <Button className="bg-yellow-600 hover:bg-yellow-700 w-full animate-pulse">
                                        <MdOutlinePhotoSizeSelectLarge className="w-4 h-4 mr-2" />
                                        <span className="truncate">{t("upgrade")}</span>
                                    </Button>
                                </Link>
                            )}
                            <Link href={`/dashboard/manage/delete/${id}`} className="w-full">
                                <Button className="bg-red-600 hover:bg-red-700 w-full">
                                    <FaTrash className="w-4 h-4 mr-2" />
                                    <span className="truncate">{t("delete")}</span>
                                </Button>
                            </Link>
                        </div>
                    </div>
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
