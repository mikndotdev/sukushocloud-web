import { forwardRef } from "react";
import { tv } from "tailwind-variants";

// eslint-disable-next-line tailwindcss/no-custom-classname
export const textVariants = tv(
    {
        base: "leading-relaxed tracking-wide",
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

type TextSize =
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

export interface TextProps extends React.ComponentProps<"p"> {
    size?: TextSize | { [key in "sm" | "md" | "lg" | "xl" | "2xl"]?: TextSize };
}

export const Text = forwardRef<HTMLParagraphElement, TextProps>(
    ({ children, className, size = "md", ...props }, ref) => {
        return (
            <p
                ref={ref}
                className={textVariants({ size, className })}
                {...props}
            >
                {children}
            </p>
        );
    },
);

Text.displayName = "Text";
