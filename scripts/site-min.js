!function($){"use strict";function e(e,n,t,a){return function(o){n.push({name:e.name,size:e.size,type:e.type,lastModified:e.lastModifiedDate,data:o.target.result}),n.length===t&&$.isFunction(a.onFileRead)&&a.onFileRead(n,a)}}function n(e){e.stopPropagation(),e.preventDefault()}var t=null;$.fn.fileDragAndDrop=function(e){if($.isFunction(e)){var n={};n.onFileRead=e,e=n}return this.each(function(){var n=$(this),t=$.extend({},$.fn.fileDragAndDrop.defaults,e);0===t.addClassTo.length&&(t.addClassTo=n),this.addEventListener("dragenter",function(e){a._over(e,n,t)},!1),this.addEventListener("dragover",function(e){a._exit(e,n,t)},!1),this.addEventListener("drop",function(e){a._drop(e,n,t)},!1)})},$.fn.fileDragAndDrop.defaults={overClass:"over",addClassTo:$([]),onFileRead:null};var a={_over:function(e,t,a){$(a.addClassTo).addClass(a.overClass),n(e)},_exit:function(e,a,o){clearTimeout(t),t=setTimeout(function(){$(o.addClassTo).removeClass(o.overClass)},100),n(e)},_drop:function(t,a,o){$(o.addClassTo).removeClass(o.overClass),n(t);for(var r=t.dataTransfer.files,s=[],i=0;i<=r.length-1;i++){var d=new FileReader,l=e(r[i],s,r.length,o);d.addEventListener?d.addEventListener("loadend",l,!1):d.onloadend=l,d.readAsDataURL(r[i])}}}}(jQuery);var isDev=/\.local|localhost/i.test(document.location.hostname);!function(){function e(e,n){var t=['<div style="width: 90%; margin-left: -45%;" class="modal" tabindex="-1" role="dialog" aria-labelledby="unsupportedModalLabel" aria-hidden="true">','   <div class="modal-header">','       <h2 id="unsupportedModalLabel" class="text-error">'+e+"</h2>","   </div>",'   <div class="modal-body">','       <p style="font-size:22x;">'+n+"</p>","   </div>","</div>"].join("");Modernizr.load({test:$.fn.modal,load:["scripts/bootstrap/bootstrap-modal.js","styles/bootstrap-assets/modals.css"],complete:function(){$(t).modal({keyboard:!1,backdrop:"static"})}})}function n(){w=/Android|webOS|iPhone|iPad|iPod|BlackBerry|Opera Mini|IEMobile|Windows Phone|Zune/i.test(navigator.userAgent),w&&e("Unsupported Device!","Sorry, LyricConverter cannot be used on mobile devices!<br/><br/>Please use a desktop computer that supports file uploads and downloads.")}function t(){Modernizr.load({test:window.atob&&window.btoa,nope:"scripts/plugins/base64.js"}),Modernizr.draganddrop&&window.FileReader?d():e("Unsupported Browser!","Sorry, you won't be able to use LyricConverter because your browser does not support file drag-n-drop!<br/><br/>Try using a modern browser like <a href='www.google.com/chrome'>Google Chrome</a> instead!")}function a(){f=$("#header"),v=$("#main"),h=$("#begin-area"),g=$("#display-area"),m=$("#drop-area-more"),b=$("#output"),y=$("#parser-error-display"),k=$("#many-songs-please-donate"),L=$("#total-song-count")}function o(){function e(a){var o=Math.floor(Math.random()*n)+1,r=f.css("background-image"),s=r.match(t);if(a&&o===parseInt(s[1],10))return void e(!0);var i=r.replace(s[0],"header-"+o+".jpg");f.css("background-image",i)}var n=8,t=/header-(\d+)\.jpg/;e(!1),f.on("click",function(n){"A"!==n.target.tagName&&e(!0)})}function r(){var e=$(window),n=2.4,t=350,a=20,o=-(t-f.outerHeight());e.on("scroll",function(){var t=-(e.scrollTop()/n)-a;o>=t?t=o:t>=0&&(t=0);var r="50% "+t+"px";f.css("backgroundPosition",r)})}function s(){var e="active",n=v.children(".js-main-section"),t=$("#js-convert-types a");$("#main-nav").children("a").on("click",function(t){var a=$(this),o=a.attr("href").replace("#","");a.addClass(e).siblings().removeClass(e),n.addClass("hidden"),$("#"+o).removeClass("hidden"),t.preventDefault()}),t.on("click",function(n){var t=$(this);t.addClass(e).siblings().removeClass(e);var a=t.data("format");parser.outputFormat=a,A._create(_,a,T),n.preventDefault()});var a=A._read(_),o=$([]);null!==a&&(o=t.filter('[data-format="'+a+'"]')),0===o.length&&(o=t.first()),o.triggerHandler("click")}function i(){M=parseInt(A._read(x)),isNaN(M)&&(M=0,A._create(x,M,T)),$("#donate-nag-no-thanks").one("click",function(){D=!1,k.addClass("hidden")})}function d(){parser.displayError=u,parser.displaySuccessHtml=p,$("html").fileDragAndDrop(function(e){if(c(),parser.errorList=[],parser.songList=[],$.each(e,parser.parseFile),parser.complete(b),l(parser.songList.length),parser.errorList.length){var n=1===parser.errorList.length?"One song ran into an error and could not be converted":"We ran into errors with "+parser.errorList.length+" of the songs, and they were not converted";u(parser.errorList.join("<br/>"),n)}})}function l(e){M+=e,A._create(x,M,T),D&&M>C&&(k.removeClass("hidden"),$("#total-song-count").text(M))}function c(){h.addClass("hidden"),g.removeClass("hidden"),m.removeClass("hidden"),b.empty(),y.empty().addClass("hidden")}function u(e,n){var t="";n&&n.length&&(t+="<h3>"+n+"</h3>"),t+="<p>"+e+"</p>",y.removeClass("hidden").html(t)}function p(e,n,t){if(e.length>0){var a="btn-"+n+"-download-zip",o="btn-"+n+"-download-files",r="<h1>Converted "+e.length+" Song File"+(e.length>1?"s":"")+"!</h1>";e.length>1?(r+="<button id='"+a+"' type='button' class='btn btn-lg btn-primary'>Download as .zip</button>",r+=" or <button id='"+o+"' type='button' class='btn btn-default'>Download "+e.length+" individual files</button>"):r+="<button id='"+o+"' type='button' class='btn btn-lg btn-primary'>Download file</button>",b.html(r),$("#"+a).on("click",function(){var n=new JSZip;$.each(e,function(e,a){n.file(a.name+t,a.data)});var a=n.generate({type:"blob"});saveAs(a,"converted files.zip")}),$("#"+o).on("click",function(){$.each(e,function(e,n){var a=new Blob([n.data],{type:"text/xml;charset=utf-8"});saveAs(a,n.name+t)})})}}var f,v,h,g,m,b,y,w=!1,C=100,D=!0,k,L,T=365,_="last-used-format",x="total-converted-song-count",M=0;$(function(){a(),n(),w||(o(),r(),s(),t(),i())});var A={_create:function(e,n,t){var a="";if(t){var o=new Date;o.setTime(o.getTime()+24*t*60*60*1e3),a="; expires="+o.toGMTString()}document.cookie=e+"="+n+a+"; path=/"},_read:function(e){for(var n=e+"=",t=document.cookie.split(";"),a=0;a<t.length;a++){for(var o=t[a];" "===o.charAt(0);)o=o.substring(1,o.length);if(0===o.indexOf(n))return o.substring(n.length,o.length)}return null}}}();
//# sourceMappingURL=./site-min.js.map