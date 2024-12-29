// src/app/components/orcid-modal/orcid-modal.component.ts
import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-orcid-modal',
  templateUrl: './orcid-modal.component.html',
  standalone: true,
  styleUrls: ['./orcid-modal.component.scss']
})
export class OrcidModalComponent {
  constructor(public dialogRef: MatDialogRef<OrcidModalComponent>) {
  }

  authenticateWithOrcid() {
    // Lógica para autenticar con ORCID
    // Llama a la API de ORCID y obtiene la información del usuario
  }

  closeModal() {
    this.dialogRef.close();
  }
}
