# Atualização de Dependências — OneBitcoin

Foi realizada a atualização das dependências do projeto **OneBitcoin**, migrando do **Expo SDK 44** para o **Expo SDK 55**, além da atualização das principais bibliotecas da stack React Native.

A atualização seguiu a documentação oficial do Expo:  
https://docs.expo.dev/workflow/upgrading-expo-sdk-walkthrough/

---

## Comandos utilizados

```
npm install expo@^55.0.0
npx expo install --fix
npx expo-doctor
```

## Principais mudanças

| Dependência      | Antes   | Depois   |
| ---------------- | ------- | -------- |
| expo             | ~44.0.0 | ^55.0.5  |
| expo-status-bar  | ~1.2.0  | ~55.0.4  |
| expo-updates     | ~0.11.7 | ~55.0.12 |
| react            | 17.0.1  | 19.2.0   |
| react-native     | 0.64.3  | 0.83.2   |
| react-native-svg | ^12.4.3 | 15.15.3  |
| react-native-web | 0.17.1  | ^0.21.0  |

A biblioteca `react-native-chart-kit` permaneceu na mesma versão pois já era compatível com a nova stack.

O .gitignore foi mudado para evitar que a pasta android/ seja adicionada ao repositório.

Tambem entraram mudancas funcionais no app:

- `App.js`
  - Migracao da consulta historica para o endpoint `market_chart` da CoinGecko.
  - Normalizacao das cotacoes para manter 1 registro por dia.
  - Ajuste do fluxo de atualizacao para reagir a mudanca de `days`.
  - Limitacao da lista para o periodo selecionado (`7/15/30/90/180`).
- `src/components/QuotationsList/index.js`
  - Refatoracao dos botoes de periodo com `FILTER_BUTTONS`.
  - Destaque visual do botao ativo selecionado.
  - Adicao de `keyExtractor` no `FlatList`.
- `src/components/QuotationsList/style.js`
  - Estilos adicionados para o estado ativo dos botoes.

## Resultado

O projeto foi atualizado com sucesso para versões mais recentes do **Expo e React Native**, garantindo melhor compatibilidade, manutenção e suporte para futuras evoluções.
