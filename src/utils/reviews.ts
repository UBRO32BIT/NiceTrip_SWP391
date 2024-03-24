export const calculateAvgReviews = (reviews: Array<number>): string | null => {
    // Check if the reviews array is empty
    if (reviews.length === 0) {
        return null; // Return null if there are no reviews
    }

    // Calculate the sum of all reviews
    let sum = 0;
    reviews.forEach((review: any) => {
        sum += review.star;
      });
    // Calculate the average by dividing the sum by the number of reviews
    const average = sum / reviews.length;
    return average.toFixed(1);
}