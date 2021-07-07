import React, { useState } from 'react';
import './menu.css';
import Logo from '../../assets/logopng.png';
import { FaAlignLeft } from 'react-icons/fa';
import { BsX } from 'react-icons/bs';
import { NavLink } from 'react-router-dom';
import { Drawer } from '@material-ui/core'

const Menu = () => {

  const [openMenu, setOpenMenu] = useState(false);
  const toggleMenu = () => {
    setOpenMenu(!openMenu)
  }

  return (
    <div className={'responsive sticky-top'}>
      <div className={'d-flex justify-content-between menu'}>
        <NavLink to={'/'}>
          <img alt={'logo'} className={'logo'} src={Logo} />
        </NavLink>
        <div className={'menu-right d-flex justify-content-center'}>
          <div className={'div-search d-flex justify-content-center'}>
            <p className={'welcome'}>
              Seja bem vindo!
              <span className={'date'}>hoje é { new Date().toLocaleString('pt', {day: 'numeric', month: 'long', year: 'numeric'}) }</span>
            </p>
            <p className={'date-responsive'}>{ new Date().toLocaleString('pt', {day: 'numeric', month: 'long', year: 'numeric'}) }</p>
            <FaAlignLeft onClick={() => toggleMenu()} className={'icon-menu'} />
          </div>
        </div>
      </div>
      <Drawer open={openMenu} onClose={toggleMenu}>
        <div className={'drawer-menu'}>
          <div className={'d-flex justify-content-between'}>
            <p className={'drawer-menu-title'}>Ola!</p>
            <BsX className={'icon-close'} onClick={() => toggleMenu()} />
          </div>
          <p className={'drawer-menu-subtitle'}>O que você deseja fazer?</p>
          <NavLink exact={true} to={'/'} onClick={() => toggleMenu()} activeClassName={'active'} className={'menu-item'}><p>home</p></NavLink>
          <NavLink to={'/contato'} onClick={() => toggleMenu()} activeClassName={'active'} className={'menu-item'}><p>contato</p></NavLink>
          <NavLink to={'/potfolio'} onClick={() => toggleMenu()} activeClassName={'active'} className={'menu-item'}><p>portfolio</p></NavLink>
          <NavLink to={'/sobre'} onClick={() => toggleMenu()} activeClassName={'active'} className={'menu-item'}><p>sobre</p></NavLink>
        </div>
      </Drawer>
    </div>
  );
}

export { Menu };