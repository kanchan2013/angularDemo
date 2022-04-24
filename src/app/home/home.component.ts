import {  OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { VendorApiService } from '../services/vendor-api.service';
import { VendorComponent } from '../vendor/vendor.component';
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  displayedColumns: string[] = ['vendorName','orgnizationNo', 'email', 'contactNo', 'address','description','action'];
  dataSource !: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;
  constructor(private dialog: MatDialog, private api: VendorApiService) { }

  ngOnInit(): void {
    this.getAllVendors();
  }
  openDialog() {
    this.dialog.open(VendorComponent, {
      width:'30%',
      disableClose: true
    }).afterClosed().subscribe(val=>{
      if(val==='Save'){
        this.getAllVendors();
      }
    });
  }
  getAllVendors(){
    this.api.getVendor()
    .subscribe({
      next:(res)=>{
        console.log(res);
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error:(err)=>{
        alert("Something went wrong");
      }
    })
  }
  editVendor(row: any){
    this.dialog.open(VendorComponent,{
      width: '30%',
      data:row,
      disableClose: true
    }).afterClosed().subscribe(val=>{
      if(val==='update'){
        this.getAllVendors();
      }
    })
  }

  deleteVendor(id:number){
    this.api.deleteVendor(id)
    .subscribe({
      next:(res)=>{
        alert('Vendor deleted successfully');
        this.getAllVendors();
      },
      
      error:(err)=>{
        alert("Error while deleting vendor");
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
