(window.webpackJsonp=window.webpackJsonp||[]).push([[148],{379:function(e,t,n){"use strict";n.r(t);var o=n(24),a=n(3),r=n(161),d=n(2),i=n(10),w=n(51),c=n(21),g=n(17),s=n(67),l=n(65),u=n(148),f=n(34),y=n(27),m=n(32),v=n(9),h=n(11),p=n(5),b=n(20),I=new p.a({source:new v.b}),k=new h.a({wrapX:!1}),F=new b.a({source:k,style:function(e){return[new i.c({image:new w.a({radius:8,fill:new c.a({color:"rgba(255, 0, 0, 0.2)"}),stroke:new g.a({color:"red",width:1})}),text:new s.a({text:e.get("node").id.toString(),fill:new c.a({color:"red"}),stroke:new g.a({color:"white",width:3})})})]}}),B=new h.a({wrapX:!1}),x=new b.a({source:B,style:function(e){return[new i.c({stroke:new g.a({color:"blue",width:1}),text:new s.a({text:e.get("edge").id.toString(),fill:new c.a({color:"blue"}),stroke:new g.a({color:"white",width:2})})})]}}),E=new h.a({wrapX:!1}),N=new b.a({source:E,style:function(e){return[new i.c({stroke:new g.a({color:"black",width:1}),fill:new c.a({color:"rgba(0, 255, 0, 0.2)"}),text:new s.a({font:"bold 12px sans-serif",text:e.get("face").id.toString(),fill:new c.a({color:"green"}),stroke:new g.a({color:"white",width:2})})})]}}),S=new a.a({layers:[I,N,x,F],target:"map",view:new d.a({center:[-11e6,46e5],zoom:16})}),P=topolis.createTopology();function G(e,t){var n=e.getFeatureById(t.id);e.removeFeature(n)}function X(e,t){var n=e.getEdgeByPoint(t,5)[0];return n?e.modEdgeSplit(n,t):e.addIsoNode(t)}P.on("addnode",(function(e){var t=new o.a({geometry:new y.a(e.coordinate),node:e});t.setId(e.id),k.addFeature(t)})),P.on("removenode",(function(e){G(k,e)})),P.on("addedge",(function(e){var t=new o.a({geometry:new f.a(e.coordinates),edge:e});t.setId(e.id),B.addFeature(t)})),P.on("modedge",(function(e){B.getFeatureById(e.id).setGeometry(new f.a(e.coordinates))})),P.on("removeedge",(function(e){G(B,e)})),P.on("addface",(function(e){var t=P.getFaceGeometry(e),n=new o.a({geometry:new m.b(t),face:e});n.setId(e.id),E.addFeature(n)})),P.on("removeface",(function(e){G(E,e)}));var C=new l.c({type:"LineString"});C.on("drawend",(function(e){var t,n,o=e.feature.getGeometry().getCoordinates(),a=o[0],r=o[o.length-1];try{t=P.getNodeByPoint(a),n=P.getNodeByPoint(r);var d=P.getEdgeByPoint(a,5),i=P.getEdgeByPoint(r,5),w=P.getEdgesByLine(o);if(1===w.length&&!t&&!n&&0===d.length&&0===i.length)return P.remEdgeNewFace(w[0]),(t=w[0].start).face&&P.removeIsoNode(t),void((n=w[0].end).face&&P.removeIsoNode(n));t||(t=X(P,a),o[0]=t.coordinate),n||(n=X(P,r),o[o.length-1]=n.coordinate),P.addEdgeNewFaces(t,n,o)}catch(e){toastr.warning(e.toString())}})),S.addInteraction(C);var J=new u.a({source:B});S.addInteraction(J),S.addControl(new r.a)}},[[379,0]]]);
//# sourceMappingURL=topolis.js.map