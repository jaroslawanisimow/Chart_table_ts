const labels = [
    "20-29",
    "30-39",
    "40-49",
    "50-59",
    "60-69",
    "70-79"
];
const data = {
    labels,
    datasets: [
        {
            label: "users",
            backgroundColor: "rgb(255, 99, 132)",
            borderColor: "rgb(255, 99, 132)",
            data: []
        }
    ]
};
const config = {
    type: "line",
    data: data,
    options: {}
};
const chartEl = document.getElementById("myChart");
// @ts-ignore
const myChart = new Chart(chartEl, config);
function showSpinner() {
    document.querySelector(".tBody").innerHTML = `
        <tr>
            <td>Loading</td>
        </tr>
    `;
}
function renderError() {
    document.querySelector(".tBody").innerHTML = `
        <tr>
            <td>Error</td>
        </tr>
    `;
}
function renderTable(users) {
    let html = "";
    users.sort((x, y)=>x.dob.age < y.dob.age ? 1 : -1).slice(0, 99).forEach((user)=>{
        html += "<tr>";
        html += `<td>${user.name.title}. ${user.name.first} ${user.name.last}</td>`;
        html += `<td>${user.email}</td>`;
        html += `<td>${user.location.street.name}, ${user.location.street.number}</td>`;
        html += `<td>${user.dob.age}</td>`;
        html += "</tr>";
    });
    document.querySelector(".tBody").innerHTML = html;
}
function renderChart(users) {
    const userAgeList = users.map((user)=>user.dob.age).sort();
    myChart.data.datasets[0].data = [
        userAgeList.reduce((acc, curr)=>curr > 20 && curr < 29 ? acc + 1 : acc, 0),
        userAgeList.reduce((acc, curr)=>curr > 30 && curr < 39 ? acc + 1 : acc, 0),
        userAgeList.reduce((acc, curr)=>curr > 40 && curr < 49 ? acc + 1 : acc, 0),
        userAgeList.reduce((acc, curr)=>curr > 50 && curr < 59 ? acc + 1 : acc, 0),
        userAgeList.reduce((acc, curr)=>curr > 60 && curr < 69 ? acc + 1 : acc, 0),
        userAgeList.reduce((acc, curr)=>curr > 70 && curr < 79 ? acc + 1 : acc, 0)
    ];
    myChart.update("active");
}
async function fetchData() {
    try {
        showSpinner();
        const res = await fetch("https://randomuser.me/api/?nat=fr&results=1000&gender=male");
        const data1 = await res.json();
        renderTable(data1.results);
        renderChart(data1.results);
    } catch (e) {
        renderError();
    }
}

//# sourceMappingURL=index.59697c84.js.map
