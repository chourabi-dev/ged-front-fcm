import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { Router } from '@angular/router';
import { ApiService } from '@app/api.service';

@Component({
    selector: 'nav-profile',
    templateUrl: './nav-profile.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class.header-nav-item]': 'true'
    }
})
export class NavProfileComponent implements OnInit {

    user:any = {};


    constructor(private router:Router, private api:ApiService, private messaging:AngularFireMessaging) { }

    profileMenuList = [ 
        {
            path: '',
            icon: 'feather icon-power',
            item: 'Sign Out'
        }
    ]

    ngOnInit(): void { 
        this.iniUser();
        

        this.requestPermission();
    }



    requestPermission() {
       
          
        this.messaging.requestPermission.subscribe(
          () => {
            console.log('Permission granted!');
            

            this.messaging.getToken.toPromise().then((token)=>{
                console.log(token);
                this.api.updateFCM(token).toPromise().then((server)=>{
                    console.log(server); 
                    
                })
            })


          },
          (error) => {
            console.log('Permission denied:', error);
            // Handle permission denied or error
          }
        );
      }


    getToken(){
       this.messaging.requestPermission.toPromise().then((ok)=>{
            this.messaging.getToken.subscribe((res)=>{
                console.log(res);

                this.api.updateFCM(res).toPromise().then((res)=>{
                    console.log(res);
                    
                })
                
            },(err)=>{
                console.log(err);
                
            })


       })
    }

    iniUser(){
        let user = JSON.parse(localStorage.getItem('authObj'));

        console.log(user);

        this.user = user;
        
    }


    logout(){
        localStorage.clear();
        this.router.navigateByUrl('/auth/login')
    }
}
