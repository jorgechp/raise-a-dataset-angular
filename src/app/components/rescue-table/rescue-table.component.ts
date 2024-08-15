import {Component} from '@angular/core';
import {GenericTableComponent, IGenericTableColumn} from "../generic-table/generic-table.component";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-rescue-table',
  standalone: true,
  imports: [
    GenericTableComponent,
    NgIf
  ],
  templateUrl: './rescue-table.component.html',
  styleUrl: './rescue-table.component.scss'
})
export class RescueTableComponent {
  columns: IGenericTableColumn[];
  columnDescription: string[] = [];
  rows: any;

  rowHandlerEvent(row) {

  }
}
