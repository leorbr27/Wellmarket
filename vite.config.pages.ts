// Configuração exclusiva para a publicação estática no GitHub Pages.
// Mantém vite.config.ts original para não interferir no ambiente Lovable.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  // GitHub Pages não executa o servidor Nitro.
  nitro: false,
  // Este repositório é publicado em https://leorbr27.github.io/Wellmarket/
  vite: {
    base: "/Wellmarket/",
  },
  tanstackStart: {
    // Gera uma aplicação estática que funciona sem servidor.
    spa: {
      enabled: true,
      prerender: {
        crawlLinks: true,
      },
    },
  },
});
