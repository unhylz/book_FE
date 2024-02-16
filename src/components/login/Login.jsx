import React, { useState,useContext } from "react";
import { Link } from "react-router-dom";


import "./Login.scss";
import BSL_logo from "../../assets/logos/BSL_logo.svg";
import findPW_icon from "../../assets/icons/findPW.svg";
import signup_icon from "../../assets/icons/signup.svg";
import eye_icon from "../../assets/icons/eye.svg";
import eye_off_icon from "../../assets/icons/eye_off.svg";
import cancle_icon from "../../assets/icons/cancle.svg";
import checkbox_green from "../../assets/icons/checkbox_green.svg";
import checkbox_black from "../../assets/icons/checkbox_black.svg";
import notice_1 from "../../assets/notice/비밀번호를 입력해주세요..svg";
import notice_2 from "../../assets/notice/이메일을 입력해주세요..svg";
import notice_3 from "../../assets/notice/계정 정보가 잘못됐습니다..svg";
import { UserContext } from "../../context/Login";




export default function Login(props) {

  
  console.log(props);
  const [isEyeOpen, setIsEyeOpen] = useState(false);
  const [isRemember, setIsRemember] = useState(false);

  const user_context = useContext(UserContext)
  console.log(user_context)
  
  
  return (
    <div className="bg_shadow" onMouseDown={props.onClickBg}>
      <div className="login_popup">
        <Link to="/">
          <img className="logo" src={BSL_logo}></img>
        </Link>
        <h2>로그인</h2>
        <form>
          <div className={`email_input_${props.notice}`}>
            <input
              ref={props.emailInputRef}
              placeholder="이메일"
              onChange={props.onEmailChange}
              value={props.email}
            />
            <img
              className="cancle"
              src={cancle_icon}
              onClick={props.onEmailCancleHandler}
            />
          </div>
          <div className={`pw_input_${props.notice}`}>
            <input
              ref={props.pwInputRef}
              type={isEyeOpen ? "text" : "password"}
              placeholder="비밀번호"
              onChange={props.onPwChange}
              value={props.pw}
            />

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
            <img
              className="cancle"
              src={cancle_icon}
              onClick={props.onPwCancleHandler}
            />
          </div>
          <div
            className="remember"
            onClick={() => {
              setIsRemember(isRemember ? false : true);
            }}
          >
            <div>
              {isRemember ? (
                <img src={checkbox_green} />
              ) : (
                <img src={checkbox_black} />
              )}
              자동로그인
            </div>
            {props.notice === 0 ? (
              <></>
            ) : props.notice === 1 ? (
              <img className="notice" src={notice_1} />
            ) : props.notice === 2 ? (
              <img className="notice" src={notice_2} />
            ) : (
              <img className="notice" src={notice_3} />
            )}
          </div>
          <input
            className="submit_input"
            type="submit"
            value="로그인"
            onClick={props.onSubmitHandler}
          />
        </form>
        <div className="linkto">
          <div className="findPW" onClick={props.onClickPwSearchBtn}>
            <img src={findPW_icon} /> 비밀번호 찾기
          </div>
          <div className="signup" onClick={props.onClickSignupBtn}>
            <img src={signup_icon} /> 회원가입 하기
          </div>
        </div>
      </div>
    </div>
  );
}
