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
            var error = false

            if(verifyCrudad(data)!='read'){
                error = true

                data.name = clearString(data.name)
                data.name = strupper(data.name)
                data.cpfCnpj = clearNumber(data.cpfCnpj)
                data.rgIe = clearNumber(data.rgIe)
                data.email = clearString(data.email,true,undefined,true,true)
                data.cellphone = clearNumber(data.cellphone)
                data.phone1 = clearNumber(data.phone1)  

                data.cep1 = clearNumber(data.cep1)
                data.address1 = clearString(data.address1)
                data.address1 = strupper(data.address1)
                data.number1 = clearString(data.number1)
                data.number1 = strupper(data.number1)
                data.complement1 = clearString(data.complement1)
                data.complement1 = strupper(data.complement1)
                data.neighborhood1 = clearString(data.neighborhood1)
                data.neighborhood1 = strupper(data.neighborhood1)
                

                var fullName = true

                var nameArray = data.name.split(' ')
                if(count(nameArray)<=1){
                    fullName = false    
                }else{
                    var subNameCount = 0
                    nameArray.map(name => {
                        if(strlen(name)>0){
                            subNameCount++
                        }
                    })
                    if(subNameCount<=1){
                        fullName = false
                    }
                }
            
                if(strlen(data.dateBirth)==0){
                    result(200,{res:'error',error:'Informe a data de nascimento do membro!'},res,resolve)
                }else if(strlen(data.name)==0 || fullName===false){
                    result(200,{res:'error',error:'Informe o nome completo do membro!'},res,resolve)
                }else if(strlen(data.cpfCnpj)==0){
                    result(200,{res:'error',error:'Informe o CPF do membro!'},res,resolve)
                }else if(verifyCpfCnpj(data.cpfCnpj)===false){
                    result(200,{res:'error',error:'O CPF informado é inválido!'},res,resolve)
                }else{
                    error = false
                }
            }
            
            if(error===false){
                data.dateBirth_timestamp = formatTimestamp(data.dateBirth)
                if(strlen(data._id)==0){
                    var verify = {$or:[{name:data.name},{cpfCnpj:data.cpfCnpj}]}
                }else{
                    var verify = {_id:{$ne:data._id},status:1,$or:[{name:data.name},{cpfCnpj:data.cpfCnpj}]}
                }

                var processing = [
                    {column:'cpfCnpj',callback:formatCpfCnpj},
                    {column:'rgIe',callback:formatRgIe},
                    {column:'cellphone',callback:formatPhone},
                    {column:'phone1',callback:formatPhone},
                    {column:'cep1',callback:formatCep},
                ]

                crudab(req, res,resolve,reject,'cadastro_membro',verify,'Já existe um membro com esses dados!',data,{name:1},undefined,processing)
            }
        }
    })
}