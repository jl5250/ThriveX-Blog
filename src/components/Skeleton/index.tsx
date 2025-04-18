import { cn } from "@/lib/utils";
import "./index.scss";

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn(
                "skeleton rounded-md bg-gray-200 dark:bg-gray-800",
                className
            )}
            {...props}
        />
    );
}

export default Skeleton;