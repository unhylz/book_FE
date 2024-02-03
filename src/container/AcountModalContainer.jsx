import React, { useState } from "react";
import AcountModal from "../components/Acount_Modal/AcountModal";

//Container import는 여기 아래에 쭈르륵 해주세요
import LoginContainer from "../container/LoginContainer";
import PasswordSearchContainer from "../container/PasswordSearchContainer";
import SignupContainer from "../container/SignupContainer";
import PasswordChangeContainer from "../container/PasswordChangeContainer";
import PasswordChange from "../components/passwordChange/PasswordChange";

/**
 * 계정 관련 모달창을 반환함
 *
 * state 값을 props 하여 초기상태를 결정
 *
 * 초기상태로는 "login",  "signup",  "passwordsearch",  "passwordchange" 사용가능
 *
 * 예시) <AcountModalContainer state={"login"}/>
 */
export default function AcountModalContainer(props) {
  const [state, setState] = useState(props.state);
  console.log("state: ", state);

  return (
    <>
      {state === "login" ? (
        <LoginContainer setState={setState}/>
      ) : state === "passwordsearch" ? (
        <PasswordSearchContainer setState={setState} />
      ) : state === "passwordchange" ? (
        <PasswordChangeContainer setState={setState} />
      ) : state === "signup" ? (
        <SignupContainer setState={setState} />
      ) : (
        <>에러에러</>
      )}
    </>
  );
}
