import {Component, OnInit} from "@angular/core";
import {AbstractComponent} from "./abstract-component";
import {TranslocoService} from "@jsverse/transloco";

@Component({
  template: ''
})
export abstract class AbstractTranslationsComponent extends AbstractComponent implements OnInit {


  protected constructor(protected translocoService: TranslocoService) {
    super();
  }

  ngOnInit(): void {
    this.loadTranslations();
  }

  /**
   * Subscribe to translations
   * @protected
   */
  protected abstract loadTranslations(): void;


}
