import { t, type Dictionary } from "intlayer";

const appContent = {
  key: "app",
  content: {
    greeting: t({
      en: "Hello from Intlayer!",
      ar: "مرحباً من Intlayer!",
    }),
  },
} satisfies Dictionary;

export default appContent;