import {Component, OnDestroy} from "@angular/core";

@Component({
  template: ''
})
export abstract class AbstractComponent implements OnDestroy {

  /**
   * Flag to indicate if the component is still active.
   * This is useful for destroying infinite subscriptions when executing ngOnDestroy()
   * @protected
   */
  protected isAlive: boolean = true;

  protected constructor() {
  }

  ngOnDestroy(): void {
    this.isAlive = false;
  }


}
