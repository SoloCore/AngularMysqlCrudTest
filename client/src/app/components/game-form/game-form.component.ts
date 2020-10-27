import { Component, OnInit, HostBinding } from '@angular/core';
import { Game } from 'src/app/models/Game';
import { ActivatedRoute, Router } from '@angular/router';

import { GamesService } from 'src/app/services/games.service';

@Component({
  selector: 'app-game-form',
  templateUrl: './game-form.component.html',
  styleUrls: ['./game-form.component.css']
})
export class GameFormComponent implements OnInit {

  @HostBinding('class') classes = 'row';

  game: Game = {
    id: 0,
    title: '',
    description: '',
    image: '',
    created_at: new Date()
  };

  edit: boolean = false;

  // activateddRoute: sirve para obtneer las rutas url y saber que parametross e mandan
  // Router: sirve para redireccionar a otra parte de la aplicacion

  constructor(private gameServices: GamesService, private router: Router, private activateddRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const params = this.activateddRoute.snapshot.params;
    if (params.id){
      this.gameServices.getGame(params.id)
      .subscribe(
        res => {
          console.log(res)
          this.game = res;
          this.edit = true;
        },
        err => console.error(err)
      )
    }
  }

  saveNewGame() {
    delete this.game.created_at;
    delete this.game.id;

    this.gameServices.saveGame(this.game)
    .subscribe(
      res => {
        console.log(res);
        this.router.navigate(['/games']);
      },
      err => console.error(err)
    )
  }

  
  updateGame() {
    delete this.game.created_at;

    console.log(this.game);
    this.gameServices.updateGame(this.game.id, this.game)
    .subscribe(
      res => {
       console.log(res);
       this.router.navigate(['/games']);       
      },
      err => console.error(err)
    )
  }

}
