import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { AuthProvider } from "../database/auth/auth";
import PrivateRoute from "../database/auth/PrivateRoute";
// ***************************************

    // PAGES *************************
      import { Home } from '../pages/home';
      import { Contact } from '../pages/contact';
      import { About } from '../pages/about';
      import { Gallery } from '../pages/gallery';
      import { Login } from '../pages/login';
      import { Error404 } from '../pages/404';
    // PAGES-ADMIN *************************
    import { HomeAdmin } from '../admin/home';
    import { CalendarPage } from '../admin/calendar';
    import { Menssager } from '../admin/menssager';
    import { ConfigUser } from '../admin/config-user';
    import { GalleryAdmin } from '../admin/gallery';

// ***************************************


const Router = () => {


  
  return (
    <AuthProvider>
      <BrowserRouter>
      <Switch>
        <PrivateRoute path="/admin/home" component={HomeAdmin} />
        <PrivateRoute path="/admin/calendario" component={CalendarPage} />
        <PrivateRoute path="/admin/solicitacoes" component={Menssager} />
        <PrivateRoute path="/admin/configuracao" component={ConfigUser} />
        <PrivateRoute path="/admin/galeria" component={GalleryAdmin} />

        <Route exact={true} path={'/'} component={Home} />
        <Route path={'/contato'} component={Contact} />
        <Route path={'/potfolio'} component={Gallery} />
        <Route path={'/sobre'} component={About} />
        <Route path={'/acess-login-admin'} component={Login} />
        <Route component={Error404} />  
      </Switch>        
      </BrowserRouter>
    </AuthProvider>
  );
}

export { Router };
