require("dotenv").config();

const express = require("express");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const fs = require("fs");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const upload = multer({ dest: "uploads/" });

// ✅ Upload Route
app.post("/upload", upload.single("resume"), async (req, res) => {
  try {
    console.log("Upload route hit");

    const data = await pdfParse(fs.readFileSync(req.file.path));
    const text = data.text;

    const skillsList = [
      "JavaScript","Python","HTML","CSS",
      "React","Node.js","MongoDB","SQL"
    ];

    const skills = skillsList.filter(skill =>
      text.toLowerCase().includes(skill.toLowerCase())
    );

    const missing = [];
    const score = skills.length * 15;

    fs.unlinkSync(req.file.path);

    console.log("Sending response");

    res.json({
      skills,
      missing,
      score,
      suggestion: "Improve formatting and add more projects."
    });

  } catch (err) {
    console.log(err);
    res.status(500).send("Error");
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});