import { Component, OnInit } from '@angular/core';
import { NotificationService} from '../services/notification.service'
import { AuthService } from '../services/auth.service';
import { PostService} from '../services/post.service'

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  currentAccount
  notifications

  postInfo

  constructor(private notficationService: NotificationService, private authService: AuthService,
              private postService: PostService) { }

  ngOnInit(): void {
    this.currentAccount = this.authService.currentUserValue;
    console.log(this.currentAccount);
    this.notficationService.getUserNotification(this.currentAccount.username)
      .subscribe(data => {
        this.notifications = data;
        console.log(this.notifications)
      });
  }

  reformatDate(dateTime) {
    if (!dateTime) {
      return ""
    }
    let dateTimeArr = dateTime.split("T")
    let date = dateTimeArr[0].split("-")
    let day = date[2]
    let month = date[1]
    let year = date[0]
    let time = dateTimeArr[1].split(":")
    let hour = time[0]
    let minute = time[1]
    let second = time[2].split(".")[0]
    return `${day}-${month}-${year}`
  }

  getPostInfo(postID) {
    this.postService.getPostsByQuery(`?postID=${postID}`)
      .subscribe(data => {
        this.postInfo = data[0];
        console.log(this.postInfo)
      })
  }

}
