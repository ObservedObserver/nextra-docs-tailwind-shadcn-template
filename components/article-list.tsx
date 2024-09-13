import { getPagesUnderRoute } from "nextra/context";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/router";
import { MdxFile } from "nextra";

export function ArticleList({ postsRoute = '/blog' }: { postsRoute: string }) {
    const { basePath } = useRouter();
    const articles: MdxFile[] = getPagesUnderRoute(postsRoute)
        .filter((page) => page.kind === "MdxPage")
        .filter((page) => page.name !== "index")
        .filter((page) => (page as MdxFile).frontMatter)
        .sort((a: MdxFile, b: MdxFile) => {
            return (
                new Date(b.frontMatter.date).getTime() -
                new Date(a.frontMatter.date).getTime()
            );
        })
        .slice(0, 20) as MdxFile[];

    return (
        <div className="max-w-6xl mx-auto py-8 px-4">
            <h2 className="text-3xl font-bold mb-8 px-8 flex gap-2 items-center">
                Latest Articles
            </h2>
            <div className="">
                {articles.map((article, index) => (
                    <article
                        key={index}
                        className="border-b border-gray-200 dark:border-gray-700 p-8 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
                    >
                        <a href={`${basePath}${article.route}`}>
                            <h3 className="text-2xl font-semibold mb-2">
                                {article.frontMatter.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                                {article.frontMatter.description}
                            </p>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <Avatar>
                                        <AvatarImage
                                            src={`/avatar-images/${article.frontMatter.author}.svg`}
                                            alt={article.frontMatter.author}
                                        />
                                        <AvatarFallback>
                                            {article.frontMatter.author}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-medium">
                                            {article.frontMatter.author}
                                        </p>
                                        <div className="flex items-center text-sm text-gray-500">
                                            {/* <CalendarIcon className="mr-1 h-4 w-4" /> */}
                                            {new Date(
                                                article.frontMatter.date
                                            ).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                            })}
                                        </div>
                                    </div>
                                </div>
                                {/* <Badge variant="secondary">{article.keywords}</Badge> */}
                            </div>
                        </a>
                    </article>
                ))}
            </div>
        </div>
    );
}
