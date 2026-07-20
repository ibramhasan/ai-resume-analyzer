const analyzeBtn = document.getElementById("analyzeBtn");
const form = document.getElementById("uploadForm");
const loading = document.getElementById("loading");
const resultDiv = document.getElementById("result");
const optimizerSection = document.getElementById("optimizerSection");
const optimizerResult = document.getElementById("optimizerResult");

window.resumeResult = null;

// ======================
// Upload Resume
// ======================

form.addEventListener("submit", uploadResume);

async function uploadResume(e) {

    e.preventDefault();

    analyzeBtn.disabled = true;
    analyzeBtn.innerHTML = "⏳ Analyzing...";

    loading.innerHTML = `
        <div class="card">
            <h3>🤖 AI is analyzing your resume...</h3>
            <p>📄 Reading PDF...</p>
            <p>📊 Calculating ATS Score...</p>
            <p>🧠 Generating recommendations...</p>
        </div>
    `;

    resultDiv.innerHTML = "";
    optimizerSection.innerHTML = "";
    optimizerResult.innerHTML = "";

    const formData = new FormData(form);

    try {

        const response = await fetch(
            "https://n8n.hasanibra.online/webhook/resume-analyzer",
            {
                method: "POST",
                body: formData
            }
        );

        if (!response.ok) {
            throw new Error("Gagal mengambil hasil analisis.");
        }

        const result = await response.json();

        window.resumeResult = result;

        loading.innerHTML = "";

        analyzeBtn.disabled = false;
        analyzeBtn.innerHTML = "Analyze Resume";

        showATS(result);
        showOptimizer();

    }

    catch(err){

        loading.innerHTML = "";

        analyzeBtn.disabled = false;
        analyzeBtn.innerHTML = "Analyze Resume";

        resultDiv.innerHTML = `
        <div class="card">
            <h2>❌ Oops!</h2>
            <p style="color:red;">
                ${err.message}
            </p>
            <p>Please try again.</p>
        </div>
        `;

    }

}

// ======================
// ATS Result
// ======================

function showATS(result){

    const breakdownHtml = (result.breakdown || []).map(item=>`

        <tr>
            <td>${item.name}</td>
            <td><b>${item.score}/${item.max}</b></td>
            <td>${item.note}</td>
        </tr>

    `).join("");

    resultDiv.innerHTML = `

    <div class="card">

        <h2>ATS Score</h2>

        <div class="score-circle">

            <div class="score-value">
                ${parseInt(result.ats_score)}
            </div>

            <div class="score-label">
                ATS Score
            </div>

        </div>

        <div class="grade">
            Grade : <b>${result.grade}</b>
        </div>

        <div class="status">
            ${result.status}
        </div>

        <h2>Detail Penilaian</h2>

        <table>

            <thead>

                <tr>

                    <th>Kategori</th>

                    <th>Skor</th>

                    <th>Catatan</th>

                </tr>

            </thead>

            <tbody>

                ${breakdownHtml}

            </tbody>

        </table>

        <h2>Summary</h2>

        <p class="summary">

            ${result.summary}

        </p>

        <h2>Recommendation</h2>

        <p class="summary">

            ${result.recommendation}

        </p>

    </div>

    `;

}

// ======================
// Optimizer Card
// ======================

function showOptimizer() {

    optimizerSection.innerHTML = `

    <div class="card">

        <h2>🚀 Resume Optimizer</h2>

        <p>

            CV berhasil dianalisis.

            Sekarang klik tombol di bawah untuk mengoptimalkannya menggunakan AI.

        </p>

        <button id="optimizeBtn">

            Optimize Resume

        </button>

    </div>

    `;

    const btn = document.getElementById("optimizeBtn");

    btn.addEventListener("click", optimizeResume);

}

// ======================
// Optimize Resume
// ======================

async function optimizeResume() {

    const btn = document.getElementById("optimizeBtn");

    btn.disabled = true;
    btn.innerHTML = "⏳ Optimizing...";

    optimizerResult.innerHTML = `
    <div class="card">
        <h2>🤖 AI is optimizing your resume...</h2>
        <p>✔ Improving Professional Summary</p>
        <p>✔ Optimizing Experience</p>
        <p>✔ Enhancing Skills</p>
        <p>✔ Generating Cover Letter</p>
    </div>
    `;

    try {

        const response = await fetch(
            "https://n8n.hasanibra.online/webhook/resume-optimizer",
            {
                method: "POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(window.resumeResult)
            }
        );

        if(!response.ok){

            throw new Error("Gagal menghubungi Resume Optimizer.");

        }

        const result = await response.json();

        optimizerResult.innerHTML = `

        <div class="card">

            <h2>✅ Resume Optimized</h2>

            <h3>

                Professional Summary

                <button
                class="copy-btn"
                onclick="copyText('summaryText')">

                    📋

                </button>

            </h3>

            <p
            id="summaryText"
            class="summary">

                ${result.optimized_summary || ""}

            </p>

            <h3>Experience</h3>

            ${(result.optimized_experience || []).map(exp=>`

                <div class="experience-card">

                    <h4>${exp.position || ""}</h4>

                    <strong>${exp.company || ""}</strong><br>

                    <small>${exp.dates || exp.duration || ""}</small>

                    <ul>

                        ${((exp.responsibilities || exp.achievements || []).map(item=>`

                            <li>${item}</li>

                        `).join(""))}

                    </ul>

                </div>

            `).join("")}

            <h3>Skills</h3>

            <div class="skills">

                ${(result.optimized_skills || []).map(skill=>`

                    <span class="skill-badge">

                        ${skill}

                    </span>

                `).join("")}

            </div>

            <h3>

                Cover Letter

                <button
                class="copy-btn"
                onclick="copyText('coverLetter')">

                    📋

                </button>

            </h3>

            <div
            id="coverLetter"
            class="cover-letter">

                ${(result.cover_letter || "").replace(/\n/g,"<br>")}

            </div>

        </div>

        `;

        btn.disabled = false;
        btn.innerHTML = "Optimize Resume";

    }

    catch(err){

        btn.disabled = false;
        btn.innerHTML = "Optimize Resume";

        optimizerResult.innerHTML = `

        <div class="card">

            <h2>❌ Resume Optimizer</h2>

            <p style="color:red;">

                ${err.message}

            </p>

        </div>

        `;

    }

}

// ======================
// Copy Text
// ======================

function copyText(id){

    const text = document.getElementById(id).innerText;

    navigator.clipboard.writeText(text);

    alert("✅ Copied!");

}
