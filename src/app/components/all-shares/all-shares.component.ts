import { Component, OnInit } from '@angular/core';
import { Share } from 'src/app/interfaces/share';
import { ShareHttpService } from 'src/app/services/share-http.service';

@Component({
  selector: 'app-all-shares',
  templateUrl: './all-shares.component.html',
  styleUrls: ['./all-shares.component.css']
})
export class AllSharesComponent implements OnInit {

  allShares : Array<Share> = [];

  constructor(private shareService: ShareHttpService) { }

  ngOnInit(): void {
    this.getShares();
  }

  getShares() {
    this.shareService.getShares().subscribe(
      shares => {
        shares.forEach(share => {
          if(share.actualPrice && share.expectedPrice) {
            share.succes = share.actualPrice / share.expectedPrice;
          }
          if (share.actualPrice && share.purchasePrice) {
            share.gain = (share.actualPrice / share.purchasePrice) - 1;
            if (share.qty) {
              share.profit = (share.actualPrice - share.purchasePrice) * share.qty
            }
          }
        });
        shares.sort((a,b) => {
          if (a.succes == null) {
            return 1;
          }
          if (b.succes == null) {
            return -1;
          }
          return  b.succes - a.succes;
        });
        this.allShares = shares
      });
    }

  refresh() {
    window.location.reload();
  }

  deleteShare(id: any, name: any) {
    if (confirm("Do you want to delete: " + name + "?")) {
      this.shareService.deleteShare(id).subscribe(() => {
        this.refresh();
      });
    }
  }

}
