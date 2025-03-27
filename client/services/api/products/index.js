import axios from 'axios';
import { api_url } from '../../../common/config';

axios.defaults.withCredentials = true;

export default class {
  static getAllProducts = () => axios.get(`${api_url}product`);
}
