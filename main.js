// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ HEADING 1 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~ HEADING 2 ~~~~~~~~~~~~~~~~
// ~~~~~~~~~~ HEADING 3 ~~~~~~~~~~


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ FUNCTIONS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
let setDate = () => {
  let date = new Date();

  let currentDate = document.getElementById("currentDate");
  let currentTime = document.getElementById("currentTime");

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let theYear = date.getFullYear();
  let theMonth = months[date.getMonth()];
  let theWeekday = weekdays[date.getDay()];
  let theDay = date.getDate();
  let theHour = date.getHours();
  let theMinute = date.getMinutes();

  // ~~~~~~~~~~~~~~~~ DATE ~~~~~~~~~~~~~~~~
  currentDate.innerHTML = theWeekday + ", " + theMonth + " " + theDay;

  // ~~~~~~~~~~~~~~~~ TIME ~~~~~~~~~~~~~~~~
  if (theMinute >= 10) {
    if (theHour >= 12) {
      currentTime.innerHTML = theHour - 12 + ":" + theMinute + "pm";
    } else {
      currentTime.innerHTML = theHour + ":" + theMinute + "am";
    }
    if (theHour == 0) {
      currentTime.innerHTML = "12:" + theMinute + "am";
    }
    if (theHour == 12) {
      currentTime.innerHTML = "12:" + theMinute + "pm";
    }
  } else {
    if (theHour >= 12) {
      currentTime.innerHTML = theHour - 12 + ":" + "0" + theMinute + "pm";
    } else {
      currentTime.innerHTML = theHour + ":" + "0" + theMinute + "am";
    }
    if (theHour == 0) {
      currentTime.innerHTML = "12:" + "0" + theMinute + "am";
    }
    if (theHour == 12) {
      currentTime.innerHTML = "12:" + "0" + theMinute + "pm";
    }
  }

  setTimeout(setDate, 1000);
};

var copied = document.querySelector("#copied");
// copied.style.color = "transparent";

let hoverLink = () => {
  copied.textContent = "copy";
};

let copyLink = () => {
  window.navigator.clipboard.writeText(
    "https://public--main--fitbit--aumar.ixdcoder.com/"
  );
  copied.textContent = "copied!";
};

let resetLink = () => {
  setTimeout(() => {
    copied.textContent = "copy";
  }, 200);
};

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ DATA ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ______________ SOURCED CODE (with modifications) ______________
// The following code converts data from a Google Sheets file to a JSON file to use with Chart.js and other JavaScript libraries.
// https://themagicofand.medium.com/how-to-create-html-charts-using-chart-js-and-google-sheets-3dd1977eec6d
// *********** START OF SOURCED CODE (with modifications) ***********
google.charts.load("current", {
  packages: ["corechart", "bar"],
});
google.charts.setOnLoadCallback(initChart);

// Query the Google Sheet file for data using Google Visualization Query language
function initChart() {
  // TEMPLATE LINK
  //   URL = "https://docs.google.com/spreadsheets/d/1YFu3mEJzUXsxWVFDTVK9RhZF91VlwzDB-3F4WzHITq4/edit#gid=0";
  // LINK TO "Fitbit Info - Marina Au"
  URL =
    "https://docs.google.com/spreadsheets/d/1bSgCSqdeh715rcqivK0ZCUg6808J00BKIJAG6cXGQU8/edit?usp=sharing";
  var query = new google.visualization.Query(URL);
  query.setQuery("select *");
  query.send(function (response) {
    handleQueryResponse(response);
  });
}

