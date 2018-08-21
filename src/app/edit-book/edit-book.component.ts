import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Book } from 'app/models/book';
import { DataService } from 'app/core/data.service';
import { OldBook } from '../models/oldBook';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styles: []
})
export class EditBookComponent implements OnInit {
  selectedBook: Book;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService) { }

  ngOnInit() {
    const bookID: number = parseInt(this.route.snapshot.params['id'], 16); // 16 radix (hexadecimal)
    // this.selectedBook = this.dataService.getBookById(bookID);
    this.dataService.getBookById(bookID)
      .subscribe(
        (data: Book) => this.selectedBook = data,
        (err: any) => console.log(err)
      );

    this.dataService.getOldBookById(bookID)
      .subscribe(
        (book: OldBook) => console.log('Oldbook: ', book)
      );
  }

  setMostPopular(): void {
    this.dataService.setMostPopularBook(this.selectedBook);
  }

  saveChanges(): void {
    this.dataService.updateBook(this.selectedBook)
      .subscribe(
        () => {
          console.log(`${this.selectedBook.title} updated successfully.`);
          this.router.navigate(['/dashboard']);
        },
        (err: any) => console.log(err)
      )
    // console.warn('Save changes to book not yet implemented.');
  }
}
