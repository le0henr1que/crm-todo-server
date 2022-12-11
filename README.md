![Símbolo-texto-horizontal(1)](https://user-images.githubusercontent.com/68018921/199128538-76654f75-afe5-4906-a9c4-f47a7fa48bd5.png)
# Verzel AutoPark 


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







