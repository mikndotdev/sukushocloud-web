import { type ComponentPropsWithoutRef, forwardRef } from "react";
import { tv } from "tailwind-variants";

// eslint-disable-next-line tailwindcss/no-custom-classname
export const headingVariants = tv(
    {
        base: "font-bold text-on-background",
        variants: {
            size: {
                xs: "text-xs",
                sm: "text-sm",
                md: "text-base",
                lg: "text-lg",
                xl: "text-xl",
                "2xl": "text-2xl",
                "3xl": "text-3xl",
                "4xl": "text-4xl",
                "5xl": "text-5xl",
                "6xl": "text-6xl",
                "7xl": "text-7xl",
                "8xl": "text-8xl",
                "9xl": "text-9xl",
            },
        },
    },
    {
        responsiveVariants: ["sm", "md", "lg", "xl", "2xl"],
    },
);

export interface HeadingProps extends ComponentPropsWithoutRef<"h2"> {
    /**
     * 見出しとして使う HTML 要素を指定します。
     *
     * @default 'h2'
     */
    as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
    /**
     * 見出しのサイズを指定します。
     *
     * @default 'md'
     */
    size?:
        | "xs"
        | "sm"
        | "md"
        | "lg"
        | "xl"
        | "2xl"
        | "3xl"
        | "4xl"
        | "5xl"
        | "6xl"
        | "7xl"
        | "8xl"
        | "9xl";
}

/**
 * `Heading` は、見出しを表示するためのコンポーネントです。
 *
 * @see https://ui-preview.pages.dev/?path=/docs/layout-heading--docs
 */
export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
    (
        {
            children,
            className,
            as: Component = "h2",
            size = "md",
            ...props
        }: HeadingProps,
        ref,
    ) => {
        return (
            <Component
                ref={ref}
                className={headingVariants({ size, className })}
                {...props}
            >
                {children}
            </Component>
        );
    },
);
Heading.displayName = "Heading";
