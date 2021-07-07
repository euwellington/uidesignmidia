import React, { useState, useEffect } from 'react';
import './infogallery.css';
import { firebase } from '../../database/firebase';
import { BsPencilSquare, BsX } from 'react-icons/bs';
import { FaTelegram } from 'react-icons/fa';
import { Dialog } from '@material-ui/core';
import { Drawer } from '@material-ui/core';

const MAXLIMIT_TITULO = 18;

const InfoGallery = ({ search }) => {

    const [data, setData] = useState([]);
    const [openDelete, setOpenDelete] = useState(false);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [dataInfo, setDataInfo] = useState([]);
    const [loading, setLoading] = useState(true);
    const [getID, setGetID] = useState(null);

    const toggleDelete = () => {
        setOpenDelete(!openDelete);
    }

    const toggleDrawer = () => {
        setOpenDrawer(!openDrawer);
    }

    const getInfoUpdate = () => {
        toggleDrawer();
        setDataInfo();
    }

    const getInfoDelete = () => {
        toggleDelete();
        setGetID();
    }
    
    const deleteItem = async () => {
        setLoading(true);
    }

    const updateItem = async () => {
        
    }

    const handleChange = e => {
        const { name, value } = e.target;
        setDataInfo(prevState => ({
            ...prevState,
            [name] : value
        }))
    }

    const dataFilter = data.filter(
        option => 
            option.titulo.toLowerCase().includes(search.toLowerCase()) ||
            !search
    )

    const getInfo = () => {
        
    }

    useEffect(() => {
        getInfo();
        return () => getInfo();
    }, []);

    return(
    <div className={'div-info-gallery'}>
        {
            loading
            ?
            <div style={{display: 'grid'}}>
                <img className={'loading-infogallery'} src={'https://raw.githubusercontent.com/Codelessly/FlutterLoadingGIFs/master/packages/circular_progress_indicator_square_small.gif'} />
            </div>
            :
        <>
        { 
        dataFilter.length > 0?
        <div className={'infogallery'}>
            {
                dataFilter.map((info, index) => (
                    <div key={index} className={'d-flex justify-content-start infogallery-div'}>
                        <div className={'div-gallery-info'}>
                            IMAGEM
                            <img className={'info-gallery-image'} />
                        </div>
                        <div className={'div-gallery-info'}>
                            <p className={'info-gallery'}> nome imagem </p>
                        </div>
                        <div className={'div-gallery-info'}>
                            <p className={'info-gallery'}> 
                            TITULO
                                {/* {
                                    info.titulo.length > MAXLIMIT_TITULO
                                    ?
                                    (info.titulo).substring(0,MAXLIMIT_TITULO-3) + '...'
                                    :
                                    info.titulo
                                } */}
                            </p>
                        </div>
                        <div className={'div-gallery-info'}>
                            <p className={'info-gallery'}> DATA </p>
                        </div>
                        <div className={'div-gallery-info'}>
                            <p className={'info-gallery'}> HORA </p>
                        </div>
                        <div className={'div-gallery-info-btn'}>
                            <button onClick={() => getInfoUpdate()} className={'btn shadow-none'} id={'edit-info'}> <BsPencilSquare/> </button>
                        </div>
                        <div className={'div-gallery-info-btn'}>
                            <button onClick={() => getInfoDelete()} className={'btn shadow-none'} id={'delete-info'}> <BsX/>  </button>
                        </div>
                    </div>
                ))
            }


{/* MODAL DELETE ITEM OPTION ******************************************************************************************************************** */}
            <Dialog open={openDelete} onClose={toggleDelete}>
                <div className={'modal-delete'}>
                    <div style={{margin: 'auto'}}>
                        <p className={'delete-gallery-title'}>Deseja deletar esse projeto?</p>
                        <div className={'d-flex justify-content-center'}>
                            <button onClick={() => deleteItem()} className={'shadow-none'} id={'edit-delete-y'}> { loading ? "CARREGANDO": <div>Sim</div> } </button>
                            <button onClick={() => toggleDelete()} className={'shadow-none'} id={'edit-delete-n'}> Não </button>
                        </div>
                    </div>
                </div>
            </Dialog>
{/* DRAWER UPDATE ITEM  ******************************************************************************************************************** */}
            <Drawer open={openDrawer} onClose={toggleDrawer} anchor={'right'}>
                <div className={'drawer-update'}>
                    <div style={{margin: 'auto', width: '100%'}}>
                        <div className={'d-flex justify-content-center'}>
                            <img src={dataInfo.imagem} className={'drawer-img'} />
                        </div>
                        <div className={'d-flex justify-content-center'}>
                            <p className={'drawer-img-info'}>
                                Você não pode alterar a imagem porque o sistema irá demorar mais para processar. Se necesário tem que fazer
                                outro upload da imagem
                            </p>
                        </div>
                        <div>
                            <p className={'galleryadmin-title-info'}>Titulo da imagem</p>
                            <input required name={'titulo'} onChange={handleChange} className={'form-control shadow-none'} placeholder={'Criação da arte...'} id={'title-input-drawer'} />
                        </div>
                        <div>
                            <p className={'galleryadmin-title-info'}>Descrição</p>
                            <textarea required name={'descricao'} onChange={handleChange} className={'form-control shadow-none'} placeholder={'Descreva sobre a imagem'} id={'desc-input-drawer'} />
                        </div>
                        <div className={'d-flex justify-content-center'}>
                            <button onClick={() => updateItem()} className={'shadow-none'} id={'save-img'}> { loading ? "CARREGANDO": <div>Salvar <FaTelegram/></div> } </button>
                        </div>
                        <div className={'d-flex justify-content-center'}>
                            <button className={'shadow-none'} id={'btn-exit'} onClick={() => toggleDrawer()}> Voltar </button>
                        </div>
                    </div>

                    <button id={'drawer-close'} onClick={() => toggleDrawer()}>
                        <BsX/>
                    </button>
                </div>
            </Drawer>

        </div>
        :
        <div style={{display: 'grid'}}>
            <div style={{margin: 'auto'}}>
                <p style={{color: 'white', textAlign: 'center', fontWeight: 600, fontSize: '18pt', marginTop:100}}>Ops!</p>
                <p style={{color: 'white', textAlign: 'center', fontWeight: 400, fontSize: '13pt', margin: 0}}>Nenhum registro encontrado</p>
            </div>
        </div>
        }
        </>
        }
    </div>
    
    )
}

export { InfoGallery };
