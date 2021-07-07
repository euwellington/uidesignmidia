import React from 'react';
import './footer.css';
import logo from '../../assets/logopng.png';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className={'footer'}> 
      <div className={'container footer-responsive'}>
        <img alt={'logo'} src={logo} className={'footer-logo'} />
        <p className={'tank'}>Obrigado por nos visitar!</p>

        <div className={'d-flex justify-content-between wrap'} id={'none'}>
          <div>
            <p className={'footer-title'}>
              Caso tenha alguma dúvida ou queira da alguma sugestão é possivel fazer isso
              mandando um email para que toda a equipe possa fazer o possível para melhorar
              ainda mais os nossos serviços!
            </p>
            <p className={'footer-title'}>uidmidiacontato@gmail.com</p>
          </div>
          <div>
            <p className={'footer-item'}>Home</p>
            <p className={'footer-item'}>Galeria</p>
            <p className={'footer-item'}>Sobre nós</p>
            <p className={'footer-item'}>Contato</p>
          </div>
          <div>
              <p><FaFacebook className={'footer-icons'} /></p>
              <p><FaInstagram className={'footer-icons'} /></p>
              <p><FaTwitter className={'footer-icons'} /></p>
          </div>
        </div>
      </div>
      <p className={'copy'}>uidesignmidia &copy; 2021 todos os direitos reservado</p>
    </div>
  );
}

export { Footer };