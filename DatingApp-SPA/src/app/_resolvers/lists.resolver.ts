import { catchError } from 'rxjs/operators';
import { EMPTY, Observable, of } from 'rxjs';
import { AlertifyService } from '../_services/alertify.service';
import { User } from '../_models/user';
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { UserService } from '../_services/user.service';

@Injectable()
export class ListsResolver implements Resolve<User[]> {
    pageNumber = 1;
    pageSize = 5;
    likesParam = 'Likers';

    constructor(private userServeice: UserService,
        private router: Router, private alertify: AlertifyService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<User[]> {
        return this.userServeice.getUsers(this.pageNumber, this.pageSize, null, this.likesParam).pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving data');
                this.router.navigate(['']);
                return of(null);
            })
        )
    }
}