(window.webpackJsonp=window.webpackJsonp||[]).push([[35],{188:function(t,e,n){"use strict";var r=n(24),o=n(39),a=n(31),i=n(45),l=n(1),u=n(7),p=n(26),s=n(33),c=n(58),h=n(23),d=n(10),x=n(11),_=n(4),v={EXTENTCHANGED:"extentchanged"},y=function(t){function e(e){t.call(this,v.EXTENTCHANGED),this.extent=e}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e}(i.a),f=function(t){function e(e){var n,r=e||{};t.call(this,r),this.extent_=null,this.pointerHandler_=null,this.pixelTolerance_=void 0!==r.pixelTolerance?r.pixelTolerance:10,this.snappedToVertex_=!1,this.extentFeature_=null,this.vertexFeature_=null,e||(e={}),this.extentOverlay_=new h.a({source:new d.a({useSpatialIndex:!1,wrapX:!!e.wrapX}),style:e.boxStyle?e.boxStyle:(n=Object(x.b)(),function(t,e){return n[u.a.POLYGON]}),updateWhileAnimating:!0,updateWhileInteracting:!0}),this.vertexOverlay_=new h.a({source:new d.a({useSpatialIndex:!1,wrapX:!!e.wrapX}),style:e.pointerStyle?e.pointerStyle:w(),updateWhileAnimating:!0,updateWhileInteracting:!0}),e.extent&&this.setExtent(e.extent)}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.snapToVertex_=function(t,e){var n=e.getCoordinateFromPixelInternal(t),r=this.getExtentInternal();if(r){var o=function(t){return[[[t[0],t[1]],[t[0],t[3]]],[[t[0],t[3]],[t[2],t[3]]],[[t[2],t[3]],[t[2],t[1]]],[[t[2],t[1]],[t[0],t[1]]]]}(r);o.sort(function(t,e){return Object(a.k)(n,t)-Object(a.k)(n,e)});var i=o[0],l=Object(a.c)(n,i),u=e.getPixelFromCoordinateInternal(l);if(Object(a.f)(t,u)<=this.pixelTolerance_){var p=e.getPixelFromCoordinateInternal(i[0]),s=e.getPixelFromCoordinateInternal(i[1]),c=Object(a.j)(u,p),h=Object(a.j)(u,s),d=Math.sqrt(Math.min(c,h));return this.snappedToVertex_=d<=this.pixelTolerance_,this.snappedToVertex_&&(l=c>h?i[1]:i[0]),l}}return null},e.prototype.handlePointerMove_=function(t){var e=t.pixel,n=t.map,r=this.snapToVertex_(e,n);r||(r=n.getCoordinateFromPixelInternal(e)),this.createOrUpdatePointerFeature_(r)},e.prototype.createOrUpdateExtentFeature_=function(t){var e=this.extentFeature_;return e?t?e.setGeometry(Object(s.d)(t)):e.setGeometry(void 0):(e=t?new r.a(Object(s.d)(t)):new r.a({}),this.extentFeature_=e,this.extentOverlay_.getSource().addFeature(e)),e},e.prototype.createOrUpdatePointerFeature_=function(t){var e=this.vertexFeature_;e?e.getGeometry().setCoordinates(t):(e=new r.a(new p.a(t)),this.vertexFeature_=e,this.vertexOverlay_.getSource().addFeature(e));return e},e.prototype.handleEvent=function(e){return!e.pointerEvent||(e.type!=o.a.POINTERMOVE||this.handlingDownUpSequence||this.handlePointerMove_(e),t.prototype.handleEvent.call(this,e),!1)},e.prototype.handleDownEvent=function(t){var e=t.pixel,n=t.map,r=this.getExtentInternal(),o=this.snapToVertex_(e,n),a=function(t){var e=null,n=null;return t[0]==r[0]?e=r[2]:t[0]==r[2]&&(e=r[0]),t[1]==r[1]?n=r[3]:t[1]==r[3]&&(n=r[1]),null!==e&&null!==n?[e,n]:null};if(o&&r){var i=o[0]==r[0]||o[0]==r[2]?o[0]:null,l=o[1]==r[1]||o[1]==r[3]?o[1]:null;null!==i&&null!==l?this.pointerHandler_=O(a(o)):null!==i?this.pointerHandler_=E(a([i,r[1]]),a([i,r[3]])):null!==l&&(this.pointerHandler_=E(a([r[0],l]),a([r[2],l])))}else o=n.getCoordinateFromPixelInternal(e),this.setExtent([o[0],o[1],o[0],o[1]]),this.pointerHandler_=O(o);return!0},e.prototype.handleDragEvent=function(t){if(this.pointerHandler_){var e=t.coordinate;this.setExtent(this.pointerHandler_(e)),this.createOrUpdatePointerFeature_(e)}return!0},e.prototype.handleUpEvent=function(t){this.pointerHandler_=null;var e=this.getExtentInternal();return e&&0!==Object(l.u)(e)||this.setExtent(null),!1},e.prototype.setMap=function(e){this.extentOverlay_.setMap(e),this.vertexOverlay_.setMap(e),t.prototype.setMap.call(this,e)},e.prototype.getExtent=function(){return Object(_.q)(this.getExtentInternal(),this.getMap().getView().getProjection())},e.prototype.getExtentInternal=function(){return this.extent_},e.prototype.setExtent=function(t){this.extent_=t||null,this.createOrUpdateExtentFeature_(t),this.dispatchEvent(new y(this.extent_))},e}(c.b);function w(){var t=Object(x.b)();return function(e,n){return t[u.a.POINT]}}function O(t){return function(e){return Object(l.b)([t,e])}}function E(t,e){return t[0]==e[0]?function(n){return Object(l.b)([t,[n[0],e[1]]])}:t[1]==e[1]?function(n){return Object(l.b)([t,[e[0],n[1]]])}:null}e.a=f},283:function(t,e,n){"use strict";n.r(e);var r=n(3),o=n(2),a=n(30),i=n(188),l=n(5),u=n(23),p=n(10),s=n(9),c=new p.a({url:"data/geojson/countries.geojson",format:new a.a}),h=new r.a({layers:[new l.a({source:new s.b}),new u.a({source:c})],target:"map",view:new o.a({center:[0,0],zoom:2})}),d=new i.a;h.addInteraction(d),d.setActive(!1),window.addEventListener("keydown",function(t){16==t.keyCode&&d.setActive(!0)}),window.addEventListener("keyup",function(t){16==t.keyCode&&d.setActive(!1)})}},[[283,0]]]);
//# sourceMappingURL=extent-interaction.js.map