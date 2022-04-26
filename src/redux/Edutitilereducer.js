/*
 * @Author: yrj 
 * @Date: 2019-03-01 09:33:47 
 * @Last Modified by: yrj
 * @Last Modified time: 2019-03-19 10:01:13
 */
import request from '../js/_x/util/request';
import { message } from 'antd';
const ajax = request.request;
let res={
    attendance:{
    late:0,
    leaveel:0,
    Skipping:0,
    changing:3
    },
    order:{
        allclass:150,
        abnormal:150,
        violation:150
    },
    quality:{
        teaching :150,
        classnum:150,
        listen:450
    }

    
}

export const GETEDUDATA=()=>{
    return dispatch=>{
        let _methodName = 'api/web/TeachingReflection/MyAttendance';
        let myHotPubClass = [];

        ajax(_methodName, 
        {
        "type": 1,
        "startDate": "2018-02-04",
        "endDate": "2018-02-04"},
        
         (res) => { 
             
            if (res.result && res.message === 'OK') {
            let data = res.data.pubCurList;
            for (let i = 0; i < data.length; i++) {
                myHotPubClass.push({
                    classId: data[i].curResourceId,
                    view: data[i].pubWatchNum,
                    name: data[i].curName
                })
            }
           
            dispatch({
                type:'GETEDUDATA',
                myHotPubClass
              })
        } else {
            message.error(res.message)
            
        }
        })

       
        }
    }


export let Edutitilereducer=function(state=res,action){

      
    switch (action.type) {
        case 'GETEDUDATA':
        console.log(action)
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


