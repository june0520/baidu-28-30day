window.onload = function(){

    var postfixList = ['163.com', 'gmail.com', '126.com', 'qq.com', '263.net'];
    var input = document.querySelector('#email-input')
    var ul = document.querySelector('#email-sug-wrapper')
    var lis = document.querySelectorAll('li')
    //获取用户输入，生成提示框中的提示内容，将提示内容添加到email-sug-wrapper中
    //控制email-sug-wrapper的显示/隐藏状态
    input.addEventListener('keyup',function(e){
        console.log('qqqqqqqqqqqqqqqqq')
        var txt = getTxt()
        var output = htmlEncode(txt)
        var list = text(output)
        addToUl(list)
    })

    //获取输入的文本并去除首尾空格
    function getTxt(){
        var txt = input.value.trim()
        display(txt)
        return txt

    }
    //将获取到的文本进行转码处理
    function htmlEncode(html){
        var temp = document.createElement('div')
        if(temp.textContent != undefined ) {
            temp.textContent = html
        } else {
        temp.innerText = html
        }
        var output = temp.innerHTML
        temp = null;
        return output;
    }


    // 将自己生产文本数据进行解码处理
    function htmlDecode (a){
        var temp = document.createElement('div')
        temp.innerHTML = a;
        var output = temp.textContent || temp.innerText;
        temp = null;
        return output

    }



    //生成提示框中的提示内容
    function text(txt) {
        //存储生成好的提示文本
        var list = []
        //判断文本中是否存在@符号
        var i = txt.indexOf('@')
        if(i>-1){
            //@符号之前的文本
            // abc@163.com
            var filterVal = txt.slice(0,i)
            //@之后指定的后缀
            var suffix = txt.slice(i+1)

        } else{
            filterVal = txt
        }
        for (var tip of postfixList){
            // 遍历是否存在表单获取的后缀名，并且是首位匹配成功的，加入提示框文本列表中
            if(tip.indexOf(suffix)===0){
                // continue
                list.push(filterVal + '@' + tip)
            //否则跳过
            } else{
            continue
            }
        }
        //如果没有匹配的后缀。则全部输出出来
        if (!list.length){
            for (var tip of postfixList){
                list.push(filterVal + '@' + tip)
            }
        }
        return list
   
    }
    
    //将生成好的提示文本遍历生成li标签的文本内容
    function addToUl(list) {
        //获取生成提示框中的提示内容
        //将内容添加到email-sug-wrapper中
        // 每次触发input事件先清空ul
        ul.innerHTML=''
        
        for (var i of list){
            var li = document.createElement('li')
            li.innerHTML = i
            ul.appendChild(li)
            // 绑定点击事件，将输入框的文本变成当前的inner HTML
            li.onclick = function(e){
                input.value = htmlDecode(this.innerHTML)
                // 隐藏ul下拉框
                hide()
            }
        }
    } 
    
//判断是否有有效的输入文本值，决定是否显示ul列表
    function display(txt) {
       if (!txt) {
           hide()
       } else {
           show()
        }
    }
    

    function hide() {
        ul.style.display = "none"
       
    }
    
    function show() {
        ul.style.display = "block"
    }













































}