(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4dfe2cfc"],{"15c7":function(e,t,i){"use strict";var n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"article-container"},[i("el-form",{ref:"postForm",staticClass:"form-container",attrs:{model:e.postForm,rules:e.rules}},[i("el-form-item",{attrs:{label:"姓名:",prop:"student_name","label-width":"85px"}},[i("el-input",{staticClass:"article-form-input",attrs:{maxlength:"32",placeholder:"请输入姓名"},model:{value:e.postForm.student_name,callback:function(t){e.$set(e.postForm,"student_name",t)},expression:"postForm.student_name"}})],1),i("el-form-item",{attrs:{label:"学号:","label-width":"85px"}},[i("el-input",{staticClass:"article-form-input",attrs:{maxlength:"32",placeholder:"请输入学号"},model:{value:e.postForm.student_number,callback:function(t){e.$set(e.postForm,"student_number",t)},expression:"postForm.student_number"}})],1),i("el-form-item",{attrs:{label:"导师:","label-width":"85px"}},[i("el-select",{staticClass:"article-form-select",attrs:{multiple:"",clearable:"","collapse-tags":"",placeholder:"请选择导师"},model:{value:e.postForm.teachers,callback:function(t){e.$set(e.postForm,"teachers",t)},expression:"postForm.teachers"}},e._l(e.teacherOptions,(function(e){return i("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1),i("el-form-item",{attrs:{label:"学院:",prop:"school","label-width":"85px"}},[i("el-select",{staticClass:"article-form-select",attrs:{filterable:"",clearable:"",remote:"",placeholder:"请输入/选择学院名称","remote-method":e.handleRemoteMethod,loading:e.selectLoading},on:{blur:e.handleSelectBlur},model:{value:e.postForm.school,callback:function(t){e.$set(e.postForm,"school",t)},expression:"postForm.school"}},e._l(e.collegeOptions.target,(function(e){return i("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1),i("el-form-item",{attrs:{label:"毕设名称:",prop:"name","label-width":"85px"}},[i("el-input",{staticClass:"article-form-input",attrs:{maxlength:"32",placeholder:"请输入毕设名称"},model:{value:e.postForm.name,callback:function(t){e.$set(e.postForm,"name",t)},expression:"postForm.name"}})],1),i("el-form-item",{attrs:{prop:"brief","label-width":"85px",label:"简介:"}},[i("el-input",{staticClass:"article-form-textarea",attrs:{rows:1,maxlength:"255",type:"textarea",autosize:"",placeholder:"请输入简介"},model:{value:e.postForm.brief,callback:function(t){e.$set(e.postForm,"brief",t)},expression:"postForm.brief"}})],1),i("el-form-item",{attrs:{label:"等级:",prop:"level","label-width":"85px"}},[i("el-select",{staticClass:"article-form-select",attrs:{clearable:"",placeholder:"请选择等级"},model:{value:e.postForm.level,callback:function(t){e.$set(e.postForm,"level",t)},expression:"postForm.level"}},e._l(e.levelOptions,(function(e){return i("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1),i("el-form-item",{attrs:{"label-width":"85px",label:"毕设封面:",prop:"cover"}},[i("Upload",{attrs:{action:e.action},on:{onsuccess:e.handleSuccess},model:{value:e.postForm.cover,callback:function(t){e.$set(e.postForm,"cover",t)},expression:"postForm.cover"}})],1),i("el-form-item",{attrs:{"label-width":"85px",label:"毕设内容:",prop:"content"}},[i("Tinymce",{ref:"editor",staticStyle:{minWidth:"585px"},attrs:{height:400,width:"90%"},model:{value:e.postForm.content,callback:function(t){e.$set(e.postForm,"content",t)},expression:"postForm.content"}},[i("div",{staticClass:"editor-custom-btn-container",attrs:{slot:"extra"},slot:"extra"},[i("editorImage",{staticClass:"editor-upload-btn",attrs:{color:"#1890ff",action:e.action,prefix:e.prefix.image},on:{successCBK:e.imageSuccessCBK}})],1)])],1),i("el-form-item",{staticClass:"submit-form-item",attrs:{"label-width":"85px"}},[i("el-button",{directives:[{name:"loading",rawName:"v-loading",value:e.publishLoading,expression:"publishLoading"}],attrs:{type:"primary"},on:{click:e.submitForm}},[e._v(" 提交 ")])],1)],1)],1)},a=[],r=i("5530"),s=i("1da1"),o=(i("d81d"),i("b0c0"),i("7db0"),i("ac1f"),i("5319"),i("498a"),i("fb6a"),i("159b"),i("96cf"),function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"tinymce-container",class:{fullscreen:e.fullscreen},style:{width:e.containerWidth}},[i("textarea",{staticClass:"tinymce-textarea",attrs:{id:e.tinymceId}}),e._v(" "),e._t("extra")],2)}),l=[],c=(i("b680"),i("a9e3"),["advlist anchor autolink autosave code codesample colorpicker colorpicker contextmenu directionality emoticons fullscreen hr image imagetools insertdatetime link lists media nonbreaking noneditable pagebreak paste preview print save searchreplace spellchecker tabfocus table template textcolor textpattern visualblocks visualchars wordcount"]),u=c,d=["searchreplace bold italic underline strikethrough alignleft aligncenter alignright outdent indent  blockquote undo redo removeformat subscript superscript code codesample","hr bullist numlist link image charmap preview anchor pagebreak insertdatetime media table emoticons forecolor backcolor fullscreen"],m=d,p=i("b85c"),h=[];function f(){return window.tinymce}var b=function(e,t){var i=document.getElementById(e),n=t||function(){};if(!i){var a=document.createElement("script");a.src=e,a.id=e,document.body.appendChild(a),h.push(n);var r="onload"in a?s:o;r(a)}function s(t){t.onload=function(){this.onerror=this.onload=null;var e,i=Object(p["a"])(h);try{for(i.s();!(e=i.n()).done;){var n=e.value;n(null,t)}}catch(a){i.e(a)}finally{i.f()}h=null},t.onerror=function(){this.onerror=this.onload=null,n(new Error("Failed to load "+e),t)}}function o(e){e.onreadystatechange=function(){if("complete"===this.readyState||"loaded"===this.readyState){this.onreadystatechange=null;var t,i=Object(p["a"])(h);try{for(i.s();!(t=i.n()).done;){var n=t.value;n(null,e)}}catch(a){i.e(a)}finally{i.f()}h=null}}}i&&n&&(f()?n(null,i):h.push(n))},g=b,v="https://cdn.jsdelivr.net/npm/tinymce-all-in-one@4.9.3/tinymce.min.js",y={name:"Tinymce",props:{id:{type:String,default:function(){return"vue-tinymce-"+ +new Date+(1e3*Math.random()).toFixed(0)}},value:{type:String,default:""},toolbar:{type:Array,required:!1,default:function(){return[]}},menubar:{type:String,default:"file edit insert view format table"},height:{type:[Number,String],required:!1,default:360},width:{type:[Number,String],required:!1,default:"auto"}},data:function(){return{hasChange:!1,hasInit:!1,tinymceId:this.id,fullscreen:!1,languageTypeList:{en:"en",zh:"zh_CN",es:"es_MX",ja:"ja"}}},computed:{containerWidth:function(){var e=this.width;return/^[\d]+(\.[\d]+)?$/.test(e)?"".concat(e,"px"):e}},watch:{value:function(e){var t=this;!this.hasChange&&this.hasInit&&this.$nextTick((function(){return window.tinymce.get(t.tinymceId).setContent(e||"")}))}},mounted:function(){this.init()},activated:function(){window.tinymce&&this.initTinymce()},deactivated:function(){this.destroyTinymce()},destroyed:function(){this.destroyTinymce()},methods:{init:function(){var e=this;g(v,(function(t){t?e.$message.error(t.message):e.initTinymce()}))},initTinymce:function(){var e=this,t=this;window.tinymce.init({selector:"#".concat(this.tinymceId),language:this.languageTypeList["en"],resize:"both",height:this.height,body_class:"panel-body ",object_resizing:!1,toolbar:this.toolbar.length>0?this.toolbar:m,menubar:this.menubar,plugins:u,end_container_on_empty_block:!0,powerpaste_word_import:"clean",code_dialog_height:450,code_dialog_width:1e3,advlist_bullet_styles:"square",advlist_number_styles:"default",imagetools_cors_hosts:["www.tinymce.com","codepen.io"],default_link_target:"_blank",link_title:!1,nonbreaking_force_tab:!0,init_instance_callback:function(i){t.value&&i.setContent(t.value),t.hasInit=!0,i.on("NodeChange Change KeyUp SetContent",(function(){e.hasChange=!0,e.$emit("input",i.getContent())}))},setup:function(e){e.on("FullscreenStateChanged",(function(e){t.fullscreen=e.state}))},convert_urls:!1})},destroyTinymce:function(){var e=window.tinymce.get(this.tinymceId);this.fullscreen&&e.execCommand("mceFullScreen"),e&&e.destroy()},setContent:function(e){window.tinymce.get(this.tinymceId).setContent(e)},getContent:function(){window.tinymce.get(this.tinymceId).getContent()}}},w=y,_=(i("4b90"),i("2877")),x=Object(_["a"])(w,o,l,!1,null,"f26e37d4",null),k=x.exports,O=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"upload-wrapper"},[e.fileList.length?i("ul",{staticClass:"el-upload-list el-upload-list--picture-card"},e._l(e.fileList,(function(t,n){return i("li",{key:n,staticClass:"el-upload-list__item is-ready"},[i("img",{staticClass:"el-upload-list__item-thumbnail",attrs:{src:t.url,alt:""}}),i("span",{staticClass:"el-upload-list__item-actions"},[i("span",{staticClass:"el-upload-list__item-preview",on:{click:function(i){return e.handlePictureCardPreview(t)}}},[i("i",{staticClass:"el-icon-zoom-in"})]),i("span",{staticClass:"el-upload-list__item-reupload",on:{click:function(t){return e.handleReload()}}},[i("i",{staticClass:"el-icon-refresh-right"})]),e.disabled?e._e():i("span",{staticClass:"el-upload-list__item-delete",on:{click:function(i){return e.handleRemove(t)}}},[i("i",{staticClass:"el-icon-delete"})])])])})),0):e._e(),i("el-upload",{directives:[{name:"show",rawName:"v-show",value:!e.showUpload,expression:"!showUpload"}],staticClass:"el-inner-upload",attrs:{action:e.action,"show-file-list":!1,"on-success":e.handleSuccess,"before-upload":e.handleBeforeUpload}},[i("i",{ref:"upload",staticClass:"el-icon-plus",attrs:{slot:"default"},slot:"default"})]),i("el-dialog",{attrs:{visible:e.dialogVisible},on:{"update:visible":function(t){e.dialogVisible=t}}},[i("img",{attrs:{width:"100%",src:e.dialogImageUrl,alt:""}})])],1)},C=[],j=(i("4de4"),{name:"SingleImageUpload3",props:{action:{type:String,default:""},value:{type:String,default:""},limit:{type:Number,default:1}},data:function(){return{dialogImageUrl:"",dialogVisible:!1,disabled:!1}},computed:{imageUrl:function(){return this.value},fileList:function(){if(!this.value)return[];var e=Array.isArray(this.value)?this.value:[{url:this.value}];return e},showUpload:function(){return this.fileList.length&&this.fileList.length>=this.limit}},methods:{handleBeforeUpload:function(e){var t=e.size/1024/1024<2;return t||this.$message.error("上传头像图片大小不能超过 2MB!"),t},handleRemove:function(e){var t=Array.isArray(this.value);t?this.$emit("input",this.fileList.filter((function(t){return t.url!==e.url}))):this.$emit("input","")},handleSuccess:function(e,t,i){this.$emit("onsuccess",e,t,i)},handlePictureCardPreview:function(e){this.dialogImageUrl=e.url,this.dialogVisible=!0},handleReload:function(){this.$refs["upload"].click(),this.$emit("reupload")}}}),F=j,S=(i("2b0a"),Object(_["a"])(F,O,C,!1,null,"5b48b79f",null)),$=S.exports,L=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"upload-container"},[i("el-button",{style:{background:e.color,borderColor:e.color},attrs:{icon:"el-icon-upload",size:"mini",type:"primary"},on:{click:function(t){e.dialogVisible=!0}}},[e._v(" 上传图片 ")]),i("el-dialog",{attrs:{visible:e.dialogVisible},on:{"update:visible":function(t){e.dialogVisible=t}}},[i("el-upload",{staticClass:"editor-slide-upload",attrs:{multiple:!0,"file-list":e.fileList,"show-file-list":!0,"on-remove":e.handleRemove,"on-success":e.handleSuccess,"before-upload":e.beforeUpload,action:e.action,"list-type":"picture-card"}},[i("el-button",{attrs:{size:"small",type:"primary"}},[e._v(" 点击上传 ")])],1),i("el-button",{on:{click:function(t){e.dialogVisible=!1}}},[e._v(" 取消 ")]),i("el-button",{attrs:{type:"primary"},on:{click:e.handleSubmit}},[e._v(" 确认 ")])],1)],1)},I=[],R=(i("b64b"),i("d3b7"),i("3ca3"),i("ddb0"),i("2b3d"),{name:"EditorSlideUpload",props:{color:{type:String,default:"#1890ff"},action:{type:String,default:""},prefix:{type:String,default:""}},data:function(){return{dialogVisible:!1,listObj:{},fileList:[]}},methods:{checkAllSuccess:function(){var e=this;return Object.keys(this.listObj).every((function(t){return e.listObj[t].hasSuccess}))},handleSubmit:function(){var e=this,t=Object.keys(this.listObj).map((function(t){return e.listObj[t]}));this.checkAllSuccess()?(this.$emit("successCBK",t),this.listObj={},this.fileList=[],this.dialogVisible=!1):this.$message({message:"Please wait for all images to be uploaded successfully. If there is a network problem, please refresh the page and upload again!",type:"warning"})},handleSuccess:function(e,t){var i=t.uid,n=Object.keys(this.listObj),a=n.find((function(e){return e===i+""}));if(a&&e){var r=e.data,s=this.listObj[a];return s.url=this.prefix+r.suffix,void(s.hasSuccess=!0)}},handleRemove:function(e){for(var t=e.uid,i=Object.keys(this.listObj),n=0,a=i.length;n<a;n++)if(this.listObj[i[n]].uid===t)return void delete this.listObj[i[n]]},beforeUpload:function(e){var t=this,i=window.URL||window.webkitURL,n=e.uid;return this.listObj[n]={},new Promise((function(a,r){var s=new Image;s.src=i.createObjectURL(e),s.onload=function(){t.listObj[n]={hasSuccess:!1,uid:e.uid,width:this.width,height:this.height}},a(!0)}))}}}),U=R,T=(i("b2cd"),Object(_["a"])(U,L,I,!1,null,"5ca87508",null)),E=T.exports,q=i("28a1"),B=i("50cc"),z=i("b775");function A(){return Object(z["a"])({url:"/api/upload/prefix",method:"get"})}var V={name:"",school:"",level:"",student_name:"",student_number:"",teachers:[],brief:"",cover:"",content:""},M={name:"ArticleDetail",components:{Tinymce:k,Upload:$,EditorImage:E},props:{isEdit:{type:Boolean,default:!1}},data:function(){return{postForm:Object.assign({},V),publishLoading:!1,userListOptions:[],action:"/api/admin/upload/image",rules:{name:[{required:!0,message:"请输入毕设名称",trigger:"blur"}],school:[{required:!0,message:"请输入/选择学院",trigger:"change"}],student_name:[{required:!0,message:"请输入姓名",trigger:"blur"}],cover:[{required:!0,message:"请上传毕设封面",trigger:"change"}],brief:[{required:!0,message:"请输入简介",trigger:"blur"}],level:[{required:!0,message:"请选择等级",trigger:"change"}]},selectLoading:!1,collegeOptions:{target:[],origin:[]},teacherOptions:[],levelOptions:[{label:"一等奖",value:1},{label:"二等奖",value:2},{label:"三等奖",value:3}],prefix:{}}},created:function(){if(this.getList(),this.getPrefix(),this.isEdit){var e=this.$route.params&&this.$route.params.id;this.fetchData(e)}},methods:{getPrefix:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){var i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,A();case 2:i=t.sent,e.prefix=i.data||{};case 4:case"end":return t.stop()}}),t)})))()},getList:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){var i,n,a,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(B["d"])({page:0,pageSize:0});case 2:return i=t.sent,t.next=5,Object(B["c"])();case 5:n=t.sent,0===n.code&&e.handleMapCollegeOptions(n.data||[]),0===i.code&&(a=i.data||{},r=a.teachers,e.teacherOptions=(r||[]).map((function(e){return{label:e.name,value:e.id}})));case 8:case"end":return t.stop()}}),t)})))()},handleMapCollegeOptions:function(e,t){var i=e.map((function(e){return{label:e,value:e}}));t||(this.collegeOptions.origin=i),this.collegeOptions.target=i},fetchData:function(e){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function i(){var n,a;return regeneratorRuntime.wrap((function(i){while(1)switch(i.prev=i.next){case 0:return i.next=2,Object(q["c"])({id:e});case 2:n=i.sent,a=n.data||{},t.postForm=Object.assign({},{content:a.content,cover:a.cover,level:a.level,name:a.name,brief:a.brief,school:a.school,teachers:Array.isArray(a.teachers)&&a.teachers.map((function(e){var i=t.teachers.find((function(t){return t.value===e}));if(i)return Object(r["a"])({},i)})),student_name:a.student&&a.student.name,student_number:a.student&&a.student.number});case 5:case"end":return i.stop()}}),i)})))()},submitForm:function(){var e=this;this.$refs.postForm.validate((function(t){t&&(e.publishLoading=!0,e.$message({message:"提交成功",type:"success"}),e.publishLoading=!1,e.$nextTick((function(){e.$router.replace({name:"GraduationManagement"})})))}))},handleRemoteMethod:function(e){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function i(){var n;return regeneratorRuntime.wrap((function(i){while(1)switch(i.prev=i.next){case 0:if(""===e){i.next=9;break}return t.selectLoading=!0,i.next=4,Object(B["c"])({name:e.trim()});case 4:n=i.sent,t.selectLoading=!1,t.handleMapCollegeOptions(n.data||[],!0),i.next=10;break;case 9:t.collegeOptions.target=t.collegeOptions.origin.slice();case 10:case"end":return i.stop()}}),i)})))()},handleSelectBlur:function(){""===this.postForm.school.trim()&&(this.collegeOptions.target=this.collegeOptions.origin.slice())},handleSuccess:function(e,t,i){if(e&&0===e.code){var n=e.data.suffix;this.postForm.cover=this.prefix.image+n}},draftForm:function(){0!==this.postForm.content.length&&0!==this.postForm.title.length?(this.$message({message:"保存成功",type:"success",showClose:!0,duration:1e3}),this.postForm.status="draft"):this.$message({message:"请填写必要的标题和内容",type:"warning"})},imageSuccessCBK:function(e){var t=this.$refs["editor"];t&&e.forEach((function(e){return window.tinymce.get(t.tinymceId).insertContent('<img class="wscnph" style="max-width: 100%;" src="'.concat(e.url,'" >'))}))}}},P=M,N=(i("3f3b"),i("54cf"),Object(_["a"])(P,n,a,!1,null,"45cad2df",null));t["a"]=N.exports},"1a83":function(e,t,i){},"28a1":function(e,t,i){"use strict";i.d(t,"b",(function(){return a})),i.d(t,"c",(function(){return r})),i.d(t,"a",(function(){return s}));var n=i("b775");function a(e){return Object(n["a"])({url:"/api/work",method:"get",params:e})}function r(e){return Object(n["a"])({url:"/api/work/".concat(e.id),method:"get"})}function s(e){return Object(n["a"])({url:"/api/admin/work/edit",method:"post",data:e})}},"2b0a":function(e,t,i){"use strict";i("9637")},"3f3b":function(e,t,i){"use strict";i("af14")},"4b90":function(e,t,i){"use strict";i("1a83")},"50cc":function(e,t,i){"use strict";i.d(t,"c",(function(){return a})),i.d(t,"a",(function(){return r})),i.d(t,"d",(function(){return s})),i.d(t,"b",(function(){return o})),i.d(t,"e",(function(){return l}));var n=i("b775");function a(e){return Object(n["a"])({url:"/api/school",method:"get",params:e})}function r(e){return Object(n["a"])({url:"/api/admin/school/add",method:"post",data:e})}function s(e){return Object(n["a"])({url:"/api/teacher",method:"get",params:e})}function o(e){return Object(n["a"])({url:"/api/admin/teacher/add",method:"post",data:e})}function l(e){return Object(n["a"])({url:"/api/admin/teacher/edit",method:"post",data:e})}},"54cf":function(e,t,i){"use strict";i("cf4d")},9637:function(e,t,i){},"9e64":function(e,t,i){},af14:function(e,t,i){},b2cd:function(e,t,i){"use strict";i("9e64")},cf4d:function(e,t,i){}}]);