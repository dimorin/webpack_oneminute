import 'bootstrap';
import axios from 'axios';
//import {message} from './message';
import '../css/sub2.scss';

//message('sub2 mgs');

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