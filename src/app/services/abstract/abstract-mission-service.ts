import {RequestOption, Resource} from "@lagoshny/ngx-hateoas-client";
import {AbstractHateoasService} from "./abstract-hateoas.service";
import {Observable, tap} from "rxjs";
import {MissionService} from "../mission/mission.service";
import {AuthenticationService} from "../authentication/authentication.service";
import {inject} from "@angular/core";
import {MissionListenerService} from "../mission-listener/mission-listener.service";

export class AbstractMissionService<T extends Resource> extends AbstractHateoasService<T>{
  protected missionListenerService: MissionListenerService;
  private readonly username: string | undefined;
    protected missionService: MissionService;
    protected authenticationService: AuthenticationService;

    constructor(resourceType: { new(): T }) {
        super(resourceType);

        this.missionService = inject(MissionService);
      this.authenticationService = inject(AuthenticationService);
      this.missionListenerService = inject(MissionListenerService);
        const currentUser = this.authenticationService.getCurrentUser();
        this.username = currentUser.username;
    }

    override add(elementToAdd: T): Observable<T> {
      return super.add(elementToAdd).pipe(
        tap(
          () => this.handleMissionCheck()
        )
      );
    }

    override createResource(requestBody: any, options?: RequestOption): Observable<T> {
      return super.createResource(requestBody, options).pipe(
        tap(
          () => this.handleMissionCheck()
        )
      );
    }

  private handleMissionCheck(): void {
        if (this.username) {
            this.missionService.checkAllMissions(this.username).subscribe(
                (response) => {
                  if (response.length > 0) {
                    this.missionListenerService.updateValue(response);
                  }
                }
            );
        }
    }
}
