import React, { useState } from "react";
import { Link } from "react-router-dom";

import "../PasswordSearch/PasswordSearch.jsx"
import BSL_logo from '../../assets/logos/BSL_logo.svg'
import findPW_icon from '../../assets/icons/findPW.svg'
import signup_icon from '../../assets/icons/signup.svg'
import eye_icon from '../../assets/icons/eye.svg'
import eye_off_icon from '../../assets/icons/eye_off.svg'
import cancle_icon from '../../assets/icons/cancle.svg'
import checkbox_green from '../../assets/icons/checkbox_green.svg'
import checkbox_black from '../../assets/icons/checkbox_black.svg'
import notice_1 from '../../assets/notice/비밀번호를 입력해주세요..svg'
import notice_2 from '../../assets/notice/이메일을 입력해주세요..svg'
import notice_3 from '../../assets/notice/계정 정보가 잘못됐습니다..svg'


export default function PasswordSearch(props) {
  console.log(props);
  const [isEyeOpen, setIsEyeOpen] = useState(false);
  const [isRemember, setIsRemember] = useState(false);

  return (
  <div className='bg_shadow' onClick={props.onClickBg}>
    <div className='pwsearch_popup'>
      <Link to="/"><img className='logo' src={BSL_logo}></img></Link>
      <div className="title">비밀번호 찾기</div>
      <form>
        <div className='input_form'>
          <div className='input_line'>
            <div className={`email_input_0`}>
              <input ref={props.emailInputRef} placeholder='이메일' onChange={props.onEmailChange} value={props.email}/>
            </div>
            <div className="send_btn" onClick={props.onClickSendBtn}>번호받기</div>
          </div>
          <div className="input_notices">
            <div className='input_notice_1'>인증번호를 보냈습니다!</div>
            {/* <div className='input_notice_2'>이메일을 입력해주세요.</div>
            <div className='input_notice_3'>등록되지 않거나 형식에 맞지 않는 이메일입니다.</div> */}
          </div>
        </div>
        <div className='auth_form'>
        <div className='auth_line'>
          <div className={`auth_input`}>
            <input type={'number'} ref={props.emailInputRef} placeholder='인증번호' onChange={props.onAuthChange} value={props.authnum}/>
          </div>
          <div className='resend' onClick={props.onClickResendBtn}>재전송</div>
          <div className='timer'>{props.timer}</div>
          </div>
          <div className="notices">
            <div className='notice'>인증번호가 올바르지 않습니다!</div>
          </div>
          <div className='explain'>
              본인 계정의 이메일을 입력하세요.<br/> 
              본인 계정의 이메일로 인증번호 6자리를 보내드립니다.
          </div>
        </div>
        <div className="pw_change_btn">
          <button onClick={props.onSubmitHandler}>비밀번호 변경</button>
        </div>
      </form>
    </div>
  </div>
  )
}