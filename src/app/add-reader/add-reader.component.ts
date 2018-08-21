import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from './../core/data.service';

import { Reader } from 'app/models/reader';

@Component({
  selector: 'app-add-reader',
  templateUrl: './add-reader.component.html',
  styles: []
})
export class AddReaderComponent implements OnInit {

  constructor(
    private dataService: DataService,
    private router: Router
  ) { }

  ngOnInit() { }

  saveReader(formValues: any): void {
    const newReader: Reader = <Reader>formValues;
    newReader.readerID = 0;
    // console.log(newReader);
    // console.warn('Save new reader not yet implemented.');

    this.dataService.addReader(newReader)
      .subscribe(
        (reader: Reader) => {
          console.log(reader);
          this.router.navigate(['/dashboard']);
        },
        (err: any) => console.log(err)
      )
  }

}
