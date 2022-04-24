import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder, Validators} from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
public loginForm!: FormGroup
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userName:['', Validators.required],
      password:['', Validators.required]
    })
  }
login(){
this.http.get<any>("http://localhost:3000/signUpUsers")
.subscribe({next:(res)=>{
  const user = res.find((a:any)=>{
    return a.userName===this.loginForm.value.userName && a.password === this.loginForm.value.password
  });
  if(user){
    alert('login successful');
    this.loginForm.reset();
    this.router.navigate(['home']);
  }
  else{
    alert('user doesnt exist');
  }
}, error:(err)=>{
  alert('Something went worng');
}
})
}
}
