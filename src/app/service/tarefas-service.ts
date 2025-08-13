import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TarefaDto, TarefasResponse } from '../models/tarefa.model';
import {environment} from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TarefasService {
  private readonly apiUrl = `${environment.apiUrl}/tarefas`;

  constructor(private http: HttpClient) { }

  getTarefas(page?: number, size?: number, projetoId?: number | null): Observable<TarefasResponse> {

    let params = new HttpParams();

    if (page !== null && page !== undefined) {
      params = params.set('page', page.toString());
    }

    if (size !== null && size !== undefined) {
      params = params.set('size', size.toString());
    }

    if (projetoId !== null && projetoId !== undefined) {
      params = params.set('projetoId', projetoId.toString());
    }


    return this.http.get<TarefasResponse>(this.apiUrl, { params });
  }


  getTarefa(id: number): Observable<TarefaDto> {
    return this.http.get<TarefaDto>(`${this.apiUrl}/${id}`);
  }

  criarTarefa(tarefa: TarefaDto): Observable<TarefaDto> {
    return this.http.post<TarefaDto>(this.apiUrl, tarefa);
  }

  deletarTarefa(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
