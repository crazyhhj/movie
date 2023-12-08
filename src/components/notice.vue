<template>
	<div class="home">
		<p style="text-align: center;margin-top: 100px;">
			<span style="color:#ef0f39;">人物</span>----
			<span style="color:#ec0fef;">组织</span>----
			<span style="color:#390fef;">地点</span>----
			<span style="color:#9d0fef;">武器</span>
		</p>
		<div class="box1">
			<div class="box" ref="textbox" @contextmenu="contextmenu" v-html="text" @click="getCursortPosition" @mouseup="handleMouseSelect"></div>
			<!-- <div class="box" ref="textbox"  oncontextmenu="contextmenu" v-html="text" onclick="getCursortPosition" onmouseup="handleMouseSelect"></div> -->

				<el-menu :style="menustyle" v-if="textearett && menustyle.top!=0 && menustyle.left!=0">
					<el-menu-item index="1" @click="delRight">
						人物
					</el-menu-item>
					<el-menu-item index="2" @click="delLeft">
						组织
					</el-menu-item>
					<el-menu-item index="3" @click="delOhter">
						地点
					</el-menu-item>
					<el-menu-item index="4" @click="closeAll">
						武器
					</el-menu-item>
					<el-menu-item index="5" @click="restxiao">
						取消选中
					</el-menu-item>
				</el-menu>
		</div>

		<!-- 上传txt 文件 -->
		<input type="file" name="upload movie script" id="scriptUpload" ref="fileInput" @change="handleFileChange" />
		<br><br>


		<button @click="getData">get_data</button>
	</div>
</template>

<script>
import axios from 'axios';

