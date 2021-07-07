import React, { useState } from 'react';
import './drawerinfo.css';
import logo from '../../assets/logopng.png';
import { MdQueryBuilder } from 'react-icons/md';
import { BsX } from 'react-icons/bs';
import { FaCalendar, FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import { Dialog } from '@material-ui/core';
import ControllerDb from '../../database/controller';

const DrawerInfo = ({ info, toggleInfo, loadMsg }) => {

    const [confirm, setConfirm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false);

    const toggleConfirm = () => {
        setConfirm(!confirm);
    }

    const deleteMenssager = async (id) => {
        setLoadingDelete(true);
        try {
            await ControllerDb.deleteMenssager(id);
            setLoadingDelete(false);
            loadMsg();
            toggleInfo();
        } catch {
        }
    }

    const checkMenssagerTrue = (id) => {
        setLoading(true);
        try {
            ControllerDb.toggleConfirm(id, true);
            loadMsg();
            toggleInfo();
            setLoading(true);
        } catch {
            toggleInfo();
        }
    }

    const checkMenssagerFalse = async (id) => {
        ControllerDb.toggleConfirm(id, false);
        loadMsg();
        toggleInfo();
    }

    return(
        <div className={'drawer-info'}>
            <div className={'d-flex justify-content-start'}>
                <div className={'box-info-logo'}>
                    <img alt={'info-log'} className={'info-logo'} src={logo} /> 
                </div>
                <div className={'div-right-bar'}>
                    <div className={'d-flex justify-content-center'}>
                        <p className={'bar-top'} />
                    </div>
                    <div className={'d-flex justify-content-between'}>
                        <p className={'bar-center1'} />
                        <p className={'bar-center2'} />
                    </div>
                    <p className={'bar-bottom'} />
                    <div className={'d-flex justify-content-end'}>
                        <div className={'box-info-data-envio'}>
                            <p className={'info-data-envio'}> Data do envio <FaArrowRight/> </p>
                        </div>
                        <div className={'d-flex justify-content-center div-info-envio'}>
                            <p className={'info-data'}>
                               <FaCalendar/> {info.data}
                            </p>
                            <p className={'info-hora'}>
                               <MdQueryBuilder/> {info.hora}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className={'div-content-info'}>
                <div>
                    <p className={'content-info-title'}>Nome do solicitante</p>
                    <p className={'content-info'}>{info.nome}<FaArrowLeft/></p>
                </div>
                <div>
                    <p className={'content-info-title'}>Contato</p>
                    <p className={'content-info'}>{info.contato} <FaArrowLeft/>  </p>
                </div>
                <div>
                    <p className={'content-info-title'}>Email</p>
                    <p className={'content-info'}>{info.email} <FaArrowLeft/>  </p>
                </div>
                <div>
                    <p className={'content-info-title'}>Assunto</p>
                    <p className={'content-assunto'}>{info.assunto} </p>
                </div>
                <div className={'d-flex justify-content-center'}>
                    <div>
                        {
                            info.ok
                            ?
                            <button onClick={ () => checkMenssagerFalse(info.id) } className={'btn btn-outline-danger shadow-none'} id={'confirm'}> { loading ? "carregando.." : "Cancelar confirmação" } </button>
                            :
                            <button onClick={ () => checkMenssagerTrue(info.id) } className={'btn btn-light shadow-none'} id={'confirm'}> { loading ? "carregando..." : "Confirmar visualização" } </button>
                        }
                    </div>
                    <button onClick={() => toggleConfirm()} className={'btn btn-danger shadow-none'} id={'delete'}>Deseja deletar essa mensagem?</button>
                    <Dialog open={confirm} onClick={toggleConfirm}>
                        <div className={'div-delete'}>
                            <p className={'title-delete'}>Tem certeza que deseja excluir essa mensagem?</p>
                            <div className={'d-flex justify-content-center'}>
                                <div>
                                    <button onClick={() => deleteMenssager(info.id)} className={'btn btn-success shadow-none'} id={'confirm'}> {loadingDelete ? "carregando.." : "sim"}</button>
                                    <button onClick={() => toggleConfirm()} className={'btn btn-danger shadow-none'} id={'delete'}>Não</button>
                                </div>
                            </div>
                        </div>
                    </Dialog> 
                </div>
            </div>






            <button onClick={() => toggleInfo()} className={'closed-info'}>
                <BsX/>
            </button>
        </div>
    )
}

export { DrawerInfo };