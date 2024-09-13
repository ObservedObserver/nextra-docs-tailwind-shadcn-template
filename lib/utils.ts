import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function resolveUrl(siteURL: string, ...paths: (string | undefined)[]) {
    return paths
        .filter((p) => Boolean(p))
        .reduce((acc, path) => {
            if (acc.endsWith("/")) {
                acc = acc.slice(0, -1);
            }
            if (path.startsWith("/")) {
                path = path.slice(1);
            }
            return `${acc}/${path}`;
        }, siteURL);
}
