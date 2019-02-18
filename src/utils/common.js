 //#endregion

 export function PositiveNumber(value) {

     try{
         value = parseInt(value)
     }
     catch(err){
         value = 1
     }
     if(isNaN(value)){
         value = 1
     }
     return value
 }

 export function IsMobile() {
     let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
     return flag;
 }

export function ValidateEmail(email) {
     const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
     return re.test(email)
 }

export function IntegerDivisionGetList(dividend, divisor) {
    // 整数除法
    var result = dividend / divisor
    var quotient = parseInt(result)
    var remainder = dividend % divisor
    return [quotient, remainder]
}
