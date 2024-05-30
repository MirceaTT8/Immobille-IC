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
  imports: [CommonModule, FormsModule],
  templateUrl: './profile-review.component.html',
  styleUrls: ['./profile-review.component.css']
})
export class ProfileReviewComponent implements OnInit {
  userId: string | null = null;
  user: User | null = null;
  loggedInUser: User | null = null; // To hold the current logged-in user
  newReview: any = { reviewer: '', text: '', userId: '' };
  reviews: Review[] = []; // Array to hold reviews

  constructor(private route: ActivatedRoute, private authService: AuthService) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('userId');
    console.log('User ID:', this.userId);
    if (this.userId) {
      this.getUserById(this.userId);
      this.newReview.userId = this.userId;
    }
    this.getCurrentUser();
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

  getCurrentUser(): void {
    this.authService.getUser().subscribe({
      next: (userData: User) => {
        this.loggedInUser = userData;
        this.newReview.reviewer = userData.name;
        // No need to set newReview.user here since it's already set in ngOnInit
      },
      error: (err) => {
        console.error('Error fetching current user data:', err);
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
    if (!this.newReview.reviewer || !this.newReview.text || !this.newReview.userId) {
      console.error('All fields are required');
      return;
    }

    const formData = new FormData();
    formData.append('reviewer', this.newReview.reviewer);
    formData.append('text', this.newReview.text);
    formData.append('userId', this.newReview.userId);

    this.authService.addReview(formData).subscribe({
      next: (review: Review) => {
        console.log(review)
        this.loadReviews(); // Refresh the reviews list after adding a new review
        this.newReview.text = ''; // Clear the review text after adding
      },
      error: (err) => {
        console.error('Error adding review:', err);
      }
    });
  }
}
