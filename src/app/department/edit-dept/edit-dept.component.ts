import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { DepartmentService } from 'src/app/services/department.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-dept',
  templateUrl: './edit-dept.component.html',
  styleUrls: ['./edit-dept.component.css']
})
export class EditDeptComponent implements OnInit {

  constructor(public dialogbox:MatDialogRef<EditDeptComponent>,
    public service:DepartmentService,
    private snackbar:MatSnackBar ) { }

  ngOnInit(): void {
  }

  OndiaClose()
  { 
     this.dialogbox.close();
     this.service.filter('Register click');
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
  onSubmit(myform:NgForm)
  {
   // alert(this.service.formdata.ID);
   
    this.service.UpdateDepartment(this.service.formdata).subscribe(res=>{
      this.Resetdata(myform);
      this.snackbar.open(res.toString(),'',{
        duration:4000,
        verticalPosition:'top'
      });
    });
  }
}
