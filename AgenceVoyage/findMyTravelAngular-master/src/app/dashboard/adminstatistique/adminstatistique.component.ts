import { Component, OnInit } from '@angular/core';
import { StatistiqueService } from 'src/app/statistique.service';

@Component({
  selector: 'app-adminstatistique',
  templateUrl: './adminstatistique.component.html',
  styleUrls: ['./adminstatistique.component.css']
})
export class AdminstatistiqueComponent implements OnInit {
  stat={
    clientStat:{
      active:0,
      deleted:0
    },
    companyStat:{
      active:0,
      deleted:0
    },
    publicationStat:{
      active:0,
      draft:0,
      deleted:0
    },
    cursusStat:{
      active:0,
      draft:0,
      deleted:0
    }
  };

  constructor(private statService: StatistiqueService) { }

  ngOnInit() {
    this.refresh();
  }

  refresh(){
    this.statService.getStat().subscribe((res:any)=>{
      this.stat=res;
    })
  }

}