function handleQueryResponse(response) {
  // Read the data as a JSON object for parsing
  var data = response.getDataTable();
  var columns = data.getNumberOfColumns();
  var rows = data.getNumberOfRows();
  // console.log(data.toJSON());

  const colors = [
    "rgb(54, 162, 235)",
    "rgb(255, 99, 132)",
    "rgb(75, 192, 192)",
    "rgb(255, 206, 86)",
    "rgb(153, 102, 255)",
  ];
  // Parse JSON data
  dataj = JSON.parse(data.toJSON());
  const labels = [];
  //  Define the labels for the X Axis of our charts (Date)
  for (c = dataj.rows.length - 7; c < dataj.rows.length; c++) {
    // console.log(dataj.rows[c].c[0].f);
    // if (dataj.cols[c].label != "") {
    labels.push(dataj.rows[c].c[0].f);
    // }
  }
  console.log(labels);

  const datasets = [];
  //   Define the values for the Y Axes of our charts (ex. steps, distance etc.)
  // dataj.rows.length = number of entries (row)
  const dataSteps = [];
  const dataFloorsClimbed = [];
  const dataCaloriesBurned = [];
  const dataElevationGained = [];
  const dataDistanceCovered = [];
  const dataMovementSedentary = [];
  const dataMovementLightlyActive = [];
  const dataMovementFairlyActive = [];
  const dataMovementVeryActive = [];
  const dataMovementAll = [];
  var dataMovementSum = 0;

  // For each row in the linked Google Sheets file...
  for (i = dataj.rows.length - 7; i < dataj.rows.length; i++) {
    // console.log(i);
    // DATE (reference)
    // console.log(dataj.rows[i].c[0].f);

    // STEPS
    // Add this row's "Steps" value to the dataSteps array as a value
    dataSteps.push(dataj.rows[i].c[1].v);

    // FLOORS CLIMBED
    // Add this row's "FloorsClimbed" value to the dataFloorsClimbed array as a value
    dataFloorsClimbed.push(dataj.rows[i].c[2].v);

    // CALORIES BURNED
    // Add this row's "CaloriesBurned" value to the dataCaloriesBurned array as a value
    dataCaloriesBurned.push(dataj.rows[i].c[3].v);

    // ELEVATION GAINED (feet)
    // Add this row's "ElevationGained" value to the dataElevationGained array as a value
    dataElevationGained.push(dataj.rows[i].c[4].v);

    // DISTANCE COVERED (miles)
    // Add this row's "DistanceCovered" value to the dataDistanceCovered array as a value
    dataDistanceCovered.push(dataj.rows[i].c[6].v);

    // MOVEMENT: SEDENTARY (minutes)
    // Add this row's "SedentaryMinutes" value to the dataMovementSedentary array as a value
    dataMovementSedentary.push(dataj.rows[i].c[8].v);

    // MOVEMENT: LIGHTLY ACTIVE (minutes)
    // Add this row's "LightlyActiveMinutes" value to the dataMovementLightlyActive array as a value
    dataMovementLightlyActive.push(dataj.rows[i].c[9].v);

    // MOVEMENT: FAIRLY ACTIVE (minutes)
    // Add this row's "FairlyActiveMinutes" value to the dataMovementFairlyActive array as a value
    dataMovementFairlyActive.push(dataj.rows[i].c[10].v);

    // MOVEMENT: VERY ACTIVE (minutes)
    // Add this row's "VeryActiveMinutes" value to the dataMovementVeryActive array as a value
    dataMovementVeryActive.push(dataj.rows[i].c[11].v);

    // MOVEMENT: TOTAL (minutes)
    // Get this row's "...ActiveMinutes" values (Sedentary, LightlyActive, FairlyActive and VeryActive)
    sedentaryToday = dataj.rows[i].c[8].v;
    lightlyActiveToday = dataj.rows[i].c[9].v;
    fairlyActiveToday = dataj.rows[i].c[10].v;
    veryActiveToday = dataj.rows[i].c[11].v;

    // Add this row's movement values together
    dataMovementSum =
      lightlyActiveToday + fairlyActiveToday + veryActiveToday;

    // Add total to the dataMovementAll array as a value
    dataMovementAll.push(dataMovementSum);
  }

  // Define values in our "datasets" array
  // Here we create & organize a dataset for use
  var steps = {
    label: "Steps",
    //   backgroundColor: colors[i],
    //   borderColor: colors[i],
    data: dataSteps,
    fill: {
      target: "origin",
      above: "#00B0B9",
    },
    backgroundColor: "#7BD6DA",
    borderColor: "#00B0B9",
    borderWidth: 0,
    pointHoverBorderWidth: 0,
    tension: 0.3,
    pointRadius: 9,
    pointHoverRadius: 12,
    pointHoverColor: "#FFFFFF",
    pointHoverBackgroundColor: "#EDFEFF",
  };
  datasets.push(steps);

  var floorsClimbed = {
    label: "Floors climbed",
    data: dataFloorsClimbed,
  };
  datasets.push(floorsClimbed);

  var caloriesBurned = {
    label: "Calories",
    data: dataCaloriesBurned,
  };
  datasets.push(caloriesBurned);

  var elevationGained = {
    label: "Elevation",
    data: dataElevationGained,
  };
  datasets.push(elevationGained);

  var distanceCovered = {
    label: "Distance",
    data: dataDistanceCovered,
  };
  datasets.push(distanceCovered);

  var movementSedentary = {
    label: "Idle",
    data: dataMovementSedentary,
    fill: {
      target: "origin",
      above: "#132959",
    },
    tension: 0.3,
    // CIRCULAR POINTS
    // Properties
    pointRadius: 10,
    pointHoverRadius: 14,
    // Fill
    backgroundColor: "#2D4781",
    pointHoverBackgroundColor: "#6D86BD",
    // Stroke
    borderColor: "#224C9E",
    borderWidth: 0,
    pointHoverBorderWidth: 0,
  };
  datasets.push(movementSedentary);

  var movementLightlyActive = {
    label: "Light movement (min.)",
    data: dataMovementLightlyActive,
    fill: {
      target: "origin",
      above: "#063128",
    },
    tension: 0.3,
    // CIRCULAR POINTS
    // Properties
    pointRadius: 10,
    pointHoverRadius: 14,
    // Fill
    backgroundColor: "#275A4F",
    pointHoverBackgroundColor: "#A6CCC4",
    // Stroke
    borderColor: "#C0E7DF",
    borderWidth: 0,
    pointHoverBorderWidth: 0,
  };
  datasets.push(movementLightlyActive);

  var movementFairlyActive = {
    label: "Fairly active (min.)",
    data: dataMovementFairlyActive,
    fill: {
      target: "origin",
      above: "#04231C",
    },
    tension: 0.3,
    // CIRCULAR POINTS
    // Properties
    pointRadius: 10,
    pointHoverRadius: 14,
    // Fill
    backgroundColor: "#24554B",
    pointHoverBackgroundColor: "#598C81",
    // Stroke
    borderColor: "#77C5C9",
    borderWidth: 0,
    pointHoverBorderWidth: 0,
  };
  datasets.push(movementFairlyActive);

  var movementVeryActive = {
    label: "Very active (min.)",
    data: dataMovementVeryActive,
    fill: {
      target: "origin",
      above: "#010C0A",
    },
    tension: 0.3,
    // CIRCULAR POINTS
    // Properties
    pointRadius: 10,
    pointHoverRadius: 14,
    // Fill
    backgroundColor: "#124339",
    pointHoverBackgroundColor: "#3F7E71",
    // Stroke
    borderColor: "#C0E7DF",
    borderWidth: 0,
    pointHoverBorderWidth: 0,
  };
  datasets.push(movementVeryActive);

  console.log(datasets);

  const movementDatasets = [];
  // movementDatasets.push(movementSedentary);
  movementDatasets.push(movementVeryActive);
  movementDatasets.push(movementFairlyActive);
  movementDatasets.push(movementLightlyActive);

  // Create a Chart.js chart object using the right dataset and labels
  // var canvas = document.getElementById("myChart");
  // var setup = {
  //   type: "line",
  //   data: {
  //     labels: labels,
  //     datasets: datasets,
  //   },
  //   options: {
  //     plugins: {
  //       title: {
  //         display: true,
  //         text: "All",
  //       },
  //     },
  //     responsive: true,
  //   },
  // };
  // chart = new Chart(canvas, setup);
  // *********** END OF SOURCED CODE (with modifications) ***********

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ CHARTS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // ~~~~~~~~~~~~~~~~ PLUGINS ~~~~~~~~~~~~~~~~
  // ______________ SOURCED CODE______________
  // The following code is for a plugin that creates a vertical line upon hover for Chart.js charts.
  // https://youtu.be/-6xqMLOi7Uc?feature=shared
  // *********** START OF SOURCED CODE ***********
  const verticalHoverLine = {
    id: "verticalHoverLine",
    beforeDatasetsDraw(chart, args, plugins) {
      const {
        ctx,
        chartArea: { top, bottom, height },
      } = chart;

      ctx.save();

      chart.getDatasetMeta(0).data.forEach((dataPoint, index) => {
        if (dataPoint.active === true) {
          ctx.beginPath();
          ctx.strokeStyle = "#ffffff20";
          ctx.lineWidth = "2";
          ctx.moveTo(dataPoint.x, top);
          ctx.lineTo(dataPoint.x, bottom);
          ctx.stroke();
        }
      });
    },
  };
  // *********** END OF SOURCED CODE ***********


  // ~~~~~~~~~~~~~~~~ TYPES OF MOVEMENT CHART ~~~~~~~~~~~~~~~~
  var movementChart = document.querySelector("#movementChart");
  chart = new Chart(movementChart, {
    type: "line",
    data: {
      labels: labels,
      datasets: movementDatasets,
    },
    options: {
      maintainAspectRatio: false,
      aspectRatio: 0.4,
      plugins: {
        legend: { display: false },
      },
      layout: {
        padding: 0,
      },

      scales: {
        x: { display: false },
        y: { display: false },
      },
      responsive: true,
    },
  });

  // ~~~~~~~~~~~~~~~~ IDLE CHART ~~~~~~~~~~~~~~~~
  const idleDataset = [];
  // movementDatasets.push(movementSedentary);
  idleDataset.push(movementSedentary);

  var idleChart = document.querySelector("#idleChart");
  chart = new Chart(idleChart, {
    type: "line",
    data: {
      labels: labels,
      datasets: idleDataset,
    },
    options: {
      plugins: {
        legend: { display: false },
      },
      scales: {
        x: { display: false },
        y: {
          display: false,
          // reverse: true,
        },
      },
      responsive: true,
    },
  });

  // ~~~~~~~~~~~~~~~~ STEPS CHART ~~~~~~~~~~~~~~~~
  const stepsTotalDatasets = [];
  stepsTotalDatasets.push(steps);

  var totalStepsChart = document.querySelector("#totalStepsChart");
  chart = new Chart(totalStepsChart, {
    type: "line",
    data: {
      labels: labels,
      datasets: stepsTotalDatasets,
    },
    options: {
      plugins: {
        filler: { propagate: false },
        legend: { display: false },
        title: { display: true },
        subtitle: { display: false },
      },
      interaction: { intersect: false },
      // animation: false,
      scales: {
        x: { display: false },
        y: {
          display: true,
          border: {
            display: false,
            color: "#376057",
          },
          ticks: {
            color: "#ffffff50",

            font: {
              family: "proxima-nova",
              size: 16,
              weight: "400",
            },
          },
          stacked: true,
          beginAtZero: true,
          grid: {
            display: false,
          },
        },
      },
      responsive: true,
    },
    // plugins: [verticalHoverLine],
  });

  var movementTotal = {
    label: "Movement (min.)",
    data: dataMovementAll,
    borderWidth: 1,
    fill: {
      target: "origin",
      above: "#B9A4F0",
    },
    backgroundColor: "#B9A4F0",
    borderColor: "#DDD0FF",
    borderWidth: 0,
    // tension: 0.3,
    // pointRadius: 0,
  };

  const movementTotalDatasets = [];
  movementTotalDatasets.push(movementTotal);

  // ~~~~~~~~~~~~~~~~ WEEKLY REPORT ~~~~~~~~~~~~~~~~
  // ~~~~~~~~~~ STEPS ~~~~~~~~~~
  var reportStepsChart = document.querySelector("#reportStepsChart");
  chart = new Chart(reportStepsChart, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Steps",
          // backgroundColor: colors[i],
          borderColor: "red",
          data: dataSteps,
          fill: {
            target: "origin",
            above: "#00B0B9",
          },
          backgroundColor: "#7BD6DA",
          borderColor: "#000",
          borderWidth: 4,
          pointHoverBorderWidth: 4,
          tension: 0.3,
          pointRadius: 9,
          pointHoverRadius: 12,
          pointHoverColor: "#FFFFFF",
          pointHoverBackgroundColor: "#EDFEFF",
        },
      ],
    },
    options: {
      maintainAspectRatio: true,
      aspectRatio: 5 / 3,

      plugins: {
        filler: { propagate: false },
        legend: { display: false },
        title: {
          display: true,
          text: "Steps",
          color: "#ececec",
          align: "start",
          padding: 40,
          font: {
            family: "Readex Pro",
            size: 32,
            weight: "400",
          },
        },
        subtitle: { display: false },
      },
      interaction: { intersect: false },
      // animation: false,
      scales: {
        x: {
          display: true,
          border: {
            display: true,
            width: 2,
            color: "#ffffff20",
          },
          grid: { display: false },
          ticks: { display: false },
        },
        y: {
          display: true,
          border: {
            display: false,
          },
          ticks: {
            color: "#ffffff50",
            font: {
              family: "proxima-nova",
              size: 16,
              weight: "400",
            },
          },
          stacked: true,
          beginAtZero: true,
          grid: {
            display: false,
          },
        },
      },
      responsive: true,
    },
    plugins: [verticalHoverLine],
  });

  // ~~~~~~~~~~ MOVEMENT ~~~~~~~~~~
  var reportMovementChart = document.querySelector("#reportMovementChart");
  chart = new Chart(reportMovementChart, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Very active (min.)",
          data: dataMovementVeryActive,
          fill: {
            target: "origin",
            above: "#0E3F42",
          },
          tension: 0.3,
          // CIRCULAR POINTS
          // Properties
          pointRadius: 0,
          pointHoverRadius: 10,
          // Fill
          backgroundColor: "#7BD6DA",
          pointHoverBackgroundColor: "#EDFEFF",
          // Stroke
          borderColor: "#000000",
          borderWidth: 4,
          pointHoverBorderWidth: 4,
        },
        {
          label: "Fairly active (min.)",
          data: dataMovementFairlyActive,
          fill: {
            target: "origin",
            above: "#177F84",
          },
          tension: 0.3,
          // CIRCULAR POINTS
          // Properties
          pointRadius: 0,
          pointHoverRadius: 10,
          // Fill
          backgroundColor: "#7BD6DA",
          pointHoverBackgroundColor: "#EDFEFF",
          // Stroke
          borderColor: "#000000",
          borderWidth: 4,
          pointHoverBorderWidth: 4,
        },
        {
          label: "Lightly active (min.)",
          data: dataMovementLightlyActive,
          fill: {
            target: "origin",
            above: "#00B0B9",
          },
          tension: 0.3,
          // CIRCULAR POINTS
          // Properties
          pointRadius: 0,
          pointHoverRadius: 10,
          // Fill
          backgroundColor: "#7BD6DA",
          pointHoverBackgroundColor: "#EDFEFF",
          // Stroke
          borderColor: "#000000",
          borderWidth: 4,
          pointHoverBorderWidth: 4,
        },
      ],
    },
    options: {
      maintainAspectRatio: true,
      aspectRatio: 5 / 3,

      plugins: {
        filler: { propagate: false },
        legend: {
          display: true,
          // position: "top",
          align: "end",
          position: "top",
          reverse: true,
          labels: {
            color: "#ececec",
            font: {
              family: "proxima-nova",
              size: 16,
              weight: "400",
            },
          },
        },
        title: {
          display: true,
          text: "Movement",
          color: "#ececec",
          align: "start",
          padding: 40,
          font: {
            family: "Readex Pro",
            size: 32,
            weight: "400",
          },
        },
        subtitle: { display: false },
      },
      interaction: { intersect: false },
      // animation: false,
      scales: {
        x: {
          display: true,
          border: {
            display: true,
            width: 2,
            color: "#ffffff20",
          },
          grid: { display: false },
          ticks: { display: false },
        },
        y: {
          display: true,
          border: {
            display: false,
          },
          ticks: {
            color: "#ffffff50",
            font: {
              family: "proxima-nova",
              size: 16,
              weight: "400",
            },
          },
          stacked: true,
          beginAtZero: true,
          grid: {
            display: false,
          },
        },
      },
      responsive: true,
    },
    plugins: [verticalHoverLine],
  });

  console.log(dataFloorsClimbed);
  // ~~~~~~~~~~ FLOORS CLIMBED ~~~~~~~~~~
  var reportFloorsChart = document.querySelector("#reportFloorsChart");
  chart = new Chart(reportFloorsChart, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Floors climbed",
          // backgroundColor: colors[i],
          borderColor: "red",
          data: dataFloorsClimbed,
          backgroundColor: "#00B0B9",
          borderColor: "#000",
          borderWidth: 4,
          hoverBackgroundColor: "#AEFBFF",
        },
      ],
    },
    options: {
      maintainAspectRatio: true,
      aspectRatio: 4 / 3,

      plugins: {
        filler: { propagate: false },
        legend: { display: false },
        title: {
          display: true,
          text: "Floors climbed",
          color: "#ececec",
          align: "start",
          padding: 40,
          font: {
            family: "Readex Pro",
            size: 32,
            weight: "400",
          },
        },
        subtitle: { display: false },
      },
      interaction: { intersect: false },
      // animation: false,
      scales: {
        x: {
          display: true,
          border: {
            display: true,
            width: 2,
            color: "#ffffff20",
          },
          grid: { display: false },
          ticks: { display: false },
        },
        y: {
          display: true,
          border: {
            display: false,
          },
          ticks: {
            color: "#ffffff50",
            font: {
              family: "proxima-nova",
              size: 16,
              weight: "400",
            },
          },
          stacked: true,
          beginAtZero: true,
          grid: {
            display: false,
          },
        },
      },
      responsive: true,
    },
    // plugins: [verticalHoverLine],
  });

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ DYNAMIC WEB TEXT ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // ~~~~~~~~~~~~~~~~ AVERAGES ~~~~~~~~~~~~~~~~
  // STEPS
  var stepsAverage = document.querySelector("#stepsAverage");
  var dataStepsTotal = 0;
  for (i = 0; i < dataSteps.length; i++) {
    // Calculate the total # of steps
    dataStepsTotal += dataSteps[i];
  }
  // Divide the total # of steps by the number of step entries recorded, round to nearest tenth
  var dataStepsAverage = Math.round(dataStepsTotal / dataSteps.length);
  // ______________ SOURCED CODE______________
  // The following code formats adds commas as thousands separators.
  // https://stackoverflow.com/questions/2901102/how-to-format-a-number-with-commas-as-thousands-separators
  // *********** START OF SOURCED CODE ***********
  var dataStepsAverageWithSeparators = dataStepsAverage
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  // *********** END OF SOURCED CODE ***********
  stepsAverage.textContent = dataStepsAverageWithSeparators;

  // ACTIVE MOVEMENT
  var activeAverage = document.querySelector("#activeAverage");
  var dataActiveTotal = 0;
  for (i = 0; i < movementTotalDatasets[0].data.length; i++) {
    dataActiveTotal += movementTotalDatasets[0].data[i];
  }
  // var dataActiveAverage = Math.round(dataActiveTotal / movementTotalDatasets[0].data.length);
  var dataActiveWithSeparators = dataActiveTotal
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  activeAverage.textContent = dataActiveWithSeparators;

  // IDLE MOVEMENT
  var idleAverage = document.querySelector("#idleAverage");
  var dataIdleTotal = 0;
  // console.log(idleDataset);
  for (i = 0; i < idleDataset[0].data.length; i++) {
    dataIdleTotal += idleDataset[0].data[i];
  }
  var dataIdleAverage = Math.round(dataIdleTotal / idleDataset[0].data.length);
  var dataIdleWithSeparators = dataIdleTotal
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  idleAverage.textContent = dataIdleWithSeparators;
  document.querySelector("#idleAverage2").textContent = dataIdleWithSeparators;

  // CALORIES
  var activeCalories = document.querySelector("#activeCalories");
  var dataCaloriesTotal = 0;
  for (i = 0; i < datasets[2].data.length; i++) {
    dataCaloriesTotal += datasets[2].data[i];
  }
  var dataCaloriesAverage = Math.round(
    dataCaloriesTotal / datasets[2].data.length
  );
  var dataCaloriesWithSeparators = dataCaloriesAverage
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  activeCalories.textContent = dataCaloriesWithSeparators;

  // FACT
  // var dataStepsFactLink =
  //   "http://numbersapi.com/" + dataStepsAverage + "/year?write&fragment";
  var stepsFact = document.querySelector("#stepsFact");
  // ______________ SOURCED CODE______________
  // The following code gets a response from Rapid's Numbers API.
  // https://rapidapi.com/divad12/api/numbers-1/playground/53aa3b60e4b0a9b1348d9a77
  // *********** START OF SOURCED CODE ***********
  async function getData() {
    const dataStepsFactLink =
      "https://numbersapi.p.rapidapi.com/" + dataStepsAverage + "/math";

    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "ba5cf57d99mshd7fedf73b2c0c0dp19bce6jsn24bf21146fcf",
        "x-rapidapi-host": "numbersapi.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(dataStepsFactLink, options);
      const result = await response.text();
      console.log(result);
      if (
        result.includes("missing a fact") ||
        result.includes("boring") ||
        result.includes("unremarkable") ||
        result.includes("uninteresting")
      ) {
        stepsFact.textContent = "";
      } else {
        stepsFact.textContent = result
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
    } catch (error) {
      console.error(error);
    }
  }
  // *********** END OF SOURCED CODE ***********
  // getData();

  // ~~~~~~~~~~~~~~~~ WORD CLOUD ~~~~~~~~~~~~~~~~
  // ~~~~~~~~~~ FLOORS CLIMBED (rows 1,3 | tag #1) ~~~~~~~~~~
  var floorsClimbedTotal = 0;
  for (i = 0; i < datasets[1].data.length; i++) {
    floorsClimbedTotal += datasets[1].data[i];
  }
  var floorsAverage = Math.round(floorsClimbedTotal / datasets[1].data.length);
  console.log(floorsAverage);

  [...document.querySelectorAll(".wordFloors")].forEach(function (tag) {
    // 0 - 5 floors climed
    if (floorsAverage <= 5) {
      tag.textContent = "lazy ahh";
    }

    // 6 - 9 floors climbed
    else if (floorsAverage >= 6 && floorsAverage <= 9) {
      let array = ["home dweller", "bare minimum"];
      tag.textContent = array[Math.floor(Math.random() * array.length)];
    }

    // 10 - 19 floors climbed
    else if (floorsAverage >= 10 && floorsAverage <= 19) {
      let array = ["typical commuter", "i only take the stairs"];
      tag.textContent = array[Math.floor(Math.random() * array.length)];
    }

    // 20 - 54 floors climbed
    else if (floorsAverage >= 20 && floorsAverage <= 54) {
      tag.textContent = "casual hiker";
    }

    // 55 - 99 floors climbed
    else if (floorsAverage >= 55 && floorsAverage <= 99) {
      tag.textContent = "dayhike";
    }

    // 100+ floors climbed
    else {
      tag.textContent = "mic drop";
    }
  });

  // ~~~~~~~~~~ TBA (rows 1,3 | tag #2) ~~~~~~~~~~

  // ~~~~~~~~~~ SEDENTARY MINUTES (rows 1,3 | tag #3) ~~~~~~~~~~
  [...document.querySelectorAll(".wordSedentary")].forEach(function (tag) {
    // 0 - 299 idle minutes
    if (dataIdleAverage <= 299) {
      tag.textContent = "business man";
    }

    // 300 - 599 idle minutes
    else if (dataIdleAverage >= 300 && dataIdleAverage <= 599) {
      tag.textContent = "walking heals me";
    }

    // 600 - 999 idle minutes
    else if (dataIdleAverage >= 600 && dataIdleAverage <= 999) {
      tag.textContent = "womp womp";
    }

    // 1000+ idle minutes
    else {
      tag.textContent = "sloth fr";
    }
  });

  // ~~~~~~~~~~ STEPS (rows 1,3 | tag #4) ~~~~~~~~~~
  [...document.querySelectorAll(".wordSteps")].forEach(function (tag) {
    // 0 - 999 steps
    if (dataStepsAverage <= 999) {
      tag.textContent = "couch potato";
    }

    // 1,000 - 2,999 steps
    else if (dataStepsAverage >= 1000 && dataStepsAverage <= 2999) {
      tag.textContent = "touching grass briefly";
    }

    // 3,000 - 4,999 steps
    else if (dataStepsAverage >= 3000 && dataStepsAverage <= 4999) {
      tag.textContent = "okay helloo fitness";
    }

    // 5,000 - 6,999 steps
    else if (dataStepsAverage >= 5000 && dataStepsAverage <= 6999) {
      let array = ["stroll in the park", "afternoon stroll"];
      tag.textContent = array[Math.floor(Math.random() * array.length)];
    }

    // 7,000 - 9,999 steps
    else if (dataStepsAverage >= 7000 && dataStepsAverage <= 9999) {
      tag.textContent = "happy calves";
    }

    // 10,000+ steps
    else {
      let array = ["okay health influencer", "where do u be going???"];
      tag.textContent = array[Math.floor(Math.random() * array.length)];
    }
    // console.log(tag.textContent);
  });

  // ~~~~~~~~~~ TBA (rows 1,3 | tag #5) ~~~~~~~~~~
  //   var LightlyActiveTotal = 0;
  //   for (i = 0; i < datasets[1].data.length; i++) {
  //     LightlyActiveTotal += datasets[1].data[i];
  //   }
  //   console.log(datasets[1]);
  //   var lightlyAverage = Math.round(LightlyActiveTotal / datasets[1].data.length);
  //   console.log(floorsAverage);

  //   [...document.querySelectorAll('.wordLightly')].forEach(function(tag) {
  //   });

  // ~~~~~~~~~~ TBA (rows 2,4 | tag #1) ~~~~~~~~~~
  //   var LightlyActiveTotal = 0;
  //   for (i = 0; i < datasets[1].data.length; i++) {
  //     LightlyActiveTotal += datasets[1].data[i];
  //   }
  //   console.log(datasets[1]);
  //   var lightlyAverage = Math.round(LightlyActiveTotal / datasets[1].data.length);
  //   console.log(floorsAverage);

  //   [...document.querySelectorAll('.wordLightly')].forEach(function(tag) {
  //   });

  // ~~~~~~~~~~ VERY ACTIVE MINUTES (rows 2,4 | tag #2) ~~~~~~~~~~
  var VeryActiveTotal = 0;
  for (i = 0; i < datasets[8].data.length; i++) {
    VeryActiveTotal += datasets[8].data[i];
  }
  var veryAverage = Math.round(VeryActiveTotal / datasets[8].data.length);
  console.log(veryAverage);

  [...document.querySelectorAll(".wordVery")].forEach(function (tag) {
    // 0 - 49 lightly active minutes
    if (veryAverage <= 49) {
      let array = ["what is exercise anyway", "#npc_behaviour", "what's a gym", "chronic walker", "non-athlete"];
      tag.textContent = array[Math.floor(Math.random() * array.length)];
    }

    // 50 - 199 lightly active minutes
    else if (veryAverage >= 50 && veryAverage <= 199) {
      tag.textContent = "gym bro";
    }

    // 200 - 399 lightly active minutes
    else if (veryAverage >= 200 && veryAverage <= 399) {
      tag.textContent = "a-train from the boys";
    }

    // 400+ lightly active minutes
    else {
      tag.textContent = "marathon runner";
    }
  });

  // ~~~~~~~~~~ CALORIES BURNED (rows 2,4 | tag #3) ~~~~~~~~~~
  var caloriesAverage = Math.round(dataCaloriesTotal / datasets[8].data.length);
  console.log(dataCaloriesTotal);
  console.log(caloriesAverage);

  [...document.querySelectorAll(".wordCalories")].forEach(function (tag) {
    // 0 - 999 calories burned
    if (caloriesAverage <= 999) {
      tag.textContent = "what is exercise anyway";
    }

    // 1000 - 1999 calories burned
    else if (caloriesAverage >= 1000 && caloriesAverage <= 1999) {
      tag.textContent = "in n' out";
    }

    // 2000 - 2999 calories burned
    else if (caloriesAverage >= 2000 && caloriesAverage <= 2999) {
      tag.textContent = "that one distance game from alice in borderland";
    }

    // 3000+ calories burned
    else {
      tag.textContent = "the fitness grind don't stop";
    }
  });

  // ~~~~~~~~~~ LIGHTLY ACTIVE MINUTES (rows 2,4 | tag #4) ~~~~~~~~~~
  var LightlyActiveTotal = 0;
  for (i = 0; i < datasets[6].data.length; i++) {
    LightlyActiveTotal += datasets[6].data[i];
  }
  var lightlyAverage = Math.round(LightlyActiveTotal / datasets[6].data.length);
  console.log(floorsAverage);

  [...document.querySelectorAll(".wordLightly")].forEach(function (tag) {
    // 0 - 49 lightly active minutes
    if (lightlyAverage <= 49) {
      tag.textContent = "all or nothing";
    }

    // 50 - 299 lightly active minutes
    else if (lightlyAverage >= 50 && lightlyAverage <= 299) {
      tag.textContent = "casual runner";
    }

    // 300 - 599 lightly active minutes
    else if (lightlyAverage >= 300 && lightlyAverage <= 599) {
      tag.textContent = "runway strut";
    }

    // 600+ lightly active minutes
    else {
      tag.textContent = "24/7 deset hiker";
    }
  });

  // ~~~~~~~~~~ FAIRLY ACTIVE MINUTES (rows 2,4 | tag #5) ~~~~~~~~~~
  var FairlyActiveTotal = 0;
  for (i = 0; i < datasets[7].data.length; i++) {
    FairlyActiveTotal += datasets[7].data[i];
  }
  var fairlyAverage = Math.round(FairlyActiveTotal / datasets[7].data.length);
  
  [...document.querySelectorAll('.wordFairly')].forEach(function (tag) {
    // 0 - 49 fairly active minutes
    if (fairlyAverage <= 49) {
      tag.textContent = "home exercise";
    }

    // 50 - 299 fairly active minutes
    else if (fairlyAverage >= 50 && fairlyAverage <= 299) {
      tag.textContent = "crunch time";
    }

    // 300 - 599 fairly active minutes
    else if (fairlyAverage >= 300 && fairlyAverage <= 599) {
      tag.textContent = "pro athlete";
    }

    // 600+ lightly active minutes
    else {
      tag.textContent = "superman fr";
    }
  });

  // ~~~~~~~~~~~~~~~~ REPORT ~~~~~~~~~~~~~~~~
  document.querySelector("#reportCals").textContent = datasets[2].data[6];
  document.querySelector("#reportDistance").textContent = Math.round(datasets[4].data[6]);
  document.querySelector("#reportExercise").textContent = dataMovementAll[6];
  document.querySelector("#reportIdle").textContent = sedentaryToday;

  // Get month and day number of start date
  let tagDateStart = labels[0].substring(0, labels[0].length - 6);
  // Get day number of end date
  let tagDateEnd = labels[6].slice(0, labels[0].length - 6).slice(-2);
  document.querySelector('#weekOf').textContent = tagDateStart + " - " + tagDateEnd;
}





// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ ANIMATIONS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function scrollAnimation() {
  // const scrollPosition = window.scrollY;

  // ~~~~~~~~~~~~~~~~ EMPHASIS UNDERLINES ~~~~~~~~~~~~~~~~
  // ______________ REFERENCED CODE ______________
  // The code from the following link was referenced to create scroll animations.
  // https://css-tricks.com/books/greatest-css-tricks/scroll-animation/

  // ~~~~~~~~~~ STEPS ~~~~~~~~~~
  // Get current scroll values relative to the section
  var sectionStepsPos = document
    .querySelector("#sectionSteps")
    .getBoundingClientRect();
  // UNDERLINE
  // Set the animation start & end time relative to section's scroll position
  document.body.style.setProperty(
    // Variable name
    "--scrollSteps",
    // (start animation height (relative scroll height value) / total section length)
    ((sectionStepsPos.top - sectionStepsPos.height * 0.4) * -1) /
    (sectionStepsPos.height / 3)
  );

  // IMAGE
  document.body.style.setProperty(
    "--stepsImage",
    ((sectionStepsPos.top - sectionStepsPos.height * 0.2) * -1) /
    (sectionStepsPos.height / 2)
  );

  // CHART
  document.body.style.setProperty(
    "--scrollStepsChart",
    ((sectionStepsPos.top + sectionStepsPos.height * 0.1) * -1) /
    (sectionStepsPos.height / 3)
  );

  // ~~~~~~~~~~ WATCH ~~~~~~~~~~
  var sectionWatchPos = document
    .querySelector("#sectionWatch")
    .getBoundingClientRect();

  // IMAGE
  document.body.style.setProperty(
    "--watchImage",
    ((sectionWatchPos.top - sectionWatchPos.height * 0.25) * -1) /
    (sectionWatchPos.height / 4)
  );

  // UNDERLINE
  document.body.style.setProperty(
    "--scrollWatch",
    ((sectionWatchPos.top - sectionWatchPos.height * 0.4) * -1) /
    (sectionWatchPos.height / 3)
  );

  // ~~~~~~~~~~ MOVEMENT ~~~~~~~~~~
  var sectionRunPos = document
    .querySelector("#sectionRun")
    .getBoundingClientRect();

  // IMAGE
  document.body.style.setProperty(
    "--runText",
    ((sectionRunPos.top - sectionRunPos.height * 0.35) * -1) /
    (sectionRunPos.height / 2)
  );

  // UNDERLINE
  document.body.style.setProperty(
    "--scrollMovement",
    ((sectionRunPos.top - sectionRunPos.height * 0.4) * -1) /
    (sectionRunPos.height / 3)
  );

  // ~~~~~~~~~~ IDLE ~~~~~~~~~~
  var sectionIdlePos = document
    .querySelector("#sectionIdle")
    .getBoundingClientRect();

  // IMAGE
  document.body.style.setProperty(
    "--idleImage",
    ((sectionIdlePos.top - sectionIdlePos.height * 0.85) * -1) /
    (sectionIdlePos.height / 1.4)
  );
}
