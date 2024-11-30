import {Component, OnInit, ViewChild} from '@angular/core';

import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {MatCardModule} from '@angular/material/card';
import {TranslocoDirective} from "@jsverse/transloco";
import {MatStepper, MatStepperModule} from "@angular/material/stepper";
import {Router} from "@angular/router";
import {NgIf} from "@angular/common";
import {FairPrincipleService} from "../../services/fair-principle/fair-principle.service";
import {FairPrincipleIndicator} from "../../domain/fair-principle-indicator";
import {DatasetService} from "../../services/dataset/dataset.service";
import {Dataset} from "../../domain/dataset";
import {RepositoryService} from "../../services/repository/repository.service";
import {Repository} from "../../domain/repository";
import {RaiseInstanceService} from "../../services/raise-instance/raise-instance.service";
import {RaiseInstance} from "../../domain/raise-instance";
import {AuthenticationService} from "../../services/authentication/authentication.service";
import {forkJoin} from "rxjs";
import {IComplianceDTO} from "../../domain/compliance-dto";
import {ComplianceService} from "../../services/compliance/compliance.service";
import {Validation} from "../../domain/validation";
import {ValidationService} from "../../services/validation/validation.service";
import {Compliance} from "../../domain/compliance";


@Component({
  selector: 'app-verify',
  templateUrl: './validate.component.html',
  styleUrl: './validate.component.scss',
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
export class ValidateComponent implements OnInit{

  @ViewChild('stepper') private stepper: MatStepper | undefined;
  protected complianceDTO?: IComplianceDTO;
  protected fairPrincipleIndicator?: FairPrincipleIndicator;
  protected raiseInstance?: RaiseInstance;
  protected repository?: Repository;
  protected dataset?: Dataset;

  protected isNegativeComment: boolean | undefined;
  protected compliance?: Compliance;


  constructor(private _formBuilder: FormBuilder,
              private fairPrincipleService: FairPrincipleService,
              private raiseInstanceService: RaiseInstanceService,
              private datasetInstanceService: DatasetService,
              private repositoryService: RepositoryService,
              private complianceService: ComplianceService,
              private validationService: ValidationService,
              private authenticationService: AuthenticationService,
              private router: Router) {
    const state = this.router.getCurrentNavigation()?.extras.state;
    if (state && state['verificationDto']) {
      this.complianceDTO = state['verificationDto'];
    }
  }

  firstFormGroup = this._formBuilder.group({
    negativeComment: ['', ],
  });

  ngOnInit(): void {
    if(!this.complianceDTO){
      return;
    }

    forkJoin([
      this.fairPrincipleService.getResource(this.complianceDTO?.fairPrincipleId),
      this.datasetInstanceService.getResource(this.complianceDTO?.datasetId),
      this.repositoryService.getResource(this.complianceDTO?.datasetId),
      this.raiseInstanceService.getResource(this.complianceDTO?.instanceId),
      this.complianceService.getResource(this.complianceDTO?.id),
    ]).subscribe(
        ([fairPrinciple, dataset, repository, raiseInstance, compliance]) => {
          this.fairPrincipleIndicator = fairPrinciple;
          this.dataset = dataset;
          this.repository = repository;
          this.raiseInstance = raiseInstance;
          this.compliance = compliance;
        }
    );
  }


  handleGoToValidation() {
    if(this.stepper){
      this.stepper.selectedIndex = 2;
    }
  }

  handleDoVerification() {
    const validation = new Validation();
    validation.isPositive = this.isNegativeComment;
    validation.validator = this.authenticationService.getCurrentUser().uri!;
    validation.negativeComment = this.firstFormGroup.get('negativeComment')?.value  as unknown as string;
    validation.compliance = this.compliance?.uri;

    this.validationService.add(validation).subscribe();
  }

  handleGoToCompliances() {
    this.router.navigate(['compliances'], {}).then();
  }
}
