import React, { useState, useEffect } from 'react';
import './login.css';
import logo from '../../assets/logopng.png';
import { FaArrowRight, FaTelegram } from 'react-icons/fa';
import { BsX } from 'react-icons/bs';
import { Link, Redirect } from 'react-router-dom';
import { Snackbar } from '@material-ui/core';
import ControllerDb from '../../database/controller';

const Login = () => { 

    const [open, setOpen] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const [redirectHome, setRedirectHome] = useState(false);
    const [loading, setLoading] = useState(false);
    
    const [change, setChange] = useState({
        user: '',
        password: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setChange(prevState => ({
            ...prevState,
            [name]:value
        }))
    }

    const toggleOpen = () => {
        setOpen(!open);
    }

    const authentication = async (e) => {
        setLoading(true);
        e.preventDefault();
        try {
            await ControllerDb.login(change.user, change.password);
            setLoading(false);
            setRedirect(true);
        } catch {
            setLoading(false);
            setOpen(true);
        }


    }
     useEffect(() => {
        document.title = 'login - admin';
        let x = window.matchMedia("(max-width: 400px)");
        if(x.matches) {
            setRedirectHome(true);
        }

     }, []);

    if(redirect) {
        return <Redirect to={'/admin/home'} />
    }
    if(redirectHome) {
        return <Redirect to={'/'} />
    }

    return(
        <div className={'login'}>
            <div className={'container d-flex justify-content-center'}>
               <div className={'login-left'}>
                   <img alt={'logo-login'} src={logo} className={'logo-login'} />
                   <p className={'login-title'}>OLÁ! SEJA BEM VINDO A TELA DE LOGIN DA UIDESIGNMIDIA</p>
                   <p className={'login-subtitle'}>
                       Faça seu login para acessar o painel principal para acomapanha os pedidos dos nosso clientes
                       que é feito através do formulário! 
                   </p>
                   <p id={'bar-bottom'}/>
                   <p className={'help-title'}>Aconteceu alguma coisa de errado?</p>
                   <Link to={'/contato'} className={'help-subtitle'}> <FaArrowRight style={{marginRight: 5}} /> Entre em contato com a gente</Link>
               </div>
               <div className={'login-right'}>
                <form onSubmit={ e => authentication(e) } className={'login-box'}>
                    <p className={'login-box-title'}>LOGIN</p>
                    <div className={'box-form'}>
                        <p className={'box-form-title'}>Usuário</p>
                        <input type={'email'} name={'user'} required onChange={handleChange} className={'form-control shadow-none'} placeholder={'usuário...'} id={'user'} />
                    </div>
                    <div className={'box-form'}>
                        <p className={'box-form-title'}>Senha</p>
                        <input name={'password'} required onChange={handleChange} type={'password'} className={'form-control shadow-none'} placeholder={'********'} maxLength={6} id={'password'} />
                    </div>
                    <div className={'d-flex justify-content-center'}>
                        <button disabled={change.password.length <= 5} className={'btn shadow-none'} id={'login'}>
                            {
                                loading ? <img alt={'load'} style={{height: 20}} src={'https://www.turismoitaipu.com.br/sites/all/modules/custom/itaipu/itaipu_tickets_shop/img/loading.gif'} /> : <div>acessar <FaTelegram/></div>
                            }
                        </button>
                    </div>
                </form>
               </div>
            </div>  
{/* SNACKBAR ******************************************************************************************************************************************************************** */}
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={open}
                autoHideDuration={2000}
                onClose={toggleOpen}
                message="Usuário ou senha incorreto"
                action={
                    <button className={'btn shadow-none text-light'} onClick={() => toggleOpen()}><BsX/></button>
                }
            />
        </div>
    )
}

export { Login };