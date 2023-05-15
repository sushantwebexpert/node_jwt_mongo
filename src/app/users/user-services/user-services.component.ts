import { Component } from '@angular/core';

@Component({
  selector: 'app-user-services',
  templateUrl: './user-services.component.html',
  styleUrls: ['./user-services.component.scss']
})
export class UserServicesComponent {
   userForm:any = {
      value: [
        'star_map_maker',
        'star_map_maker'
        ]
    }

    openValue(v:any) {
console.log(v)
    }
}
