(window.webpackJsonp=window.webpackJsonp||[]).push([[167],{414:function(e,r,t){"use strict";t.r(r);for(var a=t(3),i=t(2),s=t(1),n=t(5),o=t(4),c=t(9),p=t(97),w=t(146),l=Object(o.i)("EPSG:3857"),g=l.getExtent(),u=Object(s.E)(g)/256,m=new Array(14),y=new Array(14),S=0;S<14;++S)m[S]=u/Math.pow(2,S),y[S]=S;new a.a({layers:[new n.a({source:new c.b,opacity:.7}),new n.a({opacity:.7,source:new p.a({attributions:'Tiles © <a href="https://services.arcgisonline.com/arcgis/rest/services/Demographics/USA_Population_Density/MapServer/">ArcGIS</a>',url:"https://services.arcgisonline.com/arcgis/rest/services/Demographics/USA_Population_Density/MapServer/WMTS/",layer:"0",matrixSet:"EPSG:3857",format:"image/png",projection:l,tileGrid:new w.b({origin:Object(s.C)(g),resolutions:m,matrixIds:y}),style:"default",wrapX:!0})})],target:"map",view:new i.a({center:[-11158582,4813697],zoom:4})})}},[[414,0]]]);
//# sourceMappingURL=wmts.js.map