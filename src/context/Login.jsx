
import React, { createContext, useReducer } from "react";

  export const reducer = (state,action)=>{
  switch(action.type){
    
    case'LOGIN':
      console.log("로그인실행",action.id,action.email)
      return{
        ...state,
        isLogin:true,
        id:action.id, 
        email:action.email}

    case'LOGOUT':
      console.log("로그아웃 실행")
      return{
        ...state,
        isLogin:false,
        id:0,
        email:null}
      
    case'CHANGE_ID':
      console.log('아이디변경 실행')
      return{
        ...state,
        isLogin:false,
        id:action.id,
      }
    
    case 'CHANGE_EMAIL':
      console.log('이메일변경 실행')
      return{
        ...state,
        email:action.email
      }
  }}

  export const initialState = {isLogin:false,id:0,email:null};
  
  // const [state,dispatcher] = useReducer(reducer,initialState);
  export const UserContext = createContext(initialState);

  // export const user = state;
  // export const setLogin = (id,email)=>{
  //   dispatcher({type:'LOGIN', payload:{id,email}});
  // }
  
  // export const setLogout = ()=>{
  //   dispatcher({type:'LOGOUT'});
  // }


    
