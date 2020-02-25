import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  isAuthentecated=false;
  constructor(private dataStorageService: DataStorageService ,private auth:AuthService) {}
   ngOnInit(){
     this.auth.user.subscribe(user=>{
       this.isAuthentecated=!!user
       console.log( this.isAuthentecated)
     })
   }
  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }
}
