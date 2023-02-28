import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Share } from 'src/app/interfaces/share';
import { ShareHttpService } from 'src/app/services/share-http.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-new-share',
  templateUrl: './new-share.component.html',
  styleUrls: ['./new-share.component.css']
})
export class NewShareComponent implements OnInit {

  share!: Share;
  saveError!: boolean;
  saveErrorMsg?: string;
  submitted!: boolean;
  submitMsg?: string;
  

  constructor(private shareHttpService: ShareHttpService,
    private router: Router) {  }

  ngOnInit(): void {
    this.saveError = false;
    this.submitted = false;
    this.share = {};
  }

  addShare() {
    const share: Share = {
      companyName: this.share.companyName,
      companyUrlPart: this.share.companyUrlPart,
      qty: this.share.qty,
      purchasePrice: this.share.purchasePrice,
      expectedPrice: this.share.expectedPrice
    }

    this.shareHttpService.addShare(share).subscribe({
      next: response => {
        this.submitted = true;
        this.submitMsg = response.statusText;
      },
      error: (err: HttpErrorResponse) => {
        if (err.status == 406) {
          this.saveErrorMsg = "Null value is not acceptable";
        } else {
          this.saveErrorMsg = err.statusText;
        }
        this.saveError = true;
      }
    });
  }

  addAnotherShare() {
    this.ngOnInit();
  }

  goBack() {
    this.router.navigate([""]);
  }

}
