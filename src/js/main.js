import 'bootstrap';
import axios from 'axios';
import {message} from './message';
import '../css/main.scss';

message('1분코딩 웹팩 간단 설정');

axios({
    method: 'get',
    url: 'https://jsonplaceholder.typicode.com/todos/1',
  }).then(response => alert(JSON.stringify(response.data)));