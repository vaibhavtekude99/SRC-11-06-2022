import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookingDetails } from 'src/app/pojo/BookingDetails';
import { EmployeeDetails } from 'src/app/pojo/EmployeeDetails';
import { LoginDetails } from 'src/app/pojo/LoginDetails';
import { TravelRequest } from 'src/app/pojo/TravelRequest';
import { BookingDetailsService } from 'src/app/services/bookingDetailsService/booking-details.service';
import { EmployeeDetailsService } from 'src/app/services/employeeDetailsService/employee-details.service';
import { TravelRequestDetailsService } from 'src/app/services/travelRequestDetailsService/travel-request-details.service';

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.css']
})
export class BookingDetailsComponent implements OnInit {


  submitted: boolean = true;

  travelRequest: TravelRequest = new TravelRequest();
  employeeDetails: EmployeeDetails = new EmployeeDetails();
  bookingDetails: BookingDetails = new BookingDetails();
  loginDetails: LoginDetails = new LoginDetails();
  loginId: number = 0;

  travelRequestId: number = 0;

  constructor(private route: ActivatedRoute, private travelRequestService: TravelRequestDetailsService, private bookingDetailsService: BookingDetailsService) {

  }

  ngOnInit(): void {
    this.loginDetails = JSON.parse(sessionStorage.getItem('agentloginid') || '{}');
    this.loginId = this.loginDetails.loginId;
       console.log('this is your LoginId');

       
    this.bookingDetailsService.getAgentDetailsByLoginId(this.loginId).subscribe(data=>{
      console.log('this is your Agent');   
      console.log(data);
  });
  
         
    console.log(this.loginId);

    this.travelRequestId = this.route.snapshot.params['travelRequestId'];
    console.log('imported travel Request');


    console.log(this.travelRequestId);
    this.travelRequestService.getTravelRequestByTravelRequestId(this.travelRequestId).subscribe(data => {
      this.travelRequest = data;
      console.log(this.travelRequest);
    });

  }
  onClickBookTickets() {
    this.bookingDetails.startDate = this.travelRequest.startDate;
    this.bookingDetails.endDate = this.travelRequest.endDate;

    console.log(this.bookingDetails);


    this.bookingDetailsService.addBookingDetails(this.bookingDetails).subscribe(data => {
      console.log(data);
    })

  }
  goToHome() {

  }




}
