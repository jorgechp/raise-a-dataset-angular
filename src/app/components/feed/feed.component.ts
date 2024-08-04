import {Component, inject, OnInit} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatStepperModule} from "@angular/material/stepper";
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FairPrincipleService} from "../../services/fair-principle/fair-principle.service";
import {FairPrinciple} from "../../domain/fair-principle";
import {FeedSelectPrinciplesComponent} from "./feed-select-principles/feed-select-principles.component";
import {CommonModule} from "@angular/common";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {MatExpansionModule} from "@angular/material/expansion";
import {FairCategoriesEnum} from "../../domain/fair-categories-enum";
import {minArrayLengthValidator} from "../utils/validators/array-length-validator";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    FeedSelectPrinciplesComponent,
    MatGridList,
    MatGridTile,
    MatExpansionModule
  ],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.scss'
})
export class FeedComponent implements OnInit {
  firstFormGroup = this._formBuilder.group({
    selectedCards: [[], {validators: [minArrayLengthValidator(1)]}],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  readonly dialog = inject(MatDialog);

  protected fairPrincipleList: FairPrinciple[] = [];
  protected cardsInfoFindable: number[] = [];
  protected cardsInfoAccessible: number[] = [];
  protected cardsInfoInteroperable: number[] = [];
  protected cardsInfoReusable: number[] = [];
  protected selectedCards: number[] = [];

  constructor(private _formBuilder: FormBuilder,
              private fairPrincipleService: FairPrincipleService) {
    this.selectedCards = this.firstFormGroup.get('selectedCards')?.value as unknown as number[];
  }

  ngOnInit(): void {
    this.fairPrincipleService.searchCollection(
      'findUnverifiedPrinciplesByRaiseInstanceId', {
        params: {
          id: 1
        },
        sort: {
          dataset: 'ASC'
        },
        useCache: false
      }
    ).subscribe((response) => {
      this.fairPrincipleList = response.resources;

      this.fairPrincipleList.forEach((principle: FairPrinciple, index: number) => {
        const category = FairCategoriesEnum[principle.category as unknown as keyof typeof FairCategoriesEnum];
        switch (category) {
          case FairCategoriesEnum.FINDABILITY:
            this.cardsInfoFindable.push(index);
            break;
          case FairCategoriesEnum.ACCESIBILITY:
            this.cardsInfoAccessible.push(index);
            break;
          case FairCategoriesEnum.INTEROPERABILITY:
            this.cardsInfoInteroperable.push(index);
            break;
          case FairCategoriesEnum.REUSABILITY:
            this.cardsInfoReusable.push(index);
            break;
        }
      });
    })
  }

  handleChangedSelection(index: number) {
    if (!this.selectedCards)
      return false;

    const focusIndex = this.selectedCards.findIndex((element) => {
      return element === index
    });
    if (focusIndex === -1) {
      this.selectedCards.push(index);
    } else {
      this.selectedCards.splice(focusIndex, 1);
    }

    this.firstFormGroup.controls['selectedCards'].updateValueAndValidity();
    return true;
  }

  handleChangedSelectionAfterConfirm(index: number) {
    if (confirm("Do you want to unselect " + this.fairPrincipleList[index].name + "?")) {
      this.handleChangedSelection(index);
    }
  }
}
