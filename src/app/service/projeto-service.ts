import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {CriarProjetoRequest, Projeto, ProjetosResponse} from '../models/projeto.model';

@Injectable({
  providedIn: 'root'
})
export class ProjetoService {

  private readonly API = `${environment.apiUrl}/projetos`;

  constructor(private http: HttpClient) { }

  getProjetos(page: number = 0, size: number = 20): Observable<ProjetosResponse> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<ProjetosResponse>(this.API, { params });
  }

  criarProjeto(projeto: CriarProjetoRequest): Observable<Projeto> {
    return this.http.post<Projeto>(this.API, projeto);
  }
}
