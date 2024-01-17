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
  <div className='bg_shadow'>
    <div className='signup_popup'>

      <form>
        <Link to="/"><img className='logo' src={BSL_logo}></img></Link>

          <div className={`email_form`}>

            <div className='email_input_line'>
              <div className={`email_input_${props.notice}`}>
                <input ref={props.pwInputRef} type={isEyeOpen ? 'text':'password'} placeholder='비밀번호' onChange={props.onPwChange} value={props.pw}/>
                {isEyeOpen ?
                <img className='eye' src={eye_icon} onClick={()=>{setIsEyeOpen(false)}}/>
                :<img className='eye_off' src={eye_off_icon} onClick={()=>{setIsEyeOpen(true)}}/>
                }
                {isEyeOpen ?
                <img className='check' src={check_icon} onClick={()=>{setIsEyeOpen(false)}}/>
                :<img className='error' src={error_icon} onClick={()=>{setIsEyeOpen(true)}}/>
                }
              </div>
              <div className='check_btn'>주소확인</div>
            </div>

            <div className='email_notice'>
            <p>{'네이버 이메일로만 가입이 가능합니다.'}<br/>
            {'이메일: 5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용가능합니다.'}</p>
            </div>
            <div className='auth'>
              <div className='auth_input_line'>
                <div className={`auth_input_${props.notice}`}>
                  <input ref={props.pwInputRef} type={isEyeOpen ? 'text':'password'} placeholder='비밀번호' onChange={props.onPwChange} value={props.pw}/>
                  {isEyeOpen ?
                  <img className='eye' src={eye_icon} onClick={()=>{setIsEyeOpen(false)}}/>
                  :<img className='eye_off' src={eye_off_icon} onClick={()=>{setIsEyeOpen(true)}}/>
                  }
                  {isEyeOpen ?
                  <img className='check' src={check_icon} onClick={()=>{setIsEyeOpen(false)}}/>
                  :<img className='error' src={error_icon} onClick={()=>{setIsEyeOpen(true)}}/>
                  }
                </div>
                  <div className='auth_check_btn'>인증확인</div>
              </div>
                <div className='warn_notice'>이메일, 인증코드를 입력해주세요.</div>
            </div>
          </div>

          <div className={`password_form`}>
            <div className={`pw_input_${props.notice}`}>
              <input ref={props.pwInputRef} type={isEyeOpen ? 'text':'password'} placeholder='비밀번호' onChange={props.onPwChange} value={props.pw}/>
              {isEyeOpen ?
              <img className='eye' src={eye_icon} onClick={()=>{setIsEyeOpen(false)}}/>
              :<img className='eye_off' src={eye_off_icon} onClick={()=>{setIsEyeOpen(true)}}/>
              }
              {isEyeOpen ?
              <img className='check' src={check_icon} onClick={()=>{setIsEyeOpen(false)}}/>
              :<img className='error' src={error_icon} onClick={()=>{setIsEyeOpen(true)}}/>
              }
            </div>
            <div className='password_input'></div>
            <div className='password_notice'>
              <p>8~16자의 영문 대/소문자, 숫자, 특수문자를 사용해 주세요.</p>
            </div>
            <div className='warn_notice'>비밀번호를 입력해주세요.</div>
            <div className={`pwcheck_input_${props.notice}`}>
              <input ref={props.pwInputRef} type={isEyeOpen ? 'text':'password'} placeholder='비밀번호' onChange={props.onPwChange} value={props.pw}/>
              {isEyeOpen ?
              <img className='eye' src={eye_icon} onClick={()=>{setIsEyeOpen(false)}}/>
              :<img className='eye_off' src={eye_off_icon} onClick={()=>{setIsEyeOpen(true)}}/>
              }
              {isEyeOpen ?
              <img className='check' src={check_icon} onClick={()=>{setIsEyeOpen(false)}}/>
              :<img className='error' src={error_icon} onClick={()=>{setIsEyeOpen(true)}}/>
              }
            </div>
            <div className='warn_notice'>비밀번호를 확인해주세요.</div>
          </div>

          <div className={`nickname_form`}>
          <div className={`pw_input_${props.notice}`}>
              <input ref={props.pwInputRef} type={isEyeOpen ? 'text':'password'} placeholder='비밀번호' onChange={props.onPwChange} value={props.pw}/>
              {isEyeOpen ?
              <img className='check' src={check_icon} onClick={()=>{setIsEyeOpen(false)}}/>
              :<img className='error' src={error_icon} onClick={()=>{setIsEyeOpen(true)}}/>}
            </div>
            <div className='nickname_check_btn'>중복확인</div>
            <div className='warn_notice'>닉네임을 입력해주세요.</div>
            <div className='nickname_notice'>
              <p>닉네임은 공백없이 한글, 영문, 숫자로 3~10자 이내여야 합니다.</p>
              <p>숫자만 사용된 닉네임, 특수문자는 사용할 수 없습니다.</p>
              <p>악성, 비하, 욕설, 성적 닉네임은 영구차단 될 수 있습니다.</p>
            </div>
          </div>

          <div className='signup_btn'>회원가입</div> 

      </form>
    </div>
  </div>
  )
}
 