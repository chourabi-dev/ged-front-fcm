import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

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


    constructor(private router:Router) { }

    profileMenuList = [ 
        {
            path: '',
            icon: 'feather icon-power',
            item: 'Sign Out'
        }
    ]

    ngOnInit(): void { 
        this.iniUser();
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
