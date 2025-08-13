import {Projeto} from './projeto.model';

export enum StatusTarefa {
  PENDENTE = 'PENDENTE',
  EM_ANDAMENTO = 'EM_ANDAMENTO',
  CONCLUIDA = 'CONCLUIDA'
}

export interface TarefaDto {
  id: number;
  titulo: string;
  descricao: string;
  status: StatusTarefa | null;
  dataCriacao: string;
  projeto: Projeto | null;
}

export interface SortObject {
  direction: string;
  nullHandling: string;
  ascending: boolean;
  property: string;
  ignoreCase: boolean;
}

export interface PageableObject {
  offset: number;
  sort: SortObject[];
  unpaged: boolean;
  paged: boolean;
  pageNumber: number;
  pageSize: number;
}

export interface TarefasResponse {
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
  size: number;
  content: TarefaDto[];
  number: number;
  sort: SortObject[];
  numberOfElements: number;
  pageable: PageableObject;
  empty: boolean;
}
