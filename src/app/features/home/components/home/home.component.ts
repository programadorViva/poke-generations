import { HomeService } from './../../services/home.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private _list: any;

  constructor(
    private homeService: HomeService,
    private router: Router,
  ) { }
  
  ngOnInit(): void {
    this.homeService.getGenerations()
    .subscribe((res) => {
      console.log(res, 'paçoca');    
      this._list = this._format(res.results);

    }, (err: Error)  => {
      // this._msgError      = err.message;
      // this.ngbAlert.msg   = this._msgError;
      // this.ngbAlert.type  = 'danger';
    })
  }

  get list() {
    return this._list;
  }
 
  private _format(result) {    
    result.map((item) => {
      let split = [];
      split = item.url.split('/');
      if(split.length > 0) {
        item.id = split[6];
      }
    });

    return result;
  }

  public redirectTo(id) {
    this.router.navigate([`/generation/1`]);
  }
  
  

  // public teste(url) {
  //   console.log('chegou url', url);
  //   this.homeService.getPokemons(url)
  //   .subscribe((res) => {
  //     console.log(res, 'paçoca');    
  //     this._list = res.results;
  //   }, (err: Error)  => {

  //   })
  // }

}
