const labels = ["January", "February", "March", "April", "May", "June"];


type Data = {
  data : string;
  first : string;
  last : string;
  email: string;
  address: any;
  created: any;
  balance: string
  labels: any;
  datasets: any;
  age: any;
}

declare var Chart: any;

const data = <Data>{
  labels: labels,
  datasets: [
    {
      label: "My First dataset",
      backgroundColor: "rgb(255, 99, 132)",
      borderColor: "rgb(255, 99, 132)",
      data: [0, 10, 5, 2, 20, 30, 45],
    },
  ],
};

const config = {
  type: "line",
  data: data,
  options: {},
};

const chartEl = document.getElementById("myChart");

const myChart = new Chart(chartEl, config);
const loading = false;

function showSpinner() {
  const el = document.querySelector(".tBody");
  if (el) {
    el.innerHTML = `<tr><td>Loading</td></tr>`;
  }
}

function renderError() {
  document.querySelector(".tBody")!.innerHTML = `
            <tr>
                <td>Error</td>
            </tr>
        `;
}

function renderTable(data) {
  let html = "";
  const dateList = [];

  const usersWithTime = data.map(element => {
      const [day, year] = element.created.split(' ');
      const time = new Date(
          Number(year),
          Number(day.replace(',', ' ').replace(' ', '')
      ));

      return {
          ...element,
          time: time.getTime()
      }
  });

  usersWithTime
      .sort((x, y) => x.time > y.time ? 1 : -1)
      .slice(0, 9)
      .forEach((element) => {
          html += "<tr>";
          html += `<td>${element.name.first}</td>`;
          html += `<td>${element.name.last}</td>`;
          html += `<td>${element.email}</td>`;
          html += `<td>${element.location.street.name}, ${element.location.street.number}</td>`;
          html += `<td>${element.dob.age}</td>`;
          html += "</tr>";

          // @ts-ignore
          dateList.push(element.time)
      });

  myChart.data.datasets[0].data = dateList;
  myChart.update('active');

  document.querySelector(".tBody")!.innerHTML = html;
}

async function fetchData() {
  try {
      showSpinner();
      const res = await fetch(
          "https://randomuser.me/api/?results=1000&nat=fr&gender=male"
      );
      const data = await res.json();

      renderTable(data);
  } catch (e) {
      console.info(e)
      renderError();
  } finally {
  }
}

















