import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { FolderService } from 'src/app/services/folder.service';

@Component({
  selector: 'app-info-folder',
  templateUrl: './info-folder.component.html',
  styleUrls: ['./info-folder.component.scss']
})
export class InfoFolderComponent implements OnInit {

  enEdition = false;
  pdfs: any[] = [];
  numeroCourrier: string; 
  thumbnailUrls: SafeUrl[] = [];
 
  constructor(private sanitizer: DomSanitizer, 
              private folderdossierService: FolderService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const idFolder = params['idFolder'];});
  }
  activerEdition() {
    this.enEdition = true;
  }
  
}
