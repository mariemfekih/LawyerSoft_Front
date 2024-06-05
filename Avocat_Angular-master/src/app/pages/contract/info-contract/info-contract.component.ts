import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ContractService } from 'src/app/services/contract.service';
import * as moment from 'moment';


@Component({
  selector: 'app-info-contract',
  templateUrl: './info-contract.component.html',
  styleUrls: ['./info-contract.component.scss']
})
export class InfoContractComponent implements OnInit {
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
   
  constructor(private contractService: ContractService,private http:HttpClient) {}
  generateReport() {
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
      (response) => {
        // Handle successful response
        console.log('PDF generated successfully:', response);
        const pdfPath = `assets/reports/contratFrancais.pdf`; 
        window.open(pdfPath, '_blank');
      },
      (error) => {
        // Handle error
        console.error('Error generating PDF:', error);
      }
    );
  }
  ngOnInit(): void {
   }

 

}
