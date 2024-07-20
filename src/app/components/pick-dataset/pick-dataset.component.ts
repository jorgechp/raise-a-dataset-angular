import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatTable, MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {Dataset} from "../../domain/dataset";
import {DatasetService} from "../../services/dataset/dataset.service";
import {MatFormField, MatInputModule} from "@angular/material/input";
import {MatCommonModule} from "@angular/material/core";
import {Router} from "@angular/router";
import {TranslocoDirective} from "@jsverse/transloco";


@Component({
  selector: 'app-pick-dataset',
  templateUrl: './pick-dataset.component.html',
  styleUrl: './pick-dataset.component.scss',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, MatFormField, MatCommonModule, MatInputModule, TranslocoDirective]
})
export class PickDatasetComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Dataset>;
  dataSource: MatTableDataSource<Dataset> | undefined;


  /** Columns displayed in the pick-dataset. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name', 'description', 'author', 'registrationDate'];

  constructor(private datasetService: DatasetService,
              private router: Router) {
  }


  ngAfterViewInit(): void {

    this.datasetService.getPage().subscribe(
      (elem) => {
        this.dataSource = new MatTableDataSource<Dataset>(elem.resources);
        this.table.dataSource = this.dataSource;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    )
  }

  applyFilter(event: Event) {
    if (!this.dataSource) {
      return;
    }
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  handleClickOnRow(dataset: Dataset) {
    this.router.navigate(['/datasetInfo'], {queryParams: dataset}).then(r => {
    });
  }
}
