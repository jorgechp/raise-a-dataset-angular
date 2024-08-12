import {FairCategoriesEnum} from "./fair-categories-enum";

export interface IVerificationDto {
    id: string;
    fairPrincipleId: number;
    authorId: number;
    authorName: string;
    instanceId: number;
    repositoryId: number;
    repositoryName: number;
    datasetId: number;
    datasetName: string;
    fairPrinciplePrefix: string;
    fairPrincipleName: string;
    fairCategory: FairCategoriesEnum;
    verificationDate: Date;
}
