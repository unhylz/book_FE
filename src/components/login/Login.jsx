import React, { useState } from "react";

import "./Login.scss";
import BSL_logo from "../../assets/logos/BSL_logo.svg";
import findPW_icon from "../../assets/icons/findPW.svg";
import signup_icon from "../../assets/icons/signup.svg";
import eye_icon from "../../assets/icons/eye.svg";
import eye_off_icon from "../../assets/icons/eye_off.svg";
import cancle_icon from "../../assets/icons/cancle.svg";
import checkbox_green from "../../assets/icons/checkbox_green.svg";
import checkbox_black from "../../assets/icons/checkbox_black.svg";

export default function Login() {
  const [isEyeOpen, setIsEyeOpen] = useState(false);
  const [isRemember, setIsRemember] = useState(false);

  return (
    <div className="bg_shadow">
      <div className="login_popup">
        <img className="logo" src={BSL_logo}></img>
        <h2>로그인</h2>
        <form>
          <div className="email_input">
            <input placeholder="이메일" />
            <img className="cancle" src={cancle_icon} />
          </div>
          <div className="pw_input">
            <input type="password" placeholder="비밀번호" />
            {isEyeOpen ? (
              <img
                className="eye"
                src={eye_icon}
                onClick={() => {
                  setIsEyeOpen(false);
                }}
              />
            ) : (
              <img
                className="eye_off"
                src={eye_off_icon}
                onClick={() => {
                  setIsEyeOpen(true);
                }}
              />
            )}
            <img className="cancle" src={cancle_icon} />
          </div>
          <div
            className="remember"
            onClick={() => {
              setIsRemember(isRemember ? false : true);
            }}
          >
            {isRemember ? (
              <img src={checkbox_green} />
            ) : (
              <img src={checkbox_black} />
            )}
            자동로그인
          </div>
          <input className="submit_input" type="submit" value="로그인" />
        </form>
        <div className="linkto">
          <div className="findPW">
            <img src={findPW_icon} /> 비밀번호 찾기
          </div>
          <div className="signup">
            <img src={signup_icon} /> 회원가입 하기
          </div>
        </div>
      </div>
    </div>
  );
}
