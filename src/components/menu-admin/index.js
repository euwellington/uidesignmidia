import React from 'react';
import './menu-admin.css';
import { FaAlignJustify, FaComments, FaUserCog, FaRegCalendarAlt, FaPowerOff, FaRegImages } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { auth } from '../../database/config';

const MenuAdmin = () => {

    const loggout = async () => {
        await auth.signOut();
    }

    return(
        <div className={'menu-admin'}>
            <div className={'div-item'}><NavLink to={'/admin/home'} activeClassName={'active-admin'} className={'menu-admin-item'}><FaAlignJustify/></NavLink></div>
            <div className={'div-item'}><NavLink to={'/admin/calendario'} activeClassName={'active-admin'} className={'menu-admin-item'}><FaRegCalendarAlt/></NavLink></div>
            <div className={'div-item'}><NavLink to={'/admin/solicitacoes'} activeClassName={'active-admin'} className={'menu-admin-item'}><FaComments/></NavLink></div>
            <div className={'div-item'}><NavLink to={'/admin/galeria'} activeClassName={'active-admin'} className={'menu-admin-item'}><FaRegImages/></NavLink></div>
            <div className={'div-item'}><NavLink to={'/admin/configuracao'} activeClassName={'active-admin'} className={'menu-admin-item'}><FaUserCog/></NavLink></div>
            <div id={'logginOut'} onClick={() => loggout()} className={'div-item'}><p className={'menu-admin-item'}><FaPowerOff/></p></div>
        </div>
    )
}

export { MenuAdmin };