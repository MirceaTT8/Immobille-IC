import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/user';
import {Router} from '@angular/router';
import {NgClass, NgIf} from "@angular/common";
import {ProfileInfoComponent} from "./profile-info/profile-info.component";
import {MyAnnouncementsComponent} from "./my-announcements/my-announcements.component";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    NgIf,
    ProfileInfoComponent,
    NgClass,
    MyAnnouncementsComponent
  ],
  template:`
    <div class="wrapper">
      <div class="vertical-tabs-container">
        <div class="tabs">
          <button class="tab-link" (click)="selectTab(1)" [ngClass]="{'active': selectedTab === 1}">Dashboard</button>
          <button class="tab-link" (click)="selectTab(2)" [ngClass]="{'active': selectedTab === 2}">My Announcements</button>
          <button class="tab-link" (click)="selectTab(3)" [ngClass]="{'active': selectedTab === 3}">Saved Announcements</button>
          <button class="tab-link" (click)="selectTab(4)" [ngClass]="{'active': selectedTab === 4}">Add Advertisement</button>
          <button class="tab-link" (click)="selectTab(5)" [ngClass]="{'active': selectedTab === 5}">Account Settings</button>
        </div>
        <div class="tab-content">
          <div *ngIf="selectedTab === 1">
            <app-profile-info/>
          </div>
          <div *ngIf="selectedTab === 2">
            <app-my-announcements/>
          </div>
          <div *ngIf="selectedTab === 3">Saved Announcements Content Here</div>
          <div *ngIf="selectedTab === 4">Add Advertisement Content Here</div>
          <div *ngIf="selectedTab === 5">Account Settings Content Here</div>
        </div>
      </div>

    </div>
  `,
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  selectedTab = 1;

  selectTab(tabId: number) {
    this.selectedTab = tabId;
  }
}
