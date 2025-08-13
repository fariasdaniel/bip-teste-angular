export interface Projeto {
  id?: number;
  nome: string;
}

export interface Sort {
  empty: boolean;
  unsorted: boolean;
  sorted: boolean;
}

export interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: Sort;
  offset: number;
  unpaged: boolean;
  paged: boolean;
}

export interface PageableResponse<T> {
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
  numberOfElements: number;
  size: number;
  content: T[];
  number: number;
  sort: Sort;
  pageable: Pageable;
  empty: boolean;
}

export type ProjetosResponse = PageableResponse<Projeto>;

export enum ProjetoStatus {
  ATIVO = 'Ativo',
  PAUSADO = 'Pausado',
  CONCLUIDO = 'Concluído',
  CANCELADO = 'Cancelado'
}

export interface ProjetoComStatus extends Projeto {
  status?: ProjetoStatus;
  dataCriacao?: Date;
  dataAtualizacao?: Date;
}

export interface CriarProjetoRequest {
  nome: string;
}

export interface AtualizarProjetoRequest {
  id: number;
  nome: string;
}

export function criarProjetoVazio(): Projeto {
  return {
    nome: ''
  };
}

export function criarProjetoComStatus(nome: string, status: ProjetoStatus = ProjetoStatus.ATIVO): ProjetoComStatus {
  return {
    nome,
    status,
    dataCriacao: new Date(),
    dataAtualizacao: new Date()
  };
}

export function validarProjeto(projeto: Projeto): boolean {
  return Boolean(projeto.nome && projeto.nome.trim().length > 0);
}

export function obterErroValidacao(projeto: Projeto): string | null {
  if (!projeto.nome) {
    return 'Nome do projeto é obrigatório';
  }
  if (projeto.nome.trim().length === 0) {
    return 'Nome do projeto não pode estar vazio';
  }
  if (projeto.nome.length > 100) {
    return 'Nome do projeto não pode ter mais de 100 caracteres';
  }
  return null;
}
