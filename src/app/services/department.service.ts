import { Injectable } from '@angular/core';
import {HttpClient,HttpErrorResponse } from '@angular/common/http';
import { Department } from '../models/department-model';
import { Observable,throwError} from 'rxjs';
import { Subject } from 'rxjs';
import{ catchError } from 'rxjs/operators';
//import 'rxjs/add/operator/catch';
//import 'rxjs/add/observable/throw';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private http:HttpClient) { }
  formdata:Department;
  readonly apiurl="http://localhost:27438/api";
  getDepList(): Observable<Department[]>
  {
       return  this.http.get<Department[]>(this.apiurl+'/GetDepartment');
  }
  AddDepartment(dept:Department)
  {
       return this.http.post(this.apiurl+'/InsertDepartment',dept);
  }
  UpdateDepartment(dept:Department)
  {
    return this.http.put(this.apiurl+'/UpdateDepartment',dept);
  }

  DeleteDepartment(id:number)
  {
    return this.http.delete(this.apiurl+'/DeletePerson/'+id)
    .pipe(catchError(this.errorHandler));
  }
//   errorHandler(error: HttpErrorResponse){
//     return Observable.throw(error.message || "Server Error");

//  }

 errorHandler(error: HttpErrorResponse) {
  return throwError(error.message || "Server Error");
}

  private _listners =new Subject<any>()
  listn(): Observable<any>
  {
  return this._listners.asObservable();
  }
  
  filter(filterby:string)
  {
   this._listners.next(filterby);
  }

}
