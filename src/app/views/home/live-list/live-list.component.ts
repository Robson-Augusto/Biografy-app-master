import { LiveFormDialogComponent2 } from './../live-form-dialog2/live-form-dialog.component2';
import { LiveFormDialogComponent } from './../live-form-dialog/live-form-dialog.component';
import { Component, OnInit } from '@angular/core';
import { LiveService } from 'src/app/shared/service/live.service';
import { Live } from 'src/app/shared/model/live.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';

import * as moment from 'moment';

let contador = 0;
let contador1 = 0;
let contador2 = 0;

@Component({
  selector: 'app-live-list',
  templateUrl: './live-list.component.html',
  styleUrls: ['./live-list.component.css']
})





export class LiveListComponent implements OnInit {



  livesNext: Live[];
  livesPrevious: Live[];
  livesNextReady: boolean = false;
  livesPreviousReady: boolean = false;
  url: string = '';
  urlSafe: SafeResourceUrl;


  constructor(
    private rest: LiveService,
    public sanitizer: DomSanitizer,
    public dialog: MatDialog
  ) { }


  ngOnInit() {
   this.getLives();
  }

  getLives(){
    this.rest.getLivesWithFlag('next').subscribe(data => {
      this.livesNext = data.content;
      this.livesNext.forEach(live => {
        live.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(live.liveLink);
      });
      this.livesNextReady = true;
    });

    this.rest.getLivesWithFlag('previous').subscribe(data => {
      this.livesPrevious = data.content;
      this.livesPrevious.forEach(live => {
        live.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(live.liveLink);
      });
      this.livesPreviousReady = true;
    });
  }


  like(){
    contador++;
    if(contador==1){
      document.getElementById("buttonclique").style.background='#6495ED';

    }
    else if(contador==2){
      document.getElementById("buttonclique").style.background='#FFFFFF';
      contador=0;
    }




  }
  like1(){
    contador1++;
    if(contador1==1){
      document.getElementById("buttonclique1").style.background='#6495ED';


    }
    else if(contador1==2){
      document.getElementById("buttonclique1").style.background='#FFFFFF';
      contador1=0;
    }

  }

  like2(){
    contador2++;
    if(contador2==1){
      document.getElementById("buttonclique2").style.background='#6495ED';

    }
    else if(contador2==2){
      document.getElementById("buttonclique2").style.background='#FFFFFF';
      contador2=0;
    }

  }

  share2(): void {



    const dialogRef = this.dialog.open(LiveFormDialogComponent2, {
      // maxHeight: '95vh',
      minWidth: '400px',
      // width: '25vw',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // window.location.reload();
    });
  }


}


