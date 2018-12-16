import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-rank',
  templateUrl: './rank.component.html',
  styleUrls: ['./rank.component.scss']
})
export class RankPage implements OnInit {

  constructor(private userService: UserService) {}

  private ranking: Array<Object>;

  ngOnInit() {
    this.userService.getPlayersRanking()
    .then((ranking) => this.ranking = ranking.sort(this.comparePlayersPoints));
  }

  comparePlayersPoints(playerOne: any, playerTwo: any): number {
    if (playerOne.points > playerTwo.points
      || (playerOne.points === playerTwo.points && playerOne.completed < playerTwo.completed)) {
      return -1;
    } else if (playerOne.points === playerTwo.points && playerOne.completed === playerTwo.completed) {
      return 0;
    }
    return 1;
  }

}
