import { PaymentDetail } from './../../shared/payment-detail.model';
import { PaymentDetailService } from './../../shared/payment-detail.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import swal from 'sweetalert2';

@Component({
  selector: 'app-payment-detail-list',
  templateUrl: './payment-detail-list.component.html',
  styles: []
})
export class PaymentDetailListComponent implements OnInit {

  constructor(private service: PaymentDetailService, private toastr: ToastrService) { }

  ngOnInit() {
    //debugger;
    this.service.refreshList();
  }

  populateForm(pd: PaymentDetail) {
    //debugger;
    this.service.formData = Object.assign({}, pd);
  }

  onDelete(PMId) {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      type: 'warning',
      showConfirmButton: true,
      showCancelButton: true     
    })
    .then((willDelete) => {

        if(willDelete.value){
            this.service.deletePaymentDetail(PMId).subscribe(res=> {
              this.service.refreshList();
              swal("Success");
            },err=>{
              swal("Not Success! Try Again");
            })
             
        }else{
          swal("Fail");
        }

      console.log(willDelete)
    });
  }

}
