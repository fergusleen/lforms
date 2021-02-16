import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'lhc-item-quantity',
  templateUrl: './lhc-item-quantity.component.html',
  styleUrls: ['./lhc-item-quantity.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class LhcItemQuantityComponent implements OnInit {

  @Input() item;
  isQuantity: boolean = false;

  constructor() { }

  /**
   * Initialize the component
   */
  ngOnInit(): void {
    this.isQuantity = this.item && this.item.dataType === "QTY"
  }

  //TODO: maintain a value in FHIR format
}
