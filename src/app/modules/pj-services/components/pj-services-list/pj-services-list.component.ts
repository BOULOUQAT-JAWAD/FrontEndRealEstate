import { Component, Input } from '@angular/core';
import { PjService } from '../../models/pj-service';

@Component({
  selector: 'app-pj-services-list',
  templateUrl: './pj-services-list.component.html',
  styleUrls: ['./pj-services-list.component.scss']
})
export class PjServicesListComponent {

  @Input() pjServices!: PjService[];


}
