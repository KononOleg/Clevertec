import axios from 'axios';

import { API_HOST } from '../../constants';

export const $api = axios.create({ baseURL: API_HOST });

$api.interceptors.request.use((config) => config);
