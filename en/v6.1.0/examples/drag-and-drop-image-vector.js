(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{262:function(e,n,t){"use strict";t.r(n);var a=t(3),i=t(2),r=t(226),o=t(30),c=t(227),s=t(100),u=t(173),f=t(211),g=t(50),w=t(5),l=t(231),p=t(41),d=t(10),v=new f.a({formatConstructors:[r.a,o.a,c.a,s.a,u.a]}),m=new a.a({interactions:Object(g.a)().extend([v]),layers:[new w.a({source:new p.a({imagerySet:"Aerial",key:"As1HiMj1PvLPlqc_gtM7AqZfBL8ZL3VrjaS3zIb22Uvb9WKhuJObROC-qUpa81U5"})})],target:"map",view:new i.a({center:[0,0],zoom:2})});v.on("addfeatures",function(e){var n=new d.a({features:e.features});m.addLayer(new l.a({source:n})),m.getView().fit(n.getExtent())});var b=function(e){var n=[];if(m.forEachFeatureAtPixel(e,function(e){n.push(e)}),n.length>0){var t,a,i=[];for(t=0,a=n.length;t<a;++t)i.push(n[t].get("name"));document.getElementById("info").innerHTML=i.join(", ")||"&nbsp"}else document.getElementById("info").innerHTML="&nbsp;"};m.on("pointermove",function(e){if(!e.dragging){var n=m.getEventPixel(e.originalEvent);b(n)}}),m.on("click",function(e){b(e.pixel)})}},[[262,0]]]);
//# sourceMappingURL=drag-and-drop-image-vector.js.map