import { Component, HostBinding, OnInit } from '@angular/core';
import { GamesService } from '../../services/games.service';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {

  @HostBinding('class') clasess = 'row';

  games: any = [];

  constructor(private GamesService: GamesService) { }

  ngOnInit(): void {
    this.getGames();
  }

  getGames() {
    this.GamesService.getGames().subscribe(
      res => {
        this.games = res;
      },
      err => console.error(err)
    )
  }

  // editGame(id: string) {
  //   this.GamesService
  //   console.log(id);
  // }

  deleteGame(id: string) {
    this.GamesService.deleteGame(id).subscribe(
      res => {
        this.getGames();
        console.log(res)
      },
      err => console.log(err)
    )
  }

}
