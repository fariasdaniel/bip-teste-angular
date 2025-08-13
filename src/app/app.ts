import { Component, signal } from '@angular/core';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faBell, faFolder, faUser } from "@fortawesome/free-solid-svg-icons";
import {Accordion, AccordionContent, AccordionHeader, AccordionPanel} from 'primeng/accordion';
import {Projetos} from './componentes/projeto/projetos';
import {Tarefas} from './componentes/tarefas/tarefas';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FontAwesomeModule, Accordion, AccordionHeader, AccordionPanel, AccordionContent, Projetos, Tarefas, NgIf],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('teste-angular');
  faFolder = faFolder;
  faBell = faBell;
  faUser = faUser;
}
