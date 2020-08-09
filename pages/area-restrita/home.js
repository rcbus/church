import React, { useState } from 'react'
import Router from 'next/router'
import LayoutHeaderEditable from '../../components/layout-header-editable'
import { setCols,getSession,setSession } from '../../libs/functions'
import Top from '../../components/top-login-version-home-logout'
import Card from '../../components/card'

export default function home() {
  const [title,setTitle] = useState("Home :: " + process.env.appName)

  return (
    <LayoutHeaderEditable protected={false} title={title} description={process.env.appName} appName={process.env.appName}>
      <Top className="layout-header-editable-item layout-header-editable-space-h form-row" />
      <div className="layout-header-editable-item layout-header-editable-space-m">
        <Card title="Cadastro">
          <div className={setCols(12,6,4,3,2)}>
            <button type="button" className="btn btn-lg btn-info btn-block" onClick={() => Router.push('/area-restrita/cadastro/membro')}>Membro</button>
          </div>
        </Card>
      </div>
    </LayoutHeaderEditable>
  )
}