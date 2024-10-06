import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-my-dashboard',
  templateUrl: './my-dashboard.component.html',
  styleUrls: ['./my-dashboard.component.scss']
})
export class MyDashboardComponent implements OnInit{

  
  constructor(private activeRoute:ActivatedRoute,private toast:ToastrService) {
  }

  ngOnInit(): void {
    this.activeRoute.queryParamMap.subscribe(
      (params)=>{
        if (params.get("userActivated") == 'true'){
          this.toast.success("Votre compte est activé avec succès")
        }
        if (params.get("userSubscribed") == 'true'){
          this.toast.success("Votre abonnement a été mis à jour avec succès")
        }
        
      }
    );

  }

}
