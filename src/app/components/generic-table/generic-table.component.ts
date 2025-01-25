import {
  AfterContentInit,
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {MatFormField, MatInputModule} from "@angular/material/input";
import {MatTable, MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {MatSort, MatSortModule, SortDirection} from "@angular/material/sort";
import {MatCommonModule} from "@angular/material/core";
import {TranslocoDirective} from "@jsverse/transloco";
import {NgForOf, NgIf} from "@angular/common";
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";

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
    NgIf,
    FormsModule
  ],
  templateUrl: './generic-table.component.html',
  styleUrl: './generic-table.component.scss'
})
export class GenericTableComponent<T> implements OnInit, AfterViewInit, AfterContentInit {
  dataSource: MatTableDataSource<T>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChildren("table") tables: QueryList<MatTable<T>> | undefined;
  @Input() columns?: IGenericTableColumn[];
  @Input() displayedColumns?: string[];
  @Input() rows?: T[];
  @Input() matSortActive?: string;
  @Output() clickOnRowEventHandler: EventEmitter<T> = new EventEmitter();
  @Output() clickOnRowIndexEventHandler: EventEmitter<number> = new EventEmitter();
  private table: MatTable<T> | undefined;
  private _matSortDirection: SortDirection = 'asc';
  protected searchValueInputTerm: string = '';

  constructor(private router: Router) {
    this.dataSource = new MatTableDataSource<T>([]);
  }

  ngOnInit(): void {

    if (!this.displayedColumns) {
      this.displayedColumns = [];
    }
    this.updateRows(this.rows!);
  }

  get matSortDirection(): SortDirection {
    return this._matSortDirection;
  }

  @Input()
  set matSortDirection(value: SortDirection | undefined) {
    this._matSortDirection = value || 'asc';
  }

  public updateRows(rows: Array<T>) {
    this.rows = rows;
    this.dataSource.data = [...(this.rows as T[])];
  }


  ngAfterViewInit(): void {
    if (this.tables) {
      this.table = this.tables.get(0);
    }


    this.table!.dataSource = this.dataSource;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

  }

  ngAfterContentInit() {
    if (this.displayedColumns?.length == 0) {
      const columnToDisplay = this.columns?.map(column => column.nameDef) || [];
      this.displayedColumns = [...columnToDisplay];
    }
  }

  handleClickOnRow(row: T, index: number) {
    this.clickOnRowEventHandler.emit(row);
    this.clickOnRowIndexEventHandler.emit(index);
  }

  public applyFilterValue(filterValue: string) {
    this.dataSource.filter = filterValue;
    this.searchValueInputTerm = filterValue;
  }

  protected applyFilter(event: Event) {
    if (!this.dataSource) {
      return;
    }
    const filterValue = (event.target as HTMLInputElement).value;
    this.applyFilterValue(filterValue.trim().toLowerCase());
  }
}
