import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VendorApiService {

  constructor(private http: HttpClient) { }
  postVendor(data: any){
    return this.http.post<any>("http://localhost:3000/vendors/", data)
  }
  getVendor(){
    return this.http.get<any>("http://localhost:3000/vendors/")
  }
  putVendor(data: any, id:number){
    return this.http.put<any>("http://localhost:3000/vendors/"+id, data);
  }
  deleteVendor(id:number){
    return this.http.delete<any>("http://localhost:3000/vendors/"+id);
  }
}
