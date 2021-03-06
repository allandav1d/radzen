/*
  This file is automatically generated. Any changes will be overwritten.
  Modify contacts.component.ts instead.
*/
import { LOCALE_ID, ChangeDetectorRef, ViewChild, AfterViewInit, Injector, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';

import { DialogService, DIALOG_PARAMETERS, DialogRef } from '@radzen/angular/dist/dialog';
import { NotificationService } from '@radzen/angular/dist/notification';
import { ContentComponent } from '@radzen/angular/dist/content';
import { HeadingComponent } from '@radzen/angular/dist/heading';
import { TextBoxComponent } from '@radzen/angular/dist/textbox';
import { ButtonComponent } from '@radzen/angular/dist/button';
import { GridComponent } from '@radzen/angular/dist/grid';
import { ImageComponent } from '@radzen/angular/dist/image';
import { LabelComponent } from '@radzen/angular/dist/label';

import { ConfigService } from '../config.service';
import { AddContactComponent } from '../add-contact/add-contact.component';
import { EditContactComponent } from '../edit-contact/edit-contact.component';

import { CrmService } from '../crm.service';
import { SecurityService } from '../security.service';

export class ContactsGenerated implements AfterViewInit, OnInit, OnDestroy {
  // Components
  @ViewChild('content1') content1: ContentComponent;
  @ViewChild('pageTitle') pageTitle: HeadingComponent;
  @ViewChild('textbox0') textbox0: TextBoxComponent;
  @ViewChild('button0') button0: ButtonComponent;
  @ViewChild('grid0') grid0: GridComponent;

  router: Router;

  cd: ChangeDetectorRef;

  route: ActivatedRoute;

  notificationService: NotificationService;

  configService: ConfigService;

  dialogService: DialogService;

  dialogRef: DialogRef;

  httpClient: HttpClient;

  locale: string;

  _location: Location;

  _subscription: Subscription;

  crm: CrmService;

  security: SecurityService;
  getContactsResult: any;
  getContactsCount: any;
  contactFilter: any;
  parameters: any;

  constructor(private injector: Injector) {
  }

  ngOnInit() {
    this.notificationService = this.injector.get(NotificationService);

    this.configService = this.injector.get(ConfigService);

    this.dialogService = this.injector.get(DialogService);

    this.dialogRef = this.injector.get(DialogRef, null);

    this.locale = this.injector.get(LOCALE_ID);

    this.router = this.injector.get(Router);

    this.cd = this.injector.get(ChangeDetectorRef);

    this._location = this.injector.get(Location);

    this.route = this.injector.get(ActivatedRoute);

    this.httpClient = this.injector.get(HttpClient);

    this.crm = this.injector.get(CrmService);
    this.security = this.injector.get(SecurityService);
  }

  ngAfterViewInit() {
    this._subscription = this.route.params.subscribe(parameters => {
      if (this.dialogRef) {
        this.parameters = this.injector.get(DIALOG_PARAMETERS);
      } else {
        this.parameters = parameters;
      }
      this.load();
      this.cd.detectChanges();
    });
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }


  load() {
    this.crm.getContacts(null, this.grid0.allowPaging ? this.grid0.pageSize : null, this.grid0.allowPaging ? 0 : null, null, this.grid0.allowPaging, null, null, null)
    .subscribe((result: any) => {
      this.getContactsResult = result.value;

      this.getContactsCount = this.grid0.allowPaging ? result['@odata.count'] : result.value.length;
    }, (result: any) => {

    });

    this.contactFilter = '';
  }

  button0Click(event: any) {
    this.crm.getContacts(`contains(FirstName, '${this.contactFilter}') or contains(LastName, '${this.contactFilter}') or contains(Company, '${this.contactFilter}') or contains(Email, '${this.contactFilter}')`, null, null, null, true, null, null, null)
    .subscribe((result: any) => {
      this.getContactsResult = result.value;

      this.getContactsCount = result['@odata.count'];
    }, (result: any) => {

    });
  }

  grid0Add(event: any) {
    this.dialogService.open(AddContactComponent, { parameters: {}, title: 'Add Contact' });
  }

  grid0Delete(event: any) {
    this.crm.deleteContact(event.Id)
    .subscribe((result: any) => {
      this.notificationService.notify({ severity: "success", summary: `Success`, detail: `Contact deleted!` });
    }, (result: any) => {
      this.notificationService.notify({ severity: "error", summary: `Error`, detail: `Unable to delete Contact` });
    });
  }

  grid0LoadData(event: any) {
    this.crm.getContacts(`${event.filter ? event.filter + ' and ' : ''}(contains(FirstName, '${this.contactFilter}') or contains(LastName, '${this.contactFilter}') or contains(Company, '${this.contactFilter}') or contains(Email, '${this.contactFilter}'))`, event.top, event.skip, `${event.orderby}`, event.top != null && event.skip != null, ``, null, null)
    .subscribe((result: any) => {
      this.getContactsResult = result.value;

      this.getContactsCount = event.top != null && event.skip != null ? result['@odata.count'] : result.value.length;
    }, (result: any) => {

    });
  }

  grid0RowSelect(event: any) {
    this.dialogService.open(EditContactComponent, { parameters: {Id: event.Id}, title: 'Edit Contact' });
  }
}
