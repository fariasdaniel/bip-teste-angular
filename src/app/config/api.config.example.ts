// Exemplo de configurações de API para diferentes ambientes
// Copie este arquivo e renomeie para api.config.ts, depois ajuste conforme necessário

import { environment } from '../../environments/environment';

export class ApiConfig {
  // ========================================
  // CONFIGURAÇÕES BÁSICAS
  // ========================================

  // URL base da API - Altere conforme seu ambiente
  static readonly BASE_URL = environment.apiUrl;

  // Endpoints específicos
  static readonly PROJETOS_ENDPOINT = `${ApiConfig.BASE_URL}/projetos`;

  // ========================================
  // CONFIGURAÇÕES DE TIMEOUT E RETRY
  // ========================================

  // Timeout das requisições (em milissegundos)
  static readonly REQUEST_TIMEOUT = 30000; // 30 segundos

  // Configurações de retry
  static readonly MAX_RETRIES = 3;
  static readonly RETRY_DELAY = 1000; // 1 segundo

  // ========================================
  // HEADERS PADRÃO
  // ========================================

  static readonly DEFAULT_HEADERS = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
    // Adicione headers customizados aqui se necessário
  };

  // ========================================
  // MÉTODOS UTILITÁRIOS
  // ========================================

  // Método para obter URL completa de um endpoint
  static getUrl(endpoint: string): string {
    return `${ApiConfig.BASE_URL}${endpoint}`;
  }

  // Método para obter URL de projetos
  static getProjetosUrl(): string {
    return ApiConfig.PROJETOS_ENDPOINT;
  }

  // Método para obter URL de um projeto específico
  static getProjetoUrl(id: number): string {
    return `${ApiConfig.PROJETOS_ENDPOINT}/${id}`;
  }

  // Método para obter headers padrão
  static getHeaders(): any {
    return { ...ApiConfig.DEFAULT_HEADERS };
  }
}
