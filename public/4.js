(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{MusO:function(t,e,a){"use strict";a.r(e);var r=a("gku4"),n={components:{crud:r.a},data:function(){return{fromChart:"",toChart:"",parentChart:"",newChart:{id:0},pageUrl:"/accounting/charts",apiUrl:"/accounting/charts/for/non-accountables"}},computed:{baseUrl:function(){return"/api/"+this.$route.params.taxPayer+"/"+this.$route.params.cycle},formURL:function(){return this.$route.name.replace("List","Form")},columns:function(){return[{key:"code",label:this.$i18n.t("commercial.code"),sortable:!0},{key:"name",label:this.$i18n.t("commercial.account"),sortable:!0},{key:"type",label:""},{key:"actions",label:""}]}},methods:{onSaveNew:function(){var t=this;null!=t.newChart.code&&null!=t.newChart.name&&r.a.methods.onUpdate(t.baseUrl+t.pageUrl,t.newChart).then(function(e){t.$snack.success({text:t.$i18n.t("chart.saved",t.newChart.code)}),t.$refs.accountModel.hide()}).catch(function(e){t.$snack.danger({text:this.$i18n.t("general.errorMessage")})})},onMerge:function(){var t=this;null!=t.toChart.id&&null!=t.toChart.name&&r.a.methods.onUpdate(t.baseUrl+"/accounting/charts/merge/"+t.fromChart.id+"/"+t.toChart.id).then(function(e){console.log(e),t.$snack.success({text:t.$i18n.t("chart.saved")}),t.$refs.mergeModel.hide()}).catch(function(e){t.$snack.danger({text:this.$i18n.t("general.errorMessage")})})},createChild:function(t){this.parentChart=t,this.newChart.id=0,this.newChart.parent_id=t.id,this.newChart.code=this.parentChart.code+".0",this.newChart.type=this.parentChart.type,this.newChart.sub_type=this.parentChart.sub_type},mergeChart:function(t){this.fromChart=t},typeVariant:function(t){return 1==t?"light":2==t?"dark":3==t?"warning":4==t?"success":5==t?"danger":void 0}}},s=a("KHd+"),o=Object(s.a)(n,function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[t.$route.name.includes("List")?a("b-row",[a("b-col",[a("b-card-group",{attrs:{deck:""}},[a("b-card",{attrs:{"bg-variant":"dark","text-variant":"white"}},[a("h4",{staticClass:"upper-case"},[a("img",{staticClass:"ml-5 mr-5",attrs:{src:t.$route.meta.img,alt:"",width:"26"}}),t._v("\n            "+t._s(t.$t(t.$route.meta.title))+"\n          ")]),t._v(" "),t.$route.name.includes("List")?a("p",{staticClass:"lead"},[t._v(t._s(t.$t(t.$route.meta.description))+",")]):t._e()]),t._v(" "),a("invoices-this-month-kpi",{staticClass:"d-none d-xl-block"}),t._v(" "),a("b-card",{attrs:{"no-body":""}},[a("b-list-group",{attrs:{flush:""}},[a("b-list-group-item",{attrs:{href:"#"}},[a("i",{staticClass:"material-icons"},[t._v("help")]),t._v("\n              "+t._s(t.$t("general.manual"))+"\n            ")]),t._v(" "),a("b-list-group-item",{attrs:{to:{name:t.uploadURL}}},[a("i",{staticClass:"material-icons"},[t._v("cloud_upload")]),t._v("\n              "+t._s(t.$t("general.uploadFromExcel"))+"\n            ")]),t._v(" "),a("b-list-group-item",{attrs:{to:{name:t.formURL,params:{id:0}}}},[a("i",{staticClass:"material-icons md-light"},[t._v("add_box")]),t._v("\n              "+t._s(t.$t("general.createNewRecord"))+"\n            ")])],1)],1)],1)],1)],1):t._e(),t._v(" "),a("b-row",[a("b-col",[t.$route.name.includes("List")?a("div",[a("crud",{attrs:{columns:t.columns},inlineTemplate:{render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("b-card",{attrs:{"no-body":""}},[a("b-table",{attrs:{hover:"",responsive:"",items:t.items,fields:t.columns,"current-page":t.current_page},scopedSlots:t._u([{key:"type",fn:function(t){return[a("chart-types",{attrs:{type:t.item.type,sub_type:t.item.sub_type}})]}},{key:"code",fn:function(e){return[e.item.is_accountable?a("span",[t._v(t._s(e.item.code))]):a("b",[t._v(t._s(e.item.code))])]}},{key:"name",fn:function(e){return[e.item.is_accountable?a("span",[t._v(t._s(e.item.name))]):a("b",[t._v(t._s(e.item.name))])]}},{key:"actions",fn:function(e){return[0==e.item.is_accountable?a("b-button-group",{staticClass:"show-when-hovered",attrs:{size:"sm"}},[a("b-button",{directives:[{name:"b-modal",rawName:"v-b-modal.chartOfAccounts",modifiers:{chartOfAccounts:!0}}],ref:"btnShow",on:{click:function(a){return t.$parent.createChild(e.item)}}},[a("i",{staticClass:"material-icons"},[t._v("playlist_add")])])],1):t._e(),t._v(" "),null!=e.item.taxpayer_id?a("div",[a("table-actions",{attrs:{row:e.item}}),t._v(" "),a("b-button",{directives:[{name:"b-modal",rawName:"v-b-modal.mergeChartOfAccounts",modifiers:{mergeChartOfAccounts:!0}}],ref:"btnShow",attrs:{size:"sm"},on:{click:function(a){return t.$parent.mergeChart(e.item)}}},[a("i",{staticClass:"material-icons"},[t._v("delete")])])],1):t._e()]}}],null,!1,3594808817)},[t._v(" "),t._v(" "),t._v(" "),t._v(" "),a("div",{attrs:{slot:"table-busy"},slot:"table-busy"},[a("table-loading")],1),t._v(" "),a("template",{slot:"empty"},[a("table-empty")],1)],2)],1)},staticRenderFns:[]}})],1):a("router-view")],1)],1),t._v(" "),a("b-modal",{ref:"accountModel",attrs:{id:"chartOfAccounts","hide-footer":"",centered:"",title:"Create Chart"}},[null!=t.parentChart?a("b-container",[a("b-form-group",{attrs:{label:t.$t("accounting.parentChart")}},[a("b-input-group",[a("b-input",{attrs:{readonly:"",type:"text",placeholder:t.$t("commercial.parent")},model:{value:t.parentChart.code,callback:function(e){t.$set(t.parentChart,"code",e)},expression:"parentChart.code"}}),t._v(" "),a("b-input-group-append",[a("b-input",{attrs:{readonly:"",type:"text"},model:{value:t.parentChart.name,callback:function(e){t.$set(t.parentChart,"name",e)},expression:"parentChart.name"}})],1)],1)],1),t._v(" "),a("b-form-group",{attrs:{label:t.$t("accounting.chart")}},[a("b-input-group",[a("b-input",{attrs:{required:"",placeholder:t.$t("commercial.code")},model:{value:t.newChart.code,callback:function(e){t.$set(t.newChart,"code","string"==typeof e?e.trim():e)},expression:"newChart.code"}}),t._v(" "),a("b-input-group-append",[a("b-input",{attrs:{required:"",placeholder:t.$t("commercial.name")},model:{value:t.newChart.name,callback:function(e){t.$set(t.newChart,"name","string"==typeof e?e.trim():e)},expression:"newChart.name"}})],1)],1)],1),t._v(" "),a("b-row",[a("b-col",[a("b-button",[t._v(t._s(t.spark.enumChartType[t.newChart.type]))])],1),t._v(" "),a("b-col",[a("b-form-group",{attrs:{label:"Is Accountable"}},[a("b-form-checkbox",{attrs:{switch:"",size:"lg",name:"check-button"},model:{value:t.newChart.is_accountable,callback:function(e){t.$set(t.newChart,"is_accountable",e)},expression:"newChart.is_accountable"}},[t._v(t._s(t.$t("accounting.isAccountable")))])],1)],1)],1),t._v(" "),1==t.newChart.type?a("b-form-group",{attrs:{label:"Asset Types",description:"Only accountable charts can be used in journals or transactions. If marked as false, it can only be used to summarise child accounts."}},[a("b-form-radio-group",{attrs:{options:t.spark.enumAsset},model:{value:t.newChart.sub_type,callback:function(e){t.$set(t.newChart,"sub_type",t._n(e))},expression:"newChart.sub_type"}})],1):t._e(),t._v(" "),2==t.newChart.type?a("b-form-group",{attrs:{label:"Liability Types",description:"Only accountable charts can be used in journals or transactions. If marked as false, it can only be used to summarise child accounts."}},[a("b-form-radio-group",{attrs:{options:t.spark.enumLiability},model:{value:t.newChart.sub_type,callback:function(e){t.$set(t.newChart,"sub_type",t._n(e))},expression:"newChart.sub_type"}})],1):t._e(),t._v(" "),3==t.newChart.type?a("b-form-group",{attrs:{label:"Equity Types",description:"Only accountable charts can be used in journals or transactions. If marked as false, it can only be used to summarise child accounts."}},[a("b-form-radio-group",{attrs:{options:t.spark.enumEquity},model:{value:t.newChart.sub_type,callback:function(e){t.$set(t.newChart,"sub_type",t._n(e))},expression:"newChart.sub_type"}})],1):t._e(),t._v(" "),4==t.newChart.type?a("b-form-group",{attrs:{label:"Revenue Types",description:"Only accountable charts can be used in journals or transactions. If marked as false, it can only be used to summarise child accounts."}},[a("b-form-radio-group",{attrs:{options:t.spark.enumRevenue},model:{value:t.newChart.sub_type,callback:function(e){t.$set(t.newChart,"sub_type",t._n(e))},expression:"newChart.sub_type"}})],1):t._e(),t._v(" "),5==t.newChart.type?a("b-form-group",{attrs:{label:"Expense Types",description:"Only accountable charts can be used in journals or transactions. If marked as false, it can only be used to summarise child accounts."}},[a("b-form-radio-group",{attrs:{options:t.spark.enumExpense},model:{value:t.newChart.sub_type,callback:function(e){t.$set(t.newChart,"sub_type",t._n(e))},expression:"newChart.sub_type"}})],1):t._e(),t._v(" "),a("b-button-toolbar",{staticClass:"float-right d-none d-md-block"},[a("b-button-group",{staticClass:"ml-15"},[a("b-btn",{directives:[{name:"shortkey",rawName:"v-shortkey",value:["ctrl","n"],expression:"['ctrl', 'n']"}],attrs:{variant:"primary"},on:{shortkey:function(e){return t.onSaveNew()},click:function(e){return t.onSaveNew()}}},[a("i",{staticClass:"material-icons"},[t._v("save")]),t._v("\n            "+t._s(t.$t("general.save"))+"\n          ")])],1)],1)],1):t._e()],1),t._v(" "),a("b-modal",{ref:"mergeModel",attrs:{id:"mergeChartOfAccounts","hide-footer":"",centered:"",title:"Merge Chart"}},[a("b-container",[a("b-form-group",{attrs:{label:t.$t("accounting.fromChart")}},[a("b-input-group",[a("b-input",{attrs:{readonly:"",type:"text",placeholder:t.$t("commercial.parent")},model:{value:t.fromChart.code,callback:function(e){t.$set(t.fromChart,"code",e)},expression:"fromChart.code"}}),t._v(" "),a("b-input-group-append",[a("b-input",{attrs:{readonly:"",type:"text"},model:{value:t.fromChart.name,callback:function(e){t.$set(t.fromChart,"name",e)},expression:"fromChart.name"}})],1)],1)],1),t._v(" "),a("b-form-group",{attrs:{label:t.$t("accounting.toChart")}},[a("b-input-group",[a("select-data",{attrs:{Id:t.toChart,api:t.apiUrl},on:{"update:Id":function(e){t.toChart=e},"update:id":function(e){t.toChart=e}}})],1)],1),t._v(" "),a("b-button-toolbar",{staticClass:"float-right d-none d-md-block"},[a("b-button-group",{staticClass:"ml-15"},[a("b-btn",{directives:[{name:"shortkey",rawName:"v-shortkey",value:["ctrl","m"],expression:"['ctrl', 'm']"}],attrs:{variant:"primary"},on:{shortkey:function(e){return t.onMerge()},click:function(e){return t.onMerge()}}},[a("i",{staticClass:"material-icons"},[t._v("Merge")]),t._v("\n            "+t._s(t.$t("general.merge"))+"\n          ")])],1)],1)],1)],1)],1)},[],!1,null,null,null);e.default=o.exports}}]);