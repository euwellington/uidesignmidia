import React, { useState, useEffect } from 'react';
import './home.css';
import contact from '../../assets/apre.png';
import { FaTelegram, FaWhatsapp } from 'react-icons/fa';
import {  NavLink } from 'react-router-dom';
import { BsX } from 'react-icons/bs';
import { Dialog } from '@material-ui/core';
import { Menu } from '../../components/menu';
import { Footer } from '../../components/footer';
import sr from '../../components/scroll';


const Home = () => {

  const [openModal, setOpenModal] = useState(false);
  const toggleModal = () => {
    setOpenModal(!openModal);
  }

  useEffect(() => {
    document.title = 'uidesignmidia';
    window.scrollTo(0, 0);
    const configLeft = {
      origin: 'left',
      duration: 2100,
      delay: 400,
      distance: '20px',
      scale: 1,
      easing: 'ease',
    }
    const configRight = {
      origin: 'right',
      duration: 2100,
      delay: 400,
      distance: '10px',
      scale: 1,
      easing: 'ease',
    }
    const configBottom = {
      origin: 'bottom',
      duration: 2000,
      delay: 250,
      distance: '100px',
      scale: 1,
      easing: 'ease',
    }
    sr.reveal('.x', configLeft)
    sr.reveal('.z', configRight)
    sr.reveal('.w', configBottom)
    sr.reveal('.r', configBottom)
  }, []);

  return (
    <div> 
<Menu/>

{/* APRESENTATION ******************************************************************************************************** */}
      <div className={'apresentation a'}> 
        <div className={'container d-flex justify-content-center responsive'}>
          <div>
            <p className={'apresentation-title'}> Criação de artes </p>
            <p className={'apresentation-subtitle'}> para mídias sociais </p>
          </div>
          <div>
            <img alt={'apre'} className={'img-apresentation'} src={contact} />
          </div>
        </div>
      </div> 
{/* ABOUT ******************************************************************************************************** */}
      <div>
        <div className={`about`}>
          <div className={'container d-flex justify-content-between'}>
            <div className={'x'}>
              <p className={'about-title'}><span className={'qs'}>QUEM SOMOS</span> NÓS?</p>
              <div className={'d-flex justify-content-start'}>
                <div>
                  <p className={'about-content'}>
                    Olá, Somos a uidesignmidia, uma agência digital que trabalha em produzir conteúdo de qualidade
                  </p>
                  <p className={'about-content'}> 
                    Trabalhamos, principalmente, com mídias sociais, mas também produzimos identidades visuais, logotipo, dentre outros serviços
                  </p>
                  <p className={'about-content'}>      
                    Nossa missão como equipe é: trazer um design inovador para o seu negócio, causando
                    mais conversão e, consequentemente, mais dinheiro no seu bolso!      
                  </p>
                </div>
              </div>
              <NavLink to={'sobre'} className={'btn btn-light shadow-none'} id={'btn-about'}>Saiba mais <FaTelegram/></NavLink>
            </div>
            </div>
        </div>
      </div>
{/* FOCUS ******************************************************************************************************** */}
      <div>
        <div className={`focus`}>
          <div className={'container'}>
            <div className={'z'}>
            <div className={'d-flex justify-content-end'}>
              <p className={'focus-title'}><span className={'sp'}>Saiba porque</span> nosso foco está em midias sociais</p>
            </div>
            <div className={'d-flex justify-content-end'}>
              <div>
                <p className={'focus-content'}>
                  Pense em quanto tempo do seu dia-a-dia você dedica a ler propagandas impressas ou a ouvir rádio.
                  Agora, pense em quanto tempo do seu dia-a-dia você fica conectado nas redes sociais. Seus
                  potenciais clientes estão todos os dias, grande parte do seu tempo, conectados, e por isso,
                  é importante captar seu público com uma qualidade de mídia irresistível, usando os canais de 
                  entretenimento!
                </p>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
{/* WE JOB ******************************************************************************************************** */}
      <div>
        <div className={`job`}>
          <div className={'container w'}>
            <div className={'d-flex justify-content-center'}>
              <p className={'job-title'}><span className={'sp'}>Como trabalhamos</span> com as mídias sociais </p>
            </div>
            <div className={'d-flex justify-content-center'}>
              <div>
                <p className={'job-content'}>
                 As resdes sociais possuem, hoje em dia, bilhões de usuários. todos esses usuários estão gerando
                 conteúdo e, consequentemente, concorrência
                </p>
                <p className={'job-content'}>
                   Apenas estar presente nas redes sociais não basta! É necessário investir no desdobramento
                   online de aspectos visuais de sua empresa, com o objetivo de atrair seguidores e convertê-los
                   em clientes
                </p>
                <p className={'job-content'}>
                 Nos dedicamos a produzir cointeúdo de qualidade e um design inovador para as redes sociais da sua empresa
                 . Nós também realizamos o agendamento das publicações e a criação das legendas, para que assim,
                 haja a automação das redes sociais
                </p>
              </div>
            </div>
            <div className={'d-flex justify-content-center'}>
              <NavLink to={'/potfolio'} className={'btn btn-light'} id={'btn-job'}>Veja mais sobre os nossos trabalhos</NavLink>
            </div>
          </div>
        </div>
      </div>
      {/* BAF ******************************************************************************************************** */}
      <div onClick={() => toggleModal()} className={'baf d-flex justify-content-center r'}>
        <FaWhatsapp/>
      </div>
      <Dialog open={openModal} onClose={toggleModal}>
        <div className={'div-baf x'}>
          <div className={'d-flex justify-content-center'}>
            <div className={'div-whats'}>
              <FaWhatsapp/>
            </div>
          </div>
          <p className={'baf-title'}>Entre em contato pelo</p>
          <p className={'baf-subtitle'}>whatsapp</p>
          <div className={'d-flex justify-content-center'}>
            <p className={'baf-subtitle-info'}>
              Aqui você tem um retorno bem mais rápido para que possamos agilizar a sua arte para o seu negócio
            </p>  
          </div>
          <div className={'d-flex justify-content-center'}>
            <a href={'http://api.whatsapp.com/send?phone=5585998174700'} className={'btn btn-light shadow-none'} id={'btn-go-whatsapp'}>Vamos lá <FaTelegram/></a>
          </div>
          <div className={'d-flex justify-content-end div-btn-closed'}>
            <BsX className={'btn-closed'} onClick={() => toggleModal()} />
          </div>
        </div>
      </Dialog>
<Footer/>
    </div>
  );
}

export { Home }; 