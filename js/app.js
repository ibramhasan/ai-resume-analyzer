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

    loading.innerHTML = "⏳ Sedang menganalisis CV...";
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

        showATS(result);

        showOptimizer();

    }

    catch(err){

        loading.innerHTML = "";

        resultDiv.innerHTML = `
        <div class="card">
            <p style="color:red;">
                ${err.message}
            </p>
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

        <div class="score">
            ${result.ats_score}
        </div>

        <div class="grade">
            Grade : ${result.grade}
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

        ${result.recommendation}

    </div>

    `;

}

// ======================
// Optimizer Card
// ======================

function showOptimizer(){
