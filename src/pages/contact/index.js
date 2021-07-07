import React, { useEffect, useState } from 'react';
import './contact.css';
import { FaTelegram, FaWhatsapp, FaEnvelope } from 'react-icons/fa';
import { Menu } from '../../components/menu';
import { Footer } from '../../components/footer';
import ControllerDb from '../../database/controller';


const Contact = () => {
  
  const [send, setSend] = useState(false);
  const [loading, setLoading] = useState(false);

  const [change, setChange] = useState({
    nome: '',
    email: '',
    contato: '',
    assunto: '',
    ok: false
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setChange(prevState => ({
      ...prevState,
      [name] : value
    }))
  }
  const sendForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let data = {
          nome: change.nome,
          email: change.email,
          contato: change.contato,
          assunto: change.assunto,
          ok: false,
          data: new Date().toLocaleDateString(),
          hora: new Date().toLocaleTimeString()
        }
      await ControllerDb.sendSolicitation(data);
      setSend(true);
      setLoading(false);
    } catch {
      setLoading(false);
      console.log('ERRO AO ENVIAR O FORMULARIO');
    }
  }
  
  useEffect(() => {
    document.title = 'contato';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={'page-contact'}>
<Menu/>
      <div className={'responsive-mobile container d-flex justify-content-between'}>
        <div>
          <p className={'page-contact-title'}>Entre em contato com a gente</p>
          <p className={'page-contact-subtitle'}>
            você pode fazer isso através do formulário, email ou pelo whatsapp
          </p>
          <p className={'page-contact-info'}>
            *Clique no botão no canto superior para mais opção de contato!
          </p>
          <div className={'d-flex justify-content-start'}>
            <a className={'envelope'} href={'mailto:uidesignmidia@gmail.com'} >
              <FaEnvelope/>
            </a>
            <p className={'envelope-text'}><FaEnvelope style={{marginRight: 5}}/>uidesignmidia@gmail.com</p>
          </div>
          <div className={'d-flex justify-content-start'}>
            <a className={'whatsapp'} href={'http://api.whatsapp.com/send?phone=5585998174700'}>
              <FaWhatsapp/>
            </a>
          </div>
        </div>
        <form onSubmit={ e => sendForm(e) } className={'div-form'}>
          {
            send
            ?
            <div className={'div-send d-flex justify-content-center'}>
              <div>
                <div className={'div-send d-flex justify-content-center'}>
                  <img alt={'send'} className={'img-send'} src={'https://d136c6g36wumfk.cloudfront.net/p/15584/indicator_check.gif'} />
                </div>
                <p className={'send-title'}>Obrigado por nos enviar essa mensagem!</p>
                <div className={'d-flex justify-content-center'}>
                  <p className={'send-subtitle'}>
                    Agora é so aguardar que vamos entrar em contato com você o mais rápido possível
                  </p>
                </div>
              </div>
            </div>
            :
            <>
              <div>
                <p className={'form-title'}>*Nome completo</p>
                <input required name={'nome'} onChange={handleChange} placeholder={'seu nome aqui...'} className={'form-control shadow-none'} id={'nome-input'} />
              </div>
              <div>
                <p className={'form-title'}>*Seu email</p>
                <input required name={'email'} onChange={handleChange} type={'email'} className={'form-control shadow-none'} placeholder={'seuemail@contato.com'}  id={'email-input'} />
              </div>
              <div>
                <p className={'form-title'}>*Contato</p>
                <input required name={'contato'} onChange={handleChange} className={'form-control shadow-none'} placeholder={'Número para contato'} id={'contato-input'} />
              </div>
              <div>
                <p className={'form-title'}>*Assunto</p>
                <textarea name={'assunto'} onChange={handleChange} placeholder={'Escreva sua ideia aqui..'} className={'form-control shadow-none'} id={'assunto-input'} />
              </div>
              <div className={'d-flex justify-content-center'}>
                {
                  loading
                  ?
                  <div className={'d-flex justify-content-center'}>
                    <img alt={'loading'} className={'img-loading-send'} src={'https://flevix.com/wp-content/uploads/2019/07/Bar-Preloader-1.gif'} />
                  </div>
                  :
                  <button className={'btn shadow-none'} id={'btn-enviar'}>
                    <div>Enviar <FaTelegram/></div>
                  </button>
                }
              </div> 
            </>
          }
        </form> 
      </div>
<Footer/>
    </div>
  );
}
 
export { Contact };