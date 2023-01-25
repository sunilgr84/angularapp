import { Injectable } from '@angular/core';
import {HttpClient,HttpErrorResponse } from '@angular/common/http';
import { Employee } from '../models/employee.component'; 
import { Observable,throwError} from 'rxjs';
import { Subject } from 'rxjs';
import{ catchError } from 'rxjs/operators';

//import 'rxjs/add/operator/catch';
//import 'rxjs/add/observable/throw';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http:HttpClient) { }
  formdata:Employee;
  readonly apiurl="http://localhost:10539";
   url='';
  getEmpList(Condition:string,PageNum:number,PageSize:number,OrderBy:string): Observable<Employee[]>
  {
    //this.url = 'http://localhost:10539/GetPerson?Condition='+Condition+'&PageNum=' + PageNum+'&PageSize='+PageSize+'&OrderBy='+OrderBy;  
     this.url = 'http://localhost:10539/GetPerson/'+Condition+'/' + PageNum+'/'+PageSize+'/'+OrderBy;  
    //this.url ='http://localhost:10539/GetPerson/studentcode is not null/1/5/name asc';
    return  this.http.get<Employee[]>(this.url );
  }
 getTotalStudent()
 {
  this.url ='http://localhost:10539/GetTotalCount';
  return  this.http.get(this.url );
 }
  AddEmployee(emp:Employee)
  {
       return this.http.post(this.apiurl+'/InsertDepartment',emp);
  }
  UpdateEmployee(emp:Employee)
  {
    return this.http.put(this.apiurl+'/UpdateDepartment',emp);
  }
  DeleteEmployee(id:number)
  {
    return this.http.delete(this.apiurl+'/DeletePerson/'+id)
    .pipe(catchError(this.errorHandler));
  }
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
