import { defineConfig, HeadConfig } from "vitepress";

export const META_IMAGE = "https://pinia.vuejs.org/social.png";
export const isProduction =
    process.env.NETLIFY && process.env.CONTEXT === "production";

if (process.env.NETLIFY) {
    console.log("Netlify build", process.env.CONTEXT);
}

const productionHead: HeadConfig[] = [
    [
        "script",
        {
            src: "https://unpkg.com/thesemetrics@latest",
            async: "",
            type: "text/javascript",
        },
    ],
];

export const sharedConfig = defineConfig({
    title: "Pinia",
    appearance: "dark",

    markdown: {
        theme: {
            dark: "dracula-soft",
            light: "vitesse-light",
        },

        attrs: {
            leftDelimiter: "%{",
            rightDelimiter: "}%",
        },
    },

    head: [
        ["link", { rel: "icon", type: "image/svg+xml", href: "/logo.svg" }],
        ["link", { rel: "icon", type: "image/png", href: "/logo.png" }],

        [
            "meta",
            {
                name: "wwads-cn-verify",
                content: "5878a7ab84fb43402106c575658472fa",
            },
        ],

        [
            "meta",
            {
                property: "og:type",
                content: "website",
            },
        ],

        [
            "meta",
            {
                property: "twitter:card",
                content: "summary_large_image",
            },
        ],
        [
            "meta",
            {
                property: "twitter:image",
                content: META_IMAGE,
            },
        ],

        /* TODO: Remove comment when official docs fix the issue
    [
      'script',
      {
        src: 'https://vueschool.io/banners/main.js',
        // @ts-expect-error: vitepress bug
        async: true,
        type: 'text/javascript',
      },
    ], */

        ...(isProduction ? productionHead : []),
    ],

    themeConfig: {
        logo: "/logo.svg",
        outline: [2, 3],

        socialLinks: [
            { icon: "twitter", link: "https://twitter.com/posva" },
            {
                icon: "github",
                link: "https://github.com/vuejs/pinia",
            },
            {
                icon: "discord",
                link: "https://chat.vuejs.org",
            },
        ],

        footer: {
            copyright: "Copyright © 2019-present Eduardo San Martin Morote",
            message: "Lanzado bajo la Licencia MIT.",
        },

        editLink: {
            pattern:
                "https://github.com/vuejs/pinia/edit/v2/packages/docs/:path",
            text: "Sugerir cambios",
        },

        algolia: {
            appId: "WWHDVZOVW8",
            apiKey: "9182688aa41745d0aa68ffa71f6b202b",
            indexName: "es-pinia",
            placeholder: "Buscar",
            translations: {
                button: {
                    buttonText: "Buscar",
                    buttonAriaLabel: "Buscar",
                },
                modal: {
                    searchBox: {
                        resetButtonTitle: "Borrar",
                        resetButtonAriaLabel: "Borrar",
                        cancelButtonText: "Cancelar",
                        cancelButtonAriaLabel: "Cancelar",
                    },
                    startScreen: {
                        recentSearchesTitle: "Recientes",
                        noRecentSearchesText: "No hay busquedas recientes",
                        saveRecentSearchButtonTitle: "Añadir a favoritos",
                        removeRecentSearchButtonTitle: "Eliminar del historial de búsquedas",
                        favoriteSearchesTitle: "Favoritos",
                        removeFavoriteSearchButtonTitle: "Eliminar de favoritos",
                    },
                    errorScreen: {
                        titleText: "No se ha encontrado",
                        helpText: "Puede que necesites comprobar tu conexión a Internet",
                    },
                    footer: {
                        selectText: "Seleccionar",
                        navigateText: "Navegar",
                        closeText: "Cerrar",
                        searchByText: "Búsquedas por",
                    },
                    noResultsScreen: {
                        noResultsText: "No se han encontrado resultados para",
                        suggestedQueryText: "Quizás puedas encontrarlo en",
                        reportMissingResultsText: "¿Crees que debería aparecer?",
                        reportMissingResultsLinkText: "Haz clic aquí",
                    },
                },
            },
        },

        carbonAds: {
            code: "CEBICK3I",
            // custom: 'CEBICK3M',
            placement: "routervuejsorg",
        },
    },
});
