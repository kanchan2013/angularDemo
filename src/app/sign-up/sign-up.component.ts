import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder, Validators} from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
public signUpForm !: FormGroup;
  constructor(private formBuilder : FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      userName: ['', Validators.required],
      email:['',Validators.required],
      password:['', Validators.required],
      mobile:['',Validators.required]
    })
  }
  signUp(){
    console.log('Form values',this.signUpForm.value);
     this.http.post<any>("http://localhost:3000/signUpUsers", this.signUpForm.value)
    .subscribe({next:(res)=>{
      alert("Signup successful");
      this.signUpForm.reset();
      this.router.navigate(['login']);
    }, error:()=>{
      alert('Something went worng');
    }
    });
  }

}
