import { CacheInterceptor } from './cache.interceptor';
import { NgModule, Optional, SkipSelf, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { LoggerService } from './logger.service';
import { DataService } from './data.service';
import { PlainLoggerService } from './plain-logger.service';
import { throwIfAlreadyLoaded } from 'app/core/module-import-guard';
import { BooksResolverService } from './books-resolver.service';
import { BookTrackerErrorHandlerService } from './book-tracker-error-handler.service';
import { AddHeaderInterceptor } from './add-header.interceptor';
import { LogResponseInterceptor } from './log-response.interceptor';
import { HttpCacheService } from './http-cache.service';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    LoggerService,
    DataService,
    { provide: ErrorHandler, useClass: BookTrackerErrorHandlerService },
    BooksResolverService,
    { provide: HTTP_INTERCEPTORS, useClass: AddHeaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LogResponseInterceptor, multi: true },
    HttpCacheService,
    { provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true },
  ]
})
export class CoreModule {

  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

 }
