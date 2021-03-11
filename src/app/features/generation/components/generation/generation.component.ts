import { GenerationService } from './../../services/generation.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-generation',
  templateUrl: './generation.component.html',
  styleUrls: ['./generation.component.scss']
})
export class GenerationComponent implements OnInit {
  
  private _listPokemon: any;
  private _response: any;
  private _pokemon: any;
  private _idRoute: string;
  private _hasSearch: boolean = true;
  private _dadosURL = [
    {label: 'HOME', url: 'home'},
    {label: 'Lista de pokemons'},
  ];
  public formGroup: FormGroup;
  public ngbAlert = {type: null, msg: null};

  constructor(
    private formBuilder: FormBuilder,
    private generationService: GenerationService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      name:           ['', [Validators.required]],
    });

    this.route.params.subscribe(params => {
      this._idRoute = params['id'];
    });

    this.generationService.getPokemons(this._idRoute)
    .subscribe((res) => {
      console.log(res, 'paçoca');    
      this._response    = res;
      this._listPokemon = this._response.pokemon_species;
      
    }, (err: Error)  => {
      this.ngbAlert.msg   = err.message;
      this.ngbAlert.type  = 'danger';
    })
  }

  get listPokemon() {
    return this._listPokemon;
  }

  get dadosURL() {
    return this._dadosURL;
  }
  
  get response() {
    return this._response;
  }

  get idRoute() {
    return this._idRoute;
  }
  
  get hasSearch() {
    return this._hasSearch;
  }

  get pokemon() {
    return this._pokemon;
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
  
  public searchPokemon() {
    if(this.formGroup.get('name').value) {
      this.generationService.getDetailPokemon(String(this.formGroup.get('name').value).toLowerCase())
      .subscribe((res) => {
        console.log(res, 'detalhe do pokemon');    
        this._hasSearch = false;
        this._pokemon = {
          name:     res.name,
          sprite:   res.sprites.front_default,
          hp:       res.stats[0].base_stat,
          attack:   res.stats[1].base_stat,
          defense:  res.stats[2].base_stat
        }
        
  
      }, (err: Error)  => {
        this.ngbAlert.msg   = err.message;
        this.ngbAlert.type  = 'danger';
      })
    } else {
      this._hasSearch = true;
    }
    
  }
  
  public closeMessage() {
    this.ngbAlert       = {type: null, msg: null};
  }
  
  public clear() {
    this._hasSearch = true;
    this._pokemon = {};
  }
}
