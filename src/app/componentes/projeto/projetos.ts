import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { PanelModule } from 'primeng/panel';
import { FieldsetModule } from 'primeng/fieldset';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ProjetoService } from '../../service/projeto-service';
import { CriarProjetoRequest, Projeto, ProjetosResponse } from '../../models/projeto.model';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-projetos',
  standalone: true,
  imports: [
    PanelModule,
    TableModule,
    FieldsetModule,
    InputGroupModule,
    InputGroupAddonModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    FaIconComponent,
    ToastModule
  ],
  templateUrl: './projeto.html',
  styleUrl: './projeto.css'
})
export class Projetos implements OnInit {

  projetos: Projeto[] = [];
  // Inicialize o objeto 'projeto' para evitar erros com o ngModel
  projeto: CriarProjetoRequest = { nome: '' };

  constructor(private projetoService: ProjetoService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.carregarProjetos();
  }

  carregarProjetos(): void {
    this.projetoService.getProjetos().subscribe((data: ProjetosResponse) => {
      this.projetos = data.content;
    });
  }

  cadastrarProjeto(): void {
    if (!this.projeto.nome || this.projeto.nome.trim() === '') {
      this.messageService.add({ severity: 'warn', summary: 'Validação', detail: 'O nome do projeto é obrigatório.' });
      return;
    }

    this.projetoService.criarProjeto(this.projeto).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Projeto cadastrado com sucesso!' });
        this.carregarProjetos();
        this.projeto = { nome: '' }; // Limpa o campo
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao cadastrar projeto. Tente novamente.' });
        console.error(err);
      }
    });
  }

  protected readonly faCoffee = faCoffee;
}
