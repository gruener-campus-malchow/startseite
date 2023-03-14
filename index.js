let snake={load:function(){snake.cell=document.querySelector('.grid-cell[data-label="Snake"]'),snake.cell.addEventListener("click",snake.init)},init:function(){snake.cell.removeEventListener("click",snake.init),snake.cell.addEventListener("click",snake.start),snake.cell.classList.add("static"),snake.cell.classList.add("snake"),snake.cell.innerHTML="",snake.canvas=document.createElement("CANVAS"),snake.canvas.width=16,snake.canvas.height=16,snake.cell.appendChild(snake.canvas),snake.renderingContext=snake.canvas.getContext("2d"),document.body.addEventListener("keydown",snake.control),snake.snake=[],snake.food={},snake.start()},start:function(){snake.snake=[{x:2,y:7},{x:3,y:7},{x:4,y:7}],snake.direction=snake.directions.right,snake.gameOver=!1,snake.generateFood(),snake.interval&&window.clearInterval(snake.interval),snake.interval=window.setInterval(snake.loop,200),snake.render()},loop:function(){var e;snake.gameOver?document.title="GAME OVER – <SPACE> to restart":(snake.move(),snake.bodyAt(snake.food.x,snake.food.y)&&(e={x:(e=snake.snake[snake.snake.length-1]).x,y:e.y},snake.snake.splice(0,0,e),snake.generateFood()),snake.render(),document.title="Score: "+(snake.snake.length-3)+" | Snake")},render:function(){let a=snake.renderingContext.getImageData(0,0,16,16);for(let n=0;n<16;n++)for(let e=0;e<16;e++)snake.bodyAt(n,e)?t(n,e,[0,170,68,255]):snake.food.x==n&&snake.food.y==e?t(n,e,[204,0,0,255]):t(n,e,[238,238,238,255]);function t(e,n,t){n=4*(16*n+e);a.data[n]=t[0],a.data[1+n]=t[1],a.data[2+n]=t[2],a.data[3+n]=t[3]}snake.renderingContext.putImageData(a,0,0)},move:function(){snake.snake.splice(0,1);var e={x:(e=snake.snake[snake.snake.length-1]).x,y:e.y};switch(snake.direction){case snake.directions.right:e.x++;break;case snake.directions.down:e.y++;break;case snake.directions.left:e.x--;break;case snake.directions.up:e.y--}(snake.bodyAt(e.x,e.y)||15<e.x||e.x<0||15<e.y||e.y<0)&&(snake.gameOver=!0),snake.snake.push(e)},control:function(e){if(e.target==document.body){switch(e.keyCode){case 87:case 38:snake.direction!=snake.directions.down&&(snake.direction=snake.directions.up);break;case 65:case 37:snake.direction!=snake.directions.right&&(snake.direction=snake.directions.left);break;case 83:case 40:snake.direction!=snake.directions.up&&(snake.direction=snake.directions.down);break;case 68:case 39:snake.direction!=snake.directions.left&&(snake.direction=snake.directions.right);break;case 32:snake.start();default:return}e.preventDefault()}},directions:{right:0,down:1,left:2,up:3},generateFood:function(){let e=!0;for(;e;)snake.food.x=Math.floor(16*Math.random()),snake.food.y=Math.floor(16*Math.random()),e=snake.bodyAt(snake.food.x,snake.food.y)},bodyAt:function(n,t){for(let e=0;e<snake.snake.length;e++)if(snake.snake[e].x==n&&snake.snake[e].y==t)return!0;return!1}};document.addEventListener("DOMContentLoaded",snake.load);const timer={init:function(){timer.cell=document.querySelector('.grid-cell[data-label="Timer"]'),timer.cell.classList.add("timer","static"),timer.iframe=document.createElement("IFRAME"),timer.iframe.className=timer.cell.className,timer.iframe.src="https://gcm.schule/timer.html#embed",timer.iframe.allowFullscreen=!0,timer.cell.replaceWith(timer.iframe)}};document.addEventListener("DOMContentLoaded",timer.init);let vp={init:function(){vp.cell=document.querySelector('.grid-cell[data-label="Vertretungsplan"]'),vp.cell.classList.add("vertretungsplan"),vp.cell.classList.add("static"),vp.cell.innerHTML+='<div class="spinner"></div>',vp.elements=[];fetch("https://gcm.schule/cis/api/plan/sus").then(e=>{if(e.ok)return e.json();vp.error(vp.errors.failed)}).then(e=>{vp.cell.innerHTML="",vp.populate(e)}).catch(e=>{console.log(e),vp.error(vp.errors.failed)})},populate:function(e){if(!e)return vp.error(vp.errors.empty);const n=r("div",{class:"vp-general"},[r("div",{class:"vp-header"},new Date(e.date).toLocaleDateString("de-DE",{weekday:"long",year:"numeric",month:"long",day:"numeric"}))]),t=(e.info.forEach(e=>n.append(r("div",{class:"vp-content"},e))),r("div",{class:"vp-container"},[n]));function r(e,n={},t=[]){const a=document.createElement(e);for(attr in n)a.setAttribute(attr,n[attr]);return"string"==typeof t?a.innerHTML=t:t.forEach(e=>a.append(e)),a}vp.cell.append(t),e.list.forEach(e=>{const s=r("div",{class:"vp-body"});t.append(r("div",{class:"vp-header"},[r("div",{class:"class-label"},e.name)]),s),e.contents.forEach(e=>{var n=e.type||"",t=e.note||"",a=e=>"object"==typeof e?`<s>${e.old}</s> <strong>${e.new}</strong>`:e||"";s.append(r("div",{class:"vp-content"},[r("div",{class:"vp-content1"},(e.time?`<strong>${e.time||""}.</strong> `:"")+a(e.subject)),r("div",{class:"vp-content2"},a(e.room)),r("div",{class:"vp-content3"},"Vertretung"==e.type?a(e.teacher):""),r("div",{class:"vp-content3"},n+(n&&t?": ":"")+t)]))})}),vp.cell.innerHTML+=`<a class="button" href="https://dsbmobile.de" target="_blank">DSB&nbsp;${vp.external_link_icon}</a>`},error:function(e){-1<Object.values(vp.errors).indexOf(e)?console.error(e):console.error("unknown error"),vp.cell.innerHTML="",vp.cell.appendChild(document.createTextNode("Kein Vertretungsplan verfügbar"));var n=document.createElement("DIV"),e=(n.innerHTML=e,n.classList.add("subtitle","error-message"),vp.cell.appendChild(n),document.createElement("A"));e.innerHTML="DSB&nbsp;"+vp.external_link_icon,e.setAttribute("href","https://dsbmobile.de"),e.setAttribute("class","button primary"),vp.cell.appendChild(e)},errors:{failed:"network unreachable or request failed",empty:"no data available"},external_link_icon:'<svg width="16" height="16" viewBox="0 1 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>'};document.addEventListener("DOMContentLoaded",vp.init);