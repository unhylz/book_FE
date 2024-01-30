import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import "./PasswordChange.scss"

import BSL_logo from '../../assets/logos/BSL_logo.svg'
import findPW_icon from '../../assets/icons/findPW.svg'
import signup_icon from '../../assets/icons/signup.svg'
import eye_icon from '../../assets/icons/eye.svg'
import eye_off_icon from '../../assets/icons/eye_off.svg'
import cancle_icon from '../../assets/icons/cancle.svg'
import error_icon from '../../assets/icons/error.svg'
import check_icon from '../../assets/icons/check.svg'

export default function PasswordChange(props) 
{
  console.log(props)
  const [isEyeOpen,setIsEyeOpen] = useState(false);
  const [isRemember,setIsRemember] = useState(false);

  return (
  <div className='bg_shadow'>
    <div className='pwchange_popup'>
      <Link to="/"><img className='logo' src={BSL_logo}></img></Link>
      <h2>비밀번호 변경</h2>
      <form>
        <div className='pw_form'>
          <div className='pw_line'>
            <div className={`pw_input`}>
                <input
                  ref={props.pwInputRef}
                  type={isEyeOpen ? "text" : "password"}
                  placeholder="비밀번호"
                  onChange={props.onPwChange}
                  value={props.pw}
                />

                {isEyeOpen 
                ?(<img className="eye" src={eye_icon} onClick={() => {setIsEyeOpen(false);}}/>) 
                :(<img className="eye_off" src={eye_off_icon} onClick={() => {setIsEyeOpen(true)}}/>)}

                {false
                ?<img className="error" src={error_icon}/> 
                :<img className="check" src={check_icon}/>}
            </div>
          </div>
            <div className='notice'>
              <div className='notice_0'></div>
              <div className='notice_1'>비밀번호 양식이 맞지 않습니다. *특수문자 미사용</div>
              {/* <div className='notice_2'>지난 비밀번호와 같습니다. 다른 비밀번호를 사용해주세요.</div> */}
            </div>
        </div>
        <div className='pwcheck_form'>
          <div className='pwcheck_line'>
            <div className={`pwcheck_input`}>
                <input
                  ref={props.pwInputRef}
                  type={isEyeOpen ? "text" : "password"}
                  placeholder="비밀번호확인"
                  onChange={props.onPwChange}
                  value={props.pw}
                />

                {isEyeOpen 
                ?(<img className="eye" src={eye_icon} onClick={() => {setIsEyeOpen(false);}}/>) 
                :(<img className="eye_off" src={eye_off_icon} onClick={() => {setIsEyeOpen(true)}}/>)}

                {false
                ?<img className="error" src={error_icon}/> 
                :<img className="check" src={check_icon}/>}
            </div>
          </div>
            <div className='notice'>
              <div className='notice_0'></div>
              <div className='notice_1'>확인 버튼을 누르면 비밀번호가 변경됩니다!</div>
            </div>
        </div>
        <div className='explain'>
        8~16자의 영문 대/소문자, 숫자, 특수문자를 사용해주세요.<br/>
        새 비밀번호를 등록하여 비밀번호를 재설정 합니다.
        </div>
        <button className='check_btn'>확인</button>
      </form>
    </div>  
  </div>
  )
}
