// Function menu bar & feedback
const menuMini = document.querySelector('.menu-mini');
const menuList = document.querySelector('.nav-links');
menuMini.addEventListener("click", function () {
    menuMini.classList.toggle('change');
});

menuMini.addEventListener('click', function(){
    menuList.classList.toggle('hidden');
});

const clsFeedback = document.getElementById('close-feedback');
const feedback = document.querySelector('.feedback');
const overlayFeedback = document.querySelector('.overlay-feedback');
const opnFeedback = document.getElementById('open-feedback')

clsFeedback.addEventListener('click', function(){
    feedback.style.display = 'none';
    overlayFeedback.style.display = 'none';
});

opnFeedback.addEventListener('click', function(){
    feedback.style.display = 'block';
    overlayFeedback.style.display = 'block';
});

//                        //
// PIE CHART MULAI DISNI //
//                      //

document.addEventListener("DOMContentLoaded", (event) => {
    let doughnutChart; // Declare a variable to hold the chart instance
  
    // Function to fetch data from JSON file
    async function fetchData() {
      try {
        const response = await fetch("All data.json");
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("There has been a problem with your fetch operation:", error);
      }
    }
  
    // Function to filter data based on location
    function filterData(data, location) {
      return data.filter((item) => {
        return location === item.Location || location === "";
      });
    }
  
    // Function to get filter values and process data
    async function processFilters() {
      // Get selected value from the location filter
      const location = document.querySelector("#location select").value;
  
      // Display selected value in console
      console.log("Selected Location:", location);
  
      // Fetch data from JSON file
      const data = await fetchData();
  
      // Filter data based on selected value
      const filteredData = filterData(data, location);
  
      // Update doughnut chart with filtered data
      updateDoughnutChart(filteredData);
    }
  
    // Function to create doughnut chart
    function createDoughnutChart(labels, data) {
      const ctx = document.getElementById('pieChart').getContext('2d');
      doughnutChart = new Chart(ctx, {
        type: 'doughnut', // Chart type
        data: {
          labels: labels,
          datasets: [{
            label: 'Pendapatan',
            data: data,
            backgroundColor: [ // Background color for each chart segment
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [ // Border color for each chart segment
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'right', // Legend position
            }
          }
        }
      });
    }
  
    // Function to update doughnut chart with filtered data
    function updateDoughnutChart(filteredData) {
      const totals = filteredData.reduce((acc, item) => {
        const location = item.Location;
        const lineTotal = parseFloat(item.LineTotal); // Convert LineTotal to float
  
        if (!acc[location]) {
          acc[location] = 0;
        }
        acc[location] += lineTotal; // Sum revenue per location
        return acc;
      }, {});
  
      // Separate labels and data for chart
      const labels = Object.keys(totals);
      const chartData = Object.values(totals);
  
      // Update chart data
      doughnutChart.data.labels = labels;
      doughnutChart.data.datasets[0].data = chartData;
      doughnutChart.update();
    }
  
    // Fetch initial data and create the doughnut chart
    fetch('All data.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // Calculate initial total revenue per location
        const totals = data.reduce((acc, item) => {
          const location = item.Location;
          const lineTotal = parseFloat(item.LineTotal); // Convert LineTotal to float
  
          if (!acc[location]) {
            acc[location] = 0;
          }
          acc[location] += lineTotal; // Sum revenue per location
          return acc;
        }, {});
  
        // Separate labels and data for chart
        const labels = Object.keys(totals);
        const chartData = Object.values(totals);
  
        // Create doughnut chart with initial data
        createDoughnutChart(labels, chartData);
      })
      .catch((error) => console.error('Error fetching JSON data:', error));
  
    // Event listener for the submit button
    document.querySelector(".button button").addEventListener("click", (event) => {
      event.preventDefault();
      processFilters();
    });
  });
  //                                  //
  //  LINE CHART                        //
  // TOTAL PENDAPATAN SETAHUN DISINI//
  //                               //

  document.addEventListener("DOMContentLoaded", (event) => {
    let lineChart; // Declare a variable to hold the chart instance
  
    // Function to fetch data from JSON file
    async function fetchData() {
      try {
        const response = await fetch("All data.json");
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("There has been a problem with your fetch operation:", error);
      }
    }
  
    // Function to filter data based on location
    function filterData(data, location) {
      return data.filter((item) => {
        return location === item.Location || location === "";
      });
    }
  
    // Function to get filter values and process data
    async function processFilters() {
      // Get selected value from the location filter
      const location = document.querySelector("#location select").value;
  
      // Display selected value in console
      console.log("Selected Location:", location);
  
      // Fetch data from JSON file
      const data = await fetchData();
  
      // Filter data based on selected value
      const filteredData = filterData(data, location);
  
      // Update line chart with filtered data
      updateLineChart(filteredData);
    }
  
    // Function to create line chart
    function createLineChart(labels, revenueData) {
      const ctx = document.getElementById('lineChart').getContext('2d');
      lineChart = new Chart(ctx, {
        type: 'line', // Chart type
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Revenue Setahun',
              data: revenueData,
              backgroundColor: 'rgba(75, 192, 192, 0.2)', // Background color for revenue
              borderColor: 'rgba(75, 192, 192, 1)', // Border color for revenue
              borderWidth: 1,
              yAxisID: 'y', // Y-axis for revenue
            }
          ]
        },
        options: {
          responsive: true,
          scales: {
            x: {
              beginAtZero: true, // Start x-axis from 0
            },
            y: {
              beginAtZero: true, // Start y-axis from 0
              type: 'linear',
              position: 'left', // Position y-axis on the left
              ticks: {
                callback: function(value) {
                  return `$${value.toFixed(2)}`; // Format ticks with $ and 2 decimals
                }
              },
              title: {
                display: true,
                text: 'Revenue', // Y-axis title
              },
            }
          },
          plugins: {
            tooltip: {
              callbacks: {
                label: function(context) {
                  let label = context.dataset.label || '';
                  if (context.datasetIndex === 0) {
                    label += `: $${context.raw.toFixed(2)}`; // Format tooltip for revenue
                  }
                  return label;
                }
              }
            }
          }
        }
      });
    }
  
    // Function to update line chart with filtered data
    function updateLineChart(filteredData) {
      const monthlyTotals = filteredData.reduce((acc, item) => {
        const date = new Date(item.TransDate);
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const monthYear = `${year}-${month < 10 ? '0' + month : month}`; // Format YYYY-MM
  
        const lineTotal = parseFloat(item.LineTotal); // Convert LineTotal to float
  
        if (!acc[monthYear]) {
          acc[monthYear] = { revenue: 0 };
        }
        acc[monthYear].revenue += lineTotal; // Sum monthly revenue
        return acc;
      }, {});
  
      // Separate labels and data for chart and sort by date
      const labels = Object.keys(monthlyTotals).sort((a, b) => new Date(a) - new Date(b));
      const revenueData = labels.map((label) => monthlyTotals[label].revenue);
  
      // Update chart data
      lineChart.data.labels = labels;
      lineChart.data.datasets[0].data = revenueData;
      lineChart.update();
    }
  
    // Fetch initial data and create the line chart
    fetchData()
      .then((data) => {
        // Calculate initial total revenue and quantity sold per month
        const monthlyTotals = data.reduce((acc, item) => {
          const date = new Date(item.TransDate);
          const month = date.getMonth() + 1;
          const year = date.getFullYear();
          const monthYear = `${year}-${month < 10 ? '0' + month : month}`; // Format YYYY-MM
  
          const lineTotal = parseFloat(item.LineTotal); // Convert LineTotal to float
  
          if (!acc[monthYear]) {
            acc[monthYear] = { revenue: 0 };
          }
          acc[monthYear].revenue += lineTotal; // Sum monthly revenue
          return acc;
        }, {});
  
        // Separate labels and data for chart and sort by date
        const labels = Object.keys(monthlyTotals).sort((a, b) => new Date(a) - new Date(b));
        const revenueData = labels.map((label) => monthlyTotals[label].revenue);
  
        // Create line chart with initial data
        createLineChart(labels, revenueData);
      })
      .catch((error) => console.error('Error fetching JSON data:', error));
  
    // Event listener for the submit button
    document.querySelector(".button button").addEventListener("click", (event) => {
      event.preventDefault();
      processFilters();
    });
  });
  
