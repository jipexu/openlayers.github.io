(window.webpackJsonp=window.webpackJsonp||[]).push([[141],{372:function(e,n,t){"use strict";t.r(n);for(var o=t(24),r=t(3),a=t(20),i=t(11),l=t(2),w=t(10),s=t(51),u=t(21),c=t(17),d=t(27),g=t(34),m=t(45),v=new Array(2e4),f=18e6,p=0;p<2e4;++p)v[p]=new o.a({geometry:new d.a([2*f*Math.random()-f,2*f*Math.random()-f]),i:p,size:p%2?10:20});var y={10:new w.c({image:new s.a({radius:5,fill:new u.a({color:"#666666"}),stroke:new c.a({color:"#bada55",width:1})})}),20:new w.c({image:new s.a({radius:10,fill:new u.a({color:"#666666"}),stroke:new c.a({color:"#bada55",width:1})})})},b=new i.a({features:v,wrapX:!1}),h=new a.a({source:b,style:function(e){return y[e.get("size")]}}),k=new r.a({layers:[h],target:document.getElementById("map"),view:new l.a({center:[0,0],zoom:2})}),C=null,E=null,z=function(e){var n=b.getClosestFeatureToCoordinate(e);if(null===n)C=null,E=null;else{var t=n.getGeometry().getClosestPoint(e);null===C?C=new d.a(t):C.setCoordinates(t),null===E?E=new g.a([e,t]):E.setCoordinates([e,t])}k.render()};k.on("pointermove",(function(e){if(!e.dragging){var n=k.getEventCoordinate(e.originalEvent);z(n)}})),k.on("click",(function(e){z(e.coordinate)}));var G=new c.a({color:"rgba(255,255,0,0.9)",width:3}),P=new w.c({stroke:G,image:new s.a({radius:10,stroke:G})});h.on("postrender",(function(e){var n=Object(m.b)(e);n.setStyle(P),null!==C&&n.drawGeometry(C),null!==E&&n.drawGeometry(E)})),k.on("pointermove",(function(e){if(!e.dragging){var n=k.getEventPixel(e.originalEvent),t=k.hasFeatureAtPixel(n);k.getTarget().style.cursor=t?"pointer":""}}))}},[[372,0]]]);
//# sourceMappingURL=synthetic-points.js.map