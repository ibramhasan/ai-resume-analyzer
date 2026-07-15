const form = document.getElementById("uploadForm");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const loading = document.getElementById("loading");
    const resultDiv = document.getElementById("result");
    const optimizerSection = document.getElementById("optimizerSection");

    loading.innerHTML = "⏳ Sedang menganalisis CV...";
    resultDiv.innerHTML = "";
    optimizerSection.innerHTML = "";

    const formData = new FormData(form);

    try {

        const response = await fetch("https://n8n.hasanibra.online/webhook/resume-analyzer", {
            method: "POST",
            body: formData
        });

        if (!response.ok) {
            throw new Error("Gagal mengambil hasil analisis.");
        }

        const result = await response.json();

        // Simpan hasil ATS agar nanti bisa dipakai Resume Optimizer
        window.resumeResult = result;

        loading.innerHTML = "";

        const breakdownHtml = (result.breakdown || []).map(item => `
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

        // Placeholder Resume Optimizer
        optimizerSection.innerHTML = `

<div class="card">

<h2>🚀 Resume Optimizer</h2>

<p>

CV berhasil dianalisis.

Sekarang kamu bisa mengoptimalkannya menggunakan AI agar lebih ATS Friendly dan profesional.

</p>

<button id="optimizeBtn">

Optimize Resume

</button>

</div>

`;
document.getElementById("optimizeBtn").addEventListener("click", optimizeResume);
    } catch (err) {

        loading.innerHTML = "";

        resultDiv.innerHTML = `

<div class="card">

<p style="color:red;">
${err.message}
</p>

</div>

`;

        optimizerSection.innerHTML = "";

    }

});

async function optimizeResume(){

    const optimizerResult=document.getElementById("optimizerResult");

    optimizerResult.innerHTML=`

<div class="card">

<h2>🚀 Optimizing Resume...</h2>

<p>

Mohon tunggu sebentar...

AI sedang memperbaiki resume Anda.

</p>

</div>

`;

    try{

        const response=await fetch("https://n8n.hasanibra.online/webhook/resume-optimizer",{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify(window.resumeResult)

        });

        if(!response.ok){

            throw new Error("Resume Optimizer belum tersedia.");

        }

        const result=await response.json();

        optimizerResult.innerHTML=`

<div class="card">

<h2>Resume Optimized</h2>

<p>

Workflow sudah berhasil dipanggil.

</p>

</div>

`;

    }

    catch(err){

        optimizerResult.innerHTML=`

<div class="card">

<h2>🚧 Resume Optimizer</h2>

<p style="color:red">

${err.message}

</p>

</div>

`;

    }

}
