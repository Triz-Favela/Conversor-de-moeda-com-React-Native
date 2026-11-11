# 🪙 Conversor de Moedas (Expo + React Native)

Um aplicativo moderno e responsivo de conversão de moedas desenvolvido em **React Native** com **Expo Router**, seguindo a arquitetura **MVVM (Model-View-ViewModel)** e consumindo a API pública **Frankfurter**.

---

## 📋 Sumário

- [Visão Geral](#-visão-geral)
- [Arquitetura (MVVM)](#-arquitetura-mvvm)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Funcionalidades](#-funcionalidades)
- [Como Executar o Projeto](#-como-executar-o-projeto)

---

## 🎯 Visão Geral

Este projeto é uma aplicação de conversão de valores entre diferentes moedas internacionais em tempo real. O usuário escolhe a moeda de origem e a de destino através de seletores interativos (*Pickers*) alimentados dinamicamente pela API.

O projeto lida com requisições assíncronas, gerenciamento de estado e tratamento de exceções de rede/CORS no ambiente web.

---

## 🏗 Arquitetura (MVVM)

A aplicação segue estritamente o padrão de arquitetura **MVVM** para separar responsabilidades e facilitar a manutenção do código:

* **Model (`src/models/currencyModel.js`)**: Responsável pela comunicação externa com a API Frankfurter, tratamento das respostas JSON e contorno de políticas de CORS na web.
* **ViewModel (`src/viewmodels/useCurrencyViewModel.js`)**: Hook customizado React que encapsula a regra de negócio, estados da interface (carregamento, erros, seleção) e formatação dos dados.
* **View (`src/app/index.tsx`)**: Interface do usuário responsável por renderizar a tela, capturar interações do usuário e refletir as mudanças fornecidas pelo ViewModel.

---

## 🛠 Tecnologias Utilizadas

- **Framework**: [Expo](https://expo.dev/) (Expo Router)
- **Biblioteca Base**: [React Native](https://reactnative.dev/)
- **Linguagens**: TypeScript / JavaScript
- **Componentes Nativos**: `@react-native-picker/picker`
- **API Externa**: [Frankfurter API](https://www.frankfurter.app/)

---

## 📂 Estrutura do Projeto

```text
├── src/
│   ├── app/
│   │   ├── _layout.tsx      # Configuração de navegação principal (Expo Router)
│   │   └── index.tsx        # View principal (Tela do Conversor)
│   ├── models/
│   │   └── currencyModel.js # Camada de acesso a dados / API
│   └── viewmodels/
│       └── useCurrencyViewModel.js # Camada de lógica e controle de estado
├── package.json
└── README.md
```

---

## ✨ Funcionalidades

- 🔄 **Carregamento Dinâmico de Moedas**: Lista completa de moedas obtida em tempo real via API.
- 🎛 **Seleção via Dropdown**: Escolha prática das moedas de origem e destino usando `<Picker>`.
- 🧮 **Conversão em Tempo Real**: Cálculo de conversão baseado na taxa oficial de câmbio.
- 📅 **Data de Referência**: Exibição da data da cotação obtida.
- ⚠️ **Tratamento de Erros e Validações**:
  - Impedimento de conversões com a mesma moeda de origem e destino.
  - Validação de entrada para valores numéricos maiores que zero.
  - Tratamento visual de erros de rede e conectividade.

---

## 🚀 Como Executar o Projeto

### Pré-requisitos
- Node.js instalado (v16 ou superior)
- Gerenciador de pacotes `npm` ou `yarn`
- Expo CLI instalado ou executável via `npx`

### Passo a Passo

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/Triz-Favela/Conversor-de-moeda-com-React-Native.git
   cd Conversor-de-moeda-com-React-Native
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento do Expo:**
   ```bash
   npx expo start
   ```

4. **Execução:**
   - Abra no navegador pressionando `w`.
   - Ou escaneie o QR Code no app **Expo Go** em seu dispositivo móvel (Android/iOS).
