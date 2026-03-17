# 🎨 AI Image Generator

Projeto rápido criado mais pela curiosidade e pela brincadeira do que por qualquer objetivo formal — uma pequena aplicação full stack para gerar imagens a partir de prompts de texto usando a OpenAI com DALL·E.

A ideia foi simples: construir um frontend moderno e leve para o usuário digitar um prompt, enviar para uma API própria e receber de volta a imagem gerada.

---

## ✨ Sobre o projeto

Este projeto foi desenvolvido rapidamente como um experimento prático para testar a integração entre:

- um **frontend moderno** com foco em experiência simples e rápida
- uma **API backend em .NET**
- a **OpenAI API**, consumindo o modelo **DALL·E** para geração de imagens

É aquele tipo de projeto “fiz só pra brincar”, mas que acaba sendo ótimo para explorar integração entre tecnologias, fluxo client/server, organização full stack e consumo de APIs externas.

---

## 🧱 Stack utilizada

### Frontend
- **Next.js**
- **React**
- **TypeScript**
- **Tailwind CSS**
- **Vite**

### Backend
- **C#**
- **.NET 10**
- **Scalar** para documentação da API
- Integração com a **OpenAI API**
- Consumo do **DALL·E** para geração de imagens

---

## ⚙️ Como funciona

1. O usuário informa um prompt no frontend
2. O frontend envia a requisição para a API
3. A API consome a OpenAI
4. O DALL·E gera a imagem com base no prompt
5. A aplicação retorna e exibe a imagem para o usuário

---

## 📋 Pré-requisitos

Antes de rodar o projeto, você precisa ter instalado na máquina:

### Para o frontend
- **Node.js**
- **npm** ou outro gerenciador de pacotes de sua preferência

### Para o backend
- **.NET 10 SDK**
- **Visual Studio** (ou outro editor compatível com .NET, como Rider ou VS Code)

### Além disso
- Uma **API Key da OpenAI**
- Git instalado, caso queira clonar o repositório

---

## 🔐 Configuração de segredo

Para que a API funcione corretamente, é necessário adicionar sua chave da OpenAI como secret.

Exemplo com **User Secrets** no .NET:

```bash
dotnet user-secrets init
dotnet user-secrets set "OpenAI:ApiKey" "SUA_CHAVE_AQUI"