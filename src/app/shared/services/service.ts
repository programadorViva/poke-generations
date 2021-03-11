import { messages } from './../config/messages';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Service {
  _headers: HttpHeaders;
  constructor() {
    this._headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
  }

  get headers() {
    return this._headers;
  }

  filter(response, calllback?: any) {
    if ((response.status && response.status.value === '0') || (response.codigo && response.codigo.valor === '0')) {
      if (calllback) {
        return calllback(response.data, response);
      }
      return response.data;
    } else if (response.status && response.status.description) {
      throw new Error(response.status.description);
    } else if (response.codigo && response.codigo.descricao) {
      throw new Error(response.codigo.descricao);
    } else if (response.access_token) {
      return response;
    } else {
      throw new Error(messages.erro_inesperado_servico);
    }
  }

  handleError(err: any) {
    if (!(err instanceof Error)) {
      return new Error(messages.erro_inesperado_servico);
    } else {
      return err;
    }
  }

  handleErrorTeste(err: any) {
    if (!(err instanceof Error)) {
      return new Error(messages.erro_inesperado_servico);
    } else {
      return err;
    }
  }
  
  formatQueryParams(params: any): string {
    if (typeof params != 'undefined') {
      return Object.keys(params).map((key) => key+'='+params[key]).join('&');
    }
    return '';
  }
}
