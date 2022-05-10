
# Habilidades

Neste projeto, fui capaz de:

- Exercitar o conhecimento dos pilares da `Programação Orientada a Objetos`: `Herança`, `Abstração`, `Encapsulamento` e `Polimorfismo`;
- Exercitar a utilização de `Composição`;
- Exercitar a criação e utilização de `Interfaces`;
- Implementar, em `TypeScript`: `Classes`, `Instâncias`, `Atributos`, `Métodos` e `Objetos`;
- Aplicar os conhecimentos de `MongoDB`, `Typescript` e `POO` para criar uma API com `CRUD`.

---

## Desenvolvido

Neste projeto apliquei os princípios de `POO` para a contrução de uma API com `CRUD` para gerenciar uma concessionária de veículos utilizando o banco de dados `MongoDB`.

---
### Como instalar e configurar:
1.Clone o repositório 
  - git clone git@github.com:Ingrid-Paulino/project-car-shop.git

2. Entre na pasta do repositório que você acabou de clonar: 
 - cd project-car-shop

3. Instale as dependências
- npm install

4. Para rodar o projeto
 - npm run dev

---
## Testes

Para executar os testes localmente, digite no terminal o comando `npm test:dev` e `npm run test-coverage`.


---
### Tecnologias e ferramentas:
 - express
 - mongoose
 - zod
 - nyc
 - typescript
 - sinon
 - mocha
 - chai
 - eslint
 - nodejs

---

## Subir o banco do MongoDB usando Docker

Caso não tenha o MongoDB instalado em sua máquina e deseje usar o Docker, é só seguir os passos a seguir:

 - Baixe a imagem do MongoDB:

```sh
docker pull mongo
```

 - Crie o contêiner do MongoDB:

```sh
docker run --name <nome-do-conteiner> -p 27017:27017 -d mongo
```

 - Confira se o contêiner está rodando:

```sh
docker ps
```
___

## Linter

Para garantir a qualidade do código, utilizei neste projeto o ESLint. Assim o código estará alinhado com as boas práticas de desenvolvimento, sendo mais legível e de fácil manutenção! Para rodá-los localmente no projeto, execute os comandos abaixo:
  ``` 
   npm run lint
  ```

