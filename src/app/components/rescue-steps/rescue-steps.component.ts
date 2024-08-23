import {Component, ViewChild} from '@angular/core';
import {MatStepper, MatStepperModule} from "@angular/material/stepper";
import {MatCardHeader, MatCardModule} from "@angular/material/card";
import {Validation} from "../../domain/validation";
import {FairPrinciple} from "../../domain/fair-principle";
import {RaiseInstance} from "../../domain/raise-instance";
import {Repository} from "../../domain/repository";
import {Dataset} from "../../domain/dataset";
import {Compliance} from "../../domain/compliance";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {ValidationService} from "../../services/validation/validation.service";
import {AuthenticationService} from "../../services/authentication/authentication.service";
import {Router} from "@angular/router";
import {RiskDataset} from "../../domain/risk-dataset";
import { MatFormFieldModule, MatLabel} from "@angular/material/form-field";

@Component({
  selector: 'app-rescue-steps',
  standalone: true,
  imports: [
    MatStepperModule,
    MatStepperModule,
    MatCardModule,
    MatCardHeader,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatLabel
  ],
  templateUrl: './rescue-steps.component.html',
  styleUrl: './rescue-steps.component.scss'
})
export class RescueStepsComponent {

  @ViewChild('stepper') private stepper: MatStepper | undefined;
  protected riskDataset?: RiskDataset;

  protected isNegativeComment: boolean | undefined;
  protected compliance?: Compliance;

  constructor(private _formBuilder: FormBuilder,
              private validationService: ValidationService,
              private authenticationService: AuthenticationService,
              private router: Router) {
    const state = this.router.getCurrentNavigation()?.extras.state;
    if (state && state['riskDataset']) {
      this.riskDataset = state['riskDataset'];
    }
  }

  firstFormGroup = this._formBuilder.group({
    negativeComment: ['', ],
  });

  ngOnInit(): void {
    if(!this.riskDataset){
      return;
    }


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
