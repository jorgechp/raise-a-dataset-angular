import {IComplianceDTO} from "./compliance-dto";


export interface IComplianceValidationDTO extends IComplianceDTO {
  downVotes: number,
  upVotes: number
}
