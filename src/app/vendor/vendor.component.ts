import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { VendorApiService } from '../services/vendor-api.service';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.scss']
})
export class VendorComponent implements OnInit {

  VendorForm !: FormGroup;
  actionBtn : string = "Save";
  
  constructor(private formBuilder: FormBuilder, private api: VendorApiService, 
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<VendorComponent>) { }

  ngOnInit(): void {
    this.VendorForm = this.formBuilder.group({
      vendorName:['',Validators.required],
      orgnizationNo:['',Validators.required],
      email:['',Validators.required],
      contactNo:['',Validators.required],
      address:['',Validators.required],
      description:['',Validators.required]
    });
    console.log(this.editData);
    if(this.editData)
    {
      this.actionBtn = "Update";
      this.VendorForm.controls['vendorName'].setValue(this.editData.vendorName);
      this.VendorForm.controls['email'].setValue(this.editData.email);
      this.VendorForm.controls['contactNo'].setValue(this.editData.contactNo);
      this.VendorForm.controls['address'].setValue(this.editData.address);
      this.VendorForm.controls['description'].setValue(this.editData.description);
      this.VendorForm.controls['orgnizationNo'].setValue(this.editData.orgnizationNo);
    }
  }
  addVendor(){
    if(!this.editData){
      if(this.VendorForm.valid && this.isValidEmail(this.VendorForm.controls['email'].value)){
        this.api.postVendor(this.VendorForm.value)
        .subscribe({
          next:(res)=>{
            alert("Vendor added successfully");
            this.VendorForm.reset();
            this.dialogRef.close('Save');
          },
          error:()=>{
            alert("Something went wrong while adding vendor");
          }
        })
      }
      else{
        alert('Form in not valid');
      }
    }
    else{
      this.updateVendor();
    }
  }
  updateVendor(){
    if(this.VendorForm.valid && this.isValidEmail(this.VendorForm.controls['email'].value)){
      this.api.putVendor(this.VendorForm.value, this.editData.id)
      .subscribe({
        next:(res)=>{
          alert('Vendor updated successfully');
          this.VendorForm.reset();
          this.dialogRef.close('update');
        },
        error:()=>{
          alert('Error while updating the record');
        }
      })
    }
   else{
     alert('Form is not valid');
   }
  }
  isValidEmail(emailString: string): boolean {
    try {
      let pattern = new RegExp("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$");
      let valid = pattern.test(emailString);
      console.log('Is email valid:',valid);
      return valid;
    } catch (TypeError) {
      return false;
    }
  }
 
}
