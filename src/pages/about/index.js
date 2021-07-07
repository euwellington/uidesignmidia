import React, { useEffect } from 'react';
import './about.css';
import { Menu } from '../../components/menu';
import { Footer } from '../../components/footer';

const About = () => {

  useEffect(() => {
    document.title = 'sobre';
    window.scrollTo(0, 0);
  }, [])

  return (
    <div className={'page-about'}>
<Menu/>
      <div className={'container d-flex justify-content-center'}>
        <div>
          <p className={'page-about-title'}>sobre a uidesignmidia</p>
          <div className={'d-flex justify-content-center'}>
            <p className={'page-about-subtitle'}>
              Estamos no mercado a pouco tempo mas já fazemos o melhor para entregar um serviço de qualidade para os nossos clientes!
            </p>
          </div>
        </div>
      </div>
      <div>
          <div className={'d-flex justify-content-center wrap'}>
            <div className={'box-page-about'}>
              <p className={'right-about-title'}>Nossa Missão em Relação aos <span className={'decoration'}>Serviços Oferecidos</span></p>
              <p className={'right-about-subtitle'}>
                Atuar com total empenho na construção, valorização e fortalecimento de marca, produto ou
                serviço de nossos clientes.
              </p>
            </div>
            <div className={'box-page-about'}>
              <p className={'right-about-title'}>Nossa Visão <span className={'decoration'}>Perante o Mercado</span></p>
              <p className={'right-about-subtitle'}>
                Estar atualizado com os avanços do mercado, significa, estar pronto para apresentar as 
                melhores soluções necessárias para que nossos clientes atinjam os melhores resultados.
              </p>
            </div>
            <div className={'box-page-about'}>
              <p className={'right-about-title'}>Valores e <span className={'decoration'}>Ideais</span></p>
              <p className={'right-about-subtitle'}>
                A busca constante de soluções eficazes, adequados às condições e expectativas do seu projeto.
              </p>
            </div>
          </div>
        </div>
<Footer/>
    </div>
  );
}

export { About };