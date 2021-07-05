import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-adminlistpublication',
  templateUrl: './adminlistpublication.component.html',
  styleUrls: ['./adminlistpublication.component.css']
})
export class AdminlistpublicationComponent implements OnInit {

  listPublication:any;
  filterText:any;
  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.adminService.getallPublication().subscribe((res:any)=>{
      console.log(res)
      this.listPublication=res;
    })
  }
  showSwal(pub) {
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
        this.adminService.deletePublication(pub).subscribe((res: any) => {
          if (res) {
            this.refresh();
            Swal.fire(
              'Deleted!',
              'Publication has been deleted.',
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
    this.adminService.getallPublication().subscribe((res:any)=>{
      console.log(res)
      this.listPublication=res;
    })
  }


}
