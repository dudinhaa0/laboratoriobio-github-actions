# Laboratório Biológico — Análise de Lâminas

Projeto React + Vite + Capacitor com captura de imagem usando o plugin oficial `@capacitor/camera`.

## Executar no computador

1. Instale Node.js LTS.
2. Extraia o ZIP e abra o terminal dentro da pasta `autenticacaosaodridri-main`.
3. Execute:

```bash
npm install
npm run dev
```

A câmera nativa do celular não funciona no navegador comum do computador; para testar a captura nativa, rode no Android.

## Executar no Android

```bash
npm install
npm run build:android
npx cap open android
```

No Android Studio, aguarde a sincronização do Gradle e execute o app em um celular Android ou emulador com câmera. Quando o Android pedir permissão, permita o acesso à câmera.

## O que foi implementado

- Componente `src/LaboratorioBioApp.jsx`.
- `CameraResultType.DataUrl` e `CameraSource.Camera`, conforme o requisito do Laboratório Biológico.
- Pré-visualização imediata da imagem capturada.
- Tratamento de cancelamento/erro sem derrubar a tela.
- Botão para salvar a imagem capturada.
