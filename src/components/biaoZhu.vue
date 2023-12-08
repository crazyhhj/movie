/* eslint-disable */
<template>
    <div>   

        <div class="container">
            <!-- <div class="backdrop">
            <div class="highlights"></div>
            </div> -->
            <!-- <textarea  class="mbox" cols="70" rows="20" v-model="replaceText" @mouseup="one"></textarea> -->
            <div  class="mbox" cols="70" rows="20" v-html="replaceText" @mouseup="one" >
            </div>

        </div>
        <input type="file" @change="handleFileChange">
        <button id="mark" @click="search">change</button>
        <button id="mark" @click="removeName" style="width: 110px;">removeName</button>
        <button id="mark" @click="addName" style="width: 110px;">addName</button>
        d3 bar-vis
        
        <div id="persFre"></div>
        <br>
        <br>
        <br>
        <br>
        <br>
        <div id="lineBetween"></div>
        <button class="exist" @click="getSlug">getSlug</button>
        <div id="Inter"></div>

        <div style="width: 500px;">
            <el-collapse v-model="activeName" accordion v-for="slug in slugInfromation" :key="slug">
                <el-collapse-item>
                    <template slot="title">{{slug.screen}}
                        <i class="header-icon el-icon-info"></i>
                    </template>
                    <span class="dia" style="height: 309px; overflow-y: scroll;display: block;">{{ slug.content }}</span>
                </el-collapse-item>
            </el-collapse>
        </div>

        <button class="exist" @click="freBar">click to get frequency bar chart</button>
        <div id="freChart" style="width: 70%; height: 3000px;"></div>
        
        <button class="exist" @click="drawCircle">click to show circle</button>
        <div id="rangeMapping"></div>


        <div id="operatingFloor">
                <div></div>
                <div id="progress-control">
                    <i class="el-icon-edit">12</i>
                    <el-button type="primary" icon="el-icon-caret-left">Retreat</el-button>
                    <el-button type="primary" icon="el-icon-video-camera-solid">Play</el-button> 
                    <el-button type="primary" icon="el-icon-caret-right">Advance</el-button>
                    <el-button type="primary" icon="el-icon-search">搜索</el-button>
                </div>
            </div>


    </div>
</template>

<script>
import axios from 'axios'
import $ from 'jquery'
import * as d3 from 'd3'
import * as echarts from 'echarts'
import { select } from 'd3'





