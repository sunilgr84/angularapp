import { Component, OnInit,ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DepartmentService } from 'src/app/services/department.service';
import { Department } from 'src/app/models/department-model';
import {MatSort, Sort} from '@angular/material/sort';
import {MatDialog,MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';


import { AddDeptComponent } from '../add-dept/add-dept.component';
import { EditDeptComponent } from '../edit-dept/edit-dept.component';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-show-dept',
  templateUrl: './show-dept.component.html',
  styleUrls: ['./show-dept.component.css']
})
export class ShowDeptComponent implements OnInit {  
    Post:any[];
  
    constructor( private http:HttpClient,private service:DepartmentService,private dialog:MatDialog, private snackbar:MatSnackBar){  
        this.service.listn().subscribe((m:any)=>{
        console.log(m);
        this.Filldatalist();
        })
       
      }

    listData :MatTableDataSource<any>
   
    displayedColumns:string[] = ["SrNo","DepartmentCode","DepartmentName","Actions"];
   
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
 
  ngOnInit(): void {
    this.Filldatalist();
   // this.listData.filterPredicate = function customFilter(data:Department , filter:string ): boolean {
    //  return (data.FirstName.toString().startsWith(filter));
  //}
  
  }

  Filldatalist()
  {
   // var dummaydata=[{FirstName:1,LastName:"IT"},
   // {FirstName:2,LastName:"Management"}]
   //this.listData = new MatTableDataSource(dummaydata);

    this.service.getDepList().subscribe(data=>{
      this.listData= new MatTableDataSource(data);
      this.listData.sort=this.sort;
      this.listData.paginator = this.paginator;
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

  //ngAfterViewInit() {
  //  this.listData.paginator = this.paginator;
  //  this.listData.sort = this.sort;
  //}
 

  onEdit(dep:Department)
  {
     // console.log(dep.DepartmentID);
     // alert(dep.ID);
     this.service.formdata=dep;
     const dialogConfig=new MatDialogConfig();
     dialogConfig.disableClose=true;
     dialogConfig.autoFocus=true;
     dialogConfig.width="60%";
     this.dialog.open(EditDeptComponent,dialogConfig);

  }
  onDelete(id:number)
  {
     // console.log(id);
     if(confirm('Do you want to delete ??'))
     {
        this.service.DeleteDepartment(id).subscribe(res=>{
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

 addDept()
  {
    const dialogConfig=new MatDialogConfig();
    dialogConfig.disableClose=true;
    dialogConfig.autoFocus=true;
    dialogConfig.width="60%";
    this.dialog.open(AddDeptComponent,dialogConfig);
  }
   

  
}
