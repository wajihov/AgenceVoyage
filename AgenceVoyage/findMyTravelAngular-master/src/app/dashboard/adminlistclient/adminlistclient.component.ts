import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-adminlistclient',
  templateUrl: './adminlistclient.component.html',
  styleUrls: ['./adminlistclient.component.css']
})
export class AdminlistclientComponent implements OnInit {
  filterText: any;
  listClient: any;

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.adminService.getallClient().subscribe((res: any) => {
      this.listClient = res;
    })
  }
  refresh() {
    this.adminService.getallClient().subscribe((res: any) => {
      this.listClient = res;
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
        this.adminService.deleteClient(id).subscribe((res: any) => {
          if (res) {
            this.refresh();
            Swal.fire(
              'Deleted!',
              'Client has been deleted.',
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
