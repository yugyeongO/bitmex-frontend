
import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import './Home.css';
import icon from './newsletter-adobe-xd.svg'
import arrow from './arrow-dowload.svg'
import avatar from './avatar.svg'

import { Link } from 'react-router-dom'

function Home({history}) {
  const [id, setId] = useState("")
  const [cookie, setCookie, removeCookie] = useCookies(['userId']);

  useEffect(() => {
    if(cookie.userId === undefined) {
      setId("")
    }
    else{
      setId(cookie.userId);
    }
 }, [cookie.userId]);
const onHandleChange = (e) => {
  setId(e.target.value)
}
const onKeyPress = (e) => {
  if(e.key === "Enter"){
    onSubmit()
  }
}
 const onSubmit = () => {
   if (id !== ""){
    setCookie('userId', id, {maxAge: 2000});
    history.push("/dashboard")}
    else{
      alert("입력해주세요!")
    }
}
const onClickOtherUser = () => {
  removeCookie('userId')
  setId("")
}
  return (
    <div className="Container">
      <div className="Box">
        <div className="Box_wrap">
          <div className="Image">
            <img src={icon} alt=""/>
          </div>
          <div className="titleBox">
            <h1 className="title">Try trading Bitcoin automatically!</h1>
            <span className="title_desc">This Trading App uses a variety of algorithms to automatically trade Bitcoin(XBT) in BitMex</span>
          </div>
          {
            cookie.userId === undefined ?     
              <form onSubmit={onSubmit}>
            <div>
            <input size="1" type="text" placeholder="User ID" autoFocus required aria-required="true" onChange={onHandleChange} onKeyPress={onKeyPress}/>
          </div>
          <button type="submit" className="Button">
          <img style={{marginRight:"10px"}} src={arrow} alt=""/><span className="text">접속</span>
          </button>
          </form>
            
            : 
            <>
            <div>
            <Link to="/dashboard" className="Button">
              <img style={{marginRight:"10px", width:"20px", verticalAlign:"top"}} src={avatar} alt=""/>
            <span className="text">{id} 로 접속</span>
            </Link>
            </div>
            <div className="link_text" onClick={onClickOtherUser}>다른 사용자 아이디로 접속하기</div>
            </>
          }
          <span className="home_desc">*There is a risk of loss, but we do not take any responsibility for your loss.</span>
          </div>
      </div>
    </div>
    
  );
}

export default Home;