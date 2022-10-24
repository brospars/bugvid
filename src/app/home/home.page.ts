import {Component, OnInit} from '@angular/core';
import {forkJoin, Observable, Observer} from 'rxjs';
import {File} from '@ionic-native/file/ngx';
import {FileTransfer, FileTransferObject} from '@ionic-native/file-transfer/ngx';
import {distinctUntilChanged} from 'rxjs/operators';
import {Capacitor} from '@capacitor/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  samples = [
    'https://www.sample-videos.com/video123/mp4/720/big_buck_bunny_720p_10mb.mp4',
    'https://www.sample-videos.com/video123/mp4/720/big_buck_bunny_720p_5mb.mp4',
    'https://www.sample-videos.com/video123/mp4/720/big_buck_bunny_720p_2mb.mp4',
    'https://www.sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4'
  ];
  rootFolder: string;
  videos: string[];
  progress = 0;

  constructor(private transfer: FileTransfer, private file: File) {
    this.rootFolder = Capacitor.convertFileSrc(this.file.dataDirectory);
  }

  ngOnInit() {
    // Download all sample
    const downloads$ = [];
    this.samples.forEach((url, index) => {
      downloads$.push(this.download(url, `video-${index+1}.mp4`));
    });

    // Wait for all downloads
    forkJoin(...downloads$).subscribe(results => {
      this.videos = [];
      this.samples.forEach((url, index) => {
        this.videos.push(`${this.rootFolder}video-${index+1}.mp4`);
      });
    });

    // Progress
    downloads$[0].subscribe(p => this.progress = p)
  }

  // Download distant file to app data
  download(url: string, filename: string): Observable<number> {
    return new Observable((observer: Observer<number>) => {
      const fileTransfer: FileTransferObject = this.transfer.create();
      fileTransfer.download(encodeURI(url), this.file.dataDirectory + filename).then((entry) => {
        observer.complete();
      }, (error) => {
        console.warn(error);
      });
      fileTransfer.onProgress((e) => {
        observer.next(Math.round(e.loaded / e.total * 100));
      });
    }).pipe(distinctUntilChanged());
  }
}
