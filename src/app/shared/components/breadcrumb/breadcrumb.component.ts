import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
  // template: 'The href is: {{href}}'
})
export class BreadcrumbComponent implements OnInit {
  @Input('dadosURL') dadosURL: any;
  @Input('juntar') juntar: Boolean = true;
  public urlFormat: any = [];
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    if (typeof this.dadosURL !== 'undefined') {
      this.urlFormat = this.dadosURL;
    } else {
      const partesUrl = this.router.url.split('/');
      partesUrl.map((link) => {
        this.urlFormat.push({label: link.replace(/-/g, ' '), url: link});
      });
    }
  }

  public redirectTo(index) {
    let urlTeste = '';
    this.urlFormat.forEach((obj, key) => {
      if (typeof obj.url !== 'undefined') {
        if (key > 0 && this.juntar) {
          urlTeste +=  '/' + obj.url;
        } else {
          urlTeste = obj.url;
        }
        if (index == key) {
          if (typeof obj.urlFormatada !== 'undefined') {
            this.router.navigate([obj.urlFormatada]);
          } else {
            this.router.navigate([urlTeste]);
          }
        }
      }
    });
  }

}