// PRODUK DENGAN PENJUALAN TERTINGGI //
//BAR CHART1//
//          //
document.addEventListener("DOMContentLoaded", (event) => {
  let barChart; // Declare a variable to hold the chart instance

  // Function to fetch data from JSON file
  async function fetchData() {
      try {
          const response = await fetch("All data.json");
          if (!response.ok) {
              throw new Error("Network response was not ok " + response.statusText);
          }
          const data = await response.json();
          return data;
      } catch (error) {
          console.error("There has been a problem with your fetch operation:", error);
      }
  }

  // Function to filter data based on location
  function filterData(data, location) {
      return data.filter((item) => {
          return location === item.Location || location === "";
      });
  }

  // Function to get filter values and process data
  async function processFilters() {
      // Get selected value from the location filter
      const location = document.querySelector("#location select").value;

      // Display selected value in console
      console.log("Selected Location:", location);

      // Fetch data from JSON file
      const data = await fetchData();

      // Filter data based on selected value
      const filteredData = filterData(data, location);

      // Update bar chart with filtered data
      updateBarChart(filteredData);
  }

  // Function to create bar chart
  function createBarChart(labels, quantityData) {
      const ctx = document.getElementById('barchart1').getContext('2d');
      barChart = new Chart(ctx, {
          type: 'bar',
          data: {
              labels: labels,
              datasets: [
                  {
                      label: 'Total Products Sold',
                      data: quantityData,
                      backgroundColor: 'rgba(255, 99, 132, 0.5)',
                      borderColor: 'rgba(255, 99, 132, 1)',
                      borderWidth: 1
                  }
              ]
          },
          options: {
              indexAxis: 'y', // Change index axis to horizontal
              responsive: true,
              scales: {
                  x: {
                      beginAtZero: true,
                      stacked: true,
                      ticks: {
                          callback: function (value) {
                              return `${value}`;
                          }
                      }
                  },
                  y: {
                      stacked: true,
                      beginAtZero: true
                  }
              },
              plugins: {
                  tooltip: {
                      callbacks: {
                          label: function (context) {
                              let label = context.dataset.label || '';
                              label += `: ${context.raw}`;
                              return label;
                          }
                      }
                  }
              }
          }
      });
  }

  // Function to update bar chart with filtered data
  function updateBarChart(filteredData) {
      const productTotals = filteredData.reduce((acc, item) => {
          const product = item.Product;
          const quantity = parseInt(item.RQty);

          if (!acc[product]) {
              acc[product] = { quantity: 0 };
          }
          acc[product].quantity += quantity;

          return acc;
      }, {});

      // Sort products by total sold quantity and select top 10
      const sortedProducts = Object.keys(productTotals)
          .map(product => ({ product, ...productTotals[product] }))
          .sort((a, b) => b.quantity - a.quantity)
          .slice(0, 10);

      const labels = sortedProducts.map(item => item.product);
      const quantityData = sortedProducts.map(item => item.quantity);

      // Update chart data
      barChart.data.labels = labels;
      barChart.data.datasets[0].data = quantityData;
      barChart.update();
  }

  // Fetch initial data and create the bar chart
  fetchData()
      .then((data) => {
          // Calculate initial total products sold
          const productTotals = data.reduce((acc, item) => {
              const product = item.Product;
              const quantity = parseInt(item.RQty);

              if (!acc[product]) {
                  acc[product] = { quantity: 0 };
              }
              acc[product].quantity += quantity;

              return acc;
          }, {});

          // Sort products by total sold quantity and select top 10
          const sortedProducts = Object.keys(productTotals)
              .map(product => ({ product, ...productTotals[product] }))
              .sort((a, b) => b.quantity - a.quantity)
              .slice(0, 10);

          const labels = sortedProducts.map(item => item.product);
          const quantityData = sortedProducts.map(item => item.quantity);

          // Create bar chart with initial data
          createBarChart(labels, quantityData);
      })
      .catch((error) => console.error('Error fetching JSON data:', error));

  // Event listener for the submit button
  document.querySelector(".button button").addEventListener("click", (event) => {
      event.preventDefault();
      processFilters();
  });
});
//                            //
//    TOTAL KEUNTUNGAN PRODUK //
//                            //
document.addEventListener("DOMContentLoaded", (event) => {
  let barChart; // Declare a variable to hold the chart instance

  // Function to fetch data from JSON file
  async function fetchData() {
      try {
          const response = await fetch("All data.json");
          if (!response.ok) {
              throw new Error("Network response was not ok " + response.statusText);
          }
          const data = await response.json();
          return data;
      } catch (error) {
          console.error("There has been a problem with your fetch operation:", error);
      }
  }

  // Function to filter data based on location
  function filterData(data, location) {
      return data.filter((item) => {
          return location === item.Location || location === "";
      });
  }

  // Function to get filter values and process data
  async function processFilters() {
      // Get selected value from the location filter
      const location = document.querySelector("#location select").value;

      // Display selected value in console
      console.log("Selected Location:", location);

      // Fetch data from JSON file
      const data = await fetchData();

      // Filter data based on selected value
      const filteredData = filterData(data, location);

      // Update bar chart with filtered data
      updateBarChart(filteredData);
  }

  // Function to create bar chart
  function createBarChart(labels, revenueData) {
      const ctx = document.getElementById('barchart2').getContext('2d');
      barChart = new Chart(ctx, {
          type: 'bar',
          data: {
              labels: labels,
              datasets: [
                  {
                      label: 'Revenue',
                      data: revenueData,
                      backgroundColor: 'rgba(54, 162, 235, 0.5)',
                      borderColor: 'rgba(54, 162, 235, 1)',
                      borderWidth: 1
                  }
              ]
          },
          options: {
              indexAxis: 'y', // Change index axis to horizontal
              responsive: true,
              scales: {
                  x: {
                      beginAtZero: true,
                      ticks: {
                          callback: function (value) {
                              return `$${value.toFixed(2)}`;
                          }
                      }
                  },
                  y: {
                      beginAtZero: true
                  }
              },
              plugins: {
                  tooltip: {
                      callbacks: {
                          label: function (context) {
                              let label = context.dataset.label || '';
                              label += `: $${context.raw.toFixed(2)}`;
                              return label;
                          }
                      }
                  }
              }
          }
      });
  }

  // Function to update bar chart with filtered data
  function updateBarChart(filteredData) {
      const productTotals = filteredData.reduce((acc, item) => {
          const product = item.Product;
          const revenue = parseFloat(item.LineTotal);

          if (!acc[product]) {
              acc[product] = { revenue: 0 };
          }
          acc[product].revenue += revenue;

          return acc;
      }, {});

      // Sort products by total revenue and select top 10
      const sortedProducts = Object.keys(productTotals)
          .map(product => ({ product, ...productTotals[product] }))
          .sort((a, b) => b.revenue - a.revenue)
          .slice(0, 10);

      const labels = sortedProducts.map(item => item.product);
      const revenueData = sortedProducts.map(item => item.revenue);

      // Update chart data
      barChart.data.labels = labels;
      barChart.data.datasets[0].data = revenueData;
      barChart.update();
  }

  // Fetch initial data and create the bar chart
  fetchData()
      .then((data) => {
          // Calculate initial total revenue
          const productTotals = data.reduce((acc, item) => {
              const product = item.Product;
              const revenue = parseFloat(item.LineTotal);

              if (!acc[product]) {
                  acc[product] = { revenue: 0 };
              }
              acc[product].revenue += revenue;

              return acc;
          }, {});

          // Sort products by total revenue and select top 10
          const sortedProducts = Object.keys(productTotals)
              .map(product => ({ product, ...productTotals[product] }))
              .sort((a, b) => b.revenue - a.revenue)
              .slice(0, 10);

          const labels = sortedProducts.map(item => item.product);
          const revenueData = sortedProducts.map(item => item.revenue);

          // Create bar chart with initial data
          createBarChart(labels, revenueData);
      })
      .catch((error) => console.error('Error fetching JSON data:', error));

  // Event listener for the submit button
  document.querySelector(".button button").addEventListener("click", (event) => {
      event.preventDefault();
      processFilters();
  });
});
//***************************** */
//**************************** */
//*TRANSAKSI YANG DISUKAI PENGGUNA */
document.addEventListener("DOMContentLoaded", (event) => {
  let barChart; // Declare a variable to hold the chart instance

  // Function to fetch data from JSON file
  async function fetchData() {
      try {
          const response = await fetch("All data.json");
          if (!response.ok) {
              throw new Error("Network response was not ok " + response.statusText);
          }
          const data = await response.json();
          return data;
      } catch (error) {
          console.error("There has been a problem with your fetch operation:", error);
      }
  }

  // Function to filter data based on location
  function filterData(data, location) {
      return data.filter((item) => {
          return location === item.Location || location === "";
      });
  }

  // Function to get filter values and process data
  async function processFilters() {
      // Get selected value from the location filter
      const location = document.querySelector("#location select").value;

      // Display selected value in console
      console.log("Selected Location:", location);

      // Fetch data from JSON file
      const data = await fetchData();

      // Filter data based on selected value
      const filteredData = filterData(data, location);

      // Update bar chart with filtered data
      updateBarChart(filteredData);
  }

  // Function to create bar chart
  function createBarChart(labels, cashData, creditData) {
      const ctx = document.getElementById('barchart3').getContext('2d');
      barChart = new Chart(ctx, {
          type: 'bar',
          data: {
              labels: labels,
              datasets: [
                  {
                      label: 'Cash',
                      data: cashData,
                      backgroundColor: 'rgba(75, 192, 192, 0.5)',
                      borderColor: 'rgba(75, 192, 192, 1)',
                      borderWidth: 1
                  },
                  {
                      label: 'Credit',
                      data: creditData,
                      backgroundColor: 'rgba(255, 99, 132, 0.5)',
                      borderColor: 'rgba(255, 99, 132, 1)',
                      borderWidth: 1
                  }
              ]
          },
          options: {
              responsive: true,
              scales: {
                  y: {
                      beginAtZero: true,
                      stacked: true,
                      ticks: {
                          callback: function (value) {
                              return `${value}`;
                          }
                      }
                  },
                  x: {
                      stacked: true,
                      beginAtZero: true
                  }
              },
              plugins: {
                  tooltip: {
                      callbacks: {
                          label: function (context) {
                              let label = context.dataset.label || '';
                              label += `: ${context.raw}`;
                              return label;
                          }
                      }
                  }
              }
          }
      });
  }

  // Function to update bar chart with filtered data
  function updateBarChart(filteredData) {
      const transactionTypes = filteredData.reduce((acc, item) => {
          const type = item.Type;
          if (!acc[type]) {
              acc[type] = 0;
          }
          acc[type]++;
          return acc;
      }, {});

      // Create labels and data arrays
      const labels = Object.keys(transactionTypes);
      const cashData = labels.map(label => transactionTypes[label] && label === 'Cash' ? transactionTypes[label] : 0);
      const creditData = labels.map(label => transactionTypes[label] && label === 'Credit' ? transactionTypes[label] : 0);

      // Update chart data
      barChart.data.labels = labels;
      barChart.data.datasets[0].data = cashData;
      barChart.data.datasets[1].data = creditData;
      barChart.update();
  }

  // Fetch initial data and create the bar chart
  fetchData()
      .then((data) => {
          // Calculate initial transaction types
          const transactionTypes = data.reduce((acc, item) => {
              const type = item.Type;
              if (!acc[type]) {
                  acc[type] = 0;
              }
              acc[type]++;
              return acc;
          }, {});

          // Create labels and data arrays
          const labels = Object.keys(transactionTypes);
          const cashData = labels.map(label => transactionTypes[label] && label === 'Cash' ? transactionTypes[label] : 0);
          const creditData = labels.map(label => transactionTypes[label] && label === 'Credit' ? transactionTypes[label] : 0);

          // Create bar chart with initial data
          createBarChart(labels, cashData, creditData);
      })
      .catch((error) => console.error('Error fetching JSON data:', error));

  // Event listener for the submit button
  document.querySelector(".button button").addEventListener("click", (event) => {
      event.preventDefault();
      processFilters();
  });
});