export default {
    name: 'txtNotice',
    components: {

    },
    data() {
        return {
            activeName:'1',
            originalText:'',
            replaceText: '第二他的师父是当时公认的第一高手裴旻。即使裴旻因为李是当时公认的第一高手裴旻。即使裴旻因为李是当时公认的第一高手裴旻。即使裴旻因为李是当时公认的第一高手裴旻。即使裴旻因为李是当时公认的第一高手裴旻。即使裴旻因为李是当时公认的第一高手裴旻。即使裴旻因为李是当时公认的第一高手裴旻。即使裴旻因为李是当时公认的第一高手裴旻。即使裴旻因为李是当时公认的第一高手裴旻。即使裴旻因为李是当时公认的第一高手裴旻。即使裴旻因为李是当时公认的第一高手裴旻。即使裴旻因为李白的诗词给李白面子，但是师徒关系在过去可不是闹着玩儿的，要是李白太差劲，裴旻绝不会教李白，因为将来出去丢的不仅是李白自己的脸面，还有裴旻的脸面。 所以起码李白的武功底子，是得到了当时天下第一剑客的承认和教导的。 再加上李白除了裴旻之外，总是吹嘘自己未尝一败，这也是大家为什么总说李白是天下第二剑客的原因~~',
            pitchArea: '',

            startPitch: '',
            endPitch: '',

                

            personDict:{},
            personList:[],
            freList:[],

            actorFre:[],
            // 较为精密的大阵
            actorDialogue:[],

            //作图用 原始 数据
            circleData :'',
            slugInfromation:[],
            color:'',

        }
    },
    mounted() {
        let svg = select("#lineBetween").append("svg").attr("width","100%").attr("height","20px")
        svg.append("line")
        .style("stroke", "black")
        .attr("x1", 0)     
        .attr("y1", 0)      
        .attr("x2", "100%")     
        .attr("y2", 0)
        .attr("fill",)
    
    },
    watch:{
        'personList':{
            handler(newVal,oldVal){
                console.log('d-------------------------b');
                if(newVal==oldVal){console.log('数据未变');}else(console.log('人物变了'))
                console.log(`${newVal}`);
                console.log(`${oldVal}`);
                let fredata=this.freList;
                console.log(newVal,fredata);
                this.drawBar(newVal,fredata);
            }

        },

        'slugInfromation':{
            handler(newVal,oldVal){
                console.log(`${newVal}`);
                console.log(`${oldVal}`);
                
            },deep:true
        }

    },
    
    created(){
		window.mydata = this;
	},	
    methods: {
        handleFileChange(e) {
            let file = e.target.files[0]
            axios({
                method: "put",
                // url: 'http://127.0.0.1:5000/api/put/txt',
                url: 'http://10.1.115.12:5000/api/put/txt',
                data: file,
                headers: {
                    "Content-Type": "application/octet-stream"
                },
                // responseType: 'text',
            })
                .then(res => {
                    // console.log(res);
                    const msg=res.data
                    this.text = msg[0];
                    //从 人名 字典 中 取得 人名 列表
                    // console.log(res.data[1]);
                    console.log('----',res.data[1]);
                    this.personDict=res.data[1]
                    console.log(this.personDict);
                    this.originalText = this.text;
                    this.replaceText = this.text;
                })
                .catch(err => {
                    console.log(err);
                })


            console.log('dsa')

        },
        sortFv(dict){
            let sortValue = Object.values(dict).sort((a,b) => {return b-a;})
            console.log(sortValue);   //排序健名
            const keys = Object.keys(dict);
            const res={};
            // 给value值赋值相应keys值
            let i=0;
            for (i in sortValue) {
                // console.log(i);
                keys.forEach((item) => {
                    if (sortValue[i] === dict[item]) {
                        res[item] = sortValue[i];
                    }
                })
            }
            return res
        },
        one(e){
            let area = window.getSelection();
            //获得选区文字
            this.pitchArea = area.toString();
            if(this.personList.includes(this.pitchArea)){
                console.log('包含关系');

            }

            let range = area.getRangeAt(0)
            console.log(e.pageX,e.pagey,range);
        },
        removeName(){
            let nameList = this.personList;
            let name = this.pitchArea;

            let removeIndex = nameList.indexOf(name);
            this.freList.splice(removeIndex,1);
            
            this.personList = nameList.filter((x)=>x!==name)
            //通过 d3监听的personList 
            //改样式
            let res = new RegExp("("+name+")",'g');
            this.replaceText = this.replaceText.replace(res,"<span style='color:#2c3e50; background-color: white;'>" +name+"</span>");
        },
        addName(){
            //name is pitchArea  人物名字
            let name = this.pitchArea;
            let res = new RegExp("("+name+")",'g');
            this.personList.push(name);
            //计算重复次数
            let Text = this.replaceText
            // console.log(Text.length);
            Text = Text.replace(res,"")
            let count = (this.replaceText.length-Text.length)/name.length;
            this.freList.push(count)

            let color="#";
                for(let j=0;j<6;j++){
                    color += (Math.random()*16 | 0).toString(16);
                }
            
            this.replaceText = this.replaceText.replace(res,"<span style='color:#2c3e50; background-color: "+color+";'>" +name+"</span>");
        },

        search(){
            let txtList=this.personDict;
            console.log('txt',txtList);
            let person=[];
            let fre=[];
            // for(let i=0;i < txtList.length;i++){
            for(let key in txtList){
                console.log('loading');
                person.push(key);
                fre.push(txtList[`${key}`]);
                let color="#";
                for(let j=0;j<6;j++){
                    color += (Math.random()*16 | 0).toString(16);
                }
                // let searchText = txtList[i];
                // let searchText = txtList[key];
                let res = new RegExp("("+key+")",'g');
                this.replaceText = this.replaceText.replace(res,"<span style='color:white; background-color: "+color+";'>" + key+"</span>");
            }
            console.log(fre);
            this.personList=person;this.freList=fre;
        // return parentStr;
        },
        colorChange(nameList){
            for(let item in nameList){
                return;
            }
        },
        
        //右键菜单栏组件


        
        le(){
            let $container = $('.container');
            let $backdrop = $('.backdrop');
            let $highlights = $('.highlights');
            let $textarea = $('textarea');
            let $toggle = $('button');

            // yeah, browser sniffing sucks, but there are browser-specific quirks to handle that are not a matter of feature detection
            let ua = window.navigator.userAgent.toLowerCase();
            let isIE = !!ua.match(/msie|trident\/7|edge/);
            let isWinPhone = ua.indexOf('windows phone') !== -1;
            let isIOS = !isWinPhone && !!ua.match(/ipad|iphone|ipod/);

            function applyHighlights(text) {
            text = text
                .replace(/\n$/g, '\n\n')
                .replace(/[A-Z].*?\b/g, '<mark>$&</mark>');
            
            if (isIE) {
                // IE wraps whitespace differently in a div vs textarea, this fixes it
                text = text.replace(/ /g, ' <wbr>');
            }
            
            return text;
            }

            function handleInput() {
            let text = $textarea.val();
            let highlightedText = applyHighlights(text);
            $highlights.html(highlightedText);
            }

            function handleScroll() {
            let scrollTop = $textarea.scrollTop();
            $backdrop.scrollTop(scrollTop);
            
            let scrollLeft = $textarea.scrollLeft();
            $backdrop.scrollLeft(scrollLeft);  
            }

            function fixIOS() {
            // iOS adds 3px of (unremovable) padding to the left and right of a textarea, so adjust highlights div to match
            $highlights.css({
                'padding-left': '+=3px',
                'padding-right': '+=3px'
            });
            }

            function bindEvents() {
            $textarea.on({
                'input': handleInput,
                'scroll': handleScroll
            });

            $toggle.on('click', function() {
                $container.toggleClass('perspective');
            });  
            }

            if (isIOS) {
            fixIOS();
            }

            bindEvents();
            handleInput();
            },
        
        drawBar(name,freList){
            console.log('-----------------000000000000000000000000000000000000000000000000000000000000000000');
            d3.select('svg').remove();
                //my_dataviz
            // console.log(name,freList);
            const chang = name.length;
            //创建 零值 列表
            // const org = new Array(chang).fill(0);
            // console.log(org);
            //控制比例尺长度
            const topV = d3.extent(freList)[1];
            let data = new Array();
            // data deal
            for(let i=0;i<chang;i++){
                let temp = {};
                temp['personName']=name[i];temp['fre']=freList[i];
                data.push(temp);
            }
            
            // console.log(data)

            let margin = {top: 20, right: 30, bottom: 40, left: 150},
                width = 520 - margin.left - margin.right,
                height = 800 - margin.top - margin.bottom;

            let svg = d3.select("#persFre")
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform",
                    "translate(" + margin.left + "," + margin.top + ")");
            //add X axis
            let x = d3.scaleLinear()
                .domain([0, topV*1.5])
                .range([ 0, width]);
            svg.append("g")
                // .attr("transform", "translate(0," + height + ")")
                .attr("transform", "translate(0,0)")
                .call(d3.axisBottom(x))
                .selectAll("text")
                .attr("transform", "translate(2,-18)rotate(0)")
                .style("text-anchor", "end");  
                
            let y = d3.scaleBand()
                .range([ 0, height ])
                .domain(data.map(function(d) { return d.personName; }))
                .padding(.2);
            svg.append("g")
                .call(d3.axisLeft(y))  
                // bars
            svg.selectAll("rect")
                .data(data)
                .enter()    
                .append("rect")
                .attr("x", x(0) )
                .attr("y", function(d){return y(d.personName)})
                .transition()
                .duration(2000)
                .delay(100)
                .attr("width",function(d){return x(d.fre)})
                .attr("height", y.bandwidth() )
                .attr("fill", "#69b3a2")
                .on('mouseover',function(){console.log('dsa');})
                
                
            // d3.selectAll('rect')
            //     .on('mouseover',function(){
            //         console.log('dsad');
            //     })

            },   
            
        interAct(){
           
            //键值对数据集
            let dataset = [ 
            {key:0,value:5},
            {key:1,value:10},
            {key:2,value:13},
            {key:3,value:19},
            {key:4,value:21},
            {key:5,value:25},
            {key:6,value:22},
            {key:7,value:18},
            {key:8,value:15},
            {key:9,value:13},
            {key:10,value:11},
            {key:11,value:12},
            {key:12,value:15},
            {key:13,value:20},
            {key:14,value:18},
            {key:15,value:17},
            {key:16,value:16},
            {key:17,value:18},
            {key:18,value:23},
            {key:19,value:25}];
            console.log(dataset);

            let margin = {top:20,right:30,bottom:40,left:90},
                width = 600 -margin.left-margin.right;
                // hight = 600 -margin.top-margin.bottom;
            // console.log(he);
            let SVG = d3.select("Inter")
                .append("svg")


            let xScale = d3.scaleLinear()
                        .domain([0,30])
                        .range([0,500])
            let xAxis = d3.axisBottom(xScale)
                        .ticks(10)

            let yScale = d3.scaleBand()
                        .domain(dataset)
            
            console.log(width,SVG,xAxis,yScale);
            },
        
        getSlug(){
            let _self = this
            axios.get('http://10.1.115.12:5000/api/post/textscreen')
            .then(
                res=>{
                    let msg = res.data;
                    // let a = JSON.parse(msg)
                    // console.log(msg);
                    _self.slugInfromation = msg;
                    // this.$set(slugInfromation,msg);
                })
                .catch((error) => {
					console.error(error);
				})

            axios.get('http://10.1.115.12:5000/api/post/actor')
        .then(
            res=>{
                let msg = res.data;
                // let a = JSON.parse(msg)
                // console.log(msg);
                _self.actorFre = msg;
                // this.$set(slugInfromation,msg);
            })
            .catch((error) => {
                console.error(error);
            });

            axios.get('http://10.1.115.12:5000/api/post/dialogue')
        .then(
            res=>{
                let msg = res.data;
                // let a = JSON.parse(msg)
                // console.log(msg);
                _self.actorDialogue = msg;
                // this.$set(slugInfromation,msg);
            })
            .catch((error) => {
                console.error(error);
            });

            axios.get('http://10.1.115.12:5000/api/post/fenbu')
        .then(
            res=>{
                let msg = res.data;
                // let a = JSON.parse(msg)
                // console.log(msg);
                _self.circleData = msg;
                // this.$set(slugInfromation,msg);
            })
            .catch((error) => {
                console.error(error);
            });

        },


        freBar(){
            let actorFrequency = this.actorFre;
            let name = [];
            let fre=[];
            for(let key in actorFrequency){
                name.push(key);fre.push(actorFrequency[key]);
                
            }
            console.log(name,fre);
            let barFre = echarts.init(document.getElementById('freChart'));
            let option = {
                title: {
                    text: 'actor Frequency'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                    type: 'shadow'
                    }
                },
                legend: {},
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'value',
                    boundaryGap: [0, 0.01]
                },
                yAxis: {
                    type: 'category',
                    data: name
                },
                series: [
                    {
                    name: 'actor',
                    type: 'bar',
                    data: fre
                    },
                ]
                };
            barFre.setOption(option);
        },

        drawCircle(){
            d3.select("#rangeMapping")
            .append("svg")
            .attr("id","zone")
            .attr("width",2000)
            .attr("height",2000)

        let subSvg=d3.select("#zone");
            const filmData = this.circleData
            const rangeList = filmData.map(d=>{const l = d.range.slice(-1);return l[0]})
            console.log(rangeList);

            let maxValue = d3.max(rangeList,d=>d)*1.1
            console.log(maxValue);
            const nameList = filmData.map(d=>d.name)
            const width = 1000, height = 2000;
            const margin = {top:20,right:50,left:200,bottom:50};
            const xZoneScale = d3.scaleLinear().domain([0,maxValue]).range([margin.left,width-margin.right])
            const yZoneScale = d3.scaleBand().domain(nameList).range([height-margin.bottom,margin.top]).padding(0.5)
            const xAxis = d3.axisBottom(xZoneScale).tickSizeOuter(0);
            const yAxis = d3.axisLeft(yZoneScale).tickSizeOuter(0);
            console.log(xZoneScale(2));
            subSvg
                .append("g")
                .attr("class","bars")
                .selectAll("rect")
                .data(filmData)
                .join("rect")
                    .attr("class","personRange")
                    .attr("x",(d)=>xZoneScale(d.range[0]))
                    .attr("y",(d)=>yZoneScale(d.name))
                    .attr("width",(d)=>(xZoneScale(d.range.slice(-1))-xZoneScale(d.range[0]-1)))
                    .attr("height",yZoneScale.bandwidth())
                    .style("fill","#666666")
            subSvg
                .append("g")
                .attr("class","x-axis")
                .attr("transform",`translate(0,${height-margin.bottom})`)
                .call(xAxis)
            subSvg
                .append("g")
                .attr("class","y-axis")
                .attr("transform",`translate(${margin.left},0)`)
                .call(yAxis)
        },
    },
}
</script>

