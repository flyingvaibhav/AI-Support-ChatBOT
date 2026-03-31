(function (){

  const api_Url="http://localhost:3000/api/chat"

  const scriptTag=document.currentScript
  const ownerId=scriptTag.getAttribute("data-owner-id")
  if(!ownerId){
    console.log("owner id not found")
    return
  }

  const button=document.createElement("div")
  button.innerHTML="💬"
Object.assign(button.style,{
    position: "fixed",
    bottom: "24px",
    right: "24px",
    width: "56px",
    height: "56px",
    borderRadius: "50%",
    background: "#000",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    fontSize: "22px",
    boxShadow: "0 15px 40px rgba(0,0,0,0.35)",
    zIndex: "999999",
})

document.body.appendChild(button)

const box=document.createElement("div")

   Object.assign(box.style, {
    position: "fixed",
    bottom: "90px",
    right: "24px",
    width: "320px",
    height: "420px",
    background: "#fff",
    borderRadius: "14px",
    boxShadow: "0 25px 60px rgba(0,0,0,0.25)",
    display: "none",
    flexDirection: "column",
    overflow: "hidden",
    zIndex: "999999",
    fontFamily: "Inter, system-ui, sans-serif",
})
box.innerHTML = `<div style="
    background:#000;
    color:#fff;
    padding:12px 14px;
    font-size:14px;
    display:flex;
    justify-content:space-between;
    align-items:center;
">
    <span>Customer Support</span>
    <span id="chat-close" style="cursor:pointer;font-size:16px">❌</span>
</div>
<div id="chat-messages" style="
    flex:1;
    padding:14px;
    overflow-y:auto;
    background:#f9f9f9;
    display:flex;
    flex-direction:column;
">
</div>


<div style="
    display:flex;
    border-top:1px solid #e5e7eb;
    padding:8px;
    gap:6px;
">
<input id="chat-input" type="text"
style="    flex:1;
    padding:8px 12px;
    border:1px solid #e5e7eb;
    border-radius:6px;
    font-size:14px;
    outline:none;"

placeholder="Type a message"/>
<button id="chat-send" style="padding:8px 12px; 
background:#000;
 color:#fff; border:none;
 border-radius:6px;
 cursor:pointer;
 ">send</button>
</div>


`


document.body.appendChild(box)


button.onclick=()=>{
    box.style.display=box.style.display==="none"?"flex":"none"
}

document.querySelector("#chat-close").onclick=()=>{
    box.style.display="none"
}


const input=document.querySelector("#chat-input")
const sendBtn=document.querySelector("#chat-send")


})()
