import {AbstractHateoasService} from "./abstract-hateoas.service";
import {GenericResource} from "../../domain/generic-resource";
import {BehaviorSubject, Observable} from "rxjs";

export abstract class AbstractIndicatorService<T extends GenericResource> extends AbstractHateoasService<T> {
  private indicatorValueBehavior = new BehaviorSubject<number>(0);
  private _indicatorValueObservable = this.indicatorValueBehavior.asObservable();

  get indicatorValueObservable(): Observable<number> {
    return this._indicatorValueObservable;
  }

  updateIndicatorValue(numberToUpdate: number) {
    this.indicatorValueBehavior.next(numberToUpdate);
  }

  public increaseIndicatorValue(numberToUpdate: number) {
    this.updateIndicatorValue(this.indicatorValueBehavior.value + numberToUpdate);
  }

}
