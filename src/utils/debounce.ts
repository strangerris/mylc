// export const debounce = (fn, delay = 1000) => {
//     //距离上一次的执行时间
//     let lastTime = 0
//     return function () {
    //   let _this = this
    //   let _arguments = arguments
//       let now = new Date().getTime()
//       //如果距离上一次执行超过了delay才能再次执行
//       if(now - lastTime > delay){
//         fn.apply(_this,_arguments)
//         lastTime = now
//       }
//     }
// }
export const debounce = (fn, delay = 1000) => {
    let timer = null
    return function () {
        let _this = this
        let _arguments = arguments
        if (timer !== null) clearTimeout(timer)
        timer = setTimeout(() => {
            fn.apply(_this,_arguments)
            // fn()
        }, delay);
    }
}