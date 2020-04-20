<h3 align="center" >
  Bootcamp da <a text-decoration="none" href="https://rocketseat.com.br">:rocket: Rockeseat</a> - Desafio: FastFeet Backend
</h3>

<p align="center">
  <a href="https://github.com/lucasssartori?tab=followers">
    <img alt="GitHub Lucas Sartori" src="https://img.shields.io/github/followers/lucasssartori?style=social">
  </a>

  <a href="https://github.com/lucasssartori/fastfeetbackend/stargazers">
    <img alt="Stargazers" src="https://img.shields.io/github/stars/lucasssartori/fastfeetbackend?style=social">
  </a>
  <a href="https://github.com/lucasssartori/fastfeetbackend/forks/">
    <img alt="Stargazers" src="https://img.shields.io/github/forks/lucasssartori/fastfeetbackend?style=social">
  </a>

  <a href="https://github.com/lucasssartori/fastfeetbackend/watchers">
    <img alt="watchers" src="https://img.shields.io/github/watchers/lucasssartori/fastfeetbackend?style=social">
  </a>
</p>

<p align="center">
  <a href="#1---sobre-o-módulo">Sobre o desafio</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#2---tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#3---executar-aplicação">Executar aplicação</a>
</p>

## 1 - Sobre o Projeto

<p align="center">
    <img
      alt="FastFeet"
      src="https://github.com/lucasssartori/fastfeetbackend/blob/master/tmp/logo.png?raw=true"
      width="150px" />
</p>

Neste projeto foi desenvolvido o backend do FastFeet, que é uma aplicação de gerenciamento de entregas.

Este backend será consumido através das aplicações Web e Mobile do FastFeet.

## 2 - Tecnologias

<p align="center"><img alt="Node.js" src="https://nodejs.org/static/images/logo-light.svg" width="100px" /></p>

O Projeto desenvolvido em NodeJS com aplicação de diversas tecnologias e bibliotecas.

- postgres - Banco de Dados Relacional
- Redis - Banco de dados NoSQL
- bcryptjs - Criptografia
- bee-queue - Criação de serviços na aplicação com o uso de Redis
- cors - Acesso e segurança das APIs da aplicação
- date-fns - Manipulação de datas
- dotenv - Variaveis de ambiente
- express - Desenvolvimento de Apis
- jsonwebtoken - Autenticação JWT
- nodemailer - Enviao de e-mails
- express-handlebars - Desenvolvimento de Layout de emails
- nodemailer-express-handlebars - Desenvolvimento de Layout de emails
- pg - Para utilização do banco de dados postgress
- pg-hstore - Para utilização do banco de dados postgress
- sequelize - Mapeamento Objeto Relacional
- yup - Validação de dados.
- eslint - Padronização de código
- nodemon - Statrt e restart automatico da aplicação durante o desenvolvimento.
- prettier - Formatador de código
- sucrase - Utilização do padrão de sintaxe ES6
- sentry - Tratamento de exceções de produção
- youch - Tratamento das mensagens para o ambiente de desenvolvimento e produção

## 3 - Executar aplicação

:heavy_check_mark: Realizar um clone desse repositório. <br />
:heavy_check_mark: Entre na pasta do projeto via linha de comando. <br />
:heavy_check_mark: Executar o comando yarn para instalar as dependências. <br />
:heavy_check_mark: Criar um container do banco de dados postgres no docker através do comando: docker run --name database -e POSTGRES_PASSWORD=docker -p 5432:5432 postgres<br />
:heavy_check_mark: Criar um container do banco de dados NOSQL Redis no docker através do comando: docker run --name redis -p 6379:6379 redis-alpine<br />
:heavy_check_mark: Realizar a configuração do arquivo de variáveis globais ".env" e salvar na pasta raiz do projeto. O arquivo ".env.example" serve como exemplo para configuração. <br
:heavy_check_mark: Executar o comando "yarn sequelize db:migrate" para criação das tabelas. <br />
:heavy_check_mark: Executar o comando "yarn sequelize db:seed:all" para criação de conteudos nas tabelas. <br />
:heavy_check_mark: Executar o comando "yarn queue" em um terminal iniciar a fila de execuções. <br />
:heavy_check_mark: Executar o comando "yarn dev" em outro terminal iniciar o backend. <br />
:heavy_exclamation_mark: Obs: Deve-se ter instalado as aplicações yarn e docker.
