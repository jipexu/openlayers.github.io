(window.webpackJsonp=window.webpackJsonp||[]).push([[38],{272:function(e,a,t){"use strict";t.r(a);var n=t(24),r=t(3),o=t(27),w=t(2),c=t(10),d=t(51),i=t(17),b=t(9),s=t(11),u=t(5),m=t(20),p=t(56),f=t(4),l=t(45),v=t(111),g=new u.a({source:new b.b({wrapX:!1})}),j=new r.a({layers:[g],target:"map",view:new w.a({center:[0,0],zoom:1,multiWorld:!0})}),y=new s.a({wrapX:!1}),O=new m.a({source:y});j.addLayer(O);y.on("addfeature",(function(e){var a,t,n;a=e.feature,t=(new Date).getTime(),n=g.on("postrender",(function(e){var r=Object(l.b)(e),o=e.frameState,w=a.getGeometry().clone(),b=o.time-t,s=b/3e3,u=25*Object(p.b)(s)+5,m=Object(p.b)(1-s),f=new c.c({image:new d.a({radius:u,stroke:new i.a({color:"rgba(255, 0, 0, "+m+")",width:.25+m})})});r.setStyle(f),r.drawGeometry(w),b>3e3?Object(v.b)(n):j.render()}))})),window.setInterval((function(){var e=360*Math.random()-180,a=180*Math.random()-90,t=new o.a(Object(f.f)([e,a])),r=new n.a(t);y.addFeature(r)}),1e3)}},[[272,0]]]);
//# sourceMappingURL=feature-animation.js.map