(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{261:function(e,n,t){"use strict";t.r(n);var a=t(3),r=t(2),o=t(5),i=t(17),c=t(9),w=new r.a({center:[0,0],zoom:2});new a.a({layers:[new o.a({source:new c.b})],target:"map",view:w});function d(e){return document.getElementById(e)}var s=new GyroNorm;s.init().then(function(){s.start(function(e){var n=w.getCenter(),t=w.getResolution(),a=Object(i.i)(e.do.alpha),r=Object(i.i)(e.do.beta),o=Object(i.i)(e.do.gamma);d("alpha").innerText=a+" [rad]",d("beta").innerText=r+" [rad]",d("gamma").innerText=o+" [rad]",n[0]-=t*o*25,n[1]+=t*r*25,w.setCenter(n)})})}},[[261,0]]]);
//# sourceMappingURL=device-orientation.js.map