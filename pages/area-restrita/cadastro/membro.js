import React, { useState } from 'react'
import Router from 'next/router'
import LayoutHeaderEditable from '../../../components/layout-header-editable'
import { setCols,getSession,setSession,verifyVariable } from '../../../libs/functions'
import Top from '../../../components/top-login-version-home-logout'
import Card from '../../../components/card'
import CardImage from '../../../components/card-image'
import Form,{formUpdate,formModify,formRegister} from '../../../components/form'
import Dta from '../../../components/data-table-adapter'

export default function membro() {
    const [title,setTitle] = useState("Membro :: Cadastro :: " + process.env.appName)
    const [slide,setSlide] = useState(true)
    const [formMembro,setFormMembro] = useState({_id:''})
    const [listMembro,setListMembro] = useState([])
    const [nextMembro,setNextMembro] = useState(false)
    const [prevMembro,setPrevMembro] = useState(false)
    const [seeAllMembro,setSeeAllMembro] = useState(false)

    function modify(id,list){
        formModify(id,(list ? list : listMembro),setFormMembro,setListMembro,setNextMembro,setPrevMembro,true,setSlide,"Modificar :: Membro :: Cadastro :: " + process.env.appName,setTitle)
    }

    function register(){
        setNextMembro(false)
        setPrevMembro(false)
        formRegister(true,setSlide,{_id:''},setFormMembro,"Cadastrar :: Membro :: Cadastro :: " + process.env.appName,setTitle)
    }

    return (
        <LayoutHeaderEditable protected={false} title={title} description={process.env.appName} appName={process.env.appName}>
            <Top className="layout-header-editable-item layout-header-editable-space-h form-row" />
            <div className="layout-header-editable-item layout-header-editable-space-m">
                {!slide ? (
                    <>
                        <Dta 
                            margin='mt-3'
                            collection='cadastro_membro'
                            api='api/cadastro/membro'
                            search={true}
                            withoutTitle={true}
                            editable={getSession("userData").type=='admin' ? true : false}
                            seeAll={seeAllMembro}
                            callbackSeeAll={setSeeAllMembro}
                            callbackRegister={register}
                            callbackClickCell={modify}
                        />
                    </>
                ):(
                    <>
                        <Card title="Dados Principais" margin="mt-3">
                            <div className="form-row withoutMargin">
                                <div className={setCols(12,12,5,4,3) + ' mh-100 d-flex'}>
                                    <CardImage 
                                        name="personImage"
                                        pageName="cadastro_membro"
                                        api="api/upload"
                                        storage={process.env.storage}
                                        requireIdRefToEdit={true}
                                        idRef={formMembro._id}
                                        text={(<>Clique ou Arraste<br/>uma Foto Aqui</>)}
                                        mime_types={[ 'image/jpeg', 'image/png']}
                                        sizeLimit={1024*1024*5}
                                        backgroundColor='rgb(0,20,35)'
                                        limit={1}
                                    />
                                </div>
                                <div className={setCols(12,12,7,8,9)}>
                                    <Form 
                                        collection='cadastro_membro'
                                        api='api/cadastro/membro'
                                        data={formMembro}
                                        next={nextMembro}
                                        prev={prevMembro}
                                        withoutMargin={true}
                                        margin='mb-2'
                                        callbackUpdate={(form) => formUpdate(form,listMembro,setFormMembro,setListMembro)}
                                        callbackSetForm={setFormMembro}
                                        callbackReset={() => {setSlide(false),setTitle("Membro :: Cadastro :: " + process.env.appName)}}
                                        callbackNext={modify}
                                        callbackPrev={modify}
                                        msg={{
                                            c:{confirm:'',success:'Membro cadastrado com sucesso!'},
                                            u:{confirm:'',success:'Membro alterado com sucesso!'},
                                            d:{confirm:'Deseja desativar esse membro?',success:'Membro desativado com sucesso!'},
                                            a:{confirm:'Deseja ativar esse membro?',success:'Membro ativado com sucesso!'}
                                        }}
                                        content={[
                                            {
                                                cols:setCols(12,4,6,4,4),
                                                label:'ID',
                                                type:'_id',
                                                name:'_id'
                                            },
                                            {
                                                cols:setCols(12,4,6,4,4),
                                                label:'Status',
                                                type:'status',
                                                name:'status',
                                                mask:{'':'CADASTRO','1':'ATIVO','0':'DESATIVADO'},
                                                className:{'':'stdSilver','1':'stdGreen','0':'stdRed'}
                                            },
                                            {
                                                cols:setCols(12,4,12,4,4),
                                                label:'Data Nascimento',
                                                type:'date',
                                                name:'dateBirth',
                                                className:'text-center'
                                            },
                                            {
                                                cols:setCols(12,12,12,12,12),
                                                label:'Nome Completo',
                                                type:'text',
                                                name:'name'
                                            },
                                            {
                                                cols:setCols(12,6,6,6,5),
                                                label:'CPF',
                                                type:'text',
                                                name:'cpfCnpj',
                                                className:'text-center'
                                            },
                                            {
                                                cols:setCols(12,6,6,6,5),
                                                label:(<>RG <i>(opcional)</i></>),
                                                type:'text',
                                                name:'rgIe',
                                                className:'text-center'
                                            }
                                        ]}
                                        button={[
                                            {
                                                cols:setCols(12,(formMembro.status==null ? 12 : 6),(formMembro.status==null ? 12 : 6),3,2),
                                                type:'button',
                                                className:'btn-lg btn-success btn-block mt-2',
                                                name:'save',
                                                innerHTML:'Salvar'
                                            },
                                            {
                                                cols:setCols(12,6,6,3,2),
                                                type:'button',
                                                className:'btn-lg btn-warning btn-block mt-2',
                                                name:'cancel',
                                                innerHTML:'Cancelar'
                                            },
                                            {
                                                cols:setCols(12,6,6,3,3),
                                                type:'button',
                                                className:'btn-lg btn-danger btn-block mt-2',
                                                name:'desactive',
                                                innerHTML:'Desativar',
                                                where:[{'status':'1'}]
                                            },
                                            {
                                                cols:setCols(12,6,6,3,3),
                                                type:'button',
                                                className:'btn-lg btn-info btn-block mt-2',
                                                name:'active',
                                                innerHTML:'Ativar',
                                                where:[{'status':'0'}]
                                            },
                                            {
                                                cols:setCols(12,6,6,3,3),
                                                type:'button',
                                                className:'btn-lg btn-primary btn-block mt-2',
                                                name:'register',
                                                innerHTML:'+ Cadastrar',
                                                callback:register
                                            }
                                        ]}
                                    />
                                </div>
                            </div>
                        </Card>
                        {verifyVariable(formMembro.status) ? (
                            <>
                                <Card title="Observação" margin="mt-4">
                                    <Form 
                                        collection='cadastro_membro'
                                        api='api/cadastro/membro'
                                        data={formMembro}
                                        callbackUpdate={(form) => formUpdate(form,listMembro,setFormMembro,setListMembro)}
                                        callbackSetForm={setFormMembro}
                                        withoutMargin={true}
                                        msg={{u:{confirm:'',success:'Observação salva com sucesso!'}}}
                                        content={[
                                            {
                                                cols:setCols(12,12,12,12,12),
                                                name:'observation',
                                                type:'textarea'
                                            }
                                        ]}
                                        button={[
                                            {
                                                cols:setCols(12,6,5,4,3),
                                                type:'button',
                                                className:'btn-lg btn-success btn-block mt-3',
                                                name:'save',
                                                innerHTML:'Salvar Observação'
                                            }
                                        ]}
                                    />
                                </Card>
                                <Card title="Contato" margin="mt-4">
                                    <Form 
                                        collection='cadastro_membro'
                                        api='api/cadastro/membro'
                                        data={formMembro}
                                        callbackUpdate={(form) => formUpdate(form,listMembro,setFormMembro,setListMembro)}
                                        callbackSetForm={setFormMembro}
                                        withoutMargin={true}
                                        msg={{u:{confirm:'',success:'Contato salvo com sucesso!'}}}
                                        content={[
                                            {
                                                label:(<>E-mail <i>(pode inserir vários separando por vírgula)</i></>),
                                                cols:setCols(12,12,12,12,12),
                                                name:'email',
                                                type:'text'
                                            },
                                            {
                                                label:(<>Celular <i>(xx) xxxxx-xxxx</i></>),
                                                cols:setCols(12,6,6,3,3),
                                                name:'cellphone',
                                                type:'text',
                                                className:'text-center'
                                            },
                                            {
                                                label:(<>Tel. Fixo <i>(xx) xxxxx-xxxx</i></>),
                                                cols:setCols(12,6,6,3,3),
                                                name:'phone1',
                                                type:'text',
                                                className:'text-center'
                                            },
                                            {
                                                label:(<>Facebook</>),
                                                cols:setCols(12,6,6,3,3),
                                                name:'facebook',
                                                type:'text'
                                            },
                                            {
                                                label:(<>Skype</>),
                                                cols:setCols(12,6,6,3,3),
                                                name:'skype',
                                                type:'text'
                                            }
                                        ]}
                                        button={[
                                            {
                                                cols:setCols(12,6,5,4,3),
                                                type:'button',
                                                className:'btn-lg btn-success btn-block mt-3',
                                                name:'save',
                                                innerHTML:'Salvar Contato'
                                            }
                                        ]}
                                    />
                                </Card>
                                {/*<Card title="Endereço Principal" margin="mt-4">
                                    <Form 
                                        collection='cadastro_membro'
                                        api='api/cadastro/membro'
                                        data={formMembro}
                                        callbackUpdate={(form) => formUpdate(form,listMembro,setFormMembro,setListMembro)}
                                        callbackSetForm={setFormMembro}
                                        withoutMargin={true}
                                        msg={{u:{confirm:'',success:'Endereço principal salvo com sucesso!'}}}
                                        content={[
                                            {
                                                label:(<>CEP</>),
                                                cols:setCols(12,6,4,3,2),
                                                name:'cep1',
                                                type:'text'
                                            },
                                            {
                                                label:(<>Endereço</>),
                                                cols:setCols(12,6,4,3,2),
                                                name:'address1',
                                                type:'text'
                                            },
                                            {
                                                label:(<>Nº <i>(opcional)</i></>),
                                                cols:setCols(12,6,4,3,2),
                                                name:'number1',
                                                type:'text',
                                                className:'text-center'
                                            },
                                            {
                                                label:(<>Complemento <i>(opcional)</i></>),
                                                cols:setCols(12,6,4,3,2),
                                                name:'complement1',
                                                type:'text',
                                                className:'text-center'
                                            },
                                            {
                                                label:(<>Bairro</>),
                                                cols:setCols(12,6,4,3,2),
                                                name:'neighborhood',
                                                type:'text'
                                            }
                                        ]}
                                        button={[
                                            {
                                                cols:setCols(12,6,5,4,3),
                                                type:'button',
                                                className:'btn-lg btn-success btn-block mt-3',
                                                name:'save',
                                                innerHTML:'Salvar Endereço Principal'
                                            }
                                        ]}
                                    />
                                </Card>*/}
                            </>
                        ):null}
                    </>
                )}
            </div>
        </LayoutHeaderEditable>
    )
}