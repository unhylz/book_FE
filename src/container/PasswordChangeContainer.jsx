import React, { useState, useRef, useEffect } from "react";
import PasswordChange from "../components/passwordChange/PasswordChange";
import { postPwChange } from "../modules/api/account";

export default function PasswordChangeContainer(props) {
  const [pw, setPw] = useState("");
  const [pwEye, setPwEye] = useState(true);
  const [pwState, setPwState] = useState(0);

  const [pwCheck, setPwCheck] = useState("");
  const [pwCheckEye, setPwCheckEye] = useState(true);
  const [pwCheckState, setPwCheckState] = useState(0);

  const onSubmitPwChange = (e) => {
    e.preventDefault();
    if (pw===pwCheck)
    {
      props.setState("login");
      const user_id = 4; //context에서 받아오기로 수정
      postPwChange(pw, user_id);
    }

  };

  useEffect(()=>{
    if (testPw(pw)) {
      setPwState(0);
    } else {
      setPwState(1);
    }
  },[pw])

  useEffect(()=>{
    if (pw === pwCheck) {
      setPwCheckState(2);
    } else {
      setPwCheckState(1);
    }
    console.log("pwCheckState",pwCheckState)
  },[pwCheck,pw])

  const onPwChange = (e) => {
    setPw(e.target.value);
    console.log("pw",pw)
    //유효성검사
    if (testPw(pw)) {
      setPwState(0);
    } else {
      setPwState(1);
    }
  };
  const onPwEyeClick = (e) => {
    if (pwEye) {
      setPwEye(false);
    } else {
      setPwEye(true);
    }
    console.log("아아아");
  };

  const onPwCheckChange = (e) => {
    setPwCheck(e.target.value);
    setPwCheckEye(e.target.value)
    console.log("pwCheck",pwCheck)
    //유효성검사
    if (pw === pwCheck) {
      setPwCheckState(1);
    } else {
      setPwCheckState(2);
    }
  };
  const onPwCheckEyeClick = (e) => {
    if (pwCheckEye) {
      setPwCheckEye(false);
    } else {
      setPwCheckEye(true);
    }
  };

  const testPw = (pw) => {
    const pwreg = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;
    return pwreg.test(pw);
  };

  const onClickBg = (e) => {
    if (e.target.classList.contains("bg_shadow")) {
      props.setState(null);
    }
  };

  return (
    <PasswordChange
      onPwChange={onPwChange}
      onPwEyeClick={onPwEyeClick}
      onPwCheckChange={onPwCheckChange}
      onPwCheckEyeClick={onPwCheckEyeClick}
      onSubmitPwChange={onSubmitPwChange}
      onClickBg={onClickBg}
      setState={props.setState}
      pwCheck={pwCheck}
      pw={pw}
      pwState={pwState}
      pwCheckState={pwCheckState}
      pwEye={pwEye}
      setPwEye={setPwEye}
      pwCheckEye={pwCheckEye}
      setPwCheckEye={setPwCheckEye}
    />
  );
}
