
export interface RaiseInstanceDTO {
    id: number;
  uri: string;
    datasetId: number;
    repositoryId: number;
    datasetName: string;
    repositoryName: string;
    nextActionDate: string;
    feedFrequencyInDays: number;
    agreeToRaise: boolean;
}
