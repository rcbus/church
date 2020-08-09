import { ins,upd,sel,insArray } from '../../../libs/mongo'
import { security,result } from '../../../libs/api'
import data from '../../../import/cadastro_estado.json'
import { fromTo } from '../../../libs/functions'

export default async (req, res) => {
    return new Promise(resolve => {
        const map = {
            idCadastroEstado:{type:'number',value:'_id'},
            statusCadastroEstado:{type:'number',value:'status'},
            
            regiao:{type:'text',value:'region'},
            codigoEstado:{type:'text',value:'code'},
            uf:{type:'text',value:'uf'},
            populacao:{type:'number',value:'population'},
            icms:{type:'number',value:'icms'},
            valorFrete:{type:'number',value:'freightValue'},
            cif:{type:'number',value:'cif'},
            
            dataCriacao:{type:'number',value:'date'},
            dataModificacao:{type:'number',value:'dateModification'},
            historico:{type:'text',value:'historic'},
            usuario:{type:'number',value:'user'},            
        }

        var passo = 2

        exeImport()

        function exeImport(){
            if(passo==3){
                insArray('cadastro_estado',fromTo(map,data),(result) => {
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