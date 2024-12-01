import {Component, computed, inject, OnInit, ViewChild} from '@angular/core';

import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {MatCardModule} from '@angular/material/card';
import {MatStep, MatStepper, MatStepperNext, MatStepperPrevious} from "@angular/material/stepper";
import {RaiseDatasetIntroComponent} from "./intro/raise-dataset-intro.component";
import {RaiseDatasetForm1Component} from "./form1/raise-dataset-form-1.component";
import {RaiseDatasetForm2Component} from "./form2/raise-dataset-form-2.component";
import {MAT_DATE_LOCALE, provideNativeDateAdapter} from "@angular/material/core";
import {AuthenticationService} from "../../services/authentication/authentication.service";
import {DOIRexp} from "../utils/regexp/regexps";
import {CommonModule} from "@angular/common";
import {Dataset} from "../../domain/dataset";
import {DatasetService} from "../../services/dataset/dataset.service";
import {Repository} from "../../domain/repository";
import {RaiseInstance} from "../../domain/raise-instance";
import {RaiseInstanceService} from "../../services/raise-instance/raise-instance.service";
import {TranslocoDirective} from "@jsverse/transloco";
import {Router, RouterLink} from "@angular/router";
import {AbstractDataset} from "../../domain/abstract-dataset";
import {getIdFromURI} from "../utils/funcions";

enum RAISE_MODE {
  RAISE,
  ADD_REPOSITORY,
  RESCUE
}

const DOI_URL_VALUE = 'https://doi.org/';

@Component({
  selector: 'app-raise-dataset',
  templateUrl: './raise-dataset.component.html',
  styleUrl: './raise-dataset.component.scss',
  standalone: true,
  providers: [{provide: MAT_DATE_LOCALE, useValue: 'en-GB'}, provideNativeDateAdapter()],
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    MatStepper,
    MatStep,
    MatStepperPrevious,
    MatStepperNext,
    ReactiveFormsModule,
    RaiseDatasetIntroComponent,
    RaiseDatasetForm1Component,
    RaiseDatasetForm2Component,
    TranslocoDirective,
    RouterLink
  ]
})
export class RaiseDatasetComponent implements OnInit {
  private fb = inject(FormBuilder);
  protected mode: RAISE_MODE = RAISE_MODE.RAISE;
  protected dataset: AbstractDataset | undefined;
  protected datasetInstanceId: number | string | undefined;

  public datasetForm = this.fb.group({
    name: ['', Validators.required],
    createdBy: [this.authenticationService.getCurrentUser().username, Validators.required],
    registeredBy: [this.authenticationService.getCurrentUser().username, Validators.required],
    description: ['', Validators.required],
    creationDate: [new Date().toISOString().slice(0, 10), Validators.required],
  });

  public repositoryForm = this.fb.group({
    repository: [null, Validators.required],
    doi: [null, Validators.compose([Validators.required, Validators.pattern(DOIRexp)])],

  });
  @ViewChild('stepper') private stepper: MatStepper | undefined;
  private readonly dateFormatString = computed(() => {
    return 'DD/MM/YYYY';
  });

  constructor(private authenticationService: AuthenticationService,
              private datasetService: DatasetService,
              private raiseInstanceService: RaiseInstanceService,
              private router: Router) {

    const state = this.router.getCurrentNavigation()?.extras.state;
    if (state && (state['isRescue'] || state['dataset'])) {
      this.mode = state['isRescue'] ? RAISE_MODE.RESCUE : RAISE_MODE.ADD_REPOSITORY;
      this.dataset = state['dataset'];
    }
  }

  ngOnInit(): void {
    if(this.mode == RAISE_MODE.RESCUE){
      if(this.dataset){
        this.dataset.name && this.datasetForm.get('name')!.setValue(this.dataset.name);
        this.dataset.createdBy && this.datasetForm.get('createdBy')!.setValue(this.dataset.createdBy);
        this.dataset.registeredBy && this.datasetForm.get('registeredBy')!.setValue(this.dataset.registeredBy);
        this.dataset.description && this.datasetForm.get('description')!.setValue(this.dataset.description);
        this.dataset.creationDate && this.datasetForm.get('creationDate')!.setValue(this.dataset.creationDate);
      }
    }
  }

  onSubmit(): void {

    if (this.datasetForm && this.repositoryForm) {
      const currentUser = this.authenticationService.getCurrentUser().uri!;
      const selectedRepository: Repository = this.repositoryForm.get('repository')!.value!;

      const datasetToRegister: Dataset
          = (this.mode == RAISE_MODE.ADD_REPOSITORY && this.dataset) ? this.dataset as Dataset : new Dataset();

      if (this.mode != RAISE_MODE.ADD_REPOSITORY) {
        datasetToRegister.name = this.datasetForm.get('name')!.value!;
        datasetToRegister.createdBy = this.datasetForm.get('createdBy')!.value!;
        datasetToRegister.registeredBy = this.datasetForm.get('registeredBy')!.value!;
        datasetToRegister.creationDate = new Date(this.datasetForm.get('creationDate')!.value!).toISOString();
        datasetToRegister.registrationDate = new Date().toISOString();
        datasetToRegister.maintainedBy = [currentUser];
        datasetToRegister.description = this.datasetForm.get("description")!.value!;
        datasetToRegister.repositories = [selectedRepository];
        if(this.mode == RAISE_MODE.RESCUE){
          datasetToRegister.rescuedBy = currentUser;
        }
        datasetToRegister.isRescued = this.mode == RAISE_MODE.RESCUE;

        this.datasetService.add(datasetToRegister).subscribe(
          (newDataset: Dataset) => {
            this.addNewRaiseInstance(newDataset, selectedRepository).subscribe((raiseInstance: RaiseInstance) => {
              this.datasetInstanceId = Number(getIdFromURI(raiseInstance.uri!));
              this.raiseInstanceService.verifyRaiseInstance(this.datasetInstanceId, raiseInstance.uniqueIdentifier!).subscribe(
                (response) => {
                }
              );
              this.stepper?.next();
            })
          }
        )
      } else {
        this.addNewRaiseInstance(datasetToRegister, selectedRepository);
      }
    }
  }

  private addNewRaiseInstance(dataset: Dataset, repository: Repository) {
    const raiseInstance: RaiseInstance = new RaiseInstance();
    raiseInstance.dataset = dataset.uri;
    raiseInstance.repository = repository.uri;
    raiseInstance.uniqueIdentifier = DOI_URL_VALUE + this.repositoryForm.get('uniqueIdentifier')!.value!;
    raiseInstance.date = new Date().toISOString();
    raiseInstance.user = this.authenticationService.getCurrentUser().uri!;
    return this.raiseInstanceService.add(raiseInstance);
  }


  goToDashBoard() {
    this.router.navigate(['/dashboard']).then();
  }


  goToInstancePage() {
    this.router.navigate(['/instance', this.datasetInstanceId]).then();
  }

  protected readonly RAISE_MODE = RAISE_MODE;
}