<style>
/* #mainText{
    height: 200px;
    width: 200px;
    background-color: aquamarine;
} */

.container {
	width: 1200px;
	height: 460px;
	margin: 30px auto;
	border: 4px solid #a0b3d6;
	position: relative;
	border-radius: 2px;
}

.mbox {
	/* 前端文本格式保留 */
	white-space: pre-wrap;

	width: 1200px;
	height: 460px;
	outline: none;
	border: 14px solid #fff;
	box-sizing: border-box;
	overflow-y: auto;
	/* background: #f5f5f5; */
	letter-spacing: 2px;

}


.mbox {
    white-space: pre-wrap;
    text-align: left;

}


.mbox::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 6px;
    /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
}

.mbox::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 10px;
    background-color: #F90;
    background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, .2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .2) 50%, rgba(255, 255, 255, .2) 75%, transparent 75%, transparent);
}

.mbox::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    /*border-radius: 10px;*/
    background: #EDEDED;
}

.dia::-webkit-scrollbar { 
   display: none;
}

#slugGroup{
    width: 330px;
    /* height: 1500px; */
}


/* List element */
.slug {
    font-family: Calisto MT,Bookman Old Style,Bookman,Goudy Old Style,Garamond,Hoefler Text,Bitstream Charter,Georgia,serif;
    color: antiquewhite;

    height: 100px;
    
    counter-increment: index; 
    display: flex;
    align-items: center;

    margin: 3px;
    border-radius: 12px;
    padding: 0px;
    
    /* background-color: #643988; */
    background-color: #566074;

    /* #566074 */
    box-sizing: border-box;
}
.slide{
    white-space: pre-wrap;
    display: block;
    margin: 0px;
    padding: 0px;
    /* height: 0px; */

    overflow-y: scroll;
    /* position: absolute; */

    list-style: none;

    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    text-align: left;
}

