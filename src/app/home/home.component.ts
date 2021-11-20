import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  info: any = ''
  constructor() { }
  /** Проверка есть ли пользователь в sessionStorage получение и перевод в Map*/
  ngOnInit(): void {
    try {
      let pr = (sessionStorage.getItem("current"));
      if(!!pr)
      {
        let p = JSON.parse(pr);
        this.info = new Map (Object.entries(p));
      }
    }
    catch(e)
    {
      alert("Ошибка в данных");
    }

  }
  logOut(){
    sessionStorage.clear();
    this.info = '';
  }
}
