import React,{useState, useRef} from 'react'
import PasswordSearch from '../components/PasswordSearch/PasswordSearch';

export default function PasswordSearchContainer() {
  
  const [isEyeOpen,setIsEyeOpen] = useState(false);
  const [isRemember,setIsRemember] = useState(false);

  const [email,setEmail] = useState("");
  const [pw,setPw] = useState("");
  const [remember,setRemember] = useState(false);
  const [notice,setNotice] = useState(0);


  const emailInputRef = useRef(null);
  const emailInputFocus = ()=>{
    emailInputRef.current.focus();
  }
  const pwInputRef = useRef(null);
  const pwInputFocus = ()=>{
    pwInputRef.current.focus();
  }
  

  const onSubmitHandler = (e)=>{
    e.preventDefault()
    console.log("hihihi")
    
    if(email===""){
      setNotice(2);
      emailInputFocus();
      
    }
    else if(pw===""){
      setNotice(1);
      pwInputFocus();
    }
    else{
      //로그인 api 함수 호출
      console.log(`email:${email}, pw:${pw}, remember:${remember} 로그인 되었습니다.`)
      let res="err"
      if(res === "err"){
        setNotice(3);
        emailInputFocus();
      }
      else{setNotice(0)}
  }}

  const onEmailChange = (e)=>{
      setEmail(e.target.value)
  }

  const onPwChange = (e)=>{
      setPw(e.target.value)
  }
  
  const onEmailCancleHandler = (e)=>{
    setEmail("");
    emailInputFocus();
  }

  const onPwCancleHandler = (e)=>{
    setPw("");
    pwInputFocus();
    //console.log("pw_init",pw);
  }


  return (
    <PasswordSearch
      onSubmitHandler={onSubmitHandler}
      onEmailChange={onEmailChange}
      onPwChange={onPwChange}
      onEmailCancleHandler={onEmailCancleHandler}
      onPwCancleHandler={onPwCancleHandler}
      notice={notice}
      pw={pw}
      email={email}
      emailInputRef={emailInputRef}
      emailInputFocus={emailInputFocus}
      pwInputRef={pwInputRef}
      pwInputFocus={pwInputFocus}
    />
  )
}

//props.onPwCancleHandler
