import { Component, OnInit } from '@angular/core';
import { UsersService } from '@bluebits/users';

@Component({
  selector: 'ngshop-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  constructor(private userService: UsersService) {}
  title = 'ngshop';

  ngOnInit() {
    this.userService.initAppSession();
  }
}
