<p align="center">
  <a href="https://github.com/snowslaura/projeto18-valex">
    <img src="./readme.png" alt="readme-logo" width="80" height="80">
  </a>

  <h3 align="center">
    projeto18-valex
  </h3>
</p>

## Usage

```bash
$ git clone https://github.com/snowslaura/projeto18-valex

$ cd projeto18-valex

$ npm install

$ npm run dev
```

API:

```
- POST /card/create (autenticada)
    - Rota para cadastrar um novo cartão
    - headers: {"x-api-key":$"hashApiKey"}
    - body: {
        "id":$idColaborador,
        "type":"$tipoDeNegócio"
    }

- POST /card/activate
    - Rota para ativar um cartão    
    - body: {
        "number": $"NúmeroDoCartão",
        "cardholderName":$"NomeDoColaborador",
        "expirationDate":$"DataExpiração",
        "CVC":$"CódigoCVC",
        "password":$"senha"
    }
- GET /card/balance/:idCartão
    - Rota para listar todos movimentos do cartão
    
- POST /card/block/:idCartão
    - Rota para bloquear um cartão pelo id 
    - body: {
        "password":$"senhadoCartão"
    }

- PUT /card/unblock/9
    - Rota para desbloquear um cartão pelo id
    - body: {
        "password":$"senhadoCartão"
    }

- POST /card/recharge/:idCartão (autenticada)
    - Rota para a empresa recarregar o cartão um usuário pelo id do cartão
    - headers: {"x-api-key":$"hashApiKey"}
    - body: {
        "amount":$valorDeRecarga
    }

- POST /card/payment/:idCartão
    - Rota para registrar pagamentos pelo id do cartão    
    - body: {
        "amount":$valorDoPagamento,
        "businessId":$idDoNegócio,
        "password":$"senha"
    }       
```