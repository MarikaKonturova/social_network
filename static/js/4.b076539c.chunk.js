(this.webpackJsonpkabzda_npm=this.webpackJsonpkabzda_npm||[]).push([[4],{100:function(e,s,a){"use strict";a.r(s);var t=a(50),n=a(39),i=(a(0),a(94)),c=a.n(i),r=a(8),d=a(1),o=function(e){var s="/dialogs/"+e.id;return Object(d.jsx)("div",{className:c.a.dialog+" "+c.a.active,children:Object(d.jsx)(r.b,{to:s,children:e.name})})},u=function(e){return Object(d.jsx)("div",{className:c.a.message,children:e.message})},b=a(24),j=a(29),g=a(33),l=Object(g.b)(100),m=function(e){var s=e.addNewMessage,a=e.required;Object(n.a)(e,["addNewMessage","required"]);return Object(d.jsx)(b.b,{onSubmit:s,render:function(e){var s=e.handleSubmit;return Object(d.jsxs)("form",{onSubmit:s,children:[Object(d.jsx)("div",{children:Object(d.jsx)(b.a,{name:"newMessageBody",validate:Object(g.a)(a,l),component:j.b,placeholder:"Enter your message"})}),Object(d.jsx)("button",{type:"submit",children:"Submit"})]})}})},O=function(e){var s=e.state.dialogs.map((function(e){return Object(d.jsx)(o,{id:e.id,name:e.name},e.id)})),a=e.state.messages.map((function(e){return Object(d.jsx)(u,{message:e.message},e.id)}));return Object(d.jsxs)("div",{className:c.a.dialogs,children:[Object(d.jsx)("div",{className:c.a.dialogsItems,children:s}),Object(d.jsx)("div",{className:c.a.messages,children:Object(d.jsxs)("div",{children:[" ",a]})}),Object(d.jsx)(m,{addNewMessage:function(s){var a=s.newMessageBody;e.sendmessage(a)},required:g.c})]})},f=a(14),h=a(95),_=a(16);s.default=Object(_.compose)(Object(f.b)((function(e){return{state:e.messagesPage}}),(function(e){return{sendmessage:function(s){e(Object(t.b)(s))}}})),h.a)(O)},94:function(e,s,a){e.exports={dialogs:"Dialogs_dialogs__2sQEs",dialog:"Dialogs_dialog__203-Q",active:"Dialogs_active__1pcFk",dialogsItems:"Dialogs_dialogsItems__PT4-G",messages:"Dialogs_messages__27JYH",message:"Dialogs_message__21fPF"}},95:function(e,s,a){"use strict";a.d(s,"a",(function(){return o}));var t=a(3),n=a(39),i=a(5),c=(a(0),a(14)),r=a(1),d=function(e){return{isAuth:e.auth.data.isAuth}};function o(e){return Object(c.b)(d)((function(s){var a=Object(t.a)({},s),c=(a.isAuth,Object(n.a)(a,["isAuth"]));return s.isAuth?Object(r.jsx)(e,Object(t.a)({},c)):Object(r.jsx)(i.a,{to:"/login"})}))}}}]);
//# sourceMappingURL=4.b076539c.chunk.js.map