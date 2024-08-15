import { Component, Input } from '@angular/core';
import { PjService } from '../../models/pj-service';

@Component({
  selector: 'app-pj-services-single',
  templateUrl: './pj-services-single.component.html',
  styleUrls: ['./pj-services-single.component.scss']
})
export class PjServicesSingleComponent {

  @Input() pjService!: PjService;

}
