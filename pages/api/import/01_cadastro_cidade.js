import { ins,upd,sel,insArray } from '../../../libs/mongo'
import { security,result } from '../../../libs/api'
import data from '../../../import/cadastro_cidade.json'
import { fromTo } from '../../../libs/functions'

export default async (req, res) => {
    return new Promise(resolve => {
        const map = {
            idCadastroCidade:{type:'number',value:'_id'},
            
            codigoMunicipio:{type:'text',value:'code'},
            nome:{type:'text',value:'name'},
            uf:{type:'text',value:'uf'},

            dataCriacao:{type:'number',value:'date'},
            dataModificacao:{type:'number',value:'dateModification'},
            historico:{type:'text',value:'historic'},
            usuario:{type:'number',value:'user'},            
        }

        var passo = 2

        exeImport()

        function exeImport(){
            if(passo==3){
                insArray('cadastro_cidade',fromTo(map,data),(result) => {
                    if(result.error){
                        res.statusCode = 200
                        res.json({res:'error',error:result.error})
                        resolve()
                    }else{
                        res.statusCode = 200
                        res.json({ res: 'success',data: 'imported' })
                        resolve()
                    }
                })
            }else{
                res.statusCode = 200
                if(passo==1){
                    res.json({ res: 'verify',data: data.slice(0,10) })
                }else{
                    res.json({ res: 'verify',data: fromTo(map,data) })
                }
                resolve()
            }
        }
    })    
}