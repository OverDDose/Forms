import { Component, OnInit, Output} from '@angular/core'
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms'
import { EventEmitter } from '@angular/core'



@Component({
  selector: 'app-reg-form',
  templateUrl: './reg-form.component.html'
})
export class RegFormComponent implements OnInit {

  regForm: FormGroup
  constructor(private formBuilder: FormBuilder) {
    this.regForm = formBuilder.group({
      "login": ["", [Validators.required]],
      "userEmail": ["", [Validators.required, Validators.email]],
      "password": ["", [Validators.required, Validators.minLength(6)]]
    })
  }
  getFormsControls() : FormArray{
    return this.regForm.controls['phones'] as FormArray;
  }
  /**Добавляем телефон */
  addPhone(){
    (<FormArray>this.regForm.controls["phones"]).push(new FormControl("", [Validators.required, Validators.pattern("[0-9]{10}")]));
  }
  submit(){
  this.NewReg.emit(this.save());
  }
  /**Сохранение инфы о пользователе в localstroage*/
  save()
  {
    try {
      /**проверка на существующего пользователя */
      if(!!localStorage.getItem(this.regForm.get('login')?.value))
      {
        throw new Error("");
      }
      localStorage.setItem(this.regForm.get('login')?.value, JSON.stringify(this.regForm.value));
      console.log(this.regForm);
      return 'Данные сохранены';

    } catch (error) {
      return "Имя пользователя занято";
    }
  }
  @Output() NewReg = new EventEmitter<string>()

  ngOnInit(): void {
  }

}
