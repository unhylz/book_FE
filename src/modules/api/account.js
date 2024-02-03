import axios from "axios"

const url = "http://3.37.54.220:3000"


export const isEmailDuplication = (email)=>{
  if(email==="중복"){
    return(true)
  }
  else{
    return(false)
  }
}

export const isAuth = (auth)=>{
  if(auth==="000000")
    {return(true)}
  else
    {return(false)}
}

export const isNickDuplication = (nick)=>{
  if(nick==="중복"){
    return(true)
  }
  else{
    return(false)
  }
}

export const isLoginTrue = (email,pw)=>{
  if(email==="admin@naver.com"){
    if(pw==="admin1234!") {return true}
    else return false
  }else return false
}

export const postLogin = (email,password) => {
  axios.post(`${url}/users/login`, {
    email,
    password
  },
  { withCredentials: true })
  .then(function (response) {
    console.log("postLoginRES",response);
    return true
  })
  .catch(function (error) {
    console.log(error);
    return false
  });
}

export const postSignup = (email,password,nickname) => {
  axios.post(`${url}/users/signin`, {
    email,
    password, 
    nickname
  },
  )
  .then(function (response) {
    console.log(response);
    return true
  })
  .catch(function (error) {
    console.log(error);
    return false
  });
}

export const checkEmailDup = (email) => {
  axios.post(`${url}/users/signin/emailcheck`, 
    {email:email}
  )
  .then(function (response) {
    console.log(response);
    return true
  })
  .catch(function (error) {
    console.log(error);
    return false
  });
}

export const checkNickDup = (nickname) => {
  axios.post(`${url}/users/signin/nickcheck`, {
    nickname
  })
  .then(function (response) {
    console.log(response);
    return true
  })
  .catch(function (error) {
    console.log(error);
    return false
  });
}