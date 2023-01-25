import { Component, OnInit } from '@angular/core';
import { PaginationService } from '../services/pagination.service';
import { EmployeeService } from '../services/employee.service';
import { PagerService } from '../services/pager.service';
import { PageEvent } from '@angular/material/paginator';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  
  Conditions: string = "StudentCode is not null";  
 
   ///////////////

  // array of all items to be paged
  private allItems: any[];
  private allItems1: any[];
  // pager object
  pager: any = {};

  // paged items
  pagedItems: any[];

  ////////////////
  
  selectedValue: any;
  oppoSuits = [
    {value : 10,viewValue : 10},
    {value : 20,viewValue : 20},
    {value : 100,viewValue : 100},
    {value : 500,viewValue : 500}
  ];
  formGroup : FormGroup;
  constructor(private fb:FormBuilder,public service: EmployeeService, public paginationService: PaginationService,private pagerService: PagerService) { }
  
  ngOnInit(): void {
   
    this.selectedValue = this.oppoSuits[0].value;
    this.formGroup = this.fb.group({
      itemCtrl : ['']
      
    });
    
   // this.pageNumber[0] = true;  
   // this.paginationService.temppage = 0;  
   // this.getAllStudent(); 
   // initialize to page 1
   
   this.service.getEmpList(this.Conditions,1,10, "Name asc")
    .subscribe((d:any) => {  
      this.allItems  = d;  
      this.pager = this.pagerService.getPager(50, 1,10);
      this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
    })

  // this.setPage(1);
    
    
  }
 
  setPage(page: number) {
    // get pager object from service
    this.pager = this.pagerService.getPager(50, page,this.formGroup.controls.itemCtrl.value);
   //alert(this.pager.startIndex);
    // get current page of items
    this.allItems1=[];
    
    this.service.getEmpList(this.Conditions,this.pager.currentPage, this.formGroup.controls.itemCtrl.value, "Name asc")
    .subscribe((d:any) => {  
      this.allItems1  = d;  
      this.pagedItems=d;
     // this.pagedItems = this.allItems1.slice(this.pager.startIndex, this.pager.endIndex + 1);
    })

   // this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
}
PageSizeEvent(e:any) {
  //console.log(e.target.value);
 
  this.pager = this.pagerService.getPager(50, 1,e.target.value);
 // alert(this.formGroup.controls.itemCtrl.value);
  this.service.getEmpList(this.Conditions,this.pager.currentPage,e.target.value, "Name asc")
    .subscribe((d:any) => {  
      this.allItems1  = d;  
      this.pagedItems=d;
     
    })
   // this.pageSize = event.pageSize;
    //this.currentPage = event.pageIndex;

    
}
FilldataOndrdPageSize()
{
  // alert(JSON.stringify(this.formGroup.value))
  this.pager = this.pagerService.getPager(50, 1,this.formGroup.controls.itemCtrl.value);
  this.service.getEmpList(this.Conditions,this.pager.currentPage,this.formGroup.controls.itemCtrl.value, "Name asc")
    .subscribe((d:any) => {  
      this.allItems1  = d;  
      this.pagedItems=d;
     
    })
}  


}
