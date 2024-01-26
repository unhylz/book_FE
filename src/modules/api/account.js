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