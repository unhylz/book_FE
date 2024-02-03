import React, { useState } from 'react'
import { Link } from 'react-router-dom'


import "./Signup.scss";
import BSL_logo from '../../assets/logos/BSL_logo.svg'
import eye_icon from '../../assets/icons/eye.svg'
import eye_off_icon from '../../assets/icons/eye_off.svg'
import error_icon from '../../assets/icons/error.svg'
import check_icon from '../../assets/icons/check.svg'



export default function Signup(props) 
{
  console.log(props)
  const [isEyeOpen,setIsEyeOpen] = useState(false);
  const [isRemember,setIsRemember] = useState(false);

  return (
  <div className='bg_shadow' onClick={props.onClickBg}>
    <div className='signup_popup'>

      <form>
        <Link to="/"><img className='logo' src={BSL_logo}></img></Link>

          <div className={`email_form`}>

            <div className='email_input_line'>
              <div className={`email_input`}>
                <input ref={props.pwInputRef} placeholder='이메일' onChange={props.onEmailChange} value={props.email}/>
                {isEyeOpen ?
                <img className='check' src={check_icon} onClick={()=>{}}/>
                :<img className='error' src={error_icon} onClick={()=>{}}/>
                }
              </div>
              <div className='check_btn' onClick={props.onEmailBtnClick}>이메일확인</div>
            </div>

            <div className='email_notice'>
            <div>{'네이버 이메일로만 가입이 가능합니다.'}<br/>
            {'이메일: 5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용가능합니다.'}</div>
            {
              [<div className='email_notice_0'></div>,
              <div className='email_notice_1'>이메일 형식이 올바르지 않습니다.</div>,
              <div className='email_notice_2'>중복된 이메일 입니다.</div>,
              <div className='email_notice_3'>이메일이 확인되었습니다.</div>
              ][props.emailState]
            }
            </div>
            <div className='auth'>
              <div className='auth_input_line'>
                <div className={`auth_input`}>
                  <input ref={props.pwInputRef} type='number' placeholder='인증코드' onChange={props.onAuthChange} value={props.auth}/>
                  {isEyeOpen ?
                  <img className='eye' src={eye_icon} onClick={()=>{}}/>
                  :<img className='eye_off' src={eye_off_icon} onClick={()=>{}}/>
                  }
                  {props.authState===0 ?
                  <img className='check' src={check_icon} onClick={()=>{}}/>
                  :<img className='error' src={error_icon} onClick={()=>{}}/>
                  }
                </div>
                  <div className='auth_check_btn'>인증확인</div>
              </div>
              <div className='auth_notice'>
                {[<div className='auth_notice_0'></div>,
                <div className='auth_notice_1'>인증코드를 보냈습니다!</div>,
                <div className='auth_notice_2'>인증번호가 올바르지 않습니다!</div>,
                <div className='auth_notice_3'>인증이 확인되었습니다!</div>]
                [props.authState]
                }
              </div>
            </div>
          </div>

          <div className={`pw_form`}>
            <div className={`pw_input`}>
              <input ref={props.pwInputRef} type={isEyeOpen ? 'text':'password'} placeholder='비밀번호' onChange={props.onPwChange} value={props.pw}/>
              {isEyeOpen ?
              <img className='eye' src={eye_icon} onClick={()=>{}}/>
              :<img className='eye_off' src={eye_off_icon} onClick={()=>{}}/>
              }
              {isEyeOpen ?
              <img className='check' src={check_icon} onClick={()=>{}}/>
              :<img className='error' src={error_icon} onClick={()=>{}}/>
              }
            </div>
              
            <div className='pw_notice'>
              <div>8~16자의 영문 대/소문자, 숫자, 특수문자를 사용해 주세요.</div>
              {[
              <div className='pw_notice_0'></div>,
              <div className='pw_notice_1'>비밀번호 양식이 올바르지 않습니다.</div>]
              [props.pwstate]}
            </div>
            <div className='pwcheck_input'>
              <input ref={props.pwInputRef} type={isEyeOpen ? 'text':'password'} placeholder='비밀번호 확인' onChange={props.onPwCheckChange} value={props.pwCheck}/>
              {isEyeOpen ?
              <img className='eye' src={eye_icon} onClick={()=>{}}/>
              :<img className='eye_off' src={eye_off_icon} onClick={()=>{}}/>
              }
              {isEyeOpen ?
              <img className='check' src={check_icon} onClick={()=>{}}/>
              :<img className='error' src={error_icon} onClick={()=>{}}/>
              }
            </div>
            <div className='pwcheck_notice'>
            {[
              <div className='warn_notice_0 '></div>,
              <div className='warn_notice_1 '>비밀번호가 다릅니다!</div>,
              <div className='warn_notice_2'>비밀번호가 같습니다!</div>]
              [props.pwCheckState]}
            </div>

          </div>

          <div className={`nickname_form`}>
            <div className='nick_input_line'>
              <div className={`nick_input`}>
                <input ref={props.pwInputRef} placeholder='닉네임' onChange={props.onNickChange} value={props.nick}/>
                {isEyeOpen ?
                <img className='check' src={check_icon} onClick={()=>{}}/>
                :<img className='error' src={error_icon} onClick={()=>{}}/>}
              </div>
              <div className='nick_check_btn' onClick={props.onNickBtnClick}>중복확인</div>
            </div>
            
            <div className='nick_notice'>
              <div>닉네임은 공백없이 한글, 영문, 숫자로 3~10자 이내여야 합니다.<br/>
                숫자만 사용된 닉네임, 특수문자는 사용할 수 없습니다.<br/>
                악성, 비하, 욕설, 성적 닉네임은 영구차단 될 수 있습니다.</div>
                {[
                <div className='nick_notice_0'></div>,
                <div className='nick_notice_1'>해당 닉네임은 사용할 수 없습니다!</div>,
                <div className='nick_notice_2'>중복된 닉네임은 사용할 수 없습니다.</div>,
                <div className='nicEk_notice_3'>닉네임을 사용이 가능합니다!</div>,
                ][props.nickState]}
            </div>
          </div>

          <div className='signup_btn' onClick={props.onClickSignupBtn}>회원가입</div> 

      </form>
    </div>
  </div>
  )
}
 