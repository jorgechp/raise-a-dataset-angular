import {Component, ElementRef, EventEmitter, inject, OnInit, Output, ViewChild} from '@angular/core';
import {MatFormFieldModule} from "@angular/material/form-field";
import {Repository} from "../../../domain/repository";
import {RepositoryService} from "../../../services/repository/repository.service";
import {ResourceCollection} from "@lagoshny/ngx-hateoas-client";
import {FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {AsyncPipe, CommonModule, NgOptimizedImage} from "@angular/common";
import {MatInputModule} from "@angular/material/input";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {MatDialogActions} from "@angular/material/dialog";
import {AuthenticationService} from "../../../services/authentication/authentication.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TranslocoDirective, TranslocoService} from "@jsverse/transloco";
import {AbstractTranslationsComponent} from "../../abstract/abstract-translations-component";
import {takeWhile} from "rxjs";

@Component({
  selector: 'app-repository',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
    NgOptimizedImage,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatButton,
    MatDialogActions,
    TranslocoDirective,
  ],
  templateUrl: './repository.component.html',
  styleUrl: './repository.component.scss'
})
export class RepositoryComponent extends AbstractTranslationsComponent implements OnInit {
  @ViewChild('input') input: ElementRef<HTMLInputElement> | undefined;

  repositoryCtrl = new FormControl<string>('');
  filteredRepositories: Repository[];
  repositories: Repository[] = [];
  isAddNewRepositoryMode: boolean = false;
  @Output() selectedValue: EventEmitter<Repository> = new EventEmitter();
  private fb = inject(FormBuilder);
  newRepositoryForm = this.fb.group({
    name: [null, Validators.required],
    url: [null, Validators.required],
    description: [null, Validators.required]
  },);
  private repositoryCreatedMessage: string | undefined;

  constructor(private repositoryService: RepositoryService,
              private userAuthentication: AuthenticationService,
              private snackBar: MatSnackBar,
              private transLoco: TranslocoService) {
    super(transLoco);
    this.filteredRepositories = [];
    this.loadTranslations();
  }

  override ngOnInit(): void {
    this.repositoryService.getCollection().subscribe(
      (repositoriesCollection: ResourceCollection<Repository>) => {
        this.repositories = repositoriesCollection.resources;
        this.filteredRepositories = this.repositories.slice();
      }
    )
  }

  public filterRepositories(): void {
    const filterValue = this.input!.nativeElement.value.toLowerCase();
    this.repositories = this.repositories.filter(o => o.name?.toLowerCase().includes(filterValue));
  }

  handleOptionSelected() {
    const selectedName = this.input!.nativeElement.value.toLowerCase();
    this.selectedValue.emit(this.repositories.find(o => o.name?.toLowerCase().includes(selectedName)));
  }

  handleAddRepository() {
    this.isAddNewRepositoryMode = !this.isAddNewRepositoryMode;
  }

  handleRepositoryCreation() {
    const repositoryToAdd = new Repository();
    repositoryToAdd.name = this.newRepositoryForm.get("name")!.value!;
    repositoryToAdd.description = this.newRepositoryForm.get("description")!.value!;
    repositoryToAdd.address = this.newRepositoryForm.get("url")!.value!;
    repositoryToAdd.addedBy = this.userAuthentication.getCurrentUser().uri;

    this.repositoryService.add(repositoryToAdd).subscribe(
      (newRepository) => {
        this.selectedValue.emit(newRepository);
        this.snackBar.open(this.repositoryCreatedMessage ? this.repositoryCreatedMessage : '');
      }
    );
  }

  protected loadTranslations(): void {
    this.translocoService.selectTranslate('repository.repositoryCreated').pipe(takeWhile(() => this.isAlive))
      .subscribe(value => this.repositoryCreatedMessage = value);
  }


}
