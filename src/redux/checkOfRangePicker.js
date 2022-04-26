/*
 * @Author: Yrj
 * @Date: 2019-02-28 22:34:10 
 * @Last Modified by: yrj
 * @Last Modified time: 2019-03-20 09:27:16
 * 在线巡课 - 巡课统计_part1
 */

 let  initState={

      collegeid:'0',//全部学院
      subjectid:'0',//全部专业
      datalist:[''],//数据
      searchid:2,//默认查询
      typeid:2,//默认选择
      getdatames:false,//数据拉取是否成功
      dateString:['',''],//时间选择
      loadingdom:false,//转圈圈
      pageNumber:1,//拉取页数
      keyword:'',//关键字
      maxpage:''//最大页数
      
 }

 
 
export  const CheckOfRangePicker = (state = initState, action) => {

    switch ( action.type ) {
      case 'BUTTON_SUBMIT'://按钮提交
        return {
            ...state,
            ...action
        }
      case 'RECORDRANGE'://记录日历数据
        return {
            ...state,
            ...action
        }
      case 'GRETRANGEDATA'://拉取日历数据
        return {
            ...state,
            ...action
        }
      case 'SELECTDATA'://select选择数据统计
        return {
            ...state,
            ...action
        }
        case 'SHOWLOADINGDOM'://自用加载loading
        return {
            ...state,
            ...action
        }
      case 'ONSEARCH'://根据关键词搜索数据
        return {
            ...state,
            ...action
        }
      case 'PAGECHANGE'://根据关键词搜索数据
        return {
            ...state,
            ...action
        }
        case 'SEARCHGETDATA'://手动查找数据
        return {
            ...state,
            ...action
        }
        case 'CLEARTYPE'://清除查询id
        return {
            ...state,
            ...action
        }
      default:
      return {
        ...state
      }
    }
}

//传参拉取数据
const getdata=(changes)=>{
  let res={};
 
  let {searchid,keyword,subject,dateString,college,pageNumber}=changes;
  
  if(searchid=='' && dateString[0]=='' ){
    res={
      datalist:[''],
      maxpage:''
    }
  }else{
    res={
      datalist:[
        {name:'查询id'+searchid,scool:'院校:'+college+'-'+subject+'页数:'+pageNumber,teachernum:'58/80'},
        {name:'yrj',scool:'关键字'+keyword,teachernum:'58/80'},
        {name:dateString[0]+'-'+dateString[1],scool:college,teachernum:'58/80'},
        {name:'yrj',scool:college,teachernum:'58/80'},
        {name:'yrj',scool:college,teachernum:'58/80'},
        {name:'yrj',scool:college,teachernum:'58/80'}
      ]  
      ,maxpage:10
    }
  }
  


  return res

}

//分页改变引发的数据请求
export const PAGECHANGE=(changetype,state)=>{
  let {datalist,searchid,pageNumber,maxpage,getdatames,dateString,keyword,college,subject}=state;
 
  if(changetype=="left"){
    pageNumber-=1
  }else{
    pageNumber+=1
  }
 
 
 if(pageNumber<=1){pageNumber=1}
 if(pageNumber>=maxpage){pageNumber=maxpage}
  let changes={
   searchid:searchid,
   keyword:keyword,
   college:college,
   subject:subject,
   dateString:dateString,
   pageNumber:pageNumber
 }
 
 datalist=getdata(changes).datalist;
 //判断数据是否拉取到

  if(datalist[0]==''){
    getdatames=false;
    
   }else{
    getdatames=true;
    
   }
   
 
   return dispatch=>{
 
     //转圈圈
     dispatch(SHOWLOADINGDOM(searchid,true))
     setTimeout(() => {
       dispatch(SHOWLOADINGDOM(searchid,false))
     }, 500);
 
     
     dispatch({
         type:"PAGECHANGE",
         pageNumber,
         getdatames,
         datalist
        
       })
     }
 }

//手动查找数据
export const SEARCHGETDATA=(state)=>{
  let {searchid,keyword,collegeid,subjectid,dateString,datalist,pageNumber,maxpage,getdatames}=state;

  let changes={
    searchid:searchid,
    keyword:keyword,
    college:collegeid,
    subject:subjectid,
    dateString:dateString,
    pageNumber:pageNumber
  }
  
  datalist=getdata(changes).datalist
  maxpage=getdata(changes).maxpage

  //判断数据是否拉取到
  if(datalist[0]==''){
    getdatames=false;
    
   }else{
    getdatames=true;
   }

  return dispatch=>{
    //转圈圈
    dispatch(SHOWLOADINGDOM(searchid,true))
    setTimeout(() => {
      dispatch(SHOWLOADINGDOM(searchid,false))
    }, 500);

    let p = new Promise((resolve , reject )=>{
      dispatch({
        type:"SEARCHGETDATA",
        datalist,
        maxpage,
        getdatames
       
      })
      resolve(getdatames);
    })
    return p;
    }

}



//自用加载loading
//loading是否展开
const SHOWLOADINGDOM=(typeid,boolean)=>{
  if(typeid==5){
    boolean=false
  }
  return dispatch=>{
    dispatch({
        type:"SHOWLOADINGDOM",
        typeid:typeid,
        loadingdom:boolean
       
      })
    }
}
//父级select选择数据统计
export const SELECTDATA=(collegeid,subjectid)=>{
  return dispatch=>{
    dispatch({
      type:'RECORDRANGE',
      collegeid,
      subjectid
      
    })
  }
}

//根据关键词搜索数据
export const ONSEARCH=(keyword)=>{
 return dispatch=>{
    dispatch({
      type:'ONSEARCH',
      keyword
    })
  }
}

//日历数据统计
export const RECORDRANGE=(dateString)=>{
 
  return dispatch=>{
    dispatch({
      type:'RECORDRANGE',
      dateString
    })
  }

}
//清清除查询使用的id
export const CLEARTYPE=()=>{
  let searchid='';
  return dispatch=>{
    dispatch({
      type:'CLEARTYPE',
      searchid

    })
  }
}

//按钮提交
export const BUTTON_SUBMIT=(typeid,state = initState)=>{
  let {datalist,maxpage,searchid,keyword,collegeid,subjectid,dateString,pageNumber,getdatames,showrange}=state;
  searchid=typeid;
  let changes={
    searchid:searchid,
    keyword:keyword,
    college:collegeid,
    subject:subjectid,
    dateString:dateString,
    pageNumber:pageNumber
  }


  switch (typeid) {
    case 1:
    datalist=['']
      break;
    case 2:
    datalist=getdata(changes).datalist 
    maxpage=getdata(changes).maxpage
    break;
    case 3:
    datalist=getdata(changes).datalist
    maxpage=getdata(changes).maxpage
      break;
    case 4:
    datalist=getdata(changes).datalist
    maxpage=getdata(changes).maxpage
      break;
    
    default:
      break;
  }

  //判断数据是否拉取到

  if(datalist[0]==''){
    getdatames=false;
    
   }else{
    getdatames=true;
    
   }
   
   //不展示日历表,清空时间
   showrange=false;
   dateString=['',''];
   

  return dispatch=>{
    //转圈圈
    dispatch(SHOWLOADINGDOM(searchid,true))
    setTimeout(() => {
      dispatch(SHOWLOADINGDOM(searchid,false))
    }, 500);
 
     let p = new Promise((resolve , reject )=>{
       dispatch({
         type:'BUTTON_SUBMIT', 
         typeid,
         datalist,
         getdatames,
         showrange,
         searchid,
         maxpage,
         pageNumber
       })
       resolve(getdatames);
     })
     return p
 
   }
 
  
}