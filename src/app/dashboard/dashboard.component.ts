import { Component, OnInit, VERSION } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Title } from '@angular/platform-browser';

import { Book } from 'app/models/book';
import { Reader } from 'app/models/reader';
import { DataService } from 'app/core/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  allBooks: Book[];
  allReaders: Reader[];
  mostPopularBook: Book;

  constructor(
    private dataService: DataService,
    private title: Title
  ) { }

  ngOnInit() {
    // this.allBooks = this.dataService.getAllBooks();
    this.dataService.getAllBooks()
      .subscribe(
        (data: Book[]) => this.allBooks = data,
        (err: any) => console.log(err)
      );
    // this.allReaders = this.dataService.getAllReaders();
    this.dataService.getAllReaders()
      .subscribe(
        (readers: Reader[]) => this.allReaders = readers,
        (err: any) => console.log(err)
      )
    this.mostPopularBook = this.dataService.mostPopularBook;

    this.title.setTitle(`Book Tracker ${VERSION.full}`);
  }

  deleteBook(bookID: number): void {
    // console.warn(`Delete book not yet implemented (bookID: ${bookID}).`);
    this.dataService.deleteBook(bookID)
      .subscribe(
        () => {
          const index: number = this.allBooks.findIndex(book => book.bookID === bookID);
          this.allBooks.splice(index, 1);
        },
        (err: any) => console.log(err)
      )
  }

  deleteReader(readerID: number): void {
    this.dataService.deleteReader(readerID)
      .subscribe(
        () => {
          const index: number = this.allReaders.findIndex(reader => reader.readerID === readerID)
          this.allReaders.splice(index, 1);
        },
        (err: any) => console.log(err)
      )
    // console.warn(`Delete reader not yet implemented (readerID: ${readerID}).`);
  }

}
