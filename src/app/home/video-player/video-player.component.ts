import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss'],
})
export class VideoPlayerComponent implements OnInit, AfterViewInit {
  @Input() src: string;
  @ViewChild('video', {static: false}) videoRef: ElementRef;
  video: HTMLVideoElement;
  playing: boolean;

  constructor() { }

  ngOnInit() {}

  ngAfterViewInit() {
    if (!this.videoRef) { return; }
    this.video = this.videoRef.nativeElement;
    this.video.addEventListener('play', (event) => {
      this.playing = true;
      console.log('play');
    });
    this.video.addEventListener('pause', (event) => {
      this.playing = false;
      console.log('pause');
    });
  }

}
