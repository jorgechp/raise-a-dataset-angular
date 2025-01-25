import {User} from "./user";

export interface IUserStateDTO {
  user: User;
  userName: string;
  registrationDate: string;
  numberOfValidations: number;
  numberOfCompliances: number;
  numberOfDatasetInstances: number;
  numberOfDatasetRescued: number;
  totalScore: number;
}
