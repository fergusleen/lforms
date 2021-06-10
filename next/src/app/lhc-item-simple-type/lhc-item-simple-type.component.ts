import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { LhcDataService} from '../../lib/lhc-data.service';

@Component({
  selector: 'lhc-item-simple-type',
  templateUrl: './lhc-item-simple-type.component.html',
  styleUrls: ['./lhc-item-simple-type.component.css']
})
export class LhcItemSimpleTypeComponent implements OnInit {

  // Handle the item whose type is 'integer' or 'decimal' and has a unit
  // http://hl7.org/fhir/StructureDefinition/questionnaire-unit
  // In lforms:
  // "unit": {
  //   "name": string,
  //   "code": string,
  //   "system": string,
  //   "default": boolean
  // }

  @Input() item;
  isSimpleType: boolean = false;
  hasSingleUnit: boolean = false;
  unitElementId: string = "";

  constructor(public lhcDataService: LhcDataService) { }

  /**
   * Initialize the component
   */
  ngOnInit(): void {
    if (this.item) {
      this.isSimpleType = this.item.dataType === "INT" ||
        this.item.dataType === "REAL" ||
        this.item.dataType === "ST" ||
        !this.item.dataType

      this.hasSingleUnit = this.item && this.item.unit && this.item._unitReadonly;
      this.unitElementId = "unit_" + this.item._elementId;

    }
  }

  ngOnChange(): void {

  }
  //TODO: maintain a value in FHIR format
}
