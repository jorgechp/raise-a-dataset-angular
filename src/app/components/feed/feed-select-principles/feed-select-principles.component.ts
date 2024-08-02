import {Component, OnInit} from '@angular/core';
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {FairPrinciple} from "../../../domain/fair-principle";

@Component({
  selector: 'app-feed-select-principles',
  standalone: true,
  imports: [
    MatTableModule
  ],
  templateUrl: './feed-select-principles.component.html',
  styleUrl: './feed-select-principles.component.scss'
})
export class FeedSelectPrinciplesComponent implements OnInit{
  protected dataSource = new MatTableDataSource<FairPrinciple>([]);
  displayedColumns: string[] = ['name', 'category', 'difficulty']





}
