import { Injectable } from '@angular/core';
import { Customer } from '../customer'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private getAllCustomersUrl = "http://localhost:8080/api/customer/findAllCustomer";
  private addNewCustomerUrl = "http://localhost:8080/api/customer/addCustomer";
  private editCustomerUrl = "http://localhost:8080/api/customer/editCustomer";
  private deleteCustomerUrl = "http://localhost:8080/api/customer/deleteCustomerById";
  private getCustomerByIdUrl = "http://localhost:8080/api/customer/findCustomerById";

  constructor(private http: HttpClient) { }


  getAllCustomer(): any{
    return this.http.get<Customer[]>(this.getAllCustomersUrl);
  }

  addCustomer(newCustomer): any {
    return this.http.post(this.addNewCustomerUrl, newCustomer);
  }

  editCustomer(id, customer): any {
    return this.http.put(this.editCustomerUrl + "/" + id, customer);
  }

  deleteCustomer(id): any {
    return this.http.delete(this.deleteCustomerUrl + "/" + id);
  }

  getCustomerById(id): any{
    return this.http.get<Customer>(this.getCustomerByIdUrl + "/" + id);
  }
}
