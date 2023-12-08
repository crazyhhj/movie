<template>
    <div class="text-container">
        與數據庫有關的文本類型主要有三種：碑刻及其他古文書資料，
印刷的原始文本和二手著作（印刷和數碼形式都可以）。如黃
宗羲《宋元學案》這樣的著作既是一部梳理早期作品的學術綱
要，又帶有個人創作的性質；而古代文書資料也由數據庫感興
趣的作者撰寫。對前現代文本類別的區分，既無法十分明確，
也沒有多大用處，因此CBDB把以上三種類型都當做「文本」。
我們認為「文本」有以下屬性：
    </div>
</template>

<script>
import { container } from 'webpack'

export default {
 name:'TextNotice',
 components:{

 },
 data(){
    result={}
 },
 mounted(){
    // 记录文本，鼠标状态，文本标注数据
    let container = document.querySelector('#text-container')
    let mouseStatus = 'none'
    let selectionData = null

    //add event listener
    container.addEventListener('mousedown',mousedownHandler)
    container.addEventListener('mouseup',mouseupHandler)

    initData()
 },
 methods:{
    //初始化生成数据
    initData: function(){
        this.result[container.id]={}
        //储存原始静态等待标注文本
        this.result[container.id]['htmlString'] = container.textContent
        //储存标注信息
        this.result[container.id]['infoArray']=[]
        this.selectionData = this.result
    },
    // 2. 生成随机色
    getColor: function() {
        let random1 = parseInt(Math.random()*256)
        let random2 = parseInt(Math.random()*256)
        let random3 = parseInt(Math.random()*256)
        return `rgb(${random1}, ${random2}, ${random3})`
    },
    mousedownHandler: function(event){
        this.mouseStatus = 'mousedown'
    },
    //处理鼠标抬起事件
    // 获取当前鼠标框选的选区(Selection)以及当前选区的Range
    // 找到当前选区所对应的节点元素
    // 计算当前框选内容的起始和结束坐标
    // 更新标注数据
    // 更新对应的html内容
    mouseupHandler: function(event){
        mouseStatus = 'mouseup';
    // 获取当前鼠标框选的选区(Selection)以及当前选区的Range
        let selection = window.getSelection()
        let text = selection.toString()

        if (text.length === 0 )return;

        //这是就需要另个一个API了selection.getRangeAt，该方法会返回一个包含当前选区内容的区域对象，它接收一个参数index该参数指定需要被处理的子集编号（从零开始计数），该API会返回一个range对象。
        let range = selection.getRangeAt(0)
    }
    

}
}
</script>

<style>
    .text-container {
        width: 500px;
        border: 2px solid gray;
        border-radius: 10px;
        padding: 10px;
        margin: 200px auto;
    }
</style>