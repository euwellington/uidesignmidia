import React from 'react';
import './calendar.css';
import { MenuAdmin } from '../../components/menu-admin';
// import InfiniteCalendar from 'react-infinite-calendar';
// import 'react-infinite-calendar/styles.css'; 
import Calendar from 'react-calendar-pane'
import moment from 'moment';
import 'moment/locale/pt-br';


const CalendarPage = () => {

    var today = new Date().toLocaleString('pt', {day: 'numeric', month: 'long', year: 'numeric'});


    return(
<div className={'d-flex justify-content-center'}>
{/* MENUADMIN **************************************************************************************************************************************** */}
        <MenuAdmin/>
            <div className={'calendar-page d-flex justify-content-center'}>
                <div>
                    <p className={'calendar-page-title'}>
                        Calendário demostrativo para consultar alguma data de entrega ou de solicitação
                    </p>
                    <p className={'calendar-page-subtitle'}>
                        Fique atento para as datas de solicitação dos clientes e as datas de entrega das artes para os clientes
                    </p>
                    <p className={'calendar-page-data'}>Hoje é {today}</p>
                </div>
               <Calendar onSelect={moment()} locale={'pt'} />
            </div>
</div>
    )
}

export { CalendarPage }