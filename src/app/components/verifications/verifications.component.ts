import {Component, OnInit} from '@angular/core';
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {IVerificationDto} from "../../domain/verification-dto";
import {VerificationDtoService} from "../../services/verification/verification-dto.service";
import {CommonModule} from "@angular/common";


@Component({
  selector: 'app-verifications',
  standalone: true,
  imports: [CommonModule, MatTableModule],
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
            this.dataSource.data = [...verifications];
          }
      )
  }

}