export default {
	name: 'myHome',

	// props: {
	// 	beforeUpload: Function, 
	// },

	data() {
		return {
			//定义 服务器响应
			backUrl: 'http://127.0.0.1:5000/open',
			serverRespone: 'res_rest',

			fileStatus: '',
			//组件
			// text:'',
			text: '美国一名官员今天（12日）透露，因应中国正寻求在印太地区建立军事关系，美国承诺为该地区投入更多外交和安全资源，包括在所罗门群岛设立大使馆。据路透社报道，美国国务院一名官员说，美国国务卿布林肯昨天在墨尔本出席美日澳印四边安全对话（Quad）外长会议后，前往斐济进行访问并宣布上述计划。布林肯将在当地与18位太平洋领导人举行虚拟峰会。美国务院官员称，有非常明显的迹象表明，中国希望在印太地区建立军事关系。路透社报道称，布林肯此次斐济之行是美国国务卿40多年来首次访问斐济。在布林肯斐济之行的前一天，美国总统拜登周五（2月11日）才公布印太战略报告，誓言要向印太地区投入更多外交和安全资源，以抵制被其指试图在印太地区扩大影响力的中国。这是拜登第一份区域战略报告。所罗门群岛总理索加瓦雷在2019年与台湾断交，并与中国大陆建交，这外交举动引发反中情绪。来自马莱塔省的反政府暴乱者于去年11月发动骚乱，袭击首都霍尼亚拉，至少三人被杀，数十座建筑物被烧毁或被抢劫，唐人街被洗劫一空。随后，中国大陆派遣六名警察联络官到所罗门群岛，为当地警察部队提供装备和培训。所罗门群岛政府在一份声明中说，中国大陆提供的装备包括盾牌、头盔、警棍和“其他非致命装备，进一步提高所罗门群岛警察应对未来威胁的能力”。美国在1993年将其驻所罗门群岛外交机构降级，并关闭美国驻霍尼亚拉使馆。',
			textearett: '',
			colors: ['#ef0f39', '#ec0fef', '#9d0fef', '#390fef'],
			colors2: ['#ffffff', '#ffffff', '#ffffff', '#ffffff'],
			menustyle: {
				position: "fixed",
				top: "0",
				left: "0",
				border: "1px solid #eee",
				width: " 100px",
				"text-align ": "center"
			},
			anchorOffset: '', //选中区域最后一个字符 
			spanState: 0,
			indextt: 1,
		}
	},
	mounted() {


		this.textinnerHtml = this.text;


		// window.contextmenu = e => {
		// 	this.contextmenu(e);
		// }
		// window.getCursortPosition= e => { this.getCursortPosition(e) }
		// window.handleMouseSelect = e => { this.handleMouseSelect(e) }



		// console.log(this.serverRespone);
	},

	created(){
		window.mydata = this;
	},	

	methods: {

		//communication
		getData() {
			//set flask interface
			const path = this.backUrl;
			//'then' is 异步执行 
			axios.get(path)
				.then(res => {
					var msg = res.data;
					this.serverRespone = msg;
					console.log(this.serverRespone);
				})
				.catch((error) => {
					console.error(error);
				})
		},
		sendData() {
			const path = 'http://127.0.0.1:5000/upload';
			axios(path, 'from man').then(res => { alert(res.data); });


		},
		// file upload
		handleFileChange(e) {
			// let file = e.target.files[0];
			// console.log('e.target.files[0]',file)

			// const currentTarget = e.target;
			// console.log(e,'e')
			// console.log(e.target,'e.target')


			// if(currentTarget.files){
			// 	console.log('---------------')
			// 	// let file transfor to Array
			// 	var files = Array.from(currentTarget.files);
			// 	console.log('files',files[0])
			// 	//files[0] [[prototype]]=Blob

			// 	//判断文件是否合法
			// 	// if(props.beforeUpload){
			// 	// 	const result = props.beforeUpload(files[0]);
			// 	// 	if(!result) return;
			// 	// }
			// }

			let file = e.target.files[0]
			// let bFile = Array.from(e.target.files[0])
			// console.log(bFile)
			// console.log(file)
			//符合上传条件
			//在上传期间，把上传文件状态改为'loading'
			this.fileStatus = "loading";
			//文件为二进制，使用formData进行对象处理
			const formData = new FormData();
			// append方法把文件添加到formData实例对象中，[filename,file'self]
			formData.append('scriptFile', file);
			// console.log(files[0])
			// console.log('fromData',formData.get('scriptFile'))

			// console.log(formData[0])

			//将dataOj传到后台，需要解决跨域问题 ()
			// let tx= axios.create()
			// tx.post('http://127.0.0.1:5000/upload',formData,{
			// 	headers:{
			// 		"Content-Type":"multipart/form-data"
			// 	}
			// })
			// .then(res=>{
			// 	console.log(res)
			// 	console.log(res.data);
			// 	console.log(typeof(res.data))
			// 	this.text=res.data;
			// 	console.log(this.text[5]);
			// })
			// .catch(console.log('error'))


			//放弃formData二进制流

			axios({
				method: "put",
				url: 'http://127.0.0.1:5000/api/put/txt',
				data: file,
				headers: {
					"Content-Type": "application/octet-stream"
				},
				responseType: 'text',
			})
				.then(res => {
					this.text = res.data;
					this.textinnerHtml = this.text;
				})
				.catch(console.log('error'))

			
			console.log('dsa')

		},

		//左击
		getCursortPosition(e) {
			console.log('点击了')
			this.spanState = 1;
			//不知道这个模块干嘛的
			// console.log(e.target.className.indexOf('tizzyakaicejongjakaY'))
			if (e.target.className.indexOf('tizzyakaicejongjakaY') != -1) {
				this.spanState = e.target.className.split(' ')[1];
				console.log('1')
			}
			// 获取父级元素
			// var eleP = e.target.parentNode;
			// console.log(e.target.parentNode)

			// ------get  postition of div'element-----
			var pos = 0;
			pos = this.getDivPosition(e.target);//得到了  选中区域的最后一个字符序号
			//锚点抵消
			this.anchorOffset = pos;

		},
		getDivPosition(element) {
			var caretOffset = 0;
			var doc = element.ownerDocument || element.document;
			
			var win = doc.defaultView || doc.parentWindow;
			var sel;
			// 谷歌、火狐
				// console.log(win,win.)	

			if (typeof win.getSelection != "undefined") {
				sel = win.getSelection();
				// console.log(sel.getRangeAt)	
				// 选中的区域
				if (sel.rangeCount > 0) {
					//第几个字
					// console.log(win.getSelection().getRangeAt(0).endOffset)

					var range = win.getSelection().getRangeAt(0);
					// console.log(range,'--')
					// 克隆一个选中区域
					var preCaretRange = range.cloneRange();
					// console.log(range.cloneRange())

					// 设置选中区域的节点内容为当前节点
					// console.log(element)
					// preCaretRange.selectNodeContents(element);
					// 重置选中区域的结束位置
					// console.log(range.startOffset, range.endOffset)
					preCaretRange.setEnd(range.endContainer, range.endOffset);
					// console.log(preCaretRange)
					caretOffset = preCaretRange.toString().length;
				}
				// IE
			} else if ((sel = doc.selection) && sel.type != "Control") {
				var textRange = sel.createRange();
				var preCaretTextRange = doc.body.createTextRange();
				preCaretTextRange.moveToElementText(element);
				preCaretTextRange.setEndPoint("EndToEnd", textRange);
				caretOffset = preCaretTextRange.text.length;
			}
			console.log(caretOffset)
			return caretOffset;
		},
		//标注选中失去焦点事件
		handleMouseSelect(e) {
			// console.log(window.getSelection().toString())//获取鼠标选定的文字
			console.log('失去焦点了')
			// alert(window.getSelection().toString()+'\n'+e.clientX+'\r'+e.clientY)
			var text = window.getSelection().toString();
			console.log(!text)
			//text 是空值
			console.log(this.menustyle.left,this.menustyle.top)
			if (!text) {
				this.menustyle.left = 0;
				this.menustyle.top = 0;
			}
			console.log(this.menustyle.left,this.menustyle.top)

			this.textearett = text;
			// console.log(e.target.outerText)
			if (e && e.target && e.target.outerText) {
				if (e.target.outerText != this.textinnerHtml) {
					this.textearett = e.target.outerText;
					// console.log(this.$refs.menus.$el)
					e.target.innerHTML = e.target.outerText;
					if (e.target.className.indexOf('tizzyakaicejongjakaY') != -1) {
						this.spanState = e.target.className.split(' ')[1];
					}
					this.contextmenu(e)
				} else {
					// console.log(e.target.className);
					if (e.target.className.indexOf('tizzyakaicejongjakaY') != -1) {
						if (e.target.outerText != e.target.outerHTML) {
							this.textearett = e.target.outerText;
							// console.log(this.$refs.menus.$el)
							e.target.innerHTML = e.target.outerText;
							if (e.target.className.indexOf('tizzyakaicejongjakaY') != -1) {
								this.spanState = e.target.className.split(' ')[1];
							}
							this.contextmenu(e)
						}
					}

				}
				// if(e.target.outerHTML)
			}
		},
		//右键定位菜单
		contextmenu(e) { //右键单击事件

			if (this.spanState != 1) {
				document.oncontextmenu = function () {
					return false;
				}
			}
			e.preventDefault();
			this.menustyle.top = e.clientY + 'px';
			this.menustyle.left = e.clientX + 'px';
			this.menustyle['z-index'] = 2111;
		},
		//添加标注
		contentFun(num) {
			this.menustyle.left = 0;
			this.menustyle.top = 0;
			if (this.textearett !== '' && this.spanState == 1) {
				// 颜色、背景可以自行更改
				let neirong = this.text;
				this.indextt = this.indextt + 1;
				let keywordIndex = this.guangbiaoINdex();
				const replaceString =
					`<span  class="tizzyakaicejongjakaY tizzyakaicejongjakaX${this.indextt}" style="color: ${this.colors2[num]}; background: ${this.colors[num]}">${this.textearett}</span>`

				let left = neirong.substring(0, keywordIndex);
				let center = neirong.substring(keywordIndex, neirong.length);
				let right = neirong.substring(keywordIndex + this.textearett.length, neirong.length);

				var temp = [];
				var reg = new RegExp(center, 'g')
				temp = (center.replace(reg, replaceString))
				let centent = left + temp + right;
				this.text = centent;

				console.log('sucess')
			}
		},
		//获取innerhtml和innertext对应索引值
		guangbiaoINdex() {
			//
			let firstcontent = this.textearett.charAt(0);
			// this.$refs.textbox.innerHTML
			var box = this.textinnerHtml;
			var boxarr = [];
			var pos = box.indexOf(firstcontent);
			while (pos > -1) {
				boxarr.push(pos);
				pos = box.indexOf(firstcontent, pos + 1);
			}
			let offsets = this.anchorOffset - this.textearett.length;
			// console.log(box, firstcontent, boxarr, offsets)
			let innerHTMLindex = 0;
			for (let i = 0; i < boxarr.length; i++) {
				if (boxarr[i] == offsets) {
					innerHTMLindex = i;
				}
			}
			// console.log(firstcontent, boxarr, offsets)
			var boxtet = this.text;
			var boxarrtet = [];
			var pos2 = boxtet.indexOf(firstcontent);
			while (pos2 > -1) {
				boxarrtet.push(pos2);
				pos2 = boxtet.indexOf(firstcontent, pos2 + 1);
			}
			let innerTextIndex = boxarrtet[innerHTMLindex];
			return innerTextIndex;
		},
		//对已选进行修改
		contentFun2(num) {


			this.menustyle.left = 0;
			this.menustyle.top = 0;
			// console.log('ice----',this.textearett)
			if (this.textearett !== '') {
				// let keywordIndex = this.guangbiaoINdex();
				// console.log(this.textearett,this.text,this.spanState)
				let strspli = this.text.split(this.spanState);
				let keywordIndex = strspli[0].length + 58;
				let left = this.text.substring(0, keywordIndex);
				let center = this.colors[num];
				let rightstart = keywordIndex + 7;
				let right = this.text.substring(rightstart, this.text.length);

				// console.log(left);
				// console.log(center);
				// console.log(right);
				this.text = left + center + right;


			}
		},
		delRight() {
			//人物
			console.log('人物');
			if (this.spanState == 1) {
				this.contentFun(0);
			} else {
				this.contentFun2(0);
			}

		},
		delLeft() {
			//组织
			console.log('组织');
			if (this.spanState == 1) {
				this.contentFun(1);
			} else {
				this.contentFun2(1);
			}
		},
		closeAll() {
			//地点
			console.log('地点');
			if (this.spanState == 1) {
				this.contentFun(2);
			} else {
				this.contentFun2(2);
			}
		},
		delOhter() {
			//武器
			console.log('武器');
			if (this.spanState == 1) {
				this.contentFun(3);
			} else {
				this.contentFun2(3);
			}
		},
		//取消选中
		restxiao() {
			this.menustyle.left = 0;
			this.menustyle.top = 0;
			if (this.textearett !== '') {
				let strspli = this.text.split(this.spanState);
				let keywordIndex = strspli[0].length + 58;
				let doms = document.querySelector('.' + this.spanState);
				let left = this.text.substring(0, keywordIndex - 93);
				let center = doms.innerText;
				let rightstart = keywordIndex + 16 + center.length;
				let right = this.text.substring(rightstart, this.text.length)
				this.text = left + center + right;
			}
		}

	},
}
</script>

