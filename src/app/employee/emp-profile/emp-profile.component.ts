import { Component, OnInit } from '@angular/core';
import  {ActivatedRoute, Router} from '@angular/router';
@Component({
  selector: 'app-emp-profile',
  templateUrl: './emp-profile.component.html',
  styleUrls: ['./emp-profile.component.css']
})
export class EmpProfileComponent implements OnInit {
  
  constructor(private route:ActivatedRoute,private router: Router) { }
     
  ngOnInit(): void {

    this.route.paramMap.subscribe(params=>{
     // this.router.url.split('?')[0]
     // let selectedId = params.get('id');
     // alert(selectedId);
      console.log("EmpProfileComponent OnInit"); 
    })
  }

}
