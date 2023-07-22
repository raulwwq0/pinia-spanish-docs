import { defineConfig } from "vitepress";
import { esConfig } from "./es";
import { sharedConfig } from "./shared";

export default defineConfig({
    ...sharedConfig,

    locales: {
        root: { label: "Español", lang: "es", link: "/", ...esConfig },
        en: {
            label: "English",
            lang: "en-US",
            link: "https://pinia.vuejs.org/",
        },
        zh: {
            label: "简体中文",
            lang: "zh-CN",
            link: "https://pinia.vuejs.org/zh/",
        },
        ko: {
            label: "한국어",
            lang: "ko-KR",
            link: "https://pinia.vuejs.kr/",
        },
    },
});
