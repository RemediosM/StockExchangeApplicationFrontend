import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Share } from 'src/app/interfaces/share';
import { ShareHttpService } from 'src/app/services/share-http.service';

@Component({
  selector: 'app-edit-share',
  templateUrl: './edit-share.component.html',
  styleUrls: ['./edit-share.component.css']
})
export class EditShareComponent implements OnInit {

  id!: number;
  share: Share = {};
  notFoundError!: boolean;
  notFoundErrorMsg?: string;
  saveError!: boolean;
  saveErrorMsg?: string;
  submitted!: boolean;
  submitMsg?: string;
  
  constructor(private shareHttpService: ShareHttpService, private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.id = Number(this.activatedRoute.snapshot.paramMap.get("id"));
    this.shareHttpService.getShare(this.id).subscribe({
      next: share => this.share = share,
      error: (err:HttpErrorResponse) => {
        if (err.status == 404) {
          this.notFoundErrorMsg = "Share not found"
          this.notFoundError = true;
        } else {
          this.saveErrorMsg = err.statusText;
        }
      }
    });
    this.notFoundError = false;
    this.saveError = false;
    this.submitted = false;
  }

  editShare() {
    this.shareHttpService.editShare(this.id, this.share).subscribe({
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

  goBack() {
    this.router.navigate([""]);
  }

}
