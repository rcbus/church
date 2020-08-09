import { apiReceiveUpload } from '../../libs/apiReceiveUpload'

export const config = {
    api:{
        bodyParser:false,
    }
}

export default async (req, res) => {
    await new Promise((resolve, reject) => {
        apiReceiveUpload(req,res,resolve,reject)
    })
}