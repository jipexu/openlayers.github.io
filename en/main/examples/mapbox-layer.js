(window.webpackJsonp=window.webpackJsonp||[]).push([[87],{317:function(e,t,o){"use strict";o.r(t);var a=o(31),n=o(71),r=o(3),i=o(20),c=o(11),s=o(2),l=o(10),m=o(17),w=o(4),p=[-98.8,37.9],u=new mapboxgl.Map({style:"https://api.maptiler.com/maps/bright/style.json?key=get_your_own_D6rA4zTHduk6KOKTXzGB",attributionControl:!1,boxZoom:!1,center:p,container:"map",doubleClickZoom:!1,dragPan:!1,dragRotate:!1,interactive:!1,keyboard:!1,pitchWithRotate:!1,scrollZoom:!1,touchZoomRotate:!1}),b=new n.a({render:function(e){var t=u.getCanvas(),o=e.viewState,a=b.getVisible();t.style.display=a?"block":"none";var n=b.getOpacity();t.style.opacity=n;var r=o.rotation;return r&&u.rotateTo(180*-r/Math.PI,{animate:!1}),u.jumpTo({center:Object(w.o)(o.center),zoom:o.zoom-1,animate:!1}),u._frame&&(u._frame.cancel(),u._frame=null),u._render(),t}}),d=new l.c({stroke:new m.a({color:"#319FD3",width:2})}),y=new i.a({source:new c.a({url:"data/geojson/countries.geojson",format:new a.a}),style:d});new r.a({target:"map",view:new s.a({center:Object(w.f)(p),zoom:4}),layers:[b,y]})}},[[317,0]]]);
//# sourceMappingURL=mapbox-layer.js.map