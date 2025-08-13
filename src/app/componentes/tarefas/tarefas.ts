import { Component, OnInit } from '@angular/core';
import { Button } from "primeng/button";
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { Fieldset } from "primeng/fieldset";
import { FormsModule } from "@angular/forms";
import { InputGroup } from "primeng/inputgroup";
import { InputGroupAddon } from "primeng/inputgroupaddon";
import { InputText } from "primeng/inputtext";
import { Panel } from "primeng/panel";
import { MessageService, PrimeTemplate } from "primeng/api";
import { TableModule } from "primeng/table";
import { Toast, ToastModule } from "primeng/toast";
import {faAsterisk, faCoffee, faFolder, faTasks, faTrash} from '@fortawesome/free-solid-svg-icons';
import { StatusTarefa, TarefaDto, TarefasResponse } from '../../models/tarefa.model';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import { Select } from 'primeng/select';
import { ProjetoService } from '../../service/projeto-service';
import { Projeto, ProjetosResponse } from '../../models/projeto.model';
import { PaginatorState } from 'primeng/paginator';
import { TarefasService } from '../../service/tarefas-service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-tarefas',
  standalone: true,
  imports: [
    Button,
    FaIconComponent,
    Fieldset,
    FormsModule,
    InputGroup,
    InputGroupAddon,
    InputText,
    Panel,
    PrimeTemplate,
    TableModule,
    Toast,
    InputTextModule,
    FloatLabel,
    Select,
    ToastModule,
    DatePipe
  ],
  templateUrl: './tarefas.html',
  styleUrl: './tarefas.css'
})
export class Tarefas implements OnInit {

  protected readonly faFolder = faFolder;
  protected readonly faTasks = faTasks;
  protected readonly faAsterisk = faAsterisk;
  protected readonly faTrash = faTrash;

  statusOptions = [
    { label: 'Selecione o Status', value: null },
    { label: 'Pendente', value: StatusTarefa.PENDENTE},
      {label: 'Em Andamento', value: StatusTarefa.EM_ANDAMENTO},
      {label: 'Concluída', value: StatusTarefa.CONCLUIDA}
  ];

  tarefa: TarefaDto = this.inicializarTarefa();
  tarefas: TarefaDto[] = [];
  projetos: Projeto[] = [];

  first: number = 0;
  rows: number = 10;
  totalRecords: number = 0;
  projetoFiltroId: number | null = null;


  constructor(
        private projetoService: ProjetoService,
        private tarefaService: TarefasService,
        private messageService: MessageService
    ) {
    }

    ngOnInit(): void {
        this.carregarProjetos();
        this.carregarTarefas();
    }

    carregarProjetos(): void {
        this.projetoService.getProjetos().subscribe((data: ProjetosResponse) => {
            this.projetos = data.content;
        });
    }

  carregarTarefas(): void {
    const page = this.first / this.rows;
    this.tarefaService.getTarefas(page, this.rows, this.projetoFiltroId).subscribe((data: TarefasResponse) => {
      this.tarefas = data.content;
      this.totalRecords = data.totalElements;
    });
  }

  onFiltroProjetoChange(): void {
    this.first = 0;
    this.carregarTarefas();
  }


  cadastrarTarefa(): void {
      if (!this.tarefa.titulo || this.tarefa.titulo.trim() === '') {
        this.messageService.add({ severity: 'warn', summary: 'Validação', detail: 'O título da tarefa é obrigatória.' });
        return;
      }

      if (!this.tarefa.status || this.tarefa.status.trim() === '') {
        this.messageService.add({ severity: 'warn', summary: 'Validação', detail: 'O status da tarefa é obrigatória.' });
        return;
      }

      if (!this.tarefa.projeto) {
        this.messageService.add({ severity: 'warn', summary: 'Validação', detail: 'O projeto da tarefa é obrigatória.' });
        return;
      }

      this.tarefaService.criarTarefa(this.tarefa).subscribe({
          next: () => {
              this.messageService.add({
                  severity: 'success',
                  summary: 'Sucesso',
                  detail: 'Tarefa cadastrada com sucesso!'
              });
              this.carregarTarefas();
              this.tarefa = this.inicializarTarefa();
          },
          error: (err: any) => {
              this.messageService.add({severity: 'error', summary: 'Erro', detail: 'Erro ao cadastrar tarefa.'});
              console.error(err);
          }
      });
    }

    onPageChange(event: PaginatorState) {
        this.first = event.first ?? 0;
        this.rows = event.rows ?? 10;
        this.carregarTarefas();
    }

    private inicializarTarefa(): TarefaDto {
        return {id: 0, titulo: '', descricao: '', status: null, dataCriacao: '', projeto: null};
    }

  excluirTarefa(id: number): void {
    this.tarefaService.deletarTarefa(id).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Tarefa excluída com sucesso!' });
        if (this.tarefas.length === 1 && this.first > 0) {
          this.first = this.first - this.rows;
        }
        this.carregarTarefas();
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao excluir tarefa.' });
        console.error(err);
      }
    });
  }


  protected readonly faCoffee = faCoffee;
}
