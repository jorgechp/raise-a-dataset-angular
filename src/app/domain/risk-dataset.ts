import {HateoasResource} from "@lagoshny/ngx-hateoas-client";
import {AbstractDataset} from "./abstract-dataset";
import {RiskCategoriesEnum} from "./risk-categories-enum";

@HateoasResource('riskDatasets')
export class RiskDataset extends AbstractDataset {
  public address: string | undefined;
  public category: RiskCategoriesEnum | undefined;
}
