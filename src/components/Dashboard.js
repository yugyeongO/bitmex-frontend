
import React, { useEffect } from 'react';
import './Dashboard.css';
import icon from './logo.svg';
import alarm from './alarm.svg';
import user from './user.svg';

import {
  getMarket,
  useExchangeDispatch,
  useExchangeState,
} from '../context/DashboardContext';
import Chart from './Chart'


function Dashboard() {
    const dispatch = useExchangeDispatch();
    const state = useExchangeState();
    const { data: realtimeData } = state.realtimeData;
    useEffect(() => {
      getMarket(dispatch);
    }, [dispatch]);
    if (realtimeData){
        console.log(realtimeData)
        // console.log(data)
  }
  
    return (
        <div className="Container">
            <header className="Header">
                <img src={icon} alt="logo"/>
                <nav className="nav">
                <div>
                    <i className="btn_icon">
                        <img src={alarm} alt="alarm"/>
                    </i>
                </div>
                <div>
                    <i className="btn_icon">
                        <img src={user} alt="user"/>
                    </i>
                </div>
                </nav>
            </header>
            <h1 className="blind">Dashboard</h1>
            <div className="Card_list">
                <article>
                    <h2 className="title">미실현손익(ROE%)</h2>
                    <div className="Card">
                        <span className="label">229.84%</span>
                        <Chart></Chart>
                    </div>
                </article>
                <article>
                    <h2 className="title">실현손익</h2>
                    <div className="Card">
                        <span className="label">229.84XBT</span>
                        <Chart></Chart>
                    </div>
                </article>
                <article>
                    <h2 className="title">최근체결가</h2>
                    <div className="Card">
                        <Chart></Chart>
                    </div>
                </article>
                <article>
                    <h2 className="title">이동평균선</h2>
                    <div className="Card">
                        <Chart></Chart>
                    </div>
                </article>
                <article>
                    <h2 className="title">볼린저밴드</h2>
                    <div className="Card">
                        <Chart></Chart>
                    </div>
                </article>
                <article>
                    <h2 className="title">RSI</h2>
                    <div className="Card">
                        <Chart></Chart>
                    </div>
                </article>
			</div>
            <footer className="Footer">
                <div className="Ticker">
                    <div>
                        <span className="name">시장가</span>
                        <span className="num long">22326.16</span>
                    </div>
                    <div>
                        <span className="name">진입가</span>
                        <span className="num bold">21673.16</span>
                    </div>
                    <div>
                        <span className="name">청산가</span>
                        <span className="num short">9948.5</span>
                    </div>
                    <div>
                        <span className="name">미실현손익(ROE %)</span>
                        <span className="num long">299.84%</span>
                    </div>
                    <div>
                        <span className="name">실현손익</span>
                        <span className="num long">299.84XBT</span>
                    </div>
                </div>
            </footer>
        </div>
    );
  }
  
  export default Dashboard;