# API deployed on DigitalOcean

## 1° step:

[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=API%20Vendas&uri=https%3A%2F%2Fraw.githubusercontent.com%2FUHZero%2Fapi-vendas-deploy%2Fmain%2FInsomnia.json)

### Trouble importing? I would suggest you try:

["Import suceeded" but nothing changes](https://github.com/Kong/insomnia/issues/4274)

## 2° step:

-- Please verify if base_url at insominia enviorment is <https://apivendas.uhzero.com.br>

-- Now create an user and create session to receive JWT.

-- Copy the received JWT to token property at insomnia enviorment.

## 3° step:

-- Let's use the available services pre-configured at insominia routes.

-- Services available on this API: Products | Customers | Orders | Profile

### This API work's with:

> TS | Node | TypeORM | Redis | Postgres |
> Express | AWS - SES - S3 | JWT | Docker |
