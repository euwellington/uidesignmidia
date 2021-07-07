import React, { useState, useEffect } from 'react';
import './gallery.css';
import { FaExpandAlt, FaArrowUp } from 'react-icons/fa';  
import { BsX } from 'react-icons/bs';  
import { Dialog } from '@material-ui/core';
import { Menu } from '../../components/menu';
import { Footer } from '../../components/footer';
import Skeleton from '@material-ui/lab/Skeleton';
import { DetalInfo } from '../../database/auth/auth';

const Gallery = () => {

  const { gallery, loadingGlr } = DetalInfo();
 
  const [openModal, setOpenModal] = useState(false);
  const [selectImg, setSelectImg] = useState('');
  const toggleModal = (img) => {
    setOpenModal(!openModal);
    setSelectImg(img)
  }

  useEffect(() => {
    document.title = 'portfolio';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={'page-gallery'}>
<Menu/>

{/* EXPAND ******************************************************************************************************** */}
      <Dialog open={openModal} onClose={toggleModal}>
        <div onClick={() => toggleModal()} className={'modal-closed'}>
          <BsX/>
        </div>
        <img alt={'_'} src={selectImg} className={'dialog-img'} />
      </Dialog>
{/* PAGE-GALLERY ******************************************************************************************************** */}
      <div className={''} style={{marginBottom: 160}}>
        <div className={'d-flex justify-content-between container page-gallery-header'}>
          <div className={'d-flex justify-content-center'}>
            <div className={'d-flex justify-content-center'}>
              <p className={'por'}>P T L</p>
              <p className={'tfo'}>O F I</p>
              <p className={'lio'}>R O O</p>
            </div>
          </div>
          <div className={'div-gallery-title'}>
            <p className={'gallery-title'}>ABAIXO ESTÃO ALGUNS DE NOSSOS TRABALHOS</p>
          </div>
          <div className={'div-gallery-subtitle'}>
            <p className={'gallery-subtitle'}>Saiba mais sobre como é o nosso trabalho para que você tenha mais confiança em nossos serviços</p>
          </div>
        </div>
        <>
        {
          loadingGlr
          ?
          <div className={'d-flex justify-content-center div-img-content'}>
            <Skeleton variant="rect" className={'skeleton-portfolio'} />
            <Skeleton variant="rect" className={'skeleton-portfolio'} />
            <Skeleton variant="rect" className={'skeleton-portfolio'} />
            <Skeleton variant="rect" className={'skeleton-portfolio'} />
            <Skeleton variant="rect" className={'skeleton-portfolio'} />
            <Skeleton variant="rect" className={'skeleton-portfolio'} />
          </div>
          :
          <div className={'div-img-content'}>
            {
              gallery.map((item, index) => (
                <div key={index} className={'div-info-img'}>
                  <img alt={'info1'} className={'img-content'} src={item.imagem} />
                  <div className={'capa-info-img'}>
                    <p className={'info-img-title'}>{item.titulo}</p>
                    <p id={'bar'}/>
                    <p className={'info-img-subtitle'}>
                      {
                        item.descricao
                      }
                    </p>
                    <div className={'d-flex justify-content-center'}>
                      <FaExpandAlt onClick={() => toggleModal(item.imagem)} className={'icon-option'} />
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
          
        }
        </>
      </div>
{/* TO UP ******************************************************************************************************** */}
<div>
    <button id={'toup'} onClick={() => window.scrollTo(0, 0)}>
      <FaArrowUp/>
    </button>
</div>
<Footer/>
    </div>
  ); 
}

export { Gallery };