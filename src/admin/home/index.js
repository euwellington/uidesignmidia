import React, { useState, useEffect } from 'react';
import './home-admin.css';
import { MenuAdmin } from '../../components/menu-admin';
import {  FaComments, FaUserCog, FaRegCalendarAlt, FaPowerOff } from 'react-icons/fa';
import { NavLink, Redirect } from 'react-router-dom';
import Skeleton from '@material-ui/lab/Skeleton';
import { DetalInfo } from "../../database/auth/auth.js";
import ControllerDb from '../../database/controller';

const HomeAdmin = () => {

    const { info, loading } = DetalInfo();

    const [redirect, setRedirect] = useState(false);
    const loggout = async () => {
        await ControllerDb.logout();
        setRedirect(true);
    }

    useEffect(() => {
        document.title = 'portal - uidesignmidia';
    }, []);

    if(redirect) {
        return <Redirect to={'/acess-login-admin'} />
    }


    return(
<div className={'d-flex justify-content-between'}>
{/* MENUADMIN **************************************************************************************************************************************** */}
            <MenuAdmin/>
{/* ...REST  **************************************************************************************************************************************** */}
            <div className={'home-admin'}>
                <div className={'d-flex justify-content-center'}>
                    <p className={'home-admin-title'}>Olá seja bem vindo,</p>
                    <span className={'user'}>{loading?(<Skeleton  id={'skeleton-name'} />): info.nome }</span>
                </div>
                <div className={'d-flex justify-content-center'}>
                    {
                        loading
                        ?
                        <Skeleton variant="circle" id={'skeleton-img'} />
                        :
                        <img alt={'_'} className={'img-user-perfil'} src={info.perfil}/>
                    }
                </div>
                <p className={'home-admin-subtitle'}>O que você deseja fazer?</p>
                <div className={'d-flex justify-content-center'}>
                    <NavLink to={'/admin/calendario'} className={'link'}> 
                        <div className={'box-options-admin d-flex justify-content-center'}>
                            <FaRegCalendarAlt className={'icon-admin'} />
                            <div>
                                <p className={'admin-option-title'}>Visualizar</p>
                                <p className={'admin-option-subtitle'}>o calendario</p>
                            </div>
                        </div>
                        <p className={'bar-bottom-yellow'} />
                    </NavLink>
                    <NavLink to={'/admin/solicitacoes'} className={'link'}>
                        <div className={'box-options-admin d-flex justify-content-center'}>
                            <FaComments className={'icon-admin'} />
                            <div>
                                <p className={'admin-option-title'}>Visualizar</p>
                                <p className={'admin-option-subtitle'}>se a solicitação de artes</p>
                            </div>
                        </div>
                        <p className={'bar-bottom-blue'} />
                    </NavLink>
                    <NavLink to={'/admin/configuracao'}nk className={'link'}>
                        <div className={'box-options-admin d-flex justify-content-center'}>
                            <FaUserCog className={'icon-admin'} />
                            <div>
                                <p className={'admin-option-title'}>Configurar</p>
                                <p className={'admin-option-subtitle'}>o acesso de usuários</p>
                            </div>
                        </div>
                        <p className={'bar-bottom-green'} />
                    </NavLink>
                    <div className={'link'} onClick={() => loggout()}>
                        <div className={'box-options-admin d-flex justify-content-center'}>
                            <FaPowerOff className={'icon-admin'} />
                            <div>
                                <p className={'admin-option-title'}>Sair</p>
                                <p className={'admin-option-subtitle'}>do sistema</p>
                            </div>
                        </div>
                        <p className={'bar-bottom-red'} />
                    </div>
                </div>
                <p className={'date-admin'}>{ new Date().toLocaleString('pt', {day: 'numeric', month: 'long', year: 'numeric'}) }</p>
            </div>
</div>
    )
}

export { HomeAdmin };