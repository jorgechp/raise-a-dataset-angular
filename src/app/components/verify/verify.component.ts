import {Component, inject, OnInit, ViewChild} from '@angular/core';

import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {MatCardModule} from '@angular/material/card';
import {TranslocoDirective} from "@jsverse/transloco";
import {MatStep, MatStepper, MatStepperModule} from "@angular/material/stepper";
import {minArrayLengthValidator} from "../utils/validators/array-length-validator";
import {ActivatedRoute, Router} from "@angular/router";
import {CommonModule, NgIf} from "@angular/common";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FeedSelectPrinciplesComponent} from "../feed/feed-select-principles/feed-select-principles.component";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {MatExpansionModule} from "@angular/material/expansion";
import {IVerificationDto} from "../../domain/verification-dto";
import {FairPrincipleService} from "../../services/fair-principle/fair-principle.service";
import {state} from "@angular/animations";
import {FairPrinciple} from "../../domain/fair-principle";
import {DatasetService} from "../../services/dataset/dataset.service";
import {Dataset} from "../../domain/dataset";
import {RepositoryService} from "../../services/repository/repository.service";
import {Repository} from "../../domain/repository";
import {RaiseInstanceService} from "../../services/raise-instance/raise-instance.service";
import {RaiseInstance} from "../../domain/raise-instance";
import {Verification} from "../../domain/verification";
import {AuthenticationService} from "../../services/authentication/authentication.service";
import {VerificationService} from "../../services/verification/verification.service";


@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrl: './verify.component.scss',
  standalone: true,
  imports: [
    MatInputModule,
    MatStepperModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    TranslocoDirective,
    NgIf
  ]
})
export class VerifyComponent implements OnInit{

  @ViewChild('stepper') private stepper: MatStepper | undefined;
  protected verificationDto?: IVerificationDto;
  protected fairPrincipleIndicator?: FairPrinciple;
  protected raiseInstance?: RaiseInstance;
  protected repository?: Repository;
  protected dataset?: Dataset;

  protected isNegativeComment?: boolean;


  constructor(private _formBuilder: FormBuilder,
              private fairPrincipleService: FairPrincipleService,
              private raiseInstanceService: RaiseInstanceService,
              private datasetInstanceService: DatasetService,
              private repositoryService: RepositoryService,
              private verificationService: VerificationService,
              private authenticationService: AuthenticationService,
              private router: Router) {
    const state = this.router.getCurrentNavigation()?.extras.state;
    if (state && state['verificationDto']) {
      this.verificationDto = state['verificationDto'];
    }
  }

  firstFormGroup = this._formBuilder.group({
    negativeComment: ['', ],
  });

  ngOnInit(): void {
    if(!this.verificationDto){
      return;
    }
    this.fairPrincipleService.getResource(this.verificationDto?.fairPrincipleId).subscribe(
        (response) => {
          this.fairPrincipleIndicator = response;
        }
    );
    this.raiseInstanceService.getResource(this.verificationDto?.instanceId).subscribe(
        (response) => {
          this.raiseInstance = response;
        }
    );
    this.datasetInstanceService.getResource(this.verificationDto?.datasetId).subscribe(
        (response) => {
          this.dataset = response;
        }
    );
    this.repositoryService.getResource(this.verificationDto?.repositoryId).subscribe(
        (response) => {
          this.repository = response;
        }
    );
  }


  handleGoToValidation() {
    if(this.stepper){
      this.stepper.selectedIndex = 2;
    }
  }

  handleDoVerification() {
    const verificationToAdd = new Verification();
    verificationToAdd.isPositive = this.isNegativeComment;
    verificationToAdd.author = this.authenticationService.getCurrentUser().uri!;
    verificationToAdd.principle = this.fairPrincipleIndicator?.uri;
    verificationToAdd.instance = this.raiseInstance?.uri;
    verificationToAdd.negativeComment = this.firstFormGroup.get('negativeComment')?.value  as unknown as string;
    verificationToAdd.verificationDate = new Date().toISOString();

    this.verificationService.add(verificationToAdd).subscribe();
  }

  handleGoToVerifications() {
    this.router.navigate(['verifications'], {}).then();
  }
}
