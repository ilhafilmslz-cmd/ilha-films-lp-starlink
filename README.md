# Ilha Films — LP Starlink | Next.js

Landing page de conversão para WhatsApp com Meta Pixel + CAPI via Vercel Functions.

## Setup

```bash
npm install
```

## Variável de ambiente (OBRIGATÓRIO)

Crie um arquivo `.env.local` na raiz do projeto:

```
META_API_TOKEN=seu_token_aqui
```

**Na Vercel:** Settings → Environment Variables → adicione `META_API_TOKEN`

## Imagens do carrossel

Adicione 4 imagens na pasta `/public/images/`:
- `bg1.jpg`
- `bg2.jpg`
- `bg3.jpg`
- `bg4.jpg`

Sugestão: fotos reais da loja ou carros com película aplicada.

## Desenvolvimento

```bash
npm run dev
```

## Deploy

Push para o GitHub. A Vercel detecta automaticamente e faz o deploy.

## Estrutura

```
pages/
  _app.tsx        → Pixel Meta global
  index.tsx       → Página principal
  api/
    capi.ts       → Serverless Function (CAPI)
styles/
  globals.css     → Estilos + animações
public/
  images/         → bg1.jpg ... bg4.jpg
```
