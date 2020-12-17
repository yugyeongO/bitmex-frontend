
import React from 'react';
import './Dashboard.css';
import icon from './newsletter-adobe-xd.svg'
function Dashboard() {
    return (
        <div className="Container">
            <header className="Header">
                <img src={icon} alt="logo"/>
                <nav className="nav">
                <div>
                    <i>알림</i>
                </div>
                <div>
                    <i>사용자</i>
                </div>
                </nav>
            </header>
            <h1>Dashboard</h1>
            <div className="Card_list">
				<article className="Card">
                    contents
				</article>
				</div>
            <footer className="Footer">
                <div className="Ticker">
                    <div>
                        <span>시장가</span>
                        <span className="num long">22326.16</span>
                    </div>
                    <div>
                        <span>진입가</span>
                        <span className="num bold">21673.16</span>
                    </div>
                    <div>
                        <span>청산가</span>
                        <span className="num short">9948.5</span>
                    </div>
                    <div>
                        <span>미실현손익(ROE %)</span>
                        <span className="num long">299.84%</span>
                    </div>
                    <div>
                        <span>실현손익</span>
                        <span className="num long">299.84XBT</span>
                    </div>
                </div>
            </footer>
        </div>
    );
  }
  
  export default Dashboard;