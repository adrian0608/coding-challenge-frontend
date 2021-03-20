import { Component, OnInit } from '@angular/core';
import { Customer } from '../customer'
import { Router } from '@angular/router';
import { CustomerFormComponent } from '../component/customer-form/customer-form.component';
import { CustomerService } from  '../service/customer.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  value1: string;
  customersList: Customer[];
  selectedCustomer = null;

  constructor(private router: Router,
              private customerService: CustomerService) { }

  ngOnInit(): void {
      this.loadAll();
  }

  onSearch(value){
    if(value !== ''){
      this.customerService.getCustomerById(value)
        .subscribe(customer => {
          this.customersList = [];
          this.customersList.push(customer);
      });
    } else {
      this.loadAll();
    }
  }

  onAddNewCustomer(){
    this.router.navigate(['/customer-form/']);
  }

  onEdit(value){
    this.selectedCustomer = value;
    this.router.navigate(['/customer-form/',value.id]);
  }

  onDelete(value){
    this.customerService.deleteCustomer(value.id)
      .subscribe(result => console.log(result));
  }

  loadAll(){
    this.customerService.getAllCustomer()
      .subscribe(customersList => this.customersList = customersList);
  }

}
