function addMessage(text, type) {
  const box = document.getElementById("chat-box");

  const msg = document.createElement("div");
  msg.classList.add("msg", type);
  msg.innerText = text;

  box.appendChild(msg);
  box.scrollTop = box.scrollHeight;
}

async function uploadResume() {
  const file = document.getElementById("resume").files[0];
  const jobRole = document.getElementById("jobRole").value;

  if (!file) {
    alert("Please upload a file");
    return;
  }

  const formData = new FormData();
  formData.append("resume", file);
  formData.append("jobRole", jobRole);

  addMessage("📄 Uploading...", "user");

  try {
    const res = await fetch("/upload", {
      method: "POST",
      body: formData
    });

    const data = await res.json();

    addMessage(`📊 Score: ${data.score}`, "bot");
    addMessage(`✅ Skills: ${data.skills.join(", ")}`, "bot");
    addMessage(`💡 Suggestion: ${data.suggestion}`, "bot");

  } catch (err) {
    console.log(err);
    addMessage("❌ Error connecting to server", "bot");
  }
}