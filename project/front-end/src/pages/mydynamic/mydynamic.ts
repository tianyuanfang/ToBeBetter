import { Component } from '@angular/core';
import { IonicPage, NavController} from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

/**
 * Generated class for the MydynamicPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mydynamic',
  templateUrl: 'mydynamic.html',
})
export class MydynamicPage {

  
  uid;
  content;
  user_info;
  nickname = [];
  avatar = [];
  love = [10, 23, 17, 19, 11, 12];


  goMydynamictail(did) {
    this.navCtrl.push('MydynamictailPage',{'did':did});
  }

  constructor(public navCtrl: NavController, public http: HttpClient) {

    this.uid = localStorage.getItem("uid");

    this.http.post('/api/mydynamic', {
      "uid": this.uid
    }).subscribe(data => {
      this.content = data;
      // console.log(data);
      this.content.forEach(e => {
        e.imgs = '../assets/imgs/download/' + e.imgs;
      });
    });

    this.http.post('/api/mydynamic/user_info', {
      "uid": this.uid
    }).subscribe(data => {
      this.user_info = data;
      // console.log(data);
      this.user_info.forEach(e => {
        if (e.uid == this.uid) {
          this.nickname.push(e.nickname);
          this.avatar.push('../assets/imgs/avatar/' + e.avatar);
        }
      });
    });
  }
  ionViewDidLoad() {
  }
}
