import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { DataService } from 'app/core/data.service';
import { Book } from './../models/book';
import { BookTrackerError } from 'app/models/bookTrackerError';

@Injectable()
export class BooksResolverService implements Resolve<Book[] | BookTrackerError> {

  constructor(
    private dataService: DataService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Book[] | BookTrackerError> {
    return this.dataService.getAllBooks()
      .pipe(
        catchError(err => of(err))
      );
  }
}
