import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ContractService } from 'src/app/services/contract.service';

@Component({
  selector: 'app-info-contract',
  templateUrl: './info-contract.component.html',
  styleUrls: ['./info-contract.component.scss']
})
export class InfoContractComponent implements OnInit {
  firstPartyName: string = '';
  firstPartyID: string = '';
  secondPartyName: string = '';
  secondPartyID: string = '';
  jrxmlContent: string;
  
  constructor(private contractService: ContractService,private http:HttpClient) {}
  generatePdf() {
    const params = {
      firstPartyName: this.firstPartyName,
      firstPartyID: this.firstPartyID,
      secondPartyName: this.secondPartyName,
      secondPartyID: this.secondPartyID
    };

  
    this.contractService.generatePdf(params).subscribe(
      (response) => {
        // Handle successful response
        console.log('PDF generated successfully:', response);
        const pdfPath = `assets/reports/test.pdf`; 
        window.open(pdfPath, '_blank');
      },
      (error) => {
        // Handle error
        console.error('Error generating PDF:', error);
      }
    );
  }
  ngOnInit(): void {
    this.loadJRXML();
  }

  loadJRXML(): void {
    this.http.get('assets/templates/test.jrxml', { responseType: 'text' })
      .subscribe(
        data => {
          this.jrxmlContent = data;
        },
        error => {
          console.log('Error loading JRXML:', error);
        }
      );
  }

}
