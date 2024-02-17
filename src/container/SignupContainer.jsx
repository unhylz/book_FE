import React,{useState, useRef, useEffect} from 'react'
import Signup from '../components/signup/Signup';
import {isEmailDuplication, isAuth, isNickDuplication, postSignup, postLogin, checkEmailDup, checkNickDup, sendAuth, checkAuth, testA,postCheckCode, postCheckSignupCode} from "../modules/api/account"



export default function SignupContainer(props) {

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
  


  //timer
  const [timer,setTimer] = useState("05:00");
  let sec = 300;
  useEffect(() => {
    const id = setInterval(async  () => {
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

  const onEmailChange = (e) => {
    setEmail(e.target.value);
    checkEmail();
  }
  const onAuthChange = (e) => {
    setAuth(e.target.value);
  }

  const onPwChange = (e) => {
    setPw(e.target.value);
    console.log(pw,pwState);
  }
  const isPwMounted = useRef(false);
  useEffect(()=>{
    if(isPwMounted.current)
    {
      if(checkPw()){setPwState(2)}
      else{setPwState(1)}
    }
    else {isPwMounted.current = true;}
  },[pw])


  const onPwCheckChange = (e) => {
    setPwCheck(e.target.value);
    console.log(pw,pwCheck);
  }
  const isPwCheckMounted = useRef(false);
  useEffect(()=>{
    if(isPwCheckMounted.current)
    {
      if(pw===pwCheck){setPwCheckState(2)}
      else{setPwCheckState(1)}
    }
    else {isPwCheckMounted.current = true;}
  },[pwCheck,pw])



  const onNickChange = (e) => {
    setNick(e.target.value);
  }

  const onEmailBtnClick = async (e) => {
    //이메일이 유효하면, 이메일 중복여부를 검사한다.
    if(checkEmail())
    {
      const isEmailTrue = await checkEmailDup(email)
      console.log(isEmailTrue)
      if(isEmailTrue){
        setEmailState(3)//이메일이 확인되었습니다.
        sendAuth(email);
        setAuthState(1);//인증코드를 보냈습니다.(인증코드 칸)
        
      }
      else{setEmailState(2)}//중복된이메일입니다.
    }
    else{setEmailState(1)}//이메일 형식이 올바르지 않습니다.
    console.log(emailState)
    
    
  }

  const onAuthBtnClick = async (e) => {
    try{
      const checkAuth = await postCheckSignupCode(email,auth)
      if(checkAuth===true){
        console.log("인증번호가 확인됨.")
        setAuthState(3)//인증이 확인되었습니다.
      }
      else{
        setAuthState(2);//올바르지 않음
      }
    }
    catch{}
    
  }

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
    if (pwCheck.length==0)
    {return false}
    else{return(pw===pwCheck)}
  }

  const checkNick = (e) => {
    const nickreg = /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣a-zA-Z0-9+-\_.].{3,10}$/
    return(nickreg.test(nick))}


  const postContainerSignup = async()=>{
    try{
      const isSignup = await postSignup(email,pw,nick);
      if(isSignup===true){
        console.log("회원가입 성공")
        props.setState("login")
      }
      else{
        console.log("회원가입 실패")
      }
    }
    catch{
      console.log("예기치못한 에러")
    }
  }
  
  const onClickSignupBtn = (e)=>{
    e.preventDefault();
    if(emailState===3){
      if(authState===3){
        if(pwState===2){
          if(pwCheckState===2){
            if(nickState===3){
              postContainerSignup();
              console.log("가능");
            }else{console.log("닉네임 오류")}
          }else{console.log("비밀번호확인 오류")}
        }else{console.log("비밀번호 오류")}
      }else{console.log("인증 오류")}
    }else{console.log("이메일 오류")}
  }


  const onClickBg = (e) => {
    if(e.target.classList.contains("bg_shadow")){
      props.setState(null)
    }}
  
  return (
    <Signup
      onEmailChange={onEmailChange}
      onAuthChange={onAuthChange}

      pw={pw}
      pwState={pwState}
      onPwChange={onPwChange}

      pwCheck={pwCheck}
      pwCheckState={pwCheckState}
      onPwCheckChange={onPwCheckChange}

      onNickChange={onNickChange}
      onEmailBtnClick={onEmailBtnClick}
      onAuthBtnClick={onAuthBtnClick}
      onNickBtnClick={onNickBtnClick}
      email={email}
      emailState={emailState}
      
      auth={auth}
      authState={authState}
      
      nick={nick}
      nickState={nickState}
      onClickSignupBtn={onClickSignupBtn}
      onClickBg={onClickBg}

      timer={timer}
    />
  )

}