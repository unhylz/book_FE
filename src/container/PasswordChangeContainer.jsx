import React,{useState, useRef} from 'react'
import PasswordChange from '../components/passwordChange/PasswordChange';

export default function PasswordChangeContainer(props) {
  
  
  const[pw,setPw] = useState("");
  const[pwEye,setPwEye]=useState(true);
  const[pwState,setPwState]=useState(0);

  const[pwCheck,setPwCheck] = useState("");
  const[pwCheckEye,setPwCheckEye]=useState(true);
  const[pwCheckState,setPwCheckState]=useState(0);

  
  const onSubmitPwChange = (e)=>{
    e.preventDefault();
    props.setState("login");
  }

  const onPwChange = (e)=>{ 
    setPw(e.target.value)
    //유효성검사
    if(testPw(pw)){setPwState(0)}
    else{setPwState(1)}
  }
  const onPwEyeClick = (e)=>{
    if(pwEye){setPwEye(false)}
    else{setPwEye(true)}  
    console.log("아아아")
  }

  const onPwCheckChange = (e)=>{
    setPwCheck(e.target.value)
    //유효성검사
    if(pw===pwCheck){setPwState(0)}
    else{setPwState(1)}
  }
  const onPwCheckEyeClick = (e)=>{
    if(pwCheckEye){setPwCheckEye(false)}
    else{setPwCheckEye(true)}
  }
  
  const testPw = (pw)=>{
    const pwreg = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/
    return(pwreg.test(pw))
  }

  const onClickBg = (e) => {
    if(e.target.classList.contains("bg_shadow")){
      props.setState(null)
    }
  
  }


  return (
    <PasswordChange
      onPwChange={onPwChange}
      onPwEyeClick={onPwEyeClick}
      onPwCheckChange={onPwCheckChange}
      onPwCheckEyeClick={onPwCheckEyeClick}
      onSubmitPwChange={onSubmitPwChange}
      onClickBg={onClickBg}
    />
  )
}
