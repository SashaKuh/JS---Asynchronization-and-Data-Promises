const t={startBtn:document.querySelector("#start"),stopBtn:document.querySelector("#stop")};let n;function e(e){const r=t.startBtn,a=t.stopBtn;o(e?r:a),o(e?a:r,!1),e?n=setInterval((()=>{const t=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`;document.body.style.backgroundColor=t}),1e3):clearInterval(n)}function o(t,n=!0){t.disabled=n}t.startBtn.addEventListener("click",(()=>e(!0))),t.stopBtn.addEventListener("click",(()=>e(!1))),window.addEventListener("load",(()=>{o(t.stopBtn)}));
//# sourceMappingURL=01-color-switcher.c8cbbb7e.js.map