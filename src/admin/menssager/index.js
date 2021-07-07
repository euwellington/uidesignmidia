import React, { useState } from 'react';
import './menssager.css';
import { MenuAdmin } from '../../components/menu-admin';
import { FaComments, FaSearch, FaCalendar, FaPlus, FaArrowLeft } from 'react-icons/fa';
import { MdQueryBuilder } from 'react-icons/md';
import { BsX } from 'react-icons/bs';
import { Drawer } from '@material-ui/core';
import { DrawerInfo } from '../../components/drawerInfo';
import empty from '../../assets/empty.png';
import empty1 from '../../assets/empty1.png';
import { DetalInfo } from '../../database/auth/auth';

const Menssager = () => {

    const { msg, loadMsg, loadingMsg } = DetalInfo();

    const MAXLIMIT = 90;
    const [openInfo, setOpenInfo] = useState(false);
    const [content, setContent] = useState();
    const [search, setSearch] = useState('');

    const toggleInfo = () => {
        setOpenInfo(!openInfo);
    }

    const getInfo = (_content) => {
        setContent(_content)
        toggleInfo();
    }

    const dataFilter = msg.filter(
        option =>
        option.nome.toLowerCase().includes(search.toLowerCase()) ||
        !search
    );


    return(
<div className={'d-flex justify-content-center'}>
{/* MENUADMIN **************************************************************************************************************************************** */}
    <MenuAdmin/>
        <div className={'menssager'}>
            <div className={'d-flex justify-content-between'}>
                <div>
                    <p className={'header-menssager-title'}><FaComments/> Total de solicitação recebido <span className={'menssager-number'}>{msg.length}</span></p>
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
            </div>  

            <div>
                {

                loadingMsg 
                    ?
                        <>
                            {
                                msg.length <= 0?
                                <div style={{display: 'grid', marginTop: 100}}>
                                    <div style={{margin: 'auto'}}>
                                        <div className={'d-flex justify-content-center'}>
                                            <img alt={'empty-1'} src={empty1} style={{height: 250}} />
                                        </div>
                                        <p style={{color: 'white', textAlign: 'center', fontSize: 11, fontWeight: 700}}>Ops! parece que nao tem nada no nosso servidor!</p>
                                    </div>
                                </div>
                                :
                                <div className={'d-flex justify-content-center'}>
                                    <img alt={'loading'} style={{height: 30, marginTop: 170}} src={'https://redepara.com.br/Content/images/load.gif'} />
                                </div>
                            }
                        </>
                    :
                        <div>
                        {
                            dataFilter.length > 0
                            ?
                            <div className={'results-menssager'}>
                            {
                                dataFilter.map((results, index) => {
                                    return(
                                        <div key={index} className={'box-results-menssager'}>
                                            <div className={'d-flex justify-content-start'}>
                                                <p className={'results-nome'}>{results.nome}</p>
                                                <div className={'content-info'}> 
                                                    { 
                                                    results.ok 
                                                    ? 
                                                    <img alt={'ok'} className={'img-ok'} src={'https://d136c6g36wumfk.cloudfront.net/p/15584/indicator_check.gif'} />
                                                    :
                                                    <p className={'not-confim'}>NÃO CONFIRMADO</p>
                                                    } 
                                                </div>
                                            </div>
                                            <div className={'d-flex justify-content-start'}>
                                                <p className={'results-data'}> <FaCalendar/>{results.data}</p>
                                                <p className={'results-hora'}> <MdQueryBuilder/>{results.hora}</p>
                                            </div>
                                            <div className={'d-flex justify-content-start'}>
                                                <p className={'results-assunto'}>
                                                    {
                                                        results.assunto.length > MAXLIMIT
                                                        ?
                                                        (results.assunto).substring(0,MAXLIMIT-3) + '...'
                                                        :
                                                        results.assunto
                                                    }
                                                </p>
                                            </div>
                                            <div className={'d-flex justify-content-start'}>
                                                <button onClick={() => getInfo(results)} className={'d-flex justify-content-center btn-plus-results'}>
                                                    <FaPlus className={'icon-plus-results'} />
                                                </button>
                                                <div className={'div-info-results'}>
                                                    <p className={'info-results'}><FaArrowLeft/> Visualize as informações que chegou </p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
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
                    </div>
                    
                }
            </div>
        </div>


        
        <Drawer open={openInfo} onClose={toggleInfo} anchor={'right'}>
            <DrawerInfo info={content} toggleInfo={toggleInfo} loadMsg={loadMsg} />
        </Drawer>
</div>
    )
}

export { Menssager }