import { result,security } from '../../../libs/api'
import { count,strlen,strupper,clearNumber,formatTimestamp,verifyCpfCnpj,clearString,formatCpfCnpj,formatRgIe,strlower,formatPhone,formatCep } from '../../../libs/functions'
import { crudab,verifyCrudad } from '../../../libs/mongo'

export default async (req, res) => {
    return new Promise((resolve, reject) => {
        const securityResult = security(req);
        if(securityResult.res=='error'){
            result(200,securityResult,res,resolve)
        }else if(securityResult.res=='success'){
            var data = securityResult.data
            
            crudab(req, res,resolve,reject,'cadastro_estado',{},'',data,{uf:1})
        }
    })
}