import React from "react";
import { DocsThemeConfig, ThemeSwitch, useConfig } from "nextra-theme-docs";
import { useRouter } from "next/router";
import { resolveUrl } from "./lib/utils";

const config: DocsThemeConfig = {
    logo: <span>Nextra Shadcn Tailwind</span>,
    logoLink: "/",
    chat: {
        link: "https://twitter.com/ob12er",
        icon: (
            <svg width="24" height="24" viewBox="0 0 248 204">
                <path
                    fill="currentColor"
                    d="M221.95 51.29c.15 2.17.15 4.34.15 6.53 0 66.73-50.8 143.69-143.69 143.69v-.04c-27.44.04-54.31-7.82-77.41-22.64 3.99.48 8 .72 12.02.73 22.74.02 44.83-7.61 62.72-21.66-21.61-.41-40.56-14.5-47.18-35.07a50.338 50.338 0 0 0 22.8-.87C27.8 117.2 10.85 96.5 10.85 72.46v-.64a50.18 50.18 0 0 0 22.92 6.32C11.58 63.31 4.74 33.79 18.14 10.71a143.333 143.333 0 0 0 104.08 52.76 50.532 50.532 0 0 1 14.61-48.25c20.34-19.12 52.33-18.14 71.45 2.19 11.31-2.23 22.15-6.38 32.07-12.26a50.69 50.69 0 0 1-22.2 27.93c10.01-1.18 19.79-3.86 29-7.95a102.594 102.594 0 0 1-25.2 26.16z"
                />
            </svg>
        ),
    },
    footer: {
        text: "Site Template",
    },
    project: {
        link: "https://github.com/ObservedObserver/nextra-docs-tailwind-shadcn-template",
    },
    banner: {
        text: "This is a template based on nextra + tailwind + shadcn-ui",
    },
    docsRepositoryBase:
        "https://github.com/ObservedObserver/nextra-docs-tailwind-shadcn-template",
    head: () => {
        const { asPath, defaultLocale, locale, basePath } = useRouter();
        const { frontMatter } = useConfig();

        // Replace with your website's base URL
        const baseUrl =
            process.env.NEXT_PUBLIC_BASE_URL || "https://example.com";

        const url = resolveUrl(
            baseUrl,
            basePath,
            defaultLocale === locale ? undefined : locale,
            asPath
        );
        const ogImage = frontMatter.ogImage;

        const title = frontMatter.title || "Your Default Title";
        const description =
            frontMatter.description || "Your Default Description";

        return (
            <>
                <meta property="og:url" content={url} />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <link rel="canonical" href={url} />
                <link rel="icon" href="/favicon.ico" sizes="any" />
                {ogImage && <meta property="og:image" content={ogImage} />}
            </>
        );
    },
    useNextSeoProps() {
        const { asPath } = useRouter();
        if (asPath !== "/") {
            return {
                titleTemplate: "%s – My Site",
            };
        }
    },
    navbar: {
        extraContent: () => {
            return <ThemeSwitch />;
        },
    },
};

export default config;
