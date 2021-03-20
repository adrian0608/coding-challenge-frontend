import { Component, OnInit, Input } from '@angular/core';
import { Customer } from '../../customer';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CustomerService } from  '../../service/customer.service';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent implements OnInit {

  id: string;
  customer: Customer;
  customerForm: FormGroup;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private customerService: CustomerService,
              public fb: FormBuilder) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    this.customerForm = this.fb.group({
      firstName: ['', [Validators.required]],
      middleName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required]]
    })
    if(this.id !== null) {
      this.customerService.getCustomerById(this.id)
        .subscribe(customer => {
          this.customer = customer
          this.populateForm();
      });
    }
  }

  onSave() {
    if(this.id === null){
      this.customerService.addCustomer(this.customerForm.value)
        .subscribe(result => console.log(result));
    } else {
      this.customerService.editCustomer(this.id, this.customerForm.value)
        .subscribe(result => console.log(result));
    }
    this.router.navigate(['/customers']);
  }

  onBack() {
    this.router.navigate(['/customers']);
  }

  populateForm() {
    this.customerForm.get('firstName').setValue(this.customer.firstName);
    this.customerForm.get('middleName').setValue(this.customer.middleName);
    this.customerForm.get('lastName').setValue(this.customer.lastName);
    this.customerForm.get('email').setValue(this.customer.email);
  }
}
