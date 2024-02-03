import React,{useState, useRef, useEffect} from 'react'
import Signup from '../components/signup/Signup';
import {isEmailDuplication, isAuth, isNickDuplication, postSignup, postLogin, checkEmailDup, checkNickDup} from "../modules/api/account"



export default function SignupContainer(props) {

  const [isEyeOpen,setIsEyeOpen] = useState(false);
  const [isRemember,setIsRemember] = useState(false);

  const [email,setEmail] = useState("");
  const [emailState, setEmailState] = useState(0);

  const [auth,setAuth] = useState("");
  const [authState, setAuthState] = useState(0);

  const [pw,setPw] = useState("");
  const [pwState,setPwState] = useState(0);

  const [pwCheck,setPwCheck] = useState("");
  const [pwCheckState,setPwCheckState] = useState(0);
  
  const [nick,setNick] = useState("");
  const [nickState,setNickState] = useState(0);
  
  const onEmailChange = (e) => {
    setEmail(e.target.value);
    checkEmail();
  }
  const onAuthChange = (e) => {
    setAuth(e.target.value);
  }

  const onPwChange = (e) => {
    setPw(e.target.value);
    checkPw();
  }

  const onPwCheckChange = (e) => {
    setPwCheck(e.target.value);
    if(checkPwCheck())
    {setPwCheckState(2)}//비밀번호가 같습니다.
    else
    {setPwCheckState(1)}//비밀번호가 다릅니다.
  }

  const onNickChange = (e) => {
    setNick(e.target.value);
  }

  const onEmailBtnClick = (e) => {
    //이메일이 유효하면, 이메일 중복여부를 검사한다.
    if(checkEmail())
    {
      if(checkEmailDup(email))
      {setEmailState(2)}//중복된이메일입니다.
      else{setEmailState(3)}//이메일이 확인되었습니다.
    }
    else{setEmailState(1)}//이메일 형식이 올바르지 않습니다.
    console.log(emailState)
    
  }

  const onAuthBtnClick = (e) => {}

  const onNickBtnClick = (e) => {
    console.log(checkNick())
    if(checkNick())
    {
      if(checkNickDup(nick))
      {setNickState(2)}//중복된 닉네임입니다.
      else{setNickState(3)}//닉네임 사용 가능
    }
    else{setNickState(1)}//해당 닉네임을 사용할 수 없습니다.

  }

  const checkEmail = (e) => {
    const emailreg = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
    return(emailreg.test(email))}

  const checkPw = (e) => {
    const pwreg = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/
    return(pwreg.test(pw))}
  const checkPwCheck = ()=> {
    return(pw===pwCheck)
  }

  const checkNick = (e) => {
    const nickreg = /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣a-zA-Z0-9+-\_.].{3,10}$/
    return(nickreg.test(nick))}

  
    const onClickSignupBtn = (e)=>{
    e.preventDefault();
    
    if(postSignup(email,pw,nick)){
      //props.setState("login");
    } 
    else(
      console.log("회원가입 에러")
    )
}


  const onClickBg = (e) => {
    if(e.target.classList.contains("bg_shadow")){
      props.setState(null)
    }}
  
  return (
    <Signup
      onEmailChange={onEmailChange}
      onAuthChange={onAuthChange}
      onPwChange={onPwChange}
      onPwCheckChange={onPwCheckChange}
      onNickChange={onNickChange}
      onEmailBtnClick={onEmailBtnClick}
      onAuthBtnClick={onAuthBtnClick}
      onNickBtnClick={onNickBtnClick}
      email={email}
      emailState={emailState}
      auth={auth}
      pw={pw}
      pwCheck={pwCheck}
      nick={nick}
      onClickSignupBtn={onClickSignupBtn}
      onClickBg={onClickBg}
    />
  )

}