<style>
/* /deep/.el-menu .el-menu-item:hover{
		outline: 0 !important;
		color: #2E95FB !important;
		background: linear-gradient(270deg, #F2F7FC 0%, #FEFEFE 100%)!important;
	}
	/deep/.el-menu .el-menu-item.is-active {
		color: #2E95FB !important;
		background: linear-gradient(270deg, #F2F7FC 0%, #FEFEFE 100%)!important;
	}
	.el-submenu /deep/.el-submenu__title:hover {
	color: #2E95FB !important;
	background: linear-gradient(270deg, #F2F7FC 0%, #FEFEFE 100%)!important;
	} */


.box1 {
	width: 1200px;
	height: 460px;
	margin: 30px auto;
	border: 4px solid #a0b3d6;
	position: relative;
	border-radius: 2px;
}

.box {
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

.box

.box::-webkit-scrollbar {
	/*滚动条整体样式*/
	width: 6px;
	/*高宽分别对应横竖滚动条的尺寸*/
	height: 1px;
}

.box::-webkit-scrollbar-thumb {
	/*滚动条里面小方块*/
	border-radius: 10px;
	background-color: #F90;
	background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, .2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .2) 50%, rgba(255, 255, 255, .2) 75%, transparent 75%, transparent);
}

.box::-webkit-scrollbar-track {
	/*滚动条里面轨道*/
	-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
	/*border-radius: 10px;*/
	background: #EDEDED;
}

.box:focus {
	outline: none;
}

.tizzyakaicejongjakaY {
	/* -webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none; */
	cursor: pointer;
}</style>

