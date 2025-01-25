import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {GenericTableComponent, IGenericTableColumn} from "../generic-table/generic-table.component";
import {NgIf} from "@angular/common";
import {Router} from "@angular/router";
import {RankingService} from "../../services/ranking/ranking.service";
import {IUserStateDTO} from "../../domain/user-state-dto";

const DEFAULT_SORT_COLUMN = 'totalScore';

@Component({
  selector: 'app-ranking',
  standalone: true,
  imports: [
    GenericTableComponent,
    NgIf
  ],
  templateUrl: './ranking.component.html',
  styleUrl: './ranking.component.scss'
})
export class RankingComponent implements OnInit {
  columns: IGenericTableColumn[] = [
    {nameDef: 'username', i18nKey: 'ranking.username'},
    {nameDef: 'totalScore', i18nKey: 'ranking.totalScore'},
    {nameDef: 'numberOfCompliances', i18nKey: 'ranking.compliances'},
    {nameDef: 'numberOfDatasetInstances', i18nKey: 'ranking.datasets'},
    {nameDef: 'numberOfDatasetRescued', i18nKey: 'ranking.rescued'},
    {nameDef: 'numberOfValidations', i18nKey: 'ranking.validations'},
    {nameDef: 'registrationDate', i18nKey: 'ranking.registrationDate'}
  ];
  rows: IUserStateDTO[] | undefined;
  defaultSortColumn: string | undefined = DEFAULT_SORT_COLUMN;


  constructor(private rankingService: RankingService,
              private router: Router,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.getRankingUsers();
  }

  getRankingUsers(): void {
    this.rankingService.getRankingUsers().subscribe((data) => {
      this.rows = data;
      this.cdr.detectChanges();
    });
  }

  rowHandlerEvent(row: IUserStateDTO): void {
    this.router.navigate(['user'], {state: {user: row.user}}).then();
  }

}
