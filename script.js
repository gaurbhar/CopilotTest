// input with id username on change event
document.getElementById('username').addEventListener('input', function () {
  const username = this.value;
  console.log('Username changed to:', username);
  //Reg X if username
  const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9])(?=.{8,})/;
  if (regex.test(username)) {
    console.log('Valid username');
    //set the username input border colour to green
    this.style.borderColor = 'green';
  } else {
    console.log('Invalid username');
    //set the username input border colour to red
    this.style.borderColor = 'red'; 
  }
});
// Chart.js Bar Chart for Bucks2Bar
const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];
let barChart;
function getMonthlyData() {
  const income = [], expenses = [];
  for (let i = 1; i <= 12; i++) {
    income.push(Number(document.getElementById('income' + i).value) || 0);
    expenses.push(Number(document.getElementById('expenses' + i).value) || 0);
  }
  return { income, expenses };
}
// Retrieve values of expenses and income for each month based on input id
function getAllMonthlyValues() {
  const values = [];
  for (let i = 1; i <= 12; i++) {
    const income = Number(document.getElementById('income' + i).value) || 0;
    const expenses = Number(document.getElementById('expenses' + i).value) || 0;
    values.push({ month: months[i - 1], income, expenses });
  }
  return values;
}
function renderChart() {
  const ctx = document.getElementById('myBarChart').getContext('2d');
  const { income, expenses } = getMonthlyData();
  if (barChart) barChart.destroy();
  barChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: months,
      datasets: [
        {
          label: 'Income',
          data: income,
          backgroundColor: 'rgba(54, 162, 235, 0.7)'
        },
        {
          label: 'Expenses',
          data: expenses,
          backgroundColor: 'rgba(255, 99, 132, 0.7)'
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'top' },
        title: { display: true, text: 'Monthly Income vs Expenses' }
      },
      scales: {
        y: { beginAtZero: true }
      }
    }
  });
}
// Update chart when tab is shown
if (document.getElementById('chart-tab')) {
  document.getElementById('chart-tab').addEventListener('shown.bs.tab', renderChart);
}
// Optionally, update chart live when inputs change (if chart is visible)
const inputs = document.querySelectorAll('input[type="number"]');
inputs.forEach(input => {
  input.addEventListener('input', () => {
    if (document.getElementById('chart').classList.contains('show')) {
      renderChart();
    }
  });
});
// Download chart as image when button is clicked
const downloadBtn = document.getElementById('downloadChart');
if (downloadBtn) {
  downloadBtn.addEventListener('click', function () {
    const chartCanvas = document.getElementById('myBarChart');
    const url = chartCanvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = url;
    link.download = 'bucks2bar_chart.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
}
// Forgot Password Modal logic
const recoverForm = document.getElementById('recoverForm');
if (recoverForm) {
  recoverForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('recoveryEmail').value;
    const messageDiv = document.getElementById('recoveryMessage');
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email)) {
      messageDiv.style.display = 'block';
      messageDiv.className = 'alert alert-success';
      messageDiv.textContent = 'If this email is registered, a recovery link has been sent.';
    } else {
      messageDiv.style.display = 'block';
      messageDiv.className = 'alert alert-danger';
      messageDiv.textContent = 'Please enter a valid email address.';
    }
  });
}
