import 'bootstrap';
import axios from 'axios';
//import {message} from './message';
import '../css/sub1.scss';

//message('sub1 msg');

axios.get('./header.html')
.then(response => {
      var html_dom = new DOMParser().parseFromString(response.data,'text/html'); 
      html_dom = html_dom.body.firstChild; 
      var header = document.querySelector('header'); 
      header.insertAdjacentElement('beforeend',html_dom);
})
.catch(error => {
    // handle the error
})
.finally(() => {
  //this.loading = false
});
axios.get('./nav.html')
.then(response => {
      var html_dom = new DOMParser().parseFromString(response.data,'text/html'); 
      html_dom = html_dom.body.firstChild; 
      var nav = document.querySelector('#sidebarMenu'); 
      nav.insertAdjacentElement('beforeend',html_dom);
})
.catch(error => {
    // handle the error
})
.finally(() => {
  //this.loading = false
});

window.addEventListener('DOMContentLoaded', (event) => {
  var forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })
});