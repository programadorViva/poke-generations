import { GenerationService } from './../../services/generation.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-generation',
  templateUrl: './generation.component.html',
  styleUrls: ['./generation.component.scss']
})
export class GenerationComponent implements OnInit {

  private _listPokemon: any;
  private _response: any;
  private _idRoute: string;

  constructor(
    private generationService: GenerationService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    
    this.route.params.subscribe(params => {
      this._idRoute = params['id'];
    });

    this.generationService.getPokemons(this._idRoute)
    .subscribe((res) => {
      console.log(res, 'paçoca');    
      this._response    = res;
      this._listPokemon = this._response.pokemon_species;
      
    }, (err: Error)  => {
      // this._msgError      = err.message;
      // this.ngbAlert.msg   = this._msgError;
      // this.ngbAlert.type  = 'danger';
    })
  }

  get listPokemon() {
    return this._listPokemon;
  }
  
  get response() {
    return this._response;
  }

  get idRoute() {
    return this._idRoute;
  }


  public detailPokemon(name) {
    this.generationService.getDetailPokemon(name)
    .subscribe((res) => {
      console.log(res, 'detalhe do pokemon');    
      
      this._listPokemon.filter(obj => obj.name === name)[0]['sprite'] = res.sprites.front_default;
      this._listPokemon.filter(obj => obj.name === name)[0]['hp']       = res.stats[0].base_stat
      this._listPokemon.filter(obj => obj.name === name)[0]['attack']   = res.stats[1].base_stat;
      this._listPokemon.filter(obj => obj.name === name)[0]['defense']  = res.stats[2].base_stat;

    }, (err: Error)  => {
      // this._msgError      = err.message;
      // this.ngbAlert.msg   = this._msgError;
      // this.ngbAlert.type  = 'danger';
    })
  }
}
