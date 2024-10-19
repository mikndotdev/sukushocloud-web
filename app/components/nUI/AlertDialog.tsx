"use client";

import {
    type ComponentPropsWithoutRef,
    type ElementRef,
    forwardRef,
    Fragment,
} from "react";
import { Transition, Dialog } from "@headlessui/react";
import { tv } from "tailwind-variants";
import { Button, type ButtonProps } from "../shadcn/ui/button";

const alertDialogVariants = tv({
    base: "flex w-[calc(100%-2rem)] max-w-lg flex-col overflow-hidden rounded-lg bg-surface p-6 text-left align-middle shadow-lg transition-all",
});

/**
 * `AlertDialog` は、アクションを実行する前にユーザーの意思を確認するために使用されるコンポーネントです。
 *
 * @see https://ui-preview.pages.dev/?path=/docs/containment-alertdialog--docs
 */
export const AlertDialog = forwardRef<
    ElementRef<typeof Dialog>,
    ComponentPropsWithoutRef<typeof Dialog>
>(({ open, onClose, className, children, ...props }, ref) => (
    <Transition appear show={open} as={Fragment}>
        <Dialog
            as="div"
            className="relative z-10"
            onClose={onClose}
            ref={ref}
            {...props}
        >
            <Transition.Child
                as={Fragment}
                enter="ease-out duration-200"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="fixed inset-0 bg-night/20 backdrop-blur-sm" />
            </Transition.Child>

            <div className="fixed inset-0 flex min-h-full items-center justify-center overflow-y-auto p-4 text-center">
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-200"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    <Dialog.Panel
                        className={alertDialogVariants({ className })}
                    >
                        {children}
                    </Dialog.Panel>
                </Transition.Child>
            </div>
        </Dialog>
    </Transition>
));
AlertDialog.displayName = "AlertDialog";

const alertDialogTitleVariants = tv({
    base: "text-xl font-bold leading-6 text-on-surface",
});

export const AlertDialogTitle = forwardRef<
    HTMLHeadingElement,
    ComponentPropsWithoutRef<"h3">
>(({ className, children, ...props }, ref) => (
    <Dialog.Title
        as="h3"
        className={alertDialogTitleVariants({ className })}
        ref={ref}
        {...props}
    >
        {children}
    </Dialog.Title>
));
AlertDialogTitle.displayName = "AlertDialogTitle";

const alertDialogDescriptionVariants = tv({
    base: "mt-3 text-gray-600",
});

export const AlertDialogDescription = forwardRef<
    HTMLParagraphElement,
    ComponentPropsWithoutRef<"p">
>(({ className, children, ...props }, ref) => (
    <p
        className={alertDialogDescriptionVariants({ className })}
        ref={ref}
        {...props}
    >
        {children}
    </p>
));
AlertDialogDescription.displayName = "AlertDialogDescription";

const alertDialogFooterVariants = tv({
    base: "mt-4 flex justify-end space-x-2",
});

export interface AlertDialogFooterProps
    extends ComponentPropsWithoutRef<"div"> {
    /**
     * 続行ボタンのテキスト
     *
     * @default '続行'
     */
    actionText?: string;
    /**
     * 続行ボタンの色
     *
     * @default 'DEFAULT'
     */
    /**
     * 続行ボタンを押したときに実行される関数
     */
    onAction: () => void;
    /**
     * キャンセルボタンのテキスト
     *
     * @default 'キャンセル'
     */
    cancelText?: string;
    /**
     * キャンセルボタンを押したときに実行される関数
     */
    onCancel: () => void;
}

export const AlertDialogFooter = forwardRef<
    HTMLDivElement,
    AlertDialogFooterProps
>(
    (
        {
            className,
            actionText = "続行",
            onAction,
            cancelText = "キャンセル",
            onCancel,
            ...props
        },
        ref,
    ) => (
        <div
            className={alertDialogFooterVariants({ className })}
            ref={ref}
            {...props}
        >
            <Button variant="ghost" onClick={onCancel}>
                {cancelText}
            </Button>
            <Button onClick={onAction}>{actionText}</Button>
        </div>
    ),
);
AlertDialogFooter.displayName = "AlertDialogFooter";
