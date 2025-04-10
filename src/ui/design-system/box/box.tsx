import clsx from "clsx";
import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
    padding_x?: string;
    padding_y?: string;
}

export const Box = ({
    children,
    className,
    padding_x = "px-9",
    padding_y = "py-9",
    ...props
}: Props) => {
    return (
        <div 
            className={clsx(
                "w-full border border-gray-600 rounded",
                padding_x,
                padding_y,
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
};
