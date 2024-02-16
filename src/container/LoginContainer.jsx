import React, { useState, useRef, useEffect, useContext } from "react";
import Login from "../components/login/Login";
import { getSentimen, getSentiment, isLoginTrue, postLogin} from "../modules/api/account";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/Login";
//import { useLoginContext } from "../modules/api/contexts/LoginContext"; // 컨텍스트 가져오기

export default function LoginContainer(props) {
  //const { login, setIsLoggedIn } = useLoginContext(); // 컨텍스트에서 setIsLoggedIn 가져오기


  const [isEyeOpen, setIsEyeOpen] = useState(false);
  const [isRemember, setIsRemember] = useState(false);

  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [remember, setRemember] = useState(false);
  const [notice, setNotice] = useState(0);

  const navigate = useNavigate();

  const emailInputRef = useRef(null);
  const emailInputFocus = () => {
    emailInputRef.current.focus();
  };
  const pwInputRef = useRef(null);
  const pwInputFocus = () => {
    pwInputRef.current.focus();
  };

  const user_context = useContext(UserContext);
  console.log("by just",user_context);
//   useEffect(()=>{user_context.setLogin(1,"data");
//   console.log(user_context)
// },[])
  


  const onSubmitHandler = async(e) => {
    e.preventDefault()
    console.log("hihihi");

    if (email === "") {
      setNotice(2);
      emailInputFocus();
    } else if (pw === "") {
      setNotice(1);
      pwInputFocus();
    } else {
      //로그인 api 함수 호출
      console.log(`email:${email}, pw:${pw}, remember:${remember} 로그인을 시도합니다.`);
      const res = await postLogin(email,pw);
      console.log("res: ", res);
      if ("안녕하세요" === res.data.status_message) {
        //setIsLoggedIn(true); // setIsLoggedIn을 컨텍스트로 전달
        setNotice(0);
        console.log("idtype:",typeof(res.data.user_id))
        console.log("emailtype:",typeof(res.data.email))
      
        user_context.setLogin(res.data.user_id,res.data.email)
        setTimeout(()=>{console.log("afterapi",user_context)},10000)
        props.setState(null)
      } else {
        setNotice(3);
        emailInputFocus();
      }
    }
  };

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const onPwChange = (e) => {
    setPw(e.target.value);
  };

  const onEmailCancleHandler = (e) => {
    setEmail("");
    emailInputFocus();
  };

  const onPwCancleHandler = (e) => {
    setPw("");
    pwInputFocus();
    //console.log("pw_init",pw);
  };

  const onClickPwSearchBtn = (e) => {
    props.setState("passwordsearch");
    console.log("onClickPwSearchBtn");
  };

  const onClickSignupBtn = (e) => {
    props.setState("signup");
    console.log("onClickSignupBtns");
  };

  const onClickBg = (e) => {
    if(e.target.classList.contains("bg_shadow")){
      props.setState(null)
    }
  }

  return (
    <Login
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
      onClickPwSearchBtn={onClickPwSearchBtn}
      onClickSignupBtn={onClickSignupBtn}
      onClickBg={onClickBg}
      setState={props.setState}
    />
  );
}

//props.onPwCancleHandler
