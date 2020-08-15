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

                data.detail = strupper(data.detail)

                var fullDetail = true

                var detailArray = data.detail.split(' ')
                if(count(detailArray)<=1){
                    fullDetail = false    
                }else{
                    var subDetailCount = 0
                    detailArray.map(detail => {
                        if(strlen(detail)>0){
                            subDetailCount++
                        }
                    })
                    if(subDetailCount<=1){
                        fullDetail = false
                    }
                }

                if(strlen(data.eventDate)==0){
                    result(200,{res:'error',error:'Informe a data do acontecimento!'},res,resolve)
                }else if(strlen(data.event)==0){
                    result(200,{res:'error',error:'Selecione um acontecimento!'},res,resolve)
                }else if(strlen(data.detail)<=5 || fullDetail===false){
                    result(200,{res:'error',error:'Detalhe melhor esse acontecimento!<br><br>Ex.: BATISMO NA IGREJA ASSEMBLÉIA DE DEUS MADUREIRA DE LIMEIRA/SP, REALIZADO PELO PASTOR ADOLFO RODRIGUES.'},res,resolve)
                }else{
                    error = false
                }
            }
            
            if(error===false){
                data.eventDate_timestamp = formatTimestamp(data.eventDate)
                
                crudab(req, res,resolve,reject,'cadastro_membro_historico',{},'',data,{eventDate:-1})
            }
        }
    })
}