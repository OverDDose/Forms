import { Component, OnInit, Output, EventEmitter } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'


@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html'
})
/**Создание формы */
export class AuthFormComponent implements OnInit {
  authForm: FormGroup
  constructor(private formBuilder: FormBuilder) {
    this.authForm = formBuilder.group({
      "login": ["", [Validators.required]],
      "password": ["", Validators.required]
    })
  }
  /**Передача состояния через output и открытие домашней вкладки  */
  submit(){
    this.access(this.authForm.value);
    if(sessionStorage.length!=0)
    {
      window.location.href= "/";
    }
  }

  /**Попытка получения данных о пользователе по имени, его перевод в Map*/
  get_user_map(name: string)
  {
    try {
      let profileStr = (localStorage.getItem(name));
      if(!!profileStr)
      {
        let profileJSON = JSON.parse(profileStr);
        sessionStorage.setItem("current", profileStr);
        return new Map (Object.entries(profileJSON));
      }
      else throw new Error("Unexpected error");

    } catch (e) {
      return null;
    }


  }
  /**Сравнение паролей, при их не совпадении удаляем данные о пользователе из sessionStorage */
  access(login: Object)
  {
    let user = new Map (Object.entries(login));
    if(!!localStorage.getItem(user.get('login')))
    {
      let profile = this.get_user_map(user.get('login'));
      if(user.get('password')!=profile?.get('password'))
      {
        this.TryAuth.emit('Password incorrect');
        sessionStorage.clear();
        return false;
      }
      this.TryAuth.emit("Авторизация пройдена успешно");
    }
    else this.TryAuth.emit('Пользователь не найден');
    return null;
  }
  @Output() TryAuth = new EventEmitter<string>()

  ngOnInit(): void {
  }

}
