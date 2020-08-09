import { sel } from '../../libs/mongo'
import { security } from '../../libs/api'

export default async (req, res) => {
    return new Promise(resolve => {
        const securityResult = security(req);
        if(securityResult.res=='error'){
            res.statusCode = 200
            res.json(securityResult)
            resolve()
        }else if(securityResult.res=='success'){
            var data = securityResult.data
            
            sel('file',data,{},(result) => {
                if(result.error){
                    res.statusCode = 200
                    res.json({res:'error',error:result.error})
                    resolve()
                }else{
                    res.statusCode = 200
                    res.json({ res: 'success',data: result.data })
                    resolve()
                }
            },{date:1})
        }else{
            res.statusCode = 200
            res.json({ res: 'error',error: 'undefined' })
            resolve()
        }    
    })
}