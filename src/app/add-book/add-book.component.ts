import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'app/core/data.service';

import { Book } from 'app/models/book';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styles: []
})
export class AddBookComponent implements OnInit {

  constructor(
    private router: Router,
    private dataService: DataService
  ) { }

  ngOnInit() { }

  saveBook(formValues: any): void {
    const newBook: Book = <Book>formValues;
    newBook.bookID = 0;
    console.log(newBook);
    // console.warn('Save new book not yet implemented.');

    this.dataService.addBook(newBook)
      .subscribe(
        (data: Book) => {
          console.log(data);
          this.router.navigate(['/dashboard']);
        },
        (err: any) => console.log(err)
      )
  }

}
