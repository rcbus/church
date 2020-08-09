import React, { useState } from 'react'
import Router from 'next/router'
import LayoutHeaderEditable from '../../../components/layout-header-editable'
import { setCols,getSession,setSession } from '../../../libs/functions'
import Top from '../../../components/top-login-version-home-logout'
import Card from '../../../components/card'
import CardImage from '../../../components/card-image'
import Form from '../../../components/form'

export default function membro() {
  const [title,setTitle] = useState("Membro :: Cadastro :: " + process.env.appName)
  const [slide,setSlide] = useState(true)
  const [formMembro,setFormMembro] = useState([])

  return (
    <LayoutHeaderEditable protected={false} title={title} description={process.env.appName} appName={process.env.appName}>
      <Top className="layout-header-editable-item layout-header-editable-space-h form-row" />
      <div className="layout-header-editable-item layout-header-editable-space-m">
        {!slide ? (
          <>
            Membro
          </>
        ):(
          <>
            <Card title="Dados Principais">
              <div className="form-row">
                <div className={setCols(12,6,6,4,3)}>
                  <CardImage />
                </div>
                <div className={setCols(12,6,6,8,9)}>
                  <Form 
                    collection="cadastro_membro"
                    api="api/cadastro/membro"
                    data={formMembro}
                    callbackSetForm={setFormMembro}
                    content={[
                      {
                        name:'_id',
                        type:'_id',
                        cols:setCols(12,6,4,3,2)
                      }
                    ]}
                  />
                </div>
              </div>
            </Card>
          </>
        )}
      </div>
    </LayoutHeaderEditable>
  )
}