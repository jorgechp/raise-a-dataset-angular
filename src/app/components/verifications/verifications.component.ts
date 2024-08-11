import {Component, OnInit} from '@angular/core';
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {IVerificationDto} from "../../domain/verification-dto";
import {VerificationDtoService} from "../../services/verification/verification-dto.service";
import {CommonModule} from "@angular/common";
import {Router} from "@angular/router";
import {TranslocoDirective} from "@jsverse/transloco";


@Component({
  selector: 'app-verifications',
  standalone: true,
  imports: [CommonModule, MatTableModule, TranslocoDirective],
  templateUrl: './verifications.component.html',
  styleUrl: './verifications.component.scss'
})
export class VerificationsComponent implements OnInit {
  displayedColumns: Iterable<string> = ['datasetName', 'repositoryName', 'fairPrincipleName', 'fairCategory', 'authorName', 'verificationDate'];
  dataSource: MatTableDataSource<IVerificationDto>;


  constructor(private VerificationDtoService: VerificationDtoService,
              private router: Router) {
    this.dataSource = new MatTableDataSource<IVerificationDto>([]);
  }

  ngOnInit(): void {
      this.VerificationDtoService.retrieveAllVerificationInstanceDTO().subscribe(
          (verificationResponse) => {
            this.dataSource = new MatTableDataSource<IVerificationDto>(verificationResponse);
          }
      )
  }

  handleClickOnVerification(row: IVerificationDto) {
    this.router.navigate(['verify'], {state: {verificationDto: row}}).then();
  }
}
