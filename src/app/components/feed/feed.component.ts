import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatStepper, MatStepperModule} from "@angular/material/stepper";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
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
import {Compliance} from "../../domain/compliance";
import {AuthenticationService} from "../../services/authentication/authentication.service";
import { Router} from "@angular/router";
import {
  ComplianceService
} from "../../services/compliance/compliance.service";
import {forkJoin} from "rxjs";
import {RaiseInstance} from "../../domain/raise-instance";
import {getIdFromURI} from "../utils/funcions";
import {TranslocoDirective} from "@jsverse/transloco";

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
    MatExpansionModule,
    TranslocoDirective
  ],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.scss'
})
export class FeedComponent implements OnInit {
  firstFormGroup = this._formBuilder.group({
    selectedCards: [[], {validators: [minArrayLengthValidator(1)]}],
  });

  protected selectedPrinciples: number[] = [];

  readonly dialog = inject(MatDialog);
  protected fairPrincipleList: FairPrinciple[] = [];
  protected cardsInfoFindable: number[] = [];
  protected cardsInfoAccessible: number[] = [];
  protected cardsInfoInteroperable: number[] = [];
  protected cardsInfoReusable: number[] = [];
  @ViewChild('stepper') private stepper: MatStepper | undefined;
  private raiseInstance?: RaiseInstance;

  constructor(private _formBuilder: FormBuilder,
              private fairPrincipleService: FairPrincipleService,
              private complianceService: ComplianceService,
              private authenticationService: AuthenticationService,
              private router: Router) {
    this.selectedPrinciples = this.firstFormGroup.get('selectedCards')?.value as unknown as number[]
    const state = this.router.getCurrentNavigation()?.extras.state;
    if (state && state['raiseInstance']) {
      this.raiseInstance = state['raiseInstance'];
    }
  }

  ngOnInit(): void {
    this.fairPrincipleService.searchCollection(
      'findUnverifiedPrinciplesByRaiseInstanceId', {
        params: {
          raiseInstanceId: Number(getIdFromURI(this.raiseInstance?.uri!))
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
          case FairCategoriesEnum.ACCESSIBILITY:
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
    if (!this.selectedPrinciples)
      return false;

    const focusIndex = this.selectedPrinciples.findIndex((element) => {
      return element === index
    });
    if (focusIndex === -1) {
      this.selectedPrinciples.push(index);
    } else {
      this.selectedPrinciples.splice(focusIndex, 1);
    }

    this.firstFormGroup.controls['selectedCards'].updateValueAndValidity();
    return true;
  }

  handleChangedSelectionAfterConfirm(index: number) {
    if (confirm("Do you want to unselect " + this.fairPrincipleList[index].name + "?")) {
      this.handleChangedSelection(index);
    }
  }

  handleApplyPrinciples() {
    const promises: any[] = [];


    this.selectedPrinciples.forEach((selectedPrinciple) => {
      const principle = this.fairPrincipleList[selectedPrinciple];
      const newRaiseFairPrincipleVerification = new Compliance();
      newRaiseFairPrincipleVerification.principle = principle.uri!;
      newRaiseFairPrincipleVerification.author = this.authenticationService.getCurrentUser().uri!;
      newRaiseFairPrincipleVerification.instance = this.raiseInstance?.uri;
      newRaiseFairPrincipleVerification.verificationDate = new Date().toISOString();

      promises.push(this.complianceService.add(newRaiseFairPrincipleVerification));
    });

    forkJoin(promises).subscribe(
        () => {
          this.stepper?.next();
        }
    );
  }

  handleGoToInstancePage() {
    this.router.navigate(['instance/' + getIdFromURI(this.raiseInstance?.uri!)], {}).then();
  }
}
