![logo](https://user-images.githubusercontent.com/68018921/206906930-86671085-d152-4fdd-a2f7-9780e6ef6050.png)
# CRM LISTEN



Sistema backend de responsavel pela listagem de solicitações utilizando o protocolo websocket.

## 🚀 Começando

Para obter uma copia do projeto para execução basta seguir as etapas:

Clonar repositorio:

```
git clone https://github.com/le0henr1que/desafio-verzel-Back-end.git
```

### 📋 Pré-requisitos

Para execução do projeto é preciso:

* Gerenciador de pacotes;
* Node JS
* MongoDB - ORM mongoose

### 🔧 Execução

Para executar o projeto basta seguir as etapas:


Projeto por padrão rodando na porta:

`3000`

### Instalação das Dependências run:
```
yarn 
```

```
npm i
```
### Executar o projeto:

```
yarn dev:server
```

```
npm run dev:server
```

## 🏁 Rotas
### Privada:

`SOCKET`
```
create
```

```
List
```

```
handleFilter
```

```
solicitationId
```

```
update
```

```
listNextPagination
```
### Publicas 
`POST`
```
/login
```

```json
{
    "name": "Administrador",
    "email": "admin@admin.com",
    "password": "admin123"
}
```

`POST`
```
/login
```
```json
{
    "email": "admin@admin.com",
    "password": "admin123"
}
```


## 📄 Notas

 * Por conta de performance, o projeto executa com melhor estabilidade no google chrome;


## 🎁 Feature

* Criar validação acertiva de dados 📢;
* Testes Unitários 📢;
* Melhorar performace de comunicação entre os websockets 📢;







