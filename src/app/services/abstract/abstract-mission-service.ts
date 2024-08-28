import {RequestOption, Resource} from "@lagoshny/ngx-hateoas-client";
import {AbstractHateoasService} from "./abstract-hateoas.service";
import {Observable} from "rxjs";
import {MissionService} from "../mission/mission.service";
import {AuthenticationService} from "../authentication/authentication.service";
import {inject} from "@angular/core";

export class AbstractMissionService<T extends Resource> extends AbstractHateoasService<T>{
    private username: string | undefined;
    protected missionService: MissionService;
    protected authenticationService: AuthenticationService;


    constructor(resourceType: { new(): T }) {
        super(resourceType);

        this.missionService = inject(MissionService);
        this.authenticationService = inject(AuthenticationService)
        const currentUser = this.authenticationService.getCurrentUser();
        this.username = currentUser.username;
    }


    private handleMissionCheck(response: Observable<T>): Observable<T> {
        if (this.username) {
            this.missionService.checkAllMissions(this.username).subscribe(
                (response) => {
                    console.log(response);
                }
            );
        }
        return response;
    }

    override add(elementToAdd: T): Observable<T> {
        const response = super.add(elementToAdd);
        return this.handleMissionCheck(response);
    }

    override createResource(requestBody: any, options?: RequestOption): Observable<T> {
        const response = super.createResource(requestBody, options);
        return this.handleMissionCheck(response);
    }
}
