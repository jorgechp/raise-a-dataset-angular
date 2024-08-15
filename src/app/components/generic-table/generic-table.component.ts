import {AfterViewInit, Component, EventEmitter, Input, Output, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {MatFormField, MatInputModule} from "@angular/material/input";
import {MatTable, MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {MatSort, MatSortModule} from "@angular/material/sort";
import {MatCommonModule} from "@angular/material/core";
import {TranslocoDirective} from "@jsverse/transloco";
import {NgForOf, NgIf} from "@angular/common";
import {Router} from "@angular/router";

export interface IGenericTableColumn {
  nameDef: string;
  i18nKey: string;
}

@Component({
  selector: 'app-generic-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormField,
    MatCommonModule,
    MatInputModule,
    TranslocoDirective,
    NgForOf,
    NgIf
  ],
  templateUrl: './generic-table.component.html',
  styleUrl: './generic-table.component.scss'
})
export class GenericTableComponent<T> implements AfterViewInit {
  dataSource: MatTableDataSource<T> | undefined;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChildren("table") tables: QueryList<MatTable<T>> | undefined;
  @Input() columns?: IGenericTableColumn[];
  @Input() displayedColumns?: string[];
  @Input() rows?: T[];
  @Output() clickOnRowEventHandler: EventEmitter<T> = new EventEmitter();
  private table: MatTable<T> | undefined;

  constructor(private router: Router) {
  }

  ngAfterViewInit(): void {
    if (this.tables) {
      this.table = this.tables.get(0);
    }

    this.dataSource = new MatTableDataSource<T>(this.rows);
    this.table!.dataSource = this.dataSource;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

  }

  handleClickOnRow(row: T) {
    this.clickOnRowEventHandler.emit(row);
  }

  protected applyFilter(event: Event) {
    if (!this.dataSource) {
      return;
    }
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
