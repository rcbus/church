import React, { useState,useEffect } from 'react'
import Router from 'next/router'
import LayoutHeaderEditable from '../../../components/layout-header-editable'
import { setCols,getSession,setSession,verifyVariable,strlen } from '../../../libs/functions'
import Top from '../../../components/top-login-version-home-logout'
import Card from '../../../components/card'
import CardImage from '../../../components/card-image'
import Form,{formUpdate,formModify,formRegister} from '../../../components/form'
import Dta from '../../../components/data-table-adapter'
import { getListSelect,getListData } from '../../../libs/api'
import Address from '../../../components/address'

export default function membro() {
    const [title,setTitle] = useState("Membro :: Cadastro :: " + process.env.appName)
    const [slide,setSlide] = useState(false)
    const [formMembro,setFormMembro] = useState({_id:'',status:''})
    const [listMembro,setListMembro] = useState([])
    const [nextMembro,setNextMembro] = useState(false)
    const [prevMembro,setPrevMembro] = useState(false)
    const [seeAllMembro,setSeeAllMembro] = useState(false)
    const [listEstado,setListEstado] = useState([])
    const [listCidade,setListCidade] = useState([])
    const [ufAnterior,setUfAnterior] = useState(false)

    const [slideMembroHistorico,setSlideMembroHistorico] = useState(false)
    const [formMembroHistorico,setFormMembroHistorico] = useState({_id:'',status:''})
    const [listMembroHistorico,setListMembroHistorico] = useState([])
    const [configMembroHistorico,setConfigMembroHistorico] = useState([])
    const [nextMembroHistorico,setNextMembroHistorico] = useState(false)
    const [prevMembroHistorico,setPrevMembroHistorico] = useState(false)

    useEffect(() => {
        if(getSession("userData")!==false){
            getListSelect('api/cadastro/estado',{value:'uf',text:'uf'},setListEstado)
        }
    },[])

    useEffect(() => {
        if(strlen(formMembro.uf1)>0){
            if(formMembro.uf1!=ufAnterior){
                setUfAnterior(formMembro.uf1)
                if(getSession("userData")!==false){
                    getListSelect('api/cadastro/cidade',{value:'_id',text:'name'},setListCidade,{status:1,uf:formMembro.uf1})
                }
            }
        }else{
            setListCidade([])
            setUfAnterior(false)
        }
    },[formMembro])

    useEffect(() => {
        if(getSession("userData")!==false){
            getListData('api/cadastro/membro_historico','cadastro_membro_historico',configMembroHistorico,setListMembroHistorico,setConfigMembroHistorico,formMembro._id)
        }
    },[formMembro,formMembroHistorico])

    function modify(id,list){
        formModify(id,(list ? list : listMembro),setFormMembro,setListMembro,setNextMembro,setPrevMembro,true,setSlide,"Modificar :: Membro :: Cadastro :: " + process.env.appName,setTitle)
    }

    function modifyMembroHistorico(id,list){
        setSlideMembroHistorico(true)
        formModify(id,(list ? list : listMembroHistorico),setFormMembroHistorico,setListMembroHistorico,setNextMembroHistorico,setPrevMembroHistorico)
    }

    function register(){
        setNextMembro(false)
        setPrevMembro(false)
        formRegister(true,setSlide,{_id:'',status:''},setFormMembro,"Cadastrar :: Membro :: Cadastro :: " + process.env.appName,setTitle)
    }

    function registerMembroHistorico(){
        setNextMembroHistorico(false)
        setPrevMembroHistorico(false)
        formRegister(true,setSlide,{_id:'',status:''},setFormMembroHistorico)
        setSlideMembroHistorico(true)
    }

    function updateMembroHistorico(form){
        formUpdate(form,listMembroHistorico,setFormMembroHistorico,setListMembroHistorico)
        registerMembroHistorico()
        setSlideMembroHistorico(false)
    }

    function cancelMembroHistorico(){
        formRegister(true,setSlide,{_id:'',status:''},setFormMembroHistorico)
        setSlideMembroHistorico(false)
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
                                                cols:setCols(12,4,6,4,4),
                                                label:'CPF',
                                                type:'text',
                                                name:'cpfCnpj',
                                                className:'text-center'
                                            },
                                            {
                                                cols:setCols(12,4,6,4,4),
                                                label:(<>RG <i>(opcional)</i></>),
                                                type:'text',
                                                name:'rgIe',
                                                className:'text-center'
                                            },
                                            {
                                                cols:setCols(12,4,12,4,4),
                                                label:(<>Sexo</>),
                                                type:'select',
                                                name:'gender',
                                                optionNull:true,
                                                data:[
                                                    {value:'0',text:'FEMININO'},
                                                    {value:'1',text:'MASCULINO'},
                                                ]
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
                                <Card title="Observação" margin="mt-4" show={false}>
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
                                <Card title="Contato" margin="mt-4" show={false}>
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
                                <Card title="Endereço" margin="mt-4" show={false}>
                                    <Address 
                                        type={1}
                                        collection='cadastro_membro'
                                        api='api/cadastro/membro'
                                        data={formMembro}
                                        list={listMembro}
                                        callbackSetList={setListMembro}
                                        callbackUpdate={(form) => formUpdate(form,listMembro,setFormMembro,setListMembro)}
                                        callbackSetForm={setFormMembro}
                                        withoutMargin={true}
                                        msg={{u:{confirm:'',success:'Endereço salvo com sucesso!'}}}
                                    />
                                </Card>   
                                <Card title="Histórico Eclesiástico" margin="mt-4">
                                    <Form 
                                        slide={slideMembroHistorico}
                                        api='api/cadastro/membro_historico'
                                        data={formMembroHistorico}
                                        withoutMargin={true}
                                        idRef={formMembro._id}
                                        msg={{
                                            c:{confirm:'',success:'Acontecimento salvo com sucesso!'},
                                            u:{confirm:'',success:'Acontecimento alterado com sucesso!'},
                                            d:{confirm:'Deseja excluir esse acontecimento?',success:'Acontecimento excluído com sucesso!'}
                                        }}
                                        next={nextMembroHistorico}
                                        prev={prevMembroHistorico}
                                        callbackSetForm={setFormMembroHistorico}
                                        callbackUpdate={(form) => updateMembroHistorico(form)}
                                        callbackNext={modifyMembroHistorico}
                                        callbackPrev={modifyMembroHistorico}
                                        content={[
                                            {
                                                cols:setCols(12,6,4,3,2),
                                                label:'ID',
                                                type:'_id',
                                                name:'_id'
                                            },
                                            {
                                                cols:setCols(12,6,4,3,2),
                                                label:'Status',
                                                type:'status',
                                                name:'status',
                                                mask:{'':'CADASTRO','1':'ATIVO','0':'DESATIVADO'},
                                                className:{'':'stdSilver','1':'stdGreen','0':'stdRed'}
                                            },
                                            {
                                                cols:setCols(12,6,4,3,2),
                                                label:'Data Acontecimento',
                                                type:'date',
                                                name:'eventDate',
                                                className:'text-center'
                                            },
                                            {
                                                cols:setCols(12,6,6,6,6),
                                                label:(<>Acontecimento</>),
                                                type:'select',
                                                name:'event',
                                                optionNull:true,
                                                data:[
                                                    {value:'0',text:'BASTIMO'},
                                                    {value:'1',text:'CASAMENTO'},
                                                    {value:'2',text:'RECEBIMENTO COMO MEMBRO'},
                                                    {value:'3',text:'ASSUMIU O CARGO'},
                                                    {value:'4',text:'ENTREGOU O CARGO'},
                                                    {value:'5',text:'PARTICIPOU DE PALESTRA, WORKSHOP OU EVENTO'},
                                                    {value:'6',text:'SAIU DA IGREJA'}
                                                ]
                                            },
                                            {
                                                cols:setCols(12,12,6,6,12),
                                                label:'Detalhe',
                                                type:'text',
                                                name:'detail' 
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
                                                innerHTML:'Cancelar',
                                                callback:cancelMembroHistorico
                                            },
                                            {
                                                cols:setCols(12,6,6,3,3),
                                                type:'button',
                                                className:'btn-lg btn-danger btn-block mt-2',
                                                name:'desactive',
                                                innerHTML:'Excluir',
                                                where:[{'status':'1'}]
                                            },
                                            {
                                                cols:setCols(12,6,6,3,3),
                                                type:'button',
                                                className:'btn-lg btn-primary btn-block mt-2',
                                                name:'register',
                                                innerHTML:'+ Cadastrar',
                                                callback:registerMembroHistorico
                                            }
                                        ]}
                                    />

                                    <Dta
                                        idRef={formMembro._id}
                                        title="Lista de Acontecimentos"
                                        margin='mt-3' 
                                        data={listMembroHistorico}
                                        config={configMembroHistorico}
                                        collection='cadastro_membro_historico'
                                        editable={getSession("userData").type=='admin' ? true : false}
                                        callbackClickCell={modifyMembroHistorico}
                                    />
                                </Card>                             
                            </>
                        ):null}
                    </>
                )}
            </div>
        </LayoutHeaderEditable>
    )
}