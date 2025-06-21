import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AppService {
  constructor() {
    // Configurando o Axios para enviar o token em todas as requisições
    axios.interceptors.request.use(config => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }

  getHello(): string {
    return 'Hello World!';
  }
}
