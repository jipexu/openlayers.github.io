(window.webpackJsonp=window.webpackJsonp||[]).push([[58],{306:function(e,n,t){"use strict";t.r(n);var o=t(24),a=t(3),r=t(79),i=t(2),s=t(26),p=t(23),c=t(5),l=t(53),g=t(10),u=t(11),w=t(94),m=new o.a({geometry:new s.a([0,0]),name:"Null Island",population:4e3,rainfall:500}),v=new u.c({image:new w.a({anchor:[.5,46],anchorXUnits:"fraction",anchorYUnits:"pixels",src:"data/icon.png"})});m.setStyle(v);var d=new g.a({features:[m]}),f=new p.a({source:d}),y=new c.a({source:new l.a({url:"https://a.tiles.mapbox.com/v3/aj.1x1-degrees.json",crossOrigin:""})}),h=new a.a({layers:[y,f],target:document.getElementById("map"),view:new i.a({center:[0,0],zoom:3})}),x=document.getElementById("popup"),E=new r.a({element:x,positioning:"bottom-center",stopEvent:!1,offset:[0,-50]});h.addOverlay(E),h.on("click",function(e){var n=h.forEachFeatureAtPixel(e.pixel,function(e){return e});if(n){var t=n.getGeometry().getCoordinates();E.setPosition(t),$(x).popover({placement:"top",html:!0,content:n.get("name")}),$(x).popover("show")}else $(x).popover("destroy")}),h.on("pointermove",function(e){if(e.dragging)$(x).popover("destroy");else{var n=h.getEventPixel(e.originalEvent),t=h.hasFeatureAtPixel(n);h.getTarget().style.cursor=t?"pointer":""}})}},[[306,0]]]);
//# sourceMappingURL=icon.js.map