#dialogue{
    height: 0px;

    display: flex;
    overflow: scroll;
    font-family: 'Times New Roman', Times, serif;
    color:black;

    margin: 3px;
    /* border-radius: 12px; */
    /* border: 10px; */
    padding: 22px 0;

    background-color:wheat;
}
.slug:hover {
    background-color: #67c47b;
    background-color: #90c1f8;

}

/* Element counter */
.slug::before {
  content: counters(index, ".", decimal-leading-zero);
  font-size: 1.5rem;
  text-align: right;
  font-weight: bold;
  min-width: 50px;
  padding-right: 12px;
  font-letiant-numeric: tabular-nums;
  align-self: flex-start;
  background-image: linear-gradient(to bottom, aquamarine, orangered);
  background-attachment: fixed;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

#touch {
    position: absolute;
    opacity: 0;
    height: 0px;
}
.dia {
    white-space: pre-wrap;
    text-align: left;


}
    

/* #touch:checked+.slide{height: 300px;} */


/* Element separation */
li + li {
  border-top: 1px solid rgba(255,255,255,0.2);
}

@use postcss-preset-env {
  stage: 0;
  autoprefixer: {
    grid: true;
  }
  browsers: last 2 versions
}

#mark{
    width: 60px;
    height: 23.1px;

    line-height: 5px;

    border-radius: 10px;
    border: 2px solid #a45de7;
    background-color: beige;
}

.exist{
    /* width: 60px; */
    height: 23.1px;

    line-height: 5px;
    background-color: #a7c0bc;
}
</style>