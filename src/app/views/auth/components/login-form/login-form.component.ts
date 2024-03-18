import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from "@angular/forms";
import { Router } from '@angular/router';
import { SecurityService } from '@app/security.service';

@Component({
    selector: 'login-form',
    templateUrl: './login-form.component.html'
})
export class LoginFormComponent implements OnInit {

    formGroup: FormGroup;
    showResult = false
    showPassword = false
    errorMessage:string = '';
    loading:boolean = false;

    @Input() thirPartyLogin = false
 
    constructor(private formBuilder: FormBuilder, private security:SecurityService,private router:Router) {}

    ngOnInit() {
        this.formGroup = this.formBuilder.group({
            username: ['', [
                Validators.required
            ]],
            password: ['', [
                Validators.required
            ]]
        });
    }
 
    login() {
        

        const email = this.formGroup.value.username;
        const password = this.formGroup.value.password;

        this.errorMessage='';
        this.showResult=false;
        this.loading = true;
        

        this.security.auth({ email,password }).toPromise().then((res:any)=>{
            console.log(res);

            localStorage.setItem('authObj', JSON.stringify(res.user)  );
            localStorage.setItem( 'token', res.authorisation.token  );

            this.router.navigateByUrl('/dashboard')
            
        }).catch((err:HttpErrorResponse)=>{
            console.log(err);
            
            this.showResult = true;
            
            if (err.status == 401) {
                this.errorMessage='Wrong email or password';
            }else{
                this.errorMessage='Something went wrong, please try again later.';
            }
        }).finally(()=>{
            this.loading = false;
        
        })

        
    }

    onShowPasswordClick () {
        this.showPassword = !this.showPassword
    }
 
    onReset() {
        this.formGroup.reset();
    }
}
