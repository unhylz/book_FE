import axios from "axios"
// const url = "http://3.37.54.220:3000"
const url = ""

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


export const postLogin = async(email,password) => {
  try{
    const res = await axios.post('/users/login', {email,password},{ withCredentials: true });
    console.log("postLoginRES",res);
    return(res)
  }
  catch(err){
    console.log(err);
    return false;
  }
}


export const postSignup = async (email,password,nickname) => {
  try{
    const res = await axios.post(
      `/users/signin`, 
      {email,password, nickname},
      {withCredentials:true}
    )
    console.log(res)
    if('message' in res.data)
      {return true}
    else
      {return false}
  }
  catch(err){
    console.log(err)
    console.log("예상치못한 에러")
    return false
  }
}

export const checkEmailDup = async (email) => {
  try{
    const res = await axios.post(
      '/users/signin/emailcheck', 
      {email:email})
    console.log(res)
    return true
    }
  catch(err){
    // console.log(err)
    return false
  } 
}


export const checkNickDup = (nickname) => {
  axios.post(`/users/signin/nickcheck`, {
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

export const sendAuth = (email)=>{
  axios.post(`/users/auth`, {
    email
  },
  {withCredentials:true})
  .then(function (response) {
    console.log(response);
    console.log("메일을 보냈습니다.")
    return true
  })
  .catch(function (error) {
    console.log(error);
    return false
  });
}

export const checkAuth = async(email)=>{
  try{
    const res = await axios.post(
      "/users/findpass", 
      {email:email})
    console.log(res)
    return true
    }
  catch(err){
    // console.log(err)
    return false
  }
}


export const getSentimen = (id)=>{
  axios.get('/sentiments/1',
  {withCredentials:true})
  .then((res)=>{console.log(res)})
  .catch((err)=>{console.log(err)})
}

export const getSentiment = async(id)=>{
  try{
    const res = await axios.get(
      `/sentiments/${id}`
      )
    console.log(res)
    return true
    }
  catch(err){
    console.log(err.toJSON())
    return false
  }
}



export const postCheckCode = async(email,verificationCode)=>{
  try{
    const res = await axios.post(
      '/users/findpass',
      {email,verificationCode},
      {withCredentials:true}
      )
    console.log(res)
    if('message' in res.data)
      {return true}
    else if(res.data.status===409)
    {return false }
    else{ return false}
  }
  catch(err){
    console.log(err.toJSON())
    return false
  }
}

export const postCheckSignupCode = async(email,verificationCode)=>{
  try{
    const res = await axios.post(
      '/users/signin/auth',
      {email,verificationCode},
      {withCredentials:true}
      )
    console.log(res)
    if('message' in res.data)
      {return true}
    else if(res.data.status===409)
    {return false }
    else{ return false}
  }
  catch(err){
    console.log(err.toJSON())
    return false
  }
}

export const postPwChange = async(password, user_id)=>{
  try{
    const res = await axios.post(
      `/users/${user_id}/changepass`,
      {password},
      {withCredentials:true}
    )
  }
  catch{}
}

