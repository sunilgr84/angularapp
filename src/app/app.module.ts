import { NgModule,ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';


import { MatTableModule } from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatSortModule } from '@angular/material/sort';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTooltipModule} from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule  } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatPaginatorModule } from '@angular/material/paginator';


import { EmployeeComponent } from './employee/employee.component';
import { DepartmentComponent } from './department/department.component';
import { ShowDeptComponent } from './department/show-dept/show-dept.component';


import { DepartmentService } from './services/department.service';
import { EmployeeService } from './services/employee.service';
import { AddDeptComponent } from './department/add-dept/add-dept.component';
import { EditDeptComponent } from './department/edit-dept/edit-dept.component';
import { AppErrorHandler } from './comman/app-error-handler';
import { ShowEmpComponent } from './employee/show-emp/show-emp.component';
import { EditEmpComponent } from './employee/edit-emp/edit-emp.component';
import { AddEmpComponent } from './employee/add-emp/add-emp.component';
import { NavbarComponent } from './navbar/navbar.component';
import { EmpProfileComponent } from './employee/emp-profile/emp-profile.component';
import { StudentComponent } from './student/student.component';
import { LazyloadtestComponent } from './lazyloadtest/lazyloadtest.component';





@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    DepartmentComponent,
    ShowDeptComponent,
    AddDeptComponent,
    EditDeptComponent,
    ShowEmpComponent,
    EditEmpComponent,
    AddEmpComponent,
    NavbarComponent,
    EmpProfileComponent,
    StudentComponent,
    LazyloadtestComponent  
   
  ],
  imports: [
    BrowserModule,    
    BrowserAnimationsModule,    
    MatTableModule,
    MatButtonModule,MatIconModule,MatInputModule,
    MatSortModule,MatDialogModule,
    HttpClientModule,
    MatTooltipModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatSnackBarModule,
    MatPaginatorModule,
    RouterModule.forRoot([
      {path:'Home',component:NavbarComponent},
      {path:'Employee',component:ShowEmpComponent},
      {path:'Departments',component:ShowDeptComponent},
      {path:'profile/:id/:username',component:EmpProfileComponent},
      {path:'Students',component:StudentComponent},
      {path:'LazyLoadTest',component:LazyloadtestComponent}
    ])
   
  ],
  providers: [
    ErrorHandler,
    DepartmentService,
    EmployeeService,
     {provide:ErrorHandler,useClass:AppErrorHandler}
  ],
  bootstrap: [AppComponent],
  entryComponents: [AddDeptComponent,EditDeptComponent]
  
})
export class AppModule { }
