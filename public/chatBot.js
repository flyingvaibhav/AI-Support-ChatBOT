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

document.body.append(button)

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
box.innerHTML

document.body.appendChild(box)
})()
