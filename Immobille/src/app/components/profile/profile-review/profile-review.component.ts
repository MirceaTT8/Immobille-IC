import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../interfaces/user';
import { Review } from '../../../interfaces/review';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile-review',
  standalone: true,
  imports: [CommonModule, FormsModule], // Add CommonModule and FormsModule here
  templateUrl: './profile-review.component.html',
  styleUrls: ['./profile-review.component.css']
})
export class ProfileReviewComponent implements OnInit {
  userId: string | null = null;
  user: User | null = null;
  newReview: Review = { reviewer: 'New Reviewer', text: 'This is a new review text.', user: '' };
  reviews: Review[] = []; // Array to hold reviews

  constructor(private route: ActivatedRoute, private authService: AuthService) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('userId');
    console.log('User ID:', this.userId);
    if (this.userId) {
      this.getUserById(this.userId);
      this.newReview.user = this.userId;
    }
  }

  getUserById(userId: string): void {
    this.authService.getUserById(userId).subscribe({
      next: (userData: User) => {
        this.user = userData;
        console.log(this.user);
        this.loadReviews();
      },
      error: (err) => {
        console.error('Error fetching user data:', err);
      }
    });
  }

  loadReviews(): void {
    if (this.user) {
      this.authService.getReviewsByUserId(this.user._id).subscribe({
        next: (reviewsData: Review[]) => {
          this.reviews = reviewsData;
        },
        error: (err) => {
          console.error('Error fetching reviews:', err);
        }
      });
    }
  }

  addReview(): void {
    this.authService.addReview(this.newReview).subscribe({
      next: (review: Review) => {
        this.reviews.push(review);
        this.newReview.text = ''; // Clear the review text after adding
      },
      error: (err) => {
        console.error('Error adding review:', err);
      }
    });
  }
}
