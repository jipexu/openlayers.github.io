(window.webpackJsonp=window.webpackJsonp||[]).push([[164],{417:function(e,t,r){"use strict";r.r(t);var o=r(3),n=r(11),i=r(2),a=r(26),s=r(188),p=r(53),c=r(22),u=r(34),l=r(72),m=r(85),h=r(32),b=r(0),f=r(12),y=r(1),O=r(15),g=r(4),d=r(6),v=r(40),j=p.a+" http://schemas.opengis.net/gml/3.1.1/profiles/gmlsfProfile/1.0.0/gmlsf.xsd",w={MultiLineString:"lineStringMember",MultiCurve:"curveMember",MultiPolygon:"polygonMember",MultiSurface:"surfaceMember"},S=function(e){function t(t){var r=t||{};e.call(this,r),this.surface_=void 0!==r.surface&&r.surface,this.curve_=void 0!==r.curve&&r.curve,this.multiCurve_=void 0===r.multiCurve||r.multiCurve,this.multiSurface_=void 0===r.multiSurface||r.multiSurface,this.schemaLocation=r.schemaLocation?r.schemaLocation:j,this.hasZ=void 0!==r.hasZ&&r.hasZ}return e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t,t.prototype.readMultiCurve=function(e,t){var r=Object(b.u)([],this.MULTICURVE_PARSERS,e,t,this);return r?new l.a(r):void 0},t.prototype.readMultiSurface=function(e,t){var r=Object(b.u)([],this.MULTISURFACE_PARSERS,e,t,this);if(r)return new m.a(r)},t.prototype.curveMemberParser=function(e,t){Object(b.t)(this.CURVEMEMBER_PARSERS,e,t,this)},t.prototype.surfaceMemberParser=function(e,t){Object(b.t)(this.SURFACEMEMBER_PARSERS,e,t,this)},t.prototype.readPatch=function(e,t){return Object(b.u)([null],this.PATCHES_PARSERS,e,t,this)},t.prototype.readSegment=function(e,t){return Object(b.u)([null],this.SEGMENTS_PARSERS,e,t,this)},t.prototype.readPolygonPatch=function(e,t){return Object(b.u)([null],this.FLAT_LINEAR_RINGS_PARSERS,e,t,this)},t.prototype.readLineStringSegment=function(e,t){return Object(b.u)([null],this.GEOMETRY_FLAT_COORDINATES_PARSERS,e,t,this)},t.prototype.interiorParser=function(e,t){var r=Object(b.u)(void 0,this.RING_PARSERS,e,t,this);r&&t[t.length-1].push(r)},t.prototype.exteriorParser=function(e,t){var r=Object(b.u)(void 0,this.RING_PARSERS,e,t,this);r&&(t[t.length-1][0]=r)},t.prototype.readSurface=function(e,t){var r=Object(b.u)([null],this.SURFACE_PARSERS,e,t,this);if(r&&r[0]){var o,n,i=r[0],a=[i.length];for(o=1,n=r.length;o<n;++o)Object(O.c)(i,r[o]),a.push(i.length);return new h.b(i,c.a.XYZ,a)}},t.prototype.readCurve=function(e,t){var r=Object(b.u)([null],this.CURVE_PARSERS,e,t,this);return r?new u.a(r,c.a.XYZ):void 0},t.prototype.readEnvelope=function(e,t){var r=Object(b.u)([null],this.ENVELOPE_PARSERS,e,t,this);return Object(y.l)(r[1][0],r[1][1],r[2][0],r[2][1])},t.prototype.readFlatPos=function(e,t){for(var r,o=Object(b.d)(e,!1),n=/^\s*([+\-]?\d*\.?\d+(?:[eE][+\-]?\d+)?)\s*/,i=[];r=n.exec(o);)i.push(parseFloat(r[1])),o=o.substr(r[0].length);if(""===o){var a,s,p=t[0].srsName,c="enu";if(p)c=Object(g.i)(p).getAxisOrientation();if("neu"===c)for(a=0,s=i.length;a<s;a+=3){var u=i[a],l=i[a+1];i[a]=l,i[a+1]=u}var m=i.length;if(2==m&&i.push(0),0!==m)return i}},t.prototype.readFlatPosList=function(e,t){var r=Object(b.d)(e,!1).replace(/^\s*|\s*$/g,""),o=t[0],n=o.srsName,i=o.srsDimension,a="enu";n&&(a=Object(g.i)(n).getAxisOrientation());var s,p,c,u=r.split(/\s+/),l=2;e.getAttribute("srsDimension")?l=Object(d.g)(e.getAttribute("srsDimension")):e.getAttribute("dimension")?l=Object(d.g)(e.getAttribute("dimension")):e.parentNode.getAttribute("srsDimension")?l=Object(d.g)(e.parentNode.getAttribute("srsDimension")):i&&(l=Object(d.g)(i));for(var m=[],h=0,f=u.length;h<f;h+=l)s=parseFloat(u[h]),p=parseFloat(u[h+1]),c=3===l?parseFloat(u[h+2]):0,"en"===a.substr(0,2)?m.push(s,p,c):m.push(p,s,c);return m},t.prototype.writePos_=function(e,t,r){var o=r[r.length-1],n=o.hasZ,i=n?"3":"2";e.setAttribute("srsDimension",i);var a=o.srsName,s="enu";a&&(s=Object(g.i)(a).getAxisOrientation());var p,c=t.getCoordinates();(p="en"===s.substr(0,2)?c[0]+" "+c[1]:c[1]+" "+c[0],n)&&(p+=" "+(c[2]||0));Object(d.n)(e,p)},t.prototype.getCoords_=function(e,t,r){var o="enu";t&&(o=Object(g.i)(t).getAxisOrientation());var n="en"===o.substr(0,2)?e[0]+" "+e[1]:e[1]+" "+e[0];r&&(n+=" "+(e[2]||0));return n},t.prototype.writePosList_=function(e,t,r){var o=r[r.length-1],n=o.hasZ,i=n?"3":"2";e.setAttribute("srsDimension",i);for(var a,s=o.srsName,p=t.getCoordinates(),c=p.length,u=new Array(c),l=0;l<c;++l)a=p[l],u[l]=this.getCoords_(a,s,n);Object(d.n)(e,u.join(" "))},t.prototype.writePoint=function(e,t,r){var o=r[r.length-1].srsName;o&&e.setAttribute("srsName",o);var n=Object(b.c)(e.namespaceURI,"pos");e.appendChild(n),this.writePos_(n,t,r)},t.prototype.writeEnvelope=function(e,t,r){var o=r[r.length-1].srsName;o&&e.setAttribute("srsName",o);var n=[t[0]+" "+t[1],t[2]+" "+t[3]];Object(b.v)({node:e},this.ENVELOPE_SERIALIZERS,b.a,n,r,["lowerCorner","upperCorner"],this)},t.prototype.writeLinearRing=function(e,t,r){var o=r[r.length-1].srsName;o&&e.setAttribute("srsName",o);var n=Object(b.c)(e.namespaceURI,"posList");e.appendChild(n),this.writePosList_(n,t,r)},t.prototype.RING_NODE_FACTORY_=function(e,t,r){var o=t[t.length-1],n=o.node,i=o.exteriorWritten;return void 0===i&&(o.exteriorWritten=!0),Object(b.c)(n.namespaceURI,void 0!==i?"interior":"exterior")},t.prototype.writeSurfaceOrPolygon=function(e,t,r){var o=r[r.length-1],n=o.hasZ,i=o.srsName;if("PolygonPatch"!==e.nodeName&&i&&e.setAttribute("srsName",i),"Polygon"===e.nodeName||"PolygonPatch"===e.nodeName){var a=t.getLinearRings();Object(b.v)({node:e,hasZ:n,srsName:i},this.RING_SERIALIZERS,this.RING_NODE_FACTORY_,a,r,void 0,this)}else if("Surface"===e.nodeName){var s=Object(b.c)(e.namespaceURI,"patches");e.appendChild(s),this.writeSurfacePatches_(s,t,r)}},t.prototype.writeCurveOrLineString=function(e,t,r){var o=r[r.length-1].srsName;if("LineStringSegment"!==e.nodeName&&o&&e.setAttribute("srsName",o),"LineString"===e.nodeName||"LineStringSegment"===e.nodeName){var n=Object(b.c)(e.namespaceURI,"posList");e.appendChild(n),this.writePosList_(n,t,r)}else if("Curve"===e.nodeName){var i=Object(b.c)(e.namespaceURI,"segments");e.appendChild(i),this.writeCurveSegments_(i,t,r)}},t.prototype.writeMultiSurfaceOrPolygon=function(e,t,r){var o=r[r.length-1],n=o.hasZ,i=o.srsName,a=o.surface;i&&e.setAttribute("srsName",i);var s=t.getPolygons();Object(b.v)({node:e,hasZ:n,srsName:i,surface:a},this.SURFACEORPOLYGONMEMBER_SERIALIZERS,this.MULTIGEOMETRY_MEMBER_NODE_FACTORY_,s,r,void 0,this)},t.prototype.writeMultiPoint=function(e,t,r){var o=r[r.length-1],n=o.srsName,i=o.hasZ;n&&e.setAttribute("srsName",n);var a=t.getPoints();Object(b.v)({node:e,hasZ:i,srsName:n},this.POINTMEMBER_SERIALIZERS,Object(b.q)("pointMember"),a,r,void 0,this)},t.prototype.writeMultiCurveOrLineString=function(e,t,r){var o=r[r.length-1],n=o.hasZ,i=o.srsName,a=o.curve;i&&e.setAttribute("srsName",i);var s=t.getLineStrings();Object(b.v)({node:e,hasZ:n,srsName:i,curve:a},this.LINESTRINGORCURVEMEMBER_SERIALIZERS,this.MULTIGEOMETRY_MEMBER_NODE_FACTORY_,s,r,void 0,this)},t.prototype.writeRing=function(e,t,r){var o=Object(b.c)(e.namespaceURI,"LinearRing");e.appendChild(o),this.writeLinearRing(o,t,r)},t.prototype.writeSurfaceOrPolygonMember=function(e,t,r){var o=this.GEOMETRY_NODE_FACTORY_(t,r);o&&(e.appendChild(o),this.writeSurfaceOrPolygon(o,t,r))},t.prototype.writePointMember=function(e,t,r){var o=Object(b.c)(e.namespaceURI,"Point");e.appendChild(o),this.writePoint(o,t,r)},t.prototype.writeLineStringOrCurveMember=function(e,t,r){var o=this.GEOMETRY_NODE_FACTORY_(t,r);o&&(e.appendChild(o),this.writeCurveOrLineString(o,t,r))},t.prototype.writeSurfacePatches_=function(e,t,r){var o=Object(b.c)(e.namespaceURI,"PolygonPatch");e.appendChild(o),this.writeSurfaceOrPolygon(o,t,r)},t.prototype.writeCurveSegments_=function(e,t,r){var o=Object(b.c)(e.namespaceURI,"LineStringSegment");e.appendChild(o),this.writeCurveOrLineString(o,t,r)},t.prototype.writeGeometryElement=function(e,t,r){var o,n=r[r.length-1],i=Object(f.a)({},n);i.node=e,o=Array.isArray(t)?Object(v.b)(t,n):Object(v.c)(t,!0,n),Object(b.v)(i,this.GEOMETRY_SERIALIZERS,this.GEOMETRY_NODE_FACTORY_,[o],r,void 0,this)},t.prototype.writeFeatureElement=function(e,t,r){var o=t.getId();o&&e.setAttribute("fid",o);var n=r[r.length-1],i=n.featureNS,a=t.getGeometryName();n.serializers||(n.serializers={},n.serializers[i]={});var s=t.getProperties(),p=[],c=[];for(var u in s){var l=s[u];null!==l&&(p.push(u),c.push(l),u==a||"function"==typeof l.getSimplifiedGeometry?u in n.serializers[i]||(n.serializers[i][u]=Object(b.l)(this.writeGeometryElement,this)):u in n.serializers[i]||(n.serializers[i][u]=Object(b.l)(d.n)))}var m=Object(f.a)({},n);m.node=e,Object(b.v)(m,n.serializers,Object(b.q)(void 0,i),c,r,p)},t.prototype.writeFeatureMembers_=function(e,t,r){var o=r[r.length-1],n=o.featureType,i=o.featureNS,a={};a[i]={},a[i][n]=Object(b.l)(this.writeFeatureElement,this);var s=Object(f.a)({},o);s.node=e,Object(b.v)(s,a,Object(b.q)(n,i),t,r)},t.prototype.MULTIGEOMETRY_MEMBER_NODE_FACTORY_=function(e,t,r){var o=t[t.length-1].node;return Object(b.c)(this.namespace,w[o.nodeName])},t.prototype.GEOMETRY_NODE_FACTORY_=function(e,t,r){var o,n=t[t.length-1],i=n.multiSurface,a=n.surface,s=n.curve,p=n.multiCurve;return Array.isArray(e)?o="Envelope":"MultiPolygon"===(o=e.getType())&&!0===i?o="MultiSurface":"Polygon"===o&&!0===a?o="Surface":"LineString"===o&&!0===s?o="Curve":"MultiLineString"===o&&!0===p&&(o="MultiCurve"),Object(b.c)(this.namespace,o)},t.prototype.writeGeometryNode=function(e,t){t=this.adaptOptions(t);var r=Object(b.c)(this.namespace,"geom"),o={node:r,hasZ:this.hasZ,srsName:this.srsName,curve:this.curve_,surface:this.surface_,multiSurface:this.multiSurface_,multiCurve:this.multiCurve_};return t&&Object(f.a)(o,t),this.writeGeometryElement(r,e,[o]),r},t.prototype.writeFeaturesNode=function(e,t){t=this.adaptOptions(t);var r=Object(b.c)(this.namespace,"featureMembers");r.setAttributeNS(b.b,"xsi:schemaLocation",this.schemaLocation);var o={srsName:this.srsName,hasZ:this.hasZ,curve:this.curve_,surface:this.surface_,multiSurface:this.multiSurface_,multiCurve:this.multiCurve_,featureNS:this.featureNS,featureType:this.featureType};return t&&Object(f.a)(o,t),this.writeFeatureMembers_(r,e,[o]),r},t}(p.b);S.prototype.GEOMETRY_FLAT_COORDINATES_PARSERS={"http://www.opengis.net/gml":{pos:Object(b.o)(S.prototype.readFlatPos),posList:Object(b.o)(S.prototype.readFlatPosList)}},S.prototype.FLAT_LINEAR_RINGS_PARSERS={"http://www.opengis.net/gml":{interior:S.prototype.interiorParser,exterior:S.prototype.exteriorParser}},S.prototype.GEOMETRY_PARSERS={"http://www.opengis.net/gml":{Point:Object(b.o)(p.b.prototype.readPoint),MultiPoint:Object(b.o)(p.b.prototype.readMultiPoint),LineString:Object(b.o)(p.b.prototype.readLineString),MultiLineString:Object(b.o)(p.b.prototype.readMultiLineString),LinearRing:Object(b.o)(p.b.prototype.readLinearRing),Polygon:Object(b.o)(p.b.prototype.readPolygon),MultiPolygon:Object(b.o)(p.b.prototype.readMultiPolygon),Surface:Object(b.o)(S.prototype.readSurface),MultiSurface:Object(b.o)(S.prototype.readMultiSurface),Curve:Object(b.o)(S.prototype.readCurve),MultiCurve:Object(b.o)(S.prototype.readMultiCurve),Envelope:Object(b.o)(S.prototype.readEnvelope)}},S.prototype.MULTICURVE_PARSERS={"http://www.opengis.net/gml":{curveMember:Object(b.j)(S.prototype.curveMemberParser),curveMembers:Object(b.j)(S.prototype.curveMemberParser)}},S.prototype.MULTISURFACE_PARSERS={"http://www.opengis.net/gml":{surfaceMember:Object(b.j)(S.prototype.surfaceMemberParser),surfaceMembers:Object(b.j)(S.prototype.surfaceMemberParser)}},S.prototype.CURVEMEMBER_PARSERS={"http://www.opengis.net/gml":{LineString:Object(b.j)(p.b.prototype.readLineString),Curve:Object(b.j)(S.prototype.readCurve)}},S.prototype.SURFACEMEMBER_PARSERS={"http://www.opengis.net/gml":{Polygon:Object(b.j)(p.b.prototype.readPolygon),Surface:Object(b.j)(S.prototype.readSurface)}},S.prototype.SURFACE_PARSERS={"http://www.opengis.net/gml":{patches:Object(b.o)(S.prototype.readPatch)}},S.prototype.CURVE_PARSERS={"http://www.opengis.net/gml":{segments:Object(b.o)(S.prototype.readSegment)}},S.prototype.ENVELOPE_PARSERS={"http://www.opengis.net/gml":{lowerCorner:Object(b.j)(S.prototype.readFlatPosList),upperCorner:Object(b.j)(S.prototype.readFlatPosList)}},S.prototype.PATCHES_PARSERS={"http://www.opengis.net/gml":{PolygonPatch:Object(b.o)(S.prototype.readPolygonPatch)}},S.prototype.SEGMENTS_PARSERS={"http://www.opengis.net/gml":{LineStringSegment:Object(b.o)(S.prototype.readLineStringSegment)}},S.prototype.writeFeatures,S.prototype.RING_SERIALIZERS={"http://www.opengis.net/gml":{exterior:Object(b.l)(S.prototype.writeRing),interior:Object(b.l)(S.prototype.writeRing)}},S.prototype.ENVELOPE_SERIALIZERS={"http://www.opengis.net/gml":{lowerCorner:Object(b.l)(d.n),upperCorner:Object(b.l)(d.n)}},S.prototype.SURFACEORPOLYGONMEMBER_SERIALIZERS={"http://www.opengis.net/gml":{surfaceMember:Object(b.l)(S.prototype.writeSurfaceOrPolygonMember),polygonMember:Object(b.l)(S.prototype.writeSurfaceOrPolygonMember)}},S.prototype.POINTMEMBER_SERIALIZERS={"http://www.opengis.net/gml":{pointMember:Object(b.l)(S.prototype.writePointMember)}},S.prototype.LINESTRINGORCURVEMEMBER_SERIALIZERS={"http://www.opengis.net/gml":{lineStringMember:Object(b.l)(S.prototype.writeLineStringOrCurveMember),curveMember:Object(b.l)(S.prototype.writeLineStringOrCurveMember)}},S.prototype.GEOMETRY_SERIALIZERS={"http://www.opengis.net/gml":{Curve:Object(b.l)(S.prototype.writeCurveOrLineString),MultiCurve:Object(b.l)(S.prototype.writeMultiCurveOrLineString),Point:Object(b.l)(S.prototype.writePoint),MultiPoint:Object(b.l)(S.prototype.writeMultiPoint),LineString:Object(b.l)(S.prototype.writeCurveOrLineString),MultiLineString:Object(b.l)(S.prototype.writeMultiCurveOrLineString),LinearRing:Object(b.l)(S.prototype.writeLinearRing),Polygon:Object(b.l)(S.prototype.writeSurfaceOrPolygon),MultiPolygon:Object(b.l)(S.prototype.writeMultiSurfaceOrPolygon),Surface:Object(b.l)(S.prototype.writeSurfaceOrPolygon),MultiSurface:Object(b.l)(S.prototype.writeMultiSurfaceOrPolygon),Envelope:Object(b.l)(S.prototype.writeEnvelope)}};var E=S,N=r(119),R=function(e){this.tagName_=e};R.prototype.getTagName=function(){return this.tagName_};var _=R,P=r(19),C=function(e){function t(t,r){e.call(this,t),this.conditions=r,Object(P.a)(this.conditions.length>=2,57)}return e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t,t}(_),A=function(e){function t(t){e.call(this,"And",Array.prototype.slice.call(arguments))}return e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t,t}(C),M=function(e){function t(t,r,o){if(e.call(this,"BBOX"),this.geometryName=t,this.extent=r,4!==r.length)throw new Error("Expected an extent with four values ([minX, minY, maxX, maxY])");this.srsName=o}return e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t,t}(_),T=function(e){function t(t,r){e.call(this,t),this.propertyName=r}return e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t,t}(_),L=function(e){function t(t,r,o,n){e.call(this,t,r),this.expression=o,this.matchCase=n}return e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t,t}(T),F=function(e){function t(t,r,o){e.call(this,"PropertyIsEqualTo",t,r,o)}return e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t,t}(L),I=function(e){function t(t,r,o,n,i,a){e.call(this,"PropertyIsLike",t),this.pattern=r,this.wildCard=void 0!==o?o:"*",this.singleChar=void 0!==n?n:".",this.escapeChar=void 0!==i?i:"!",this.matchCase=a}return e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t,t}(T);function x(e){var t=[null].concat(Array.prototype.slice.call(arguments));return new(Function.prototype.bind.apply(A,t))}var G={"http://www.opengis.net/gml":{boundedBy:Object(b.n)(p.b.prototype.readGeometryElement,"bounds")}},U={"http://www.opengis.net/wfs":{totalInserted:Object(b.n)(d.f),totalUpdated:Object(b.n)(d.f),totalDeleted:Object(b.n)(d.f)}},Z={"http://www.opengis.net/wfs":{TransactionSummary:Object(b.n)((function(e,t){return Object(b.u)({},U,e,t)}),"transactionSummary"),InsertResults:Object(b.n)((function(e,t){return Object(b.u)([],W,e,t)}),"insertIds")}},D={"http://www.opengis.net/wfs":{PropertyName:Object(b.l)(d.n)}},Y={"http://www.opengis.net/wfs":{Insert:Object(b.l)((function(e,t,r){var o=r[r.length-1],n=o.featureType,i=o.featureNS,a=o.gmlVersion,p=Object(b.c)(i,n);e.appendChild(p),2===a?s.a.prototype.writeFeatureElement(p,t,r):E.prototype.writeFeatureElement(p,t,r)})),Update:Object(b.l)((function(e,t,r){var o=r[r.length-1];Object(P.a)(void 0!==t.getId(),27);var n=o.featureType,i=o.featurePrefix,a=o.featureNS,s=K(i,n),p=t.getGeometryName();e.setAttribute("typeName",s),e.setAttributeNS(B,"xmlns:"+i,a);var c=t.getId();if(void 0!==c){for(var u=t.getKeys(),l=[],m=0,h=u.length;m<h;m++){var f=t.get(u[m]);if(void 0!==f){var y=u[m];f&&"function"==typeof f.getSimplifiedGeometry&&(y=p),l.push({name:y,value:f})}}Object(b.v)({gmlVersion:o.gmlVersion,node:e,hasZ:o.hasZ,srsName:o.srsName},Y,Object(b.q)("Property"),l,r),H(e,c,r)}})),Delete:Object(b.l)((function(e,t,r){var o=r[r.length-1];Object(P.a)(void 0!==t.getId(),26);var n=o.featureType,i=o.featurePrefix,a=o.featureNS,s=K(i,n);e.setAttribute("typeName",s),e.setAttributeNS(B,"xmlns:"+i,a);var p=t.getId();void 0!==p&&H(e,p,r)})),Property:Object(b.l)((function(e,t,r){var o=Object(b.c)(q,"Name"),n=r[r.length-1].gmlVersion;if(e.appendChild(o),Object(d.n)(o,t.name),void 0!==t.value&&null!==t.value){var i=Object(b.c)(q,"Value");e.appendChild(i),t.value&&"function"==typeof t.value.getSimplifiedGeometry?2===n?s.a.prototype.writeGeometryElement(i,t.value,r):E.prototype.writeGeometryElement(i,t.value,r):Object(d.n)(i,t.value)}})),Native:Object(b.l)((function(e,t,r){t.vendorId&&e.setAttribute("vendorId",t.vendorId);void 0!==t.safeToIgnore&&e.setAttribute("safeToIgnore",String(t.safeToIgnore));void 0!==t.value&&Object(d.n)(e,t.value)}))}},B="http://www.w3.org/2000/xmlns/",V="http://www.opengis.net/ogc",q="http://www.opengis.net/wfs",z={"1.1.0":"http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.1.0/wfs.xsd","1.0.0":"http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.0.0/wfs.xsd"},k=function(e){function t(t){e.call(this);var r=t||{};this.featureType_=r.featureType,this.featureNS_=r.featureNS,this.gmlFormat_=r.gmlFormat?r.gmlFormat:new E,this.schemaLocation_=r.schemaLocation?r.schemaLocation:z["1.1.0"]}return e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t,t.prototype.getFeatureType=function(){return this.featureType_},t.prototype.setFeatureType=function(e){this.featureType_=e},t.prototype.readFeaturesFromNode=function(e,t){var r={node:e};Object(f.a)(r,{featureType:this.featureType_,featureNS:this.featureNS_}),Object(f.a)(r,this.getReadOptions(e,t||{}));var o=[r];this.gmlFormat_.FEATURE_COLLECTION_PARSERS[p.a].featureMember=Object(b.j)(p.b.prototype.readFeaturesInternal);var n=Object(b.u)([],this.gmlFormat_.FEATURE_COLLECTION_PARSERS,e,o,this.gmlFormat_);return n||(n=[]),n},t.prototype.readTransactionResponse=function(e){if(e){if("string"==typeof e){var t=Object(b.s)(e);return this.readTransactionResponseFromDocument(t)}return Object(b.h)(e)?this.readTransactionResponseFromDocument(e):this.readTransactionResponseFromNode(e)}},t.prototype.readFeatureCollectionMetadata=function(e){if(e){if("string"==typeof e){var t=Object(b.s)(e);return this.readFeatureCollectionMetadataFromDocument(t)}return Object(b.h)(e)?this.readFeatureCollectionMetadataFromDocument(e):this.readFeatureCollectionMetadataFromNode(e)}},t.prototype.readFeatureCollectionMetadataFromDocument=function(e){for(var t=e.firstChild;t;t=t.nextSibling)if(t.nodeType==Node.ELEMENT_NODE)return this.readFeatureCollectionMetadataFromNode(t)},t.prototype.readFeatureCollectionMetadataFromNode=function(e){var t={},r=Object(d.g)(e.getAttribute("numberOfFeatures"));return t.numberOfFeatures=r,Object(b.u)(t,G,e,[],this.gmlFormat_)},t.prototype.readTransactionResponseFromDocument=function(e){for(var t=e.firstChild;t;t=t.nextSibling)if(t.nodeType==Node.ELEMENT_NODE)return this.readTransactionResponseFromNode(t)},t.prototype.readTransactionResponseFromNode=function(e){return Object(b.u)({},Z,e,[])},t.prototype.writeGetFeature=function(e){var t,r,o,n,i=Object(b.c)(q,"GetFeature");if(i.setAttribute("service","WFS"),i.setAttribute("version","1.1.0"),e&&(e.handle&&i.setAttribute("handle",e.handle),e.outputFormat&&i.setAttribute("outputFormat",e.outputFormat),void 0!==e.maxFeatures&&i.setAttribute("maxFeatures",String(e.maxFeatures)),e.resultType&&i.setAttribute("resultType",e.resultType),void 0!==e.startIndex&&i.setAttribute("startIndex",String(e.startIndex)),void 0!==e.count&&i.setAttribute("count",String(e.count)),void 0!==e.viewParams&&i.setAttribute("viewParams",e.viewParams),t=e.filter,e.bbox)){Object(P.a)(e.geometryName,12);var a=(r=e.geometryName,o=e.bbox,n=e.srsName,new M(r,o,n));t=t?x(t,a):a}i.setAttributeNS(b.b,"xsi:schemaLocation",this.schemaLocation_);var s={node:i};return Object(f.a)(s,{srsName:e.srsName,featureNS:e.featureNS?e.featureNS:this.featureNS_,featurePrefix:e.featurePrefix,geometryName:e.geometryName,filter:t,propertyNames:e.propertyNames?e.propertyNames:[]}),Object(P.a)(Array.isArray(e.featureTypes),11),function(e,t,r){var o=r[r.length-1],n=Object(f.a)({},o);n.node=e,Object(b.v)(n,J,Object(b.q)("Query"),t,r)}(i,e.featureTypes,[s]),i},t.prototype.writeTransaction=function(e,t,r,o){var n,i,a=[],s=Object(b.c)(q,"Transaction"),p=o.version?o.version:"1.1.0",c="1.0.0"===p?2:3;s.setAttribute("service","WFS"),s.setAttribute("version",p),o&&(n=o.gmlOptions?o.gmlOptions:{},o.handle&&s.setAttribute("handle",o.handle));var u=z[p];s.setAttributeNS(b.b,"xsi:schemaLocation",u);var l=o.featurePrefix?o.featurePrefix:"feature";return e&&(i=Object(f.a)({node:s},{featureNS:o.featureNS,featureType:o.featureType,featurePrefix:l,gmlVersion:c,hasZ:o.hasZ,srsName:o.srsName}),Object(f.a)(i,n),Object(b.v)(i,Y,Object(b.q)("Insert"),e,a)),t&&(i=Object(f.a)({node:s},{featureNS:o.featureNS,featureType:o.featureType,featurePrefix:l,gmlVersion:c,hasZ:o.hasZ,srsName:o.srsName}),Object(f.a)(i,n),Object(b.v)(i,Y,Object(b.q)("Update"),t,a)),r&&Object(b.v)({node:s,featureNS:o.featureNS,featureType:o.featureType,featurePrefix:l,gmlVersion:c,srsName:o.srsName},Y,Object(b.q)("Delete"),r,a),o.nativeElements&&Object(b.v)({node:s,featureNS:o.featureNS,featureType:o.featureType,featurePrefix:l,gmlVersion:c,srsName:o.srsName},Y,Object(b.q)("Native"),o.nativeElements,a),s},t.prototype.readProjectionFromDocument=function(e){for(var t=e.firstChild;t;t=t.nextSibling)if(t.nodeType==Node.ELEMENT_NODE)return this.readProjectionFromNode(t);return null},t.prototype.readProjectionFromNode=function(e){if(e.firstElementChild&&e.firstElementChild.firstElementChild)for(var t=(e=e.firstElementChild.firstElementChild).firstElementChild;t;t=t.nextElementSibling)if(0!==t.childNodes.length&&(1!==t.childNodes.length||3!==t.firstChild.nodeType)){var r=[{}];return this.gmlFormat_.readGeometryElement(t,r),Object(g.i)(r.pop().srsName)}return null},t}(N.a);var X={"http://www.opengis.net/ogc":{FeatureId:Object(b.j)((function(e,t){return e.getAttribute("fid")}))}};var W={"http://www.opengis.net/wfs":{Feature:function(e,t){Object(b.t)(X,e,t)}}};function H(e,t,r){var o=Object(b.c)(V,"Filter"),n=Object(b.c)(V,"FeatureId");o.appendChild(n),n.setAttribute("fid",t),e.appendChild(o)}function K(e,t){var r=(e=e||"feature")+":";return 0===t.indexOf(r)?t:r+t}var J={"http://www.opengis.net/wfs":{Query:Object(b.l)((function(e,t,r){var o,n=r[r.length-1],i=n.featurePrefix,a=n.featureNS,s=n.propertyNames,p=n.srsName;o=i?K(i,t):t;e.setAttribute("typeName",o),p&&e.setAttribute("srsName",p);a&&e.setAttributeNS(B,"xmlns:"+i,a);var c=Object(f.a)({},n);c.node=e,Object(b.v)(c,D,Object(b.q)("PropertyName"),s,r);var u=n.filter;if(u){var l=Object(b.c)(V,"Filter");e.appendChild(l),Q(l,u,r)}}))},"http://www.opengis.net/ogc":{During:Object(b.l)((function(e,t,r){var o=Object(b.c)("http://www.opengis.net/fes","ValueReference");Object(d.n)(o,t.propertyName),e.appendChild(o);var n=Object(b.c)(p.a,"TimePeriod");e.appendChild(n);var i=Object(b.c)(p.a,"begin");n.appendChild(i),ne(i,t.begin);var a=Object(b.c)(p.a,"end");n.appendChild(a),ne(a,t.end)})),And:Object(b.l)($),Or:Object(b.l)($),Not:Object(b.l)((function(e,t,r){var o={node:e},n=t.condition;Object(b.v)(o,J,Object(b.q)(n.getTagName()),[n],r)})),BBOX:Object(b.l)((function(e,t,r){r[r.length-1].srsName=t.srsName,re(e,t.geometryName),E.prototype.writeGeometryElement(e,t.extent,r)})),Contains:Object(b.l)((function(e,t,r){r[r.length-1].srsName=t.srsName,re(e,t.geometryName),E.prototype.writeGeometryElement(e,t.geometry,r)})),Intersects:Object(b.l)((function(e,t,r){r[r.length-1].srsName=t.srsName,re(e,t.geometryName),E.prototype.writeGeometryElement(e,t.geometry,r)})),Within:Object(b.l)((function(e,t,r){r[r.length-1].srsName=t.srsName,re(e,t.geometryName),E.prototype.writeGeometryElement(e,t.geometry,r)})),PropertyIsEqualTo:Object(b.l)(ee),PropertyIsNotEqualTo:Object(b.l)(ee),PropertyIsLessThan:Object(b.l)(ee),PropertyIsLessThanOrEqualTo:Object(b.l)(ee),PropertyIsGreaterThan:Object(b.l)(ee),PropertyIsGreaterThanOrEqualTo:Object(b.l)(ee),PropertyIsNull:Object(b.l)((function(e,t,r){re(e,t.propertyName)})),PropertyIsBetween:Object(b.l)((function(e,t,r){re(e,t.propertyName);var o=Object(b.c)(V,"LowerBoundary");e.appendChild(o),oe(o,""+t.lowerBoundary);var n=Object(b.c)(V,"UpperBoundary");e.appendChild(n),oe(n,""+t.upperBoundary)})),PropertyIsLike:Object(b.l)((function(e,t,r){e.setAttribute("wildCard",t.wildCard),e.setAttribute("singleChar",t.singleChar),e.setAttribute("escapeChar",t.escapeChar),void 0!==t.matchCase&&e.setAttribute("matchCase",t.matchCase.toString());re(e,t.propertyName),oe(e,""+t.pattern)}))}};function Q(e,t,r){var o={node:e};Object(b.v)(o,J,Object(b.q)(t.getTagName()),[t],r)}function $(e,t,r){for(var o={node:e},n=t.conditions,i=0,a=n.length;i<a;++i){var s=n[i];Object(b.v)(o,J,Object(b.q)(s.getTagName()),[s],r)}}function ee(e,t,r){void 0!==t.matchCase&&e.setAttribute("matchCase",t.matchCase.toString()),re(e,t.propertyName),oe(e,""+t.expression)}function te(e,t,r){var o=Object(b.c)(V,e);Object(d.n)(o,r),t.appendChild(o)}function re(e,t){te("PropertyName",e,t)}function oe(e,t){te("Literal",e,t)}function ne(e,t){var r=Object(b.c)(p.a,"TimeInstant");e.appendChild(r);var o=Object(b.c)(p.a,"timePosition");r.appendChild(o),Object(d.n)(o,t)}var ie,ae,se,pe,ce,ue,le=k,me=r(31),he=r(10),be=r(17),fe=r(20),ye=r(5),Oe=new n.a,ge=new fe.a({source:Oe,style:new he.c({stroke:new be.a({color:"rgba(0, 0, 255, 1.0)",width:2})})}),de=new ye.a({source:new a.a({attributions:'<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',url:"https://api.maptiler.com/tiles/satellite/{z}/{x}/{y}.jpg?key=get_your_own_D6rA4zTHduk6KOKTXzGB",maxZoom:20})}),ve=new o.a({layers:[de,ge],target:document.getElementById("map"),view:new i.a({center:[-8908887.277395891,5381918.072437216],maxZoom:19,zoom:12})}),je=(new le).writeGetFeature({srsName:"EPSG:3857",featureNS:"http://openstreemap.org",featurePrefix:"osm",featureTypes:["water_areas"],outputFormat:"application/json",filter:x((ie="name",ae="Mississippi*",new I(ie,ae,se,pe,ce,ue)),function(e,t,r){return new F(e,t,r)}("waterway","riverbank"))});fetch("https://ahocevar.com/geoserver/wfs",{method:"POST",body:(new XMLSerializer).serializeToString(je)}).then((function(e){return e.json()})).then((function(e){var t=(new me.a).readFeatures(e);Oe.addFeatures(t),ve.getView().fit(Oe.getExtent())}))}},[[417,0]]]);
//# sourceMappingURL=vector-wfs-getfeature.js.map