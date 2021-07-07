import React, { useEffect } from 'react';
import './404.css';
import erro404 from '../../assets/404.png';
import { Menu } from '../../components/menu';
import { Footer } from '../../components/footer';

const Error404 = () => {

  useEffect(() => {
    document.title = 'error 404';
    window.scrollTo(0, 0);
  }, [])


  return (
    <div className={'error404'}>
<Menu/>
      <p className={'ops'}>OOPS!</p>
      <div className={'d-flex justify-content-center'}>
        <img alt={'404'} className={'img404'} src={erro404} />
      </div>
      <p className={'found'}>PAGE NOT FOUND!</p>
<Footer/>
    </div>
  );
}

export { Error404 };