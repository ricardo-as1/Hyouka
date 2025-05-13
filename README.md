<p align="center">
  <a href="" rel="noopener">
 <img width=200px height=200px src="https://i.pinimg.com/736x/11/95/05/119505b6b530cbc0e8d65d8e56eea80b.jpg" alt="Bot logo"></a>
</p>

<h1 align="center">Hyouka™</h1>

<div align="center">

![Versão](https://img.shields.io/badge/Versão-v1.0.7‑beta.1-blue.svg)
[![Me adicione](https://img.shields.io/badge/Me-Adicione-blue.svg)](https://discord.com/oauth2/authorize?client_id=945037342605975643&permissions=8&integration_type=0&scope=bot)
![Status](https://img.shields.io/badge/Status-Development-blue.svg)
[![License](https://img.shields.io/badge/License-AGPL‑3.0-blue.svg)](/LICENSE)

</div>

---

<p align="center"> Meu bot oferece recursos de moderação, comandos divertidos e utilitários, com opções personalizáveis como prefixos e sistema de cooldown, garantindo uma experiência aprimorada no Discord.
</p>

## 📝 Sumário

- [Sobre o bot](#about)
- [Como funciona](#working)
- [Como usar](#usage)
- [Author](#author)

## 🧸 Sobre o bot <a name = "about"></a>

Este bot foi desenvolvido para oferecer uma experiência completa e personalizada no Discord. Ele combina ferramentas de moderação, comandos divertidos e utilitários, proporcionando flexibilidade e eficiência na administração e interação dentro do servidor.

### Principais Funcionalidades:
- **Moderação:** Comandos para gerenciar usuários e manter a ordem no servidor.
- **Comandos Divertidos:** Diversas interações e jogos para entreter os membros do servidor.
- **Utilitários:** Ferramentas úteis como informações do bot, sistemas de cooldown, e gerenciamento de prefixos personalizados.

O bot é altamente configurável, permitindo que cada servidor ajuste as funcionalidades de acordo com suas necessidades. Além disso, ele foi projetado com foco em desempenho e facilidade de uso, tornando a experiência no Discord mais agradável e eficiente.

## 💭 Como Funciona <a name = "working"></a>

- O bot se conecta ao servidor do Discord e carrega todos os comandos e eventos.
- Permite a personalização do prefixo dos comandos, adaptando-se às preferências do servidor.
- Processa comandos como moderação, diversão e utilitários, respondendo conforme configurado.
- Implementa um sistema de cooldown para evitar abusos de comandos repetidos.
- Utiliza uma database para persistência de dados, mantendo configurações e informações mesmo após reinicializações.
- Oferece opções de configuração para personalizar seu comportamento de acordo com as necessidades do servidor.

## 🎈 Como usar <a name = "usage"></a>

Para instalar todas as dependências, use:

```
npm install
```

Como iniciar, parar e outros comandos para o bot:


- **Iniciar o bot com `node`:**
    ```bash
    node index.js  # Inicia o bot manualmente, sem reinicialização automática
    ```

- **Iniciar o bot com `nodemon`:**
    ```bash
    nodemon index.js  # Inicia o bot e reinicia automaticamente quando há mudanças no código, perfeito para desenvolver
    ```

- **Iniciar o bot com `pm2` e nomeá-lo:**
    ```bash
    pm2 start index.js --name Hyouka  # Inicia o bot e o gerencia com pm2, atribuindo o nome "Hyouka"
    ```

- **Reiniciar o bot com `pm2`:**
    ```bash
    pm2 restart Hyouka  # Reinicia o bot gerenciado pelo pm2 com o nome "Hyouka"
    ```

- **Parar o bot com `pm2`:**
    ```bash
    pm2 stop Hyouka  # Para o bot gerenciado pelo pm2 com o nome "Hyouka"
    ```

- **Excluir todos os processos gerenciados pelo `pm2`:**
    ```bash
    pm2 delete all  # Remove todos os processos do gerenciamento do pm2
    ```

## 🧪 Author <a name="author"></a>

<h3 align="center">@! King Ø₣Ć 👑</h3>

<div align="center">

[![Instagram](https://img.shields.io/badge/Instagram-blue.svg)](https://www.instagram.com/kingzin.021/)
[![GitHub](https://img.shields.io/badge/GitHub-blue.svg)](https://github.com/ricardo-as1)
[![Discord](https://img.shields.io/badge/Discord-blue.svg)](https://discord.com/channels/@904451208901722142)
</div>