# upfy-workshop-black

Apresentação do Workshop Black Friday 2026 da UPFY, publicada em **workshop.upfy.net.br**.

Página estática: tudo o que está em `public/` vai ao ar como está, sem build.

```
public/
  index.html              apresentação (CSS e JS internos)
  _headers                segurança, cache dos assets e noindex
  robots.txt              bloqueia indexação
  assets/
    consent.js            banner de cookies + Consent Mode v2
    img/revi-logo.png     logo da REVI (fundo transparente)
wrangler.jsonc            Worker só com arquivos estáticos
```

## Publicar

1. Criar o repositório privado `upfy-workshop-black` e subir estes arquivos na branch `main`.
2. Cloudflare › Workers & Pages › Create › Import a repository › `upfy-workshop-black`. Comando de build vazio, deploy padrão (`npx wrangler deploy`).
3. No Worker: Settings › Domains & Routes › Add › Custom domain › `workshop.upfy.net.br`. A Cloudflare cria o DNS e o certificado.
4. Testar em aba anônima, no celular e no computador.

## Tracking

- GTM `GTM-TH22KBV`, o mesmo da LP. Consent Mode v2 começa negado; o pixel só dispara depois do aceite (`consent_granted`).
- A página manda `lp_name: 'Workshop Black Friday - Apresentação'` no dataLayer.
- Não há formulário nem evento de Lead. Serve para formar público de quem abriu a apresentação.

## Alterar

Sempre que mudar `consent.js` ou a imagem, troque a versão `?v=` no `index.html` para o navegador não mostrar a versão antiga.
