import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-adminlistcursus',
  templateUrl: './adminlistcursus.component.html',
  styleUrls: ['./adminlistcursus.component.css']
})
export class AdminlistcursusComponent implements OnInit {
  listCursus:any;
  filterText:any;
  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.adminService.getallCursus().subscribe((res:any)=>{
      console.log(res)
      this.listCursus=res;
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
        this.adminService.deleteCursus(id).subscribe((res: any) => {
          if (res) {
            this.refresh();
            Swal.fire(
              'Deleted!',
              'Cursus has been deleted.',
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
  refresh() {
    this.adminService.getallCursus().subscribe((res:any)=>{
      console.log(res)
      this.listCursus=res;
    })
  }

}
