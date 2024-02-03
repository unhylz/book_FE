import React,{useState, useRef, useEffect} from 'react'
import PasswordSearch from '../components/passwordSearch/PasswordSearch';

export default function PasswordSearchContainer(props) {
  
  const [email,setEmail] = useState("");
  const [authnum,setAuthnum] = useState("");
  const [timer,setTimer] = useState("05:00");

  let sec = 300;

  useEffect(() => {
    const id = setInterval(async () => {
      if(sec===0){sec=300}
      else{sec=sec-1}
      setTimer(sec2timer(sec)); 
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const sec2timer = (sec)=>{
    let t_min = Math.floor(sec/60);
    let t_sec = sec%60;
    let r_min = "";
    let r_sec = "";
    if(t_min<10){r_min = `0${t_min}`}
    else{r_min = `${t_min}`}
    if(t_sec<10){r_sec = `0${t_sec}`}
    else{r_sec = `${t_sec}`}
    return `${r_min}:${r_sec}`
  }

  const emailInputRef = useRef(null);
  const emailInputFocus = ()=>{
    emailInputRef.current.focus();
  }
  const pwInputRef = useRef(null);
  const pwInputFocus = ()=>{
    pwInputRef.current.focus();
  }
  
  const onClickSendBtn = ()=>{
    //email을 백엔드로 보내는 함수
  }

  const onClickResendBtn = ()=>{
    //인증번호 재요청 함수
  }

  const onSubmitHandler = (e)=>{
    //인증번호 검증 함수; await
    e.preventDefault();
    console.log("인증번호 검사 및 제출합니다.");
    props.setState("passwordchange");

  }

  const onEmailChange = (e)=>{
    setEmail(e.target.value);
  }

  const onAuthChange = (e)=>{
    setAuthnum(e.target.value);
  }

  const onClickBg = (e) => {
    if(e.target.classList.contains("bg_shadow")){
      props.setState(null)
    }}




  return (
    <PasswordSearch
      email={email}
      authnum={authnum}
      timer={timer}
      onClickSendBtn={onClickSendBtn}
      onClickResendBtn={onClickResendBtn}
      onSubmitHandler={onSubmitHandler}
      onEmailChange={onEmailChange}
      onAuthChange={onAuthChange}
      onClickBg={onClickBg}
    />
  )
}

//props.onPwCancleHandler

