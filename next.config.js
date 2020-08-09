/*
Variáveis de Ambiente

Renomeie esse aquivo para next.config.js e mude as configurações abaixo 
conforme a sua infraestrutura está configurada. Reinicie o servidor.
*/

module.exports = {
    env:{
        appName:'Church',
        dirname:'/home/cleiton/Documentos/www/church/',
        protocol: 'http',
        host: '192.168.1.99',
        port: 3100,
        dbHost: 'localhost',
        dbPort: 27017,
        dbName: 'church-app',
        dbUser: 'cleiton',
        dbPass: 'ctc363320',
        protocolApi: 'http',
        hostApi: '192.168.1.99',
        portApi: 3100,
        tokenApi: 'church-api',
        storage: 'DB'
    }
}