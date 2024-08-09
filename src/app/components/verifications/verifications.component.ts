import {Component, OnInit} from '@angular/core';
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {IVerificationDto} from "../../domain/verification-dto";
import {VerificationDtoService} from "../../services/verification/verification-dto.service";


@Component({
  selector: 'app-verifications',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './verifications.component.html',
  styleUrl: './verifications.component.scss'
})
export class VerificationsComponent implements OnInit {
  displayedColumns: Iterable<string> = ['datasetId'];
  dataSource: MatTableDataSource<IVerificationDto>;


  constructor(private VerificationDtoService: VerificationDtoService) {
    this.dataSource = new MatTableDataSource<IVerificationDto>([]);
  }

  ngOnInit(): void {
      this.VerificationDtoService.retrieveAllVerificationInstanceDTO().subscribe(
          (verificationResponse) => {
            const verifications: IVerificationDto[] = verificationResponse;
            const verificationsDataSource: IVerificationDto[] = [];

            verifications.forEach((verification: IVerificationDto) => {
                verificationsDataSource.push({
                    datasetId: verification.datasetId,
                    datasetName: verification.datasetName,
                    authorId: verification.authorId,
                    authorName: verification.authorName,
                    fairPrincipleId: verification.fairPrincipleId,
                    fairPrinciplePrefix: verification.fairPrinciplePrefix,
                    fairPrincipleName: verification.fairPrincipleName,
                    fairCategory: verification.fairCategory,
                    instanceId: verification.instanceId,
                    verificationDate: verification.verificationDate,
                } as IVerificationDto);
            });

            this.dataSource.data = [...verificationsDataSource];
          }
      )
  }

}
