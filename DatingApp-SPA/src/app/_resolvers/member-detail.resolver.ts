import { catchError } from 'rxjs/operators';
import { EMPTY, Observable } from 'rxjs';
import { AlertifyService } from './../_services/alertify.service';
import { User } from './../_models/user';
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { UserService } from '../_services/user.service';

@Injectable()
export class MemberDetailResolver implements Resolve<User> {
    constructor(private userServeice: UserService,
        private router: Router, private alertify: AlertifyService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<User> {
        return this.userServeice.getUser(route.params['id']).pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving data');
                this.router.navigate(['/members']);
                return EMPTY;
            })
        )
    }
}