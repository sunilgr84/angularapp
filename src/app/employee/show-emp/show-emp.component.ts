import { Component, OnInit,ViewChild ,AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeService } from 'src/app/services/employee.service';
import {MatSort, Sort} from '@angular/material/sort';
import {MatDialog,MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator,PageEvent  } from '@angular/material/paginator';
import { HttpClient } from '@angular/common/http';

import { AddEmpComponent } from '../add-emp/add-emp.component';
import { EditEmpComponent } from '../edit-emp/edit-emp.component';
import { Employee } from 'src/app/models/employee.component';
import { ActivatedRoute } from '@angular/router';




@Component({
  selector: 'app-show-emp',
  templateUrl: './show-emp.component.html',
  styleUrls: ['./show-emp.component.css']
})
export class ShowEmpComponent implements OnInit, AfterViewInit  {

  Post:any[];
  EmpPic="";
  Condition:string='Studentcode is not null'; 
  pageNumber: boolean[] = [];  
  sortOrder: any = 'Name ASC';  
  
  pageSize = 10;
  currentPage = 1;  
  resultsLength=0;

  constructor( private http:HttpClient,
    private service:EmployeeService,
    private dialog:MatDialog, 
    private snackbar:MatSnackBar,
    private route:ActivatedRoute
    ){  
      this.service.listn().subscribe((m:any)=>{
      console.log(m);
      this.Filldatalist();
      })
     
    }
    listData :MatTableDataSource<any>
   
    displayedColumns:string[] = ["SrNo","StudentCode","Name","Actions"];
   
    @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;
    @ViewChild(MatSort,{static:true}) sort: MatSort;
 
  ngOnInit(): void {
     
    
    this.route.paramMap.subscribe(params=>{

    });
   
   // let id =this.route.snapshot.paramMap.get('order');
    //alert(id);
    //this.route.queryParamMap.subscribe();
  //  let page = this.route.snapshot.queryParamMap.get('page');
    //alert(page);

    this.Filldatalist();
    this.EmpPic ="https://c7.alamy.com/zooms/9/feeb2f65825247e48d2468be0ed8d689/eaha1c.jpg";
   // this.listData.filterPredicate = function customFilter(data:Department , filter:string ): boolean {
    //  return (data.FirstName.toString().startsWith(filter));
  //}
   // Assign the paginator *after* dataSource is set
  // this.listData.paginator = this.paginator;
   //this.listData.sort = this.sort;
  }
    Filldatalist()
  {
   // var dummaydata=[{FirstName:1,LastName:"IT"},
   // {FirstName:2,LastName:"Management"}]
   //this.listData = new MatTableDataSource(dummaydata);

    this.service.getEmpList(this.Condition,this.currentPage, this.pageSize, this.sortOrder).subscribe(data=>{
      this.listData= new MatTableDataSource(data);
    
     // this.listData.paginator = this.paginator;
      // this.listData.sort=this.sort;
      this.paginator.pageIndex = this.currentPage;
      this.paginator.length = 50;
     // this.resultsLength=this.paginator.length;
      
    },
    (error:Response)=>{
      if(error.status==404)   //error instanceof NotFoundError
      {
      alert('This post has is already been deleted');
      }
      else
      {
        alert('An unexpected error occurred');
        console.log(error);
      }
    });

  }
  
  applyFilter(filtervalue:string)
  {
        this.listData.filter=filtervalue.trim().toLocaleLowerCase();
         if (this.listData.paginator) {
      this.listData.paginator.firstPage();
    }
  }

  ngAfterViewInit() {
  // this.listData.paginator = this.paginator;
   //this.listData.sort = this.sort;
  }

  pageChanged(event: PageEvent) {
    console.log({ event });
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.Filldatalist();
  }

  onEdit(emp:Employee)
  {
     // console.log(dep.DepartmentID);
     // alert(dep.ID);
     this.service.formdata=emp;
     const dialogConfig=new MatDialogConfig();
     dialogConfig.disableClose=true;
     dialogConfig.autoFocus=true;
     dialogConfig.width="60%";
     this.dialog.open(EditEmpComponent,dialogConfig);

  }
  onDelete(id:number)
  {
     // console.log(id);
     if(confirm('Do you want to delete ??'))
     {
        this.service.DeleteEmployee(id).subscribe(res=>{
          this.Filldatalist();
          this.snackbar.open(res.toString(),'',{
            duration:4000,
            verticalPosition:'top'
            });
        });
     }
  }
  
  //addDept(): void {
   // const dialogRef = this.dialog.open(AddDeptComponent, {
    //  width: '250px'
          
   // });
  
  //dialogRef.afterClosed().subscribe(result => {
  //  console.log('The dialog was closed');
    
 // });
//}

addEmp()
  {
    const dialogConfig=new MatDialogConfig();
    dialogConfig.disableClose=true;
    dialogConfig.autoFocus=true;
    dialogConfig.width="60%";
    this.dialog.open(AddEmpComponent,dialogConfig);
  }
  

}
