import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ContractService } from 'src/app/services/contract.service';
import * as moment from 'moment';

@Component({
  selector: 'app-info-contract',
  templateUrl: './info-contract.component.html',
  styleUrls: ['./info-contract.component.scss']
})
export class InfoContractComponent {
  clientName: string = '';
  clientAddress: string = '';
  clientCIN: string = '';
  clientPhone: string = '';
  cadreService: string = '';
  FeeHour: string = '';
  forfait: string = '';
  accompte: string = '';
  lawyerName: string = '';
  lawyerAddress: string = '';
  lawyerPhone: string = '';
  lawyerCIN: string = '';
  nbDays: string = '';
  localisation: string = '';
  date: Date;

  constructor(private contractService: ContractService, private http: HttpClient) {}


  generateReport(): void {
    const formattedDate = this.date ? moment(this.date).format('YYYY-MM-DD') : '';

    const params = {
      clientName: this.clientName,
      clientAddress: this.clientAddress,
      clientCIN: this.clientCIN,
      clientPhone: this.clientPhone,
      cadreService: this.cadreService,
      FeeHour: this.FeeHour,
      forfait: this.forfait,
      accompte: this.accompte,
      lawyerName: this.lawyerName,
      lawyerAddress: this.lawyerAddress,
      lawyerPhone: this.lawyerPhone,
      lawyerCIN: this.lawyerCIN,
      nbDays: this.nbDays,
      localisation: this.localisation,
      date: formattedDate
    };

    this.contractService.generatePdf(params).subscribe(
      (response: any) => {
        // Check if the response is a Blob
        if (response instanceof Blob) {
          const blob = new Blob([response], { type: 'application/pdf' });
          
          // Create FormData object and append the blob data
          const formData = new FormData();
          formData.append('file', blob, 'contratFrancais.pdf');

          // Upload the PDF file to backend
          this.contractService.uploadPdf(formData).subscribe(
            (uploadResponse) => {
              console.log('PDF uploaded successfully:', uploadResponse);
              // Optionally, handle response from backend after upload
            },
            (uploadError) => {
              console.error('Error uploading PDF:', uploadError);
              // Handle error (if needed)
            }
          );
        } else {
          console.error('Unexpected response type. Expected Blob, but received:', response);
          // Handle unexpected response type
        }
      },
      (error) => {
        console.error('Error generating PDF:', error);
        // Handle error (if needed)
      }
    );
  }
}
