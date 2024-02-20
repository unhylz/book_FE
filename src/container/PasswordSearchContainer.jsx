import React, { useState, useRef, useEffect, useContext } from "react";
import PasswordSearch from "../components/PasswordSearch/PasswordSearch";
import { postCheckCode, sendAuth } from "../modules/api/account";
import { UserContext } from "../context/Login";

export default function PasswordSearchContainer(props) {
  const [email, setEmail] = useState("");
  const [emailState, setEmailState] = useState(0);


  const [authnum, setAuthnum] = useState("");
  const [authState,setAuthState] = useState(0);

  const [timer, setTimer] = useState("05:00");
  const [isTimerOn, setIsTimerOn] = useState(false);
  const [test, setTest] = useState();

  const user_context = useContext(UserContext);

  let sec = 300;

  useEffect(() => {
    if(isTimerOn===true)
    {
      const id = setInterval(async () => {
        if (sec === 0) {
          sec = 300;
        } else {
          sec = sec - 1;
        }
        setTimer(sec2timer(sec));
        console.log(user_context)
      }, 1000);
      return () => clearInterval(id);
    }
  }, [isTimerOn]);

  const sec2timer = (sec) => {
    let t_min = Math.floor(sec / 60);
    let t_sec = sec % 60;
    let r_min = "";
    let r_sec = "";
    if (t_min < 10) {
      r_min = `0${t_min}`;
    } else {
      r_min = `${t_min}`;
    }
    if (t_sec < 10) {
      r_sec = `0${t_sec}`;
    } else {
      r_sec = `${t_sec}`;
    }
    return `${r_min}:${r_sec}`;
  };

  const emailInputRef = useRef(null);
  const emailInputFocus = () => {
    emailInputRef.current.focus();
  };
  const pwInputRef = useRef(null);
  const pwInputFocus = () => {
    pwInputRef.current.focus();
  };

  const onClickSendBtn = async() => {
    //이메일 검사
    //email을 백엔드로 보내는 함수
    console.log("email", email);
    const res = await sendAuth(email);
    console.log(res,res,res)
    setEmailState(2)
    setIsTimerOn(true); 
  };

  const onClickResendBtn = () => {
    //인증번호 재요청 함수
  };
  const onSubmitHandler = async (e) => {
    //인증번호 검증 함수; await
    e.preventDefault();
    console.log("인증번호 검사 및 제출합니다.");

    const userId = await postCheckCode(email, authnum);
    if (userId !== 'err') {
      props.setState("passwordchange");
      console.log('user_id',userId)
      user_context.changeId(userId)
      setAuthState(2)
    } else {  
      console.log("인증번호 틀림.");
      setAuthState(1)
    }
  };

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const onAuthChange = (e) => {
    setAuthnum(e.target.value);
  };

  const onClickBg = (e) => {
    if (e.target.classList.contains("bg_shadow")) {
      props.setState(null);
    }
  };

  return (
    <PasswordSearch
      email={email}
      emailState={emailState}
      authnum={authnum}
      authState={authState}
      timer={timer}
      onClickSendBtn={onClickSendBtn}
      onClickResendBtn={onClickResendBtn}
      onSubmitHandler={onSubmitHandler}
      onEmailChange={onEmailChange}
      onAuthChange={onAuthChange}
      onClickBg={onClickBg}
      setState={props.setState}
    />
  );
}

//props.onPwCancleHandler
