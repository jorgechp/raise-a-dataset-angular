
export interface RaiseInstanceDTO {
    id: number;
    datasetId: number;
    repositoryId: number;
    datasetName: string;
    repositoryName: string;
    nextActionDate: string;
    feedFrequencyInDays: number;
    agreeToRaise: boolean;
}
