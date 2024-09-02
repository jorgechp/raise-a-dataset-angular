import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {
  HateoasResourceOperation,
  PagedResourceCollection,
  Resource,
  ResourceCollection,
} from "@lagoshny/ngx-hateoas-client";
import {GenericTableComponent, IGenericTableColumn} from "../../generic-table/generic-table.component";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TranslocoDirective, TranslocoService} from "@jsverse/transloco";
import {AbstractTranslationsComponent} from "../../abstract/abstract-translations-component";
import {takeWhile} from "rxjs";
import {MatCard, MatCardActions, MatCardContent, MatCardHeader,} from "@angular/material/card";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {NgIf} from "@angular/common";
import {GenericResource} from "../../../domain/generic-resource";
import {getIdFromURI} from "../../utils/funcions";


@Component({
  selector: 'app-abstract-admin',
  standalone: true,
  imports: [
    MatButton,
    MatInput,
    NgIf,
    MatFormField,
    GenericTableComponent,
    MatCardContent,
    MatFormFieldModule,
    TranslocoDirective,
    ReactiveFormsModule,
    MatCardActions,
    MatCard,
    MatCardHeader
  ],
  templateUrl: './generic-admin.component.html',
  styleUrl: './generic-admin.component.scss'
})
export class GenericAdminComponent<T extends GenericResource> extends AbstractTranslationsComponent {
  @ViewChild("table") tableComponent: GenericTableComponent<T> | undefined;

  @Input() title: string;
  @Input() columns: IGenericTableColumn[];
  @Input() service: HateoasResourceOperation<T> | undefined;
  @Input() controls: FormControl[];
  @Input() saveSettingsMessage: string;
  @Input() deletedUserMessage: string;
  @Input() isPagedRepository: boolean;
  @Input() customEndpointToCall?: Function;
  @Input() hideSaveButtons?: boolean;


  @Output() prepareObjectToBeSent = new EventEmitter<{ item: T, isValidForm: Function, onResult: Function }>()
  @Output() prepareFormControls = new EventEmitter<{ row: T }>()

  private isValidForm: boolean = false;
  protected resourcesRows: PagedResourceCollection<Resource> | ResourceCollection<Resource> | undefined;
  protected customRows?: Array<T>;
  protected selectedItem?: T;
  protected deleteUserMessageText?: string;
  protected saveUserMessageText?: string;

  constructor(private snackBar: MatSnackBar,
              private translateService: TranslocoService) {
    super(translateService);
    this.title = '';
    this.columns = [];
    this.controls = [];
    this.saveSettingsMessage = '';
    this.deletedUserMessage = '';
    this.isPagedRepository = true;
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.getResources();
  }

  rowHandlerEvent($event: Resource) {
    this.selectedItem = $event as T;
    this.prepareFormControls.emit({
      row: $event as T
    });
  }

  onSave(): void {
    if (this.selectedItem && this.service) {
      this.prepareObjectToBeSent.emit(
        {
          item: this.selectedItem,
          isValidForm: (response: boolean) => {
            this.isValidForm = response;
          },
          onResult: (result: T) => {
            if (!this.isValidForm) return;
            this.service!.patchResource(result).subscribe(
              (response) => {
                this.snackBar.open(`${this.saveUserMessageText}`, undefined,
                  {
                    duration: 4000
                  });
              }
            );
          }
        }
      );
    }
  }

  handleDeleteAccount() {
    if (this.selectedItem && this.service) {
      let idToRemove = String(this.selectedItem.id ? this.selectedItem.id : getIdFromURI(this.selectedItem.uri!));

      this.service.deleteResourceById(idToRemove!).subscribe(
        (response) => {
          delete this.selectedItem;
          this.selectedItem = undefined;
          this.getResources();
          this.snackBar.open(`${this.deleteUserMessageText}`, undefined,
            {
              duration: 4000
            });
        }
      );
    }
  }

  protected override loadTranslations() {
    this.translocoService.selectTranslate(this.deletedUserMessage).pipe(takeWhile(() => this.isAlive))
      .subscribe(value => this.deleteUserMessageText = value);
    this.translocoService.selectTranslate(this.saveSettingsMessage).pipe(takeWhile(() => this.isAlive))
      .subscribe(value => this.saveUserMessageText = value);
  }

  private getResources() {
    if (this.service) {
      let serviceCaller;
      if (!this.isPagedRepository) {
        serviceCaller = this.service.getCollection.bind(this.service);
      } else {
        serviceCaller = this.service.getPage.bind(this.service);
      }
      if (this.customEndpointToCall) {
        serviceCaller = this.customEndpointToCall.bind(this.service);
      }
      if (!serviceCaller) return;

      serviceCaller.call({useCache: false}).subscribe((data: PagedResourceCollection<Resource>
        | ResourceCollection<Resource>
        | Array<T>
        | undefined) => {

        if (data) {
          if (data instanceof Array) {
            this.customRows = data;
          } else {
            if (!this.resourcesRows) {
              this.resourcesRows = data;
            } else {
              this.resourcesRows.resources = [...data.resources];
              this.tableComponent?.updateRows(this.resourcesRows.resources as T[]);
            }
          }

        }
      });
    }
    }

}
