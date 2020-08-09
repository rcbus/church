import React, { useState } from 'react'
import Router from 'next/router'
import LayoutHeaderEditable from '../components/layout-header-editable'
import { setCols,getSession,setSession } from '../libs/functions'
import Top from '../components/top-login-version-home-logout'

export default function home() {
  const [title,setTitle] = useState("Home :: " + process.env.appName)

  if(!getSession("userData")){
    const user = {
      token:'token123',
      branch:1,
      branchName:'Church',
      login:'cleiton',
      user:1,
      userName:'Cleiton',
      type:'admin'
    }
    if(setSession("userData",user)){
      Router.push('/')
    }
  }

  return (
    <LayoutHeaderEditable protected={false} title={title} description={process.env.appName} appName={process.env.appName}>
      <Top className="layout-header-editable-item layout-header-editable-space-h form-row" />
      <div className="layout-header-editable-item layout-header-editable-space-m">
        Bem Vindo<br/><br/>
        <a href="area-restrita/home">Área Restrita</a>
      </div>
    </LayoutHeaderEditable>
  )
}