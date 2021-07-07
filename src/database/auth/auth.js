import React, { useEffect, useState, useContext } from "react";
import { auth, db } from "../config";
import logo from '../../assets/logopng.png';

export const AuthContext = React.createContext({});

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState(true);
  const [info, setInfo] = useState([]);
  const [msg, setMsg] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState(false);
  const [loadingGlr, setLoadingGlr] = useState(false);
  const [gallery, setGallery] = useState([]);

  const load = () => {
    auth.onAuthStateChanged((user) => {
    setCurrentUser(user);
    setPending(false);
      if(user) {
        console.log('online')
        setLoading(true);
        const uid = auth.currentUser.uid;
                db.ref('usuarios').child(uid).once('value', item => {
                    item.forEach(x => {
                        setInfo(x.val());
                        setLoading(false);
                    })
                })
            }
        else {
        console.log('offline')
        }
      });
  }

  const loadMsg = () => {
      setLoadingMsg(true);
        let list = [];
        const request = db.ref('solicitacao');
        request.once('value', item => {
            item.forEach(value => {
                list.push({ id: value.key, ...value.val() });
            })
            setMsg(list);
            setLoadingMsg(false);
        })
    }

    const loadGallery = async () => {
        setLoadingGlr(true);
        const list = [];
        const request = await db.ref('galeria');
        request.on('value', item => {
            item.forEach(value => {
                list.push({ id: value.key, ...value.val() })
            })
            setLoadingGlr(false);
            setGallery(list);
        })
    } 


  useEffect( () => {
    load();
    loadMsg();
    loadGallery()
    // return () => {
    //   load();
    //   loadMsg();
    // }

  }, []);

  const state = {
    currentUser,
    info,
    loading,
    msg,
    load,
    loadMsg,
    loadingMsg,
    loadGallery,
    loadingGlr,
    gallery
  }

  if (pending) {
    return(
      <div className={'d-flex justify-content-center'} style={{ background: 'rgb(34, 34, 34)', height: '100vh', display: 'grid', animation: 'fade-out 0.5s forwards' }}>
        <div style={{margin: 'auto'}}>
          <div className={'d-flex justify-content-center'}>
            <img alt={'_logpeding1'} src={logo} style={{height: 37}} />  
          </div>
          <div className={'d-flex justify-content-center'}>
            <img alt={'_logpeding2'} style={{height: 90, marginTop: '-25px'}} src={'https://flevix.com/wp-content/uploads/2019/07/Box-Loading.gif'} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={state}>
      {children}
    </AuthContext.Provider>
  );
};


export const DetalInfo = () => {

  const context = useContext(AuthContext);
  const { currentUser, info, msg, load, loading, loadMsg, loadingMsg, loadGallery, loadingGlr, gallery } = context;
  return {
    currentUser,
    info,
    msg,
    loading,
    load,
    loadMsg,
    loadingMsg,
    loadGallery,
    loadingGlr,
    gallery
  }

}