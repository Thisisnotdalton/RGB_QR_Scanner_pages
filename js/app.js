(()=>{var e,t,r,a,n,o,i={374:(e,t,r)=>{"use strict";r.r(t),r.d(t,{assembleRGBFilters:()=>i});var a=r(221);const n="\nattribute vec2 a_position;\nattribute vec2 a_texCoord;\n\nuniform vec2 u_resolution;\n\nvarying vec2 v_texCoord;\n\nvoid main() {\n   // convert the rectangle from pixels to 0.0 to 1.0\n   vec2 zeroToOne = a_position / u_resolution;\n\n   // convert from 0->1 to 0->2\n   vec2 zeroToTwo = zeroToOne * 2.0;\n\n   // convert from 0->2 to -1->+1 (clipspace)\n   vec2 clipSpace = zeroToTwo - 1.0;\n\n   gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);\n\n   // pass the texCoord to the fragment shader\n   // The GPU will interpolate this value between points.\n   v_texCoord = a_texCoord;\n}\n";function o(e,t="r"){let r=document.getElementById(e);r||(r=document.createElement("canvas"),r.id=e);const o=r.getContext("webgl");if(null!==o){var i=(0,a.createShader)(o,o.VERTEX_SHADER,n),c=(0,a.createShader)(o,o.FRAGMENT_SHADER,function(e="r",t=.5){return`\nprecision mediump float;\n\n// our texture\nuniform sampler2D u_image;\n\n// the texCoords passed in from the vertex shader.\nvarying vec2 v_texCoord;\n\nvoid main() {\n  float channel = texture2D(u_image, v_texCoord).${e};\n  float high = channel > ${t}? 1.0: 0.0;\n  vec3 color = vec3(0);\n  color.${e} = high;\n  gl_FragColor = vec4(color, 1);\n}\n`}(t)),l=(0,a.createProgram)(o,i,c),d=document.createElement("canvas");d.id=`colorFilter_${t}`;var s=d.getContext("2d");return{input_canvas:r,output_canvas:d,filter:function(e){r.width=e.width,r.height=e.height,(0,a.render)(e,o,l),s.clearRect(0,0,r.width,r.height),d.width=e.width,d.height=e.height,s.drawImage(r,0,0)}}}alert("Unable to initialize WebGL. Your browser or machine may not support it.")}function i(){let e={red:o("redFilter","r"),green:o("greenFilter","g"),blue:o("blueFilter","b")},t={filter:function(t){for(let[r,a]of Object.entries(e))a.filter(t)},output_canvas:{},input_canvas:{}};for(let[r,a]of Object.entries(e))t.output_canvas[r]=a.output_canvas,t.input_canvas[r]=a.input_canvas;return t}},100:(e,t,r)=>{"use strict";r.a(e,(async(e,a)=>{try{r.r(t);var n=r(779),o=r(553),i=r(374),c=e([n]);function l(){console.log("Assembling RGB filters");let e=(0,i.assembleRGBFilters)();for(let[t,r]of Object.entries(e.output_canvas))document.body.appendChild(r);console.log("Acquiring video stream input"),(0,o.initializeStreamToImage)().then((t=>{let r=document.getElementById("scan");t.start(100),t.image.onload=()=>{e.filter(t.image)},r.onclick=function(){for(let[t,r]of Object.entries(e.output_canvas))(0,n.scanImage)(r,`result_${t}`)}}))}n=(c.then?(await c)():c)[0],l(),a()}catch(d){a(d)}}))},779:(e,t,r)=>{"use strict";r.a(e,(async(e,a)=>{try{r.r(t),r.d(t,{scanImage:()=>o});var n=r(137);function o(e,t="result"){let r=document.getElementById(t);r||(r=document.createElement("div"),r.id=t),(0,n.S)(e).then((e=>{r.textContent=e?.text?e.text:"No data could be parsed from scanned image!"}))}await(0,n.G)(),a()}catch(i){a(i)}}),1)},553:(e,t,r)=>{"use strict";async function a(e="video",t="image",r=512,a=512){console.log("Waiting for camera access.");let n=document.getElementById("videoSelect");n||(n=document.createElement("select"),document.body.appendChild(n)),await navigator.mediaDevices.enumerateDevices().then((function(e){for(var t=0;t!==e.length;++t){var r=e[t],a=document.createElement("option");a.value=r.deviceId,"videoinput"===r.kind&&(a.text=r.label||"Camera "+(n.length+1),n.appendChild(a))}}));let o=null,i=null,c=document.getElementById(e);async function l(){o=await navigator.mediaDevices.getUserMedia({audio:!1,video:{width:r,height:a,deviceId:n.options[n.selectedIndex].value}}),c.srcObject=o}c||(c=document.createElement("video")),n.selectedIndex=0,await l(),console.log("Received camera access");let d=document.createElement("canvas");d.width=r,d.height=a;let s=d.getContext("2d"),u=document.getElementById(t);function f(){s.drawImage(c,0,0,r,a),u.src=d.toDataURL()}function m(e){c.srcObject=o,c.play(),i||(i=setInterval(f,e))}function v(){i&&clearInterval(i)}return u||(u=new Image(r,a),u.id=t),n.addEventListener("change",(()=>{v(),l().then((()=>{m(100)}))})),console.log("Set up camera stream source"),{video:c,start:m,stop:v,image:u}}r.r(t),r.d(t,{initializeStreamToImage:()=>a})},221:(e,t,r)=>{"use strict";function a(e,t,r){var a=e.createShader(t);if(e.shaderSource(a,r),e.compileShader(a),e.getShaderParameter(a,e.COMPILE_STATUS))return a;console.log(e.getShaderInfoLog(a)),e.deleteShader(a)}function n(e,t,r){var a=e.createProgram();if(e.attachShader(a,t),e.attachShader(a,r),e.linkProgram(a),e.getProgramParameter(a,e.LINK_STATUS))return a;console.log(e.getProgramInfoLog(a)),e.deleteProgram(a)}function o(e,t,r){var a=t.getAttribLocation(r,"a_position"),n=t.getAttribLocation(r,"a_texCoord"),o=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,o),function(e,t,r,a,n){var o=0+a,i=0+n;e.bufferData(e.ARRAY_BUFFER,new Float32Array([0,0,o,0,0,i,0,i,o,0,o,i]),e.STATIC_DRAW)}(t,0,0,e.width,e.height);var i=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,i),t.bufferData(t.ARRAY_BUFFER,new Float32Array([0,0,1,0,0,1,0,1,1,0,1,1]),t.STATIC_DRAW);var c=t.createTexture();t.bindTexture(t.TEXTURE_2D,c),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texImage2D(t.TEXTURE_2D,0,t.RGBA,t.RGBA,t.UNSIGNED_BYTE,e);var l=t.getUniformLocation(r,"u_resolution");t.viewport(0,0,t.canvas.width,t.canvas.height),t.clearColor(0,0,0,0),t.clear(t.COLOR_BUFFER_BIT),t.useProgram(r),t.enableVertexAttribArray(a),t.bindBuffer(t.ARRAY_BUFFER,o);var d=2,s=t.FLOAT,u=!1,f=0,m=0;t.vertexAttribPointer(a,d,s,u,f,m),t.enableVertexAttribArray(n),t.bindBuffer(t.ARRAY_BUFFER,i),d=2,s=t.FLOAT,u=!1,f=0,m=0,t.vertexAttribPointer(n,d,s,u,f,m),t.uniform2f(l,t.canvas.width,t.canvas.height);var v=t.TRIANGLES;m=0,t.drawArrays(v,m,6)}r.r(t),r.d(t,{createProgram:()=>n,createShader:()=>a,render:()=>o})},137:(e,t,r)=>{"use strict";let a;async function n(){return a||(a=async function(){const e=await r.e(283).then(r.bind(r,283)).then((e=>e.cv));await e.ready;const t=await async function(e){const t=await r.e(283).then(r.bind(r,283));return e.FS_createDataFile("/","detect.prototxt",t.detect_prototxt,!0,!1,!1),e.FS_createDataFile("/","detect.caffemodel",t.detect_caffemodel,!0,!1,!1),e.FS_createDataFile("/","sr.prototxt",t.sr_prototxt,!0,!1,!1),e.FS_createDataFile("/","sr.caffemodel",t.sr_caffemodel,!0,!1,!1),new e.wechat_qrcode_WeChatQRCode("detect.prototxt","detect.caffemodel","sr.prototxt","sr.caffemodel")}(e);return{cv:e,qrcode_detector:t}}()),a}async function o(){await n()}async function i(e,t={}){const{cv:r,qrcode_detector:a}=await n(),o=r.imread(e,r.IMREAD_GRAYSCALE),i=new r.MatVector,c=a.detectAndDecode(o,i),l=i.get(0),d=l?{x:l.floatAt(0),y:l.floatAt(1),width:l.floatAt(4)-l.floatAt(0),height:l.floatAt(5)-l.floatAt(1)}:void 0;let s;if(d&&t.includeRectCanvas){s=document.createElement("canvas");const e=o.roi(new r.Rect(d.x,d.y,d.width,d.height));r.imshow(s,e),e.delete()}return o.delete(),{text:c.get(0),rect:d,rectCanvas:s}}r.d(t,{G:()=>o,S:()=>i})}},c={};function l(e){var t=c[e];if(void 0!==t)return t.exports;var r=c[e]={exports:{}};return i[e](r,r.exports,l),r.exports}l.m=i,e="function"==typeof Symbol?Symbol("webpack queues"):"__webpack_queues__",t="function"==typeof Symbol?Symbol("webpack exports"):"__webpack_exports__",r="function"==typeof Symbol?Symbol("webpack error"):"__webpack_error__",a=e=>{e&&e.d<1&&(e.d=1,e.forEach((e=>e.r--)),e.forEach((e=>e.r--?e.r++:e())))},l.a=(n,o,i)=>{var c;i&&((c=[]).d=-1);var l,d,s,u=new Set,f=n.exports,m=new Promise(((e,t)=>{s=t,d=e}));m[t]=f,m[e]=e=>(c&&e(c),u.forEach(e),m.catch((e=>{}))),n.exports=m,o((n=>{var o;l=(n=>n.map((n=>{if(null!==n&&"object"==typeof n){if(n[e])return n;if(n.then){var o=[];o.d=0,n.then((e=>{i[t]=e,a(o)}),(e=>{i[r]=e,a(o)}));var i={};return i[e]=e=>e(o),i}}var c={};return c[e]=e=>{},c[t]=n,c})))(n);var i=()=>l.map((e=>{if(e[r])throw e[r];return e[t]})),d=new Promise((t=>{(o=()=>t(i)).r=0;var r=e=>e!==c&&!u.has(e)&&(u.add(e),e&&!e.d&&(o.r++,e.push(o)));l.map((t=>t[e](r)))}));return o.r?d:i()}),(e=>(e?s(m[r]=e):d(f),a(c)))),c&&c.d<0&&(c.d=0)},l.d=(e,t)=>{for(var r in t)l.o(t,r)&&!l.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},l.f={},l.e=e=>Promise.all(Object.keys(l.f).reduce(((t,r)=>(l.f[r](e,t),t)),[])),l.u=e=>"./js/"+e+".app.js",l.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),l.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n={},o="rgb_qr_scanner:",l.l=(e,t,r,a)=>{if(n[e])n[e].push(t);else{var i,c;if(void 0!==r)for(var d=document.getElementsByTagName("script"),s=0;s<d.length;s++){var u=d[s];if(u.getAttribute("src")==e||u.getAttribute("data-webpack")==o+r){i=u;break}}i||(c=!0,(i=document.createElement("script")).charset="utf-8",i.timeout=120,l.nc&&i.setAttribute("nonce",l.nc),i.setAttribute("data-webpack",o+r),i.src=e),n[e]=[t];var f=(t,r)=>{i.onerror=i.onload=null,clearTimeout(m);var a=n[e];if(delete n[e],i.parentNode&&i.parentNode.removeChild(i),a&&a.forEach((e=>e(r))),t)return t(r)},m=setTimeout(f.bind(null,void 0,{type:"timeout",target:i}),12e4);i.onerror=f.bind(null,i.onerror),i.onload=f.bind(null,i.onload),c&&document.head.appendChild(i)}},l.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{var e;l.g.importScripts&&(e=l.g.location+"");var t=l.g.document;if(!e&&t&&(t.currentScript&&(e=t.currentScript.src),!e)){var r=t.getElementsByTagName("script");if(r.length)for(var a=r.length-1;a>-1&&(!e||!/^http(s?):/.test(e));)e=r[a--].src}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),l.p=e+"../"})(),(()=>{var e={524:0};l.f.j=(t,r)=>{var a=l.o(e,t)?e[t]:void 0;if(0!==a)if(a)r.push(a[2]);else{var n=new Promise(((r,n)=>a=e[t]=[r,n]));r.push(a[2]=n);var o=l.p+l.u(t),i=new Error;l.l(o,(r=>{if(l.o(e,t)&&(0!==(a=e[t])&&(e[t]=void 0),a)){var n=r&&("load"===r.type?"missing":r.type),o=r&&r.target&&r.target.src;i.message="Loading chunk "+t+" failed.\n("+n+": "+o+")",i.name="ChunkLoadError",i.type=n,i.request=o,a[1](i)}}),"chunk-"+t,t)}};var t=(t,r)=>{var a,n,[o,i,c]=r,d=0;if(o.some((t=>0!==e[t]))){for(a in i)l.o(i,a)&&(l.m[a]=i[a]);c&&c(l)}for(t&&t(r);d<o.length;d++)n=o[d],l.o(e,n)&&e[n]&&e[n][0](),e[n]=0},r=self.webpackChunkrgb_qr_scanner=self.webpackChunkrgb_qr_scanner||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))})(),l(100),l(221),l(374),l(779),l(553)})();