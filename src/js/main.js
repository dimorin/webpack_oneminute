import 'bootstrap';
import axios from 'axios';
import Chart from '@toast-ui/chart';
import '@toast-ui/chart/dist/toastui-chart.min.css';
import '../css/main.scss';

/* axios({
    method: 'get',
    url: 'https://jsonplaceholder.typicode.com/todos/1',
  }).then(response => alert(JSON.stringify(response.data))); */

axios.get('./header.html')
  .then(response => {
    var html_dom = new DOMParser().parseFromString(response.data, 'text/html');
    html_dom = html_dom.body.firstChild;
    var header = document.querySelector('header');
    header.insertAdjacentElement('beforeend', html_dom);
  })
  .catch(error => {
    // handle the error
  })
  .finally(() => {
    //this.loading = false
  });
axios.get('./nav.html')
  .then(response => {
    var html_dom = new DOMParser().parseFromString(response.data, 'text/html');
    html_dom = html_dom.body.firstChild;
    var nav = document.querySelector('#sidebarMenu');
    nav.insertAdjacentElement('beforeend', html_dom);
  })
  .catch(error => {
    // handle the error
  })
  .finally(() => {
    //this.loading = false
  });

function make_chart() {
  const el = document.getElementById('chart');
  const data = {
    categories: ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    series: [{
        name: 'Budget',
        data: [5000, 3000, 5000, 7000, 6000, 4000, 1000],
      },
      {
        name: 'Income',
        data: [8000, 4000, 7000, 2000, 6000, 3000, 5000],
      },
    ],
  };
  const options = {
    chart: {
      width: 700,
      height: 400
    },
  };

  const chart = Chart.barChart({
    el,
    data,
    options
  });
}

window.addEventListener('DOMContentLoaded', (event) => {
  make_chart()
});