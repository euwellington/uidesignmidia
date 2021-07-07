import React, { useState, useRef } from 'react';
import './config-user.css';
import { MenuAdmin } from '../../components/menu-admin';
import { FaTelegram } from 'react-icons/fa';
import { Snackbar } from '@material-ui/core';
import { BsX } from 'react-icons/bs';
import ControllerDb from '../../database/controller';

const ADMIN_USER = 'systemconfig';
const ADMIN_PSW = 'adminsys';

const ConfigUser = () => {
    const userPerfil = useRef();
    const [authUser, setAuthUser] = useState(false);
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);
    // const [fileName, setFileName] = useState('');
    const [showImg, setShowImg] = useState(null);
    const [saved, setSaved] = useState(false);
    const [open, setOpen] = useState(false);

    const initialState = { 
        emailcad: "",
        senhacad: "",
        nomecad: "",
        nomecompletocad: "",
        perfil: ''
      };
    const [changeRegister, setChangeRegister] = useState(initialState);
    const handleChangeCad = e => {
        const { name, value } = e.target;
        setChangeRegister(prevState => ({
            ...prevState,
            [name] : value
        }));
    }

    const auth = async (e) => {
        e.preventDefault();
        // setLoading(true);
        if(change.email === ADMIN_USER && change.senha === ADMIN_PSW) {
            setAuthUser(true);
            setLoading(false);
        } else {
            setLoading(false);
            setAuthUser(false);
            toggleOpen();
        }
    }

    const saveAgain = () => {
        setSaved(false);
        setChangeRegister(initialState);
        setFile(null);
        setShowImg(null);
    }

    const toggleOpen = () => {
        setOpen(!open);
    }

    const [change, setChange] = useState({
        email: '',
        senha: ''
    });

    const handleChange = e => {
        const { name, value } = e.target;
        setChange(prevState => ({
            ...prevState,
            [name] : value
        }));
    }

    const handleImage = e => {
        setFile(e.target.files[0]);
        // setFileName(e.target.files[0].name);
        setShowImg(URL.createObjectURL(e.target.files[0]))
    }

    const registerUser = async e => {
        e.preventDefault();
        setLoading(true);
        try {
            await ControllerDb.cretaeUser(file, changeRegister);
            setLoading(false);
            setSaved(true);
        } catch {
            
        }
    }

    const logout = () => {
        setAuthUser(false);
    }

    return(
<div className={'d-flex justify-content-start'}>
{/* MENUADMIN **************************************************************************************************************************************** */}
    <MenuAdmin/>
            <div className={'config-user d-flesx justsify-container-center'}>
                {
                    authUser
                    ?
                        <div className={'d-flex justify-container-center'}>
                            <div className={'form-register'}>
                                <div className={'div-form-register'}>
                                    <p className={'title-form-register'}>Cadastre novos usuários para ter acesso ao sistema</p>
                                    <p className={'subtitle-form-register'}>
                                        Preencha todos os campos para que o cadastro seja feito sem nenhum erro
                                    </p>
                                </div>
                            </div>
                            <form onSubmit={ e => registerUser(e)} className={'config-user-login'}>
                                <div>
                                <p className={'config-form-title'}>*Email</p>
                                    <input required onChange={handleChangeCad} value={changeRegister.emailcad} name={'emailcad'} type={'email'} className={'form-control shadow-none'} placeholder={'usuário'}  id={'config-input1'} />
                                </div>
                                <div>
                                    <p className={'config-form-title'}>*Senha</p>
                                    <input required onChange={handleChangeCad} value={changeRegister.senhacad} type={'password'} name={'senhacad'} maxLength={6} className={'form-control shadow-none'} placeholder={'********'} id={'config-input2'} />
                                </div>
                                <div>
                                    <p className={'config-form-title'}>*Nome social</p>
                                    <input required onChange={handleChangeCad} value={changeRegister.nomecad} name={'nomecad'} className={'form-control shadow-none'} placeholder={'Ex: Marcos'} id={'config-input3'} />
                                </div>
                                <div>
                                    <p className={'config-form-title'}>*Nome completo</p>
                                    <input required onChange={handleChangeCad} value={changeRegister.nomecompletocad} name={'nomecompletocad'} className={'form-control shadow-none'} placeholder={'Seu nome completo'} id={'config-input4'} />
                                </div>
                                <div className={'d-flex justify-content-center'}>
                                    <input ref={userPerfil} onChange={e => handleImage(e)} alt={'perfil'} type={'file'} style={{display: 'none'}} />
                                    <button type={'button'} onClick={() => userPerfil.current.click()} id={'button-perfil-user'} className={'d-flex justify-content-center'}>
                                        <img alt={'ex'} src={file ? showImg : 'https://killbill.io/wp-content/uploads/2020/02/Upload-Cloud-Gray-128.png'} className={'img-perfil-user'} />
                                    </button>
                                </div>
                                <div>
                                    {
                                        saved
                                        ?
                                        <>
                                        <div className={'d-flex justify-content-center'}>
                                            <img alt={'send'} className={'img-saved'} src={'https://d136c6g36wumfk.cloudfront.net/p/15584/indicator_check.gif'} />
                                        </div>
                                        <div className={'d-flex justify-container-center'}>
                                            <button type={'button'} onClick={() => saveAgain()} className={'btn shadow-none'} id={'btn-enviar'}>
                                                { loading ? "CARREGANDO" : <div>Salvar outro usuário</div> }
                                            </button>
                                        </div>
                                        </>
                                        :
                                        <>
                                        <div className={'d-flex justify-container-center'}>
                                        <button type={'submit'} className={'btn shadow-none'} id={'btn-enviar'}>
                                            { loading ? "CARREGANDO" : <div>Salvar <FaTelegram/></div> }
                                        </button>
                                        </div>
                                        <div className={'d-flex justify-container-center mt-3'}>
                                            <button type={'button'} onClick={() => logout()} className={'btn shadow-none'} id={'btn-enviar2'}>
                                                Sair
                                            </button>
                                        </div>
                                        </>
                                    }
                                </div>
                            </form> 
                        </div>
                    :
                    <form onSubmit={ e => auth(e)} className={'config-user-login'}>
                        <p className={'config-user-title'}>Acesse o painel de cadastro de usuários ao sistema</p>
                        <div>
                        <p className={'config-form-title'}>*Usuário</p>
                            <input required onChange={handleChange} name={'email'} className={'form-control shadow-none'} placeholder={'usuário'}  id={'config-usuario-input'} />
                        </div>
                        <div>
                            <p className={'config-form-title'}>*Senha</p>
                            <input required onChange={handleChange} type={'password'} name={'senha'} maxLength={8} className={'form-control shadow-none'} placeholder={'********'} id={'config-senha-input'} />
                        </div>
                        <div className={'d-flex justify-container-center'}>
                            <button className={'btn shadow-none'} id={'btn-enviar'}>
                                { loading ? "CARREGANDO" : <div>autenticar <FaTelegram/></div> }
                            </button>
                        </div>
                    </form> 
                }    
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

export { ConfigUser }