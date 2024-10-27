import {Component, OnInit} from '@angular/core';
import {map} from 'rxjs/operators';
import {AsyncPipe} from '@angular/common';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {RaiseInstance} from "../../domain/raise-instance";
import {RaiseInstanceService} from "../../services/raise-instance/raise-instance.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
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
import {getIdFromURI} from "../utils/funcions";
import {FairPrincipleService} from "../../services/fair-principle/fair-principle.service";
import {FairPrinciple} from "../../domain/fair-principle";
import {FairCategoriesEnum} from "../../domain/fair-categories-enum";


interface PrincipleNode {
  name: string;
  children?: PrincipleNode[];
}

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
  dataSourceAchieved
    = new MatTreeNestedDataSource<PrincipleNode>();
  dataSourceNeeded
    = new MatTreeNestedDataSource<PrincipleNode>();
  protected raiseInstanceModel?: RaiseInstance;
  protected dataset?: Dataset;
  protected repository?: Repository;
  protected treeControl
    = new NestedTreeControl<PrincipleNode>(node => node.children);

  protected getIdFromURI = getIdFromURI;
  private idActivatedRoute?: number;

  constructor(private raiseInstanceService: RaiseInstanceService,
              private fairPrincipleService: FairPrincipleService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
    this.activatedRoute.paramMap.subscribe(params => {
        if (params.has('id')) {
          this.idActivatedRoute = Number(params.get('id'));
        }
      }
    );
  }

  hasChild = (_: number, node: PrincipleNode) => !!node.children && node.children.length > 0;

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
      );
      this.getFairPrincipleQueryCollection(false, this.dataSourceAchieved);
      this.getFairPrincipleQueryCollection(true, this.dataSourceNeeded);
    }
  }

  private getFairPrincipleQueryCollection(isRetrievePending: boolean, dataSource: MatTreeNestedDataSource<PrincipleNode>) {
    const queryInstance = isRetrievePending ? 'findPendingPrinciplesByRaiseInstanceId' : 'findCompletedPrinciplesByRaiseInstanceId';
    const listPrincipleNodes: PrincipleNode[] = [];
    this.fairPrincipleService.searchCollection(
      queryInstance, {
        params: {
          raiseInstanceId: this.idActivatedRoute!
        },
        sort: {
          dataset: 'ASC'
        },
        useCache: false
      }
    ).subscribe((response) => {
      const findablePrinciples: PrincipleNode = {
        name: 'Findable',
        children: [],
      };

      const accesiblePrinciples: PrincipleNode = {
        name: 'Accesible',
        children: [],
      };

      const interoperablePrinciples: PrincipleNode = {
        name: 'Interoperable',
        children: [],
      }

      const reusablePrinciples: PrincipleNode = {
        name: 'Reusable',
        children: [],
      };

      response.resources.forEach((fairPrinciple: FairPrinciple) => {
        const principleValue = {name: fairPrinciple.name!};
        switch (Number(FairCategoriesEnum[fairPrinciple.category!])) {
          case FairCategoriesEnum.FINDABILITY:
            findablePrinciples.children?.push(principleValue);
            break;
          case FairCategoriesEnum.ACCESSIBILITY:
            accesiblePrinciples.children?.push(principleValue);
            break;
          case FairCategoriesEnum.INTEROPERABILITY:
            interoperablePrinciples.children?.push(principleValue);
            break;
          case FairCategoriesEnum.REUSABILITY:
            reusablePrinciples.children?.push(principleValue);
            break;
        }
      });

      listPrincipleNodes.push(findablePrinciples);
      listPrincipleNodes.push(accesiblePrinciples);
      listPrincipleNodes.push(interoperablePrinciples);
      listPrincipleNodes.push(reusablePrinciples);
      dataSource.data = listPrincipleNodes;
    })
  }

  handleApplyIndicators() {
    this.router.navigate(['feed'], {state: {raiseInstance: this.raiseInstanceModel}}).then();
  }
}
