import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Reader } from 'app/models/reader';
import { DataService } from 'app/core/data.service';
import { BadgeService } from 'app/services/badge.service';

@Component({
  selector: 'app-edit-reader',
  templateUrl: './edit-reader.component.html',
  styles: [`
    .current-badge {
      border: none;
      background-color: #f5f5f5;
      box-shadow: none;
      padding-left: 0;
    }
  `],
  providers: [BadgeService]
})
export class EditReaderComponent implements OnInit {

  selectedReader: Reader;
  currentBadge: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
    private badgeService: BadgeService) { }

  ngOnInit() {
    const readerID: number = parseInt(this.route.snapshot.params['id'], 16);
    this.dataService.getReaderById(readerID)
      .subscribe(
        (reader: Reader) => {
          this.selectedReader = reader
          this.currentBadge = this.badgeService.getReaderBadge(this.selectedReader.totalMinutesRead);
        },
        (err: any) => console.log(err)
      )
    // this.selectedReader = this.dataService.getReaderById(readerID);
  }

  saveChanges() {
    this.dataService.updateReader(this.selectedReader)
      .subscribe(
        () => {
          console.log(`${this.selectedReader.name} updated successfully.`);
          this.router.navigate(['/dashboard']);
        },
        (err: any) => console.log(err)
      )
    // console.warn('Save reader not yet implemented.');
  }
}
