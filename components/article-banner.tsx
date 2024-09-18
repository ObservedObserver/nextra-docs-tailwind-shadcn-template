import { useConfig } from "nextra-theme-docs";
import { useRouter } from "next/router";
import Image from "next/image";
import AuthorAvatar, { Author } from "./author-avatar";
import { allAuthors, ValidAuthorName } from "@/lib/author";

export default function ArticleBanner() {
    const { locale } = useRouter();
    const { frontMatter } = useConfig();
    const { author, title, date, tag, ogImage, description } = frontMatter as {
        author?: string;
        title?: string;
        date?: string;
        tag?: string;
        ogImage?: string;
        description?: string;
    };

    const authors = author
        ?.split(/,\s*/g)
        .map((name) => name.trim())
        .filter(Boolean) as ValidAuthorName[] | undefined;
    const validAuthors = (authors
        ?.map(
            (nickname) =>
                allAuthors.find((author) => author.nickname === nickname)!
        )
        .filter(Boolean) ?? []) as Author[];

    const tags =
        (tag
            ?.split(/,\s*/g)
            .map((name) => name.trim())
            .filter(Boolean) as string[] | undefined) ?? [];

    return (
        <div className="w-full border-b border-gray-200 dark:border-gray-800 pb-8">
            {(date || validAuthors.length > 0) && (
                <div className="flex items-center justify-center mt-8 mb-6">
                    {validAuthors.map((val) => (
                        <AuthorAvatar key={val.name} author={val} />
                    ))}
                </div>
            )}
            {date && (
                <p className="mt-6 mb-6 text-sm text-center text-gray-500 dark:text-gray-400 font-['Space_Grotesk',_monospace]">
                    Updated on{" "}
                    <time dateTime={date} className="mt-6 leading-7">
                        {new Date(date).toLocaleDateString(locale)}
                    </time>
                </p>
            )}
            {ogImage && (
                <div className="flex justify-center">
                    <Image
                        src={ogImage}
                        width={1200}
                        height={628}
                        alt={description}
                        className="w-[1200px]"
                    />
                </div>
            )}
        </div>
    );
}
