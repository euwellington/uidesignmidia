import React, { useRef, useState } from 'react';
import './galleryadmin.css';
import { MenuAdmin } from '../../components/menu-admin';
import { FaUpload, FaArrowRight, FaSearch, FaTelegram } from 'react-icons/fa';
import { BsPencilSquare, BsX } from 'react-icons/bs';
import logo from '../../assets/404.png';
import { Dialog, Drawer } from '@material-ui/core';
import empty from '../../assets/empty.png';
import Skeleton from '@material-ui/lab/Skeleton';
import ControllerDb from '../../database/controller';
import { DetalInfo } from '../../database/auth/auth';

const GalleryAdmin = () => {

    const { gallery, loadGallery, loadingGlr } = DetalInfo();

    const MAXLIMIT_TITULO = 18;
    let upload = useRef(); 


    const [search, setSearch] = useState(''); 
    const [file, setFile] = useState(null); 
    const [fileName, setFileName] = useState(null); 
    const [showImage, setShowImage] = useState(null); 
    const [isSave, setIsSave] = useState(false); 
    const [openDelete, setOpenDelete] = useState(false);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [getID, setGetID] = useState(false);
    const [loadingSave, setLoadingSave] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false); 
    const [loadingUpdate, setLoadingUpdate] = useState(false); 


    const [change, setChange] = useState({
        titulo: '',
        descricao: ''
    }) // HOOK OF INPUTS
    const [dataUpdate, setDataUpdate] = useState({
        titulo: '',
        descricao: ''
    });




    const handleImage = e => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
        setShowImage(URL.createObjectURL(e.target.files[0]));
    }  // EVENT TO GET THE INPUT OF IMAGE
    const handleChange = e => {
        const { name, value } = e.target;
        setChange(prevState => ({
            ...prevState,
            [name] : value
        }));
    }  // EVENT TO GET THE INPUT OF FORM
    const handleChangeUpdate = e => {
        const { name, value } = e.target;
        setDataUpdate(prevState => ({
            ...prevState,
            [name] : value
        }));
    } // EVENT TO GET THE INPUT OF FORM TO UPDATE
    const toggleDelete = () => {
        setOpenDelete(!openDelete);
    } // EVENT TOGGLE
    const getInfoDelete = (id) => {
        toggleDelete();
        setGetID(id)
    } // EVENT GET INFORMATION OF ID
    const deleteItem = async () => {
        loadGallery();
        setLoadingDelete(true);
        try {
            await ControllerDb.deleteProject(getID);
            setLoadingDelete(false);
            loadGallery();
            toggleDelete();
        } catch (e) {
            console.log(e);
        }
    } // EVENT TO DELETE ID
    const toggleDrawer = () => {
        setOpenDrawer(!openDrawer);
    } // EVENT TOGGLE
    const getInfoUpdate = (info) => {
        toggleDrawer();
        setDataUpdate(info)
        // setChange(info);
    } // EVENT GET INFORMATION OF ID
    const updateItem = async (id, content) => {
        loadGallery()
        setLoadingUpdate(true);
        try {
            await ControllerDb.updateProject(id, content);
            setLoadingUpdate(false);
            loadGallery();
            toggleDrawer();
        } catch (e) {
            console.log(e)
        }
    } // EVENT UPDATE ITEM
    const _saveproject = async e => {
        e.preventDefault();
        setLoadingSave(true);
        try {
            await ControllerDb.uploadProject(file, change);
            setLoadingSave(false);
            loadGallery();
            setIsSave(true);
        } catch {
            setLoadingSave(false);
        }
    } //EVENT TO SAVE PROJECT
    const _newproject = () => {
        setIsSave(false);
        setChange({titulo: '', descricao: ''});
        setShowImage(null);
        setFileName('');
        setFile(null)
    } //EVENT TO SAVE NEW PROJECT

    const filtersearch = gallery.filter(
        option =>
        option.titulo.toLowerCase().includes(search.toLowerCase()) ||
        !search
    );

    
    return(
        <div className={'d-flex justify-content-between'}>
            <MenuAdmin/> {/* <==== MENU ADMIN :: */}
            <div className={'galleryadmin'}> {/* <========== DIV MAIN  ::*/}

                <div className={'d-flex justify-content-between'}> {/* <========== HEADER OPTION :: */}
                    <div>
                        <p className={'galleryadmin-title'}>Faça o upload de projetos para mostrar aos visitantes</p>
                    </div>
                    <div>
                        <div className={'header-search-menssager d-flex justify-content-center'}>
                            <input onChange={e => setSearch(e.target.value)} value={search} className={'form-control shadow-none'} id={'input-menssager'} placeholder={'pesquise aqui...'} />
                            <div>
                                {
                                    search.length <= 0
                                    ?
                                    <FaSearch className={'icon-menssager'} />
                                    :
                                    <button id={'xclear'} onClick={ () => setSearch('') } className={'shadow-none'}><BsX/></button>
                                }
                            </div>
                        </div> 
                    </div>
                </div> {/* <======= DIV SEARCH */}
                
                <div className={'d-flex justify-content-between'}> {/* <==== DIVISION BETWEEN DIV :: */}
                        <div className={'galleryadmin-left'}> {/* <==== DIV LEFT :: */}
 
                            <div className={'p-2'}>
                                {
                                    loadingGlr ?
                                    <Skeleton id={'skeleton-info'} />
                                    // <p className={'text-center text-light'}>CARREGANDO</p>
                                    :
                                    <>
                                        {
                                            filtersearch.length > 0?
                                            <div>
                                                {
                                                    filtersearch.map((info, index) => (
                                                        
                                                        <div key={index} className={'d-flex justify-content-start infogallery-div'}>
                                                            <div className={'div-gallery-info'}>
                                                                <img alt={'i-img'} src={info.imagem} className={'info-gallery-image'} />
                                                            </div>
                                                            <div className={'div-gallery-info'}>
                                                                <p className={'info-gallery'}> 
                                                                    {info.nomeimagem} 
                                                                </p>                                                
                                                            </div>
                                                            <div className={'div-gallery-info'}>
                                                                    <p className={'info-gallery'}> 
                                                                        {
                                                                            info.titulo.length > MAXLIMIT_TITULO
                                                                            ?
                                                                            (info.titulo).substring(0,MAXLIMIT_TITULO-3) + '...'
                                                                            :
                                                                            info.titulo
                                                                        }
                                                                    </p>
                                                            </div>
                                                            <div className={'div-gallery-info'}>
                                                                <p className={'info-gallery'}> {info.data} </p>
                                                            </div>
                                                            <div className={'div-gallery-info'}>
                                                                <p className={'info-gallery'}> {info.hora} </p>
                                                            </div>
                                                            <div className={'div-gallery-info-btn'}>
                                                                <button onClick={() => getInfoUpdate(info)} className={'btn shadow-none'} id={'edit-info'}> <BsPencilSquare/> </button>
                                                            </div>
                                                            <div className={'div-gallery-info-btn'}>
                                                                <button onClick={ () => getInfoDelete(info.id) } className={'btn shadow-none'} id={'delete-info'}> <BsX/>  </button>
                                                            </div>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                            :
                                            <div>
                                                <p style={{fontSize: 14, fontWeight: 700, textAlign: 'center', marginTop: 120, color: 'white'}}>Ops! não encontramos nada</p>
                                                <div className={'d-flex justify-content-center'}>
                                                    <img alt={'empty'} style={{height: 250}} src={empty} />
                                                </div>
                                            </div>
                                        }
                                    </>
                                }
                            </div>
                        </div>
                    <div className={'galleryadmin-right'}> {/* <==== DIV RIGHT :: */}
                        {
                            isSave?
                            (
                                <div>
                                    <div className={'div-send d-flex justify-content-center'}>
                                        <img alt={'send'} className={'img-send-project'} src={'https://d136c6g36wumfk.cloudfront.net/p/15584/indicator_check.gif'} />
                                    </div>
                                    <p className={'success-title'}>Projeto salvo com sucesso!</p>
                                    <div className={'d-flex justify-content-center'}>
                                        <p className={'success-subtitle'}>
                                            O seu projeto é atualizado assim que o sistema recebo os dados que foi enviado por você
                                        </p>
                                    </div>
                                    <div className={'d-flex justify-content-center'}>
                                        <button onClick={ () => _newproject() } id={'save-again'}>Salvar outro projeto</button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                <div className={'d-flex justify-content-center'}>
                                    <div className={'d-flex justify-content-center'}>
                                        <img alt={'logo'} src={ showImage ? showImage : logo }  className={'galleryadmin-img'}/>
                                        <p className={'galleryadmin-img-title'}> <FaArrowRight/> { fileName ? fileName : "nome da imagem" } </p>
                                    </div>
                                </div>
                                <div className={'d-flex justify-content-center'}>
                                    <p className={'galleryadmin-title-info'}>
                                        *Salve seu projeto para o nosso banco de dados para que os usuários visitante possa ver os projetos criado
                                    </p>
                                </div>
                                <form onSubmit={ e => _saveproject(e) }>
                                    <div>
                                        <p className={'info-p'}>*Titulo</p>
                                        <input name={'titulo'} onChange={handleChange} id={'title-input-info'} className={'form-control shadow-none'} required placeholder={'titulo do projeto'} />
                                    </div>
                                    <div>
                                        <p className={'info-p'}>*Descrição</p>
                                        <textarea name={'descricao'} onChange={handleChange} id={'desc-input-info'} className={'form-control shadow-none'} required placeholder={'escreva um pouco sobre o projeto'} />
                                    </div>
                                    <div className={'d-flex justify-content-center'}>
                                        <button disabled={!file} id={'btn-save-project'}> { loadingSave ? <img alt={'btn-load'} style={{height: 20}} src={'https://www.turismoitaipu.com.br/sites/all/modules/custom/itaipu/itaipu_tickets_shop/img/loading.gif'} /> : <div><FaTelegram/> Salvar</div> } </button>
                                    </div>
                                </form>
                                </>
                            )
                        }
                    </div>
                </div>
            </div>

{/* MODAL DELETE ITEM OPTION ******************************************************************************************************************** */}
            <Dialog open={openDelete} onClose={toggleDelete}>
                <div className={'modal-delete'}>
                    <div style={{margin: 'auto'}}>
                        <p className={'delete-gallery-title'}>Deseja deletar esse projeto?</p>
                        <div className={'d-flex justify-content-center'}>
                            <button onClick={() => deleteItem()} className={'shadow-none'} id={'edit-delete-y'}> { loadingDelete ? "CARREGANDO": <div>Sim</div> } </button>
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
                            <img alt={'drawer-img'} src={dataUpdate.imagem} className={'drawer-img'} />
                        </div>
                        <div className={'d-flex justify-content-center'}>
                            <p className={'drawer-img-info'}>
                                Você não pode alterar a imagem porque o sistema irá demorar mais para processar. Se necesário tem que fazer
                                outro upload da imagem
                            </p>
                        </div>
                        <div>
                            <p className={'galleryadmin-title-info'}>Titulo da imagem</p>
                            <input required name={'titulo'} value={dataUpdate && dataUpdate.titulo} onChange={handleChangeUpdate} className={'form-control shadow-none'} placeholder={'Criação da arte...'} id={'title-input-drawer'} />
                        </div>
                        <div>
                            <p className={'galleryadmin-title-info'}>Descrição</p>
                            <textarea required name={'descricao'} value={dataUpdate && dataUpdate.descricao} onChange={handleChangeUpdate} className={'form-control shadow-none'} placeholder={'Descreva sobre a imagem'} id={'desc-input-drawer'} />
                        </div>
                        <div className={'d-flex justify-content-center'}>
                            <button onClick={() => updateItem(dataUpdate.id, dataUpdate)} className={'shadow-none'} id={'save-update'}> { loadingUpdate ? "CARREGANDO": <div>Salvar <FaTelegram/></div> } </button>
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
{/* BAF BUTTON  ******************************************************************************************************************** */}
            <input type={'file'} ref={upload} onChange={handleImage} style={{display: 'none'}} />
            <button type={'button'} onClick={() => upload.current.click()} id={'button-upload'}> {/* <==== BAF UPLOAD IMAGE */}
                <FaUpload/> Upload file
            </button>

        </div>
    )
}

export { GalleryAdmin } 