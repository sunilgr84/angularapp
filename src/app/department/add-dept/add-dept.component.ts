import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { DepartmentService } from 'src/app/services/department.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-dept',
  templateUrl: './add-dept.component.html',
  styleUrls: ['./add-dept.component.css']
})
export class AddDeptComponent implements OnInit {

  constructor(public dialogbox:MatDialogRef<AddDeptComponent>,
    private service:DepartmentService,
    private snackbar:MatSnackBar ) { }

  ngOnInit(): void {
    this.Resetdata();
  }
  Resetdata(myform?:NgForm)
  {
        if(myform!=null)
        myform.resetForm();
        this.service.formdata=
        {
          ID:0,
          DepartmentCode:'',
          DepartmentName:'',

          
        }

  }
  OndiaClose()
  { 
     this.dialogbox.close();
     this.service.filter('Register click');
  }
  onSubmit(myform: NgForm) {
    
    this.service.AddDepartment(myform.value).subscribe(res=>
      {        
        this.Resetdata(myform);
       // alert(res);
        this.snackbar.open(res.toString(),'',{
        duration:4000,
        verticalPosition:'top'
        });
      }
      
      )
}
}
