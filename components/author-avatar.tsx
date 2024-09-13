import Image from "next/image";
import Link from "next/link";

export type Author = {
    name: string;
    nickname: string;
    picture: string;
    url?: {
        href: string;
    } | null;
};

type AuthorAvatarProps = {
    author: Author;
};

const AuthorAvatar = ({ author: { name, picture, url } }: AuthorAvatarProps) => {
    return (
        <div className="flex items-center flex-shrink-0 md:justify-start">
            <div className="w-8 h-8">
                <Image
                    src={picture}
                    height={32}
                    width={32}
                    title={name}
                    className="w-full h-full rounded-full"
                    alt={name}
                />
            </div>
            <dl className="ml-2 text-sm font-medium leading-5 text-left whitespace-nowrap">
                <dt className="sr-only">Name</dt>
                <dd className="text-gray-900 dark:text-white font-medium">
                    {url ? (
                        <Link
                            href={url.href}
                            className="text-blue-500 no-underline hover:text-blue-600 hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {name}
                        </Link>
                    ) : (
                        name
                    )}
                </dd>
            </dl>
        </div>
    );
};

export default AuthorAvatar;