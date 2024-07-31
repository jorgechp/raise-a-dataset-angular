import {Component, inject, OnInit} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {map} from 'rxjs/operators';
import {AsyncPipe} from '@angular/common';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {RaiseInstance} from "../../domain/raise-instance";
import {RaiseInstanceService} from "../../services/raise-instance/raise-instance.service";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {Dataset} from "../../domain/dataset";
import {Repository} from "../../domain/repository";
import {forkJoin} from "rxjs";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable
} from "@angular/material/table";
import {MatTreeModule, MatTreeNestedDataSource} from "@angular/material/tree";
import {NestedTreeControl} from "@angular/cdk/tree";


/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
interface FoodNode {
  name: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Findable',
    children: [{name: 'F1'}, {name: 'F2'}, {name: 'F3'}],
  },
  {
    name: 'Accesible',
    children: [
      {
        name: 'A4'
      }
    ],
  },
];

@Component({
  selector: 'app-raise-instance',
  templateUrl: './raise-instance.component.html',
  styleUrl: './raise-instance.component.scss',
  standalone: true,
  imports: [
    AsyncPipe,
    MatGridListModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatTreeModule,
    MatTable,
    RouterLink
  ]
})
export class RaiseInstanceComponent implements OnInit {
  dataSource
    = new MatTreeNestedDataSource<FoodNode>();
  protected raiseInstanceModel?: RaiseInstance;
  protected dataset?: Dataset;
  protected repository?: Repository;
  protected treeControl
    = new NestedTreeControl<FoodNode>(node => node.children);
  private breakpointObserver = inject(BreakpointObserver);
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({matches}) => {
      if (matches) {
        return [
          {title: 'Card 1', cols: 1, rows: 1},
          {title: 'Card 2', cols: 1, rows: 1},
          {title: 'Card 3', cols: 1, rows: 1},
          {title: 'Card 4', cols: 1, rows: 1}
        ];
      }

      return [
        {title: 'Card 1', cols: 2, rows: 1},
        {title: 'Card 2', cols: 1, rows: 1},
        {title: 'Card 3', cols: 1, rows: 2},
        {title: 'Card 4', cols: 1, rows: 1}
      ];
    })
  );
  private idActivatedRoute?: number;

  constructor(private raiseInstanceService: RaiseInstanceService,
              private activatedRoute: ActivatedRoute) {
    this.dataSource.data = TREE_DATA;
    this.activatedRoute.queryParams.subscribe(params => {
        if (params['id']) {
          this.idActivatedRoute = params['id'];
        }
      }
    );
  }

  hasChild = (_: number, node: FoodNode) => !!node.children && node.children.length > 0;

  ngOnInit(): void {
    if (this.idActivatedRoute) {
      this.raiseInstanceService.getResource(this.idActivatedRoute).subscribe(
        (raiseInstance) => {
          this.raiseInstanceModel = raiseInstance;

          forkJoin([
            raiseInstance.getRelation<Dataset>('dataset'),
            raiseInstance.getRelation<Repository>('repository'),
          ]).pipe(
            map(([dataset, repository]) => {
              this.dataset = dataset
              this.repository = repository
            })
          ).subscribe()
        }
      )
    }
  }
}
