import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-adminlistcompany',
  templateUrl: './adminlistcompany.component.html',
  styleUrls: ['./adminlistcompany.component.css']
})
export class AdminlistcompanyComponent implements OnInit {
  filterText:any;
  listCompany:any;
  
  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.adminService.getallCompany().subscribe((res:any)=>{
      this.listCompany=res;
    })
  }

  refresh() {
    this.adminService.getallCompany().subscribe((res:any)=>{
      this.listCompany=res;
    })
  }

  showSwal(id) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.adminService.deleteCompany(id).subscribe((res: any) => {
          if (res) {
            this.refresh();
            Swal.fire(
              'Deleted!',
              'Company has been deleted.',
              'success'
            )

          } else {
            Swal.fire(
              'Error!',
              'Error Deleting',
              'error'
            )
          }
        });
      }
    });
  }
}
