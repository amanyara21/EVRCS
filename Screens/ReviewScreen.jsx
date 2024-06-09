import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ReviewScreen = () => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [userReview, setUserReview] = useState(null);
  const [otherReviews, setOtherReviews] = useState([
    { id: 1, name: 'Alice', rating: 4.5, note: 'Great station!' },
    { id: 2, name: 'Bob', rating: 3.0, note: 'Decent experience.' },
    // Add more dummy reviews as needed
  ]);

  const handleReviewSubmit = () => {
    setUserReview({ name: 'You', rating, note: reviewText });
    setReviewText('');
    setRating(0);
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Icon key={`full-${i}`} name="star" size={20} color="#FFD700" />);
    }
    if (halfStar) {
      stars.push(<Icon key="half" name="star-half" size={20} color="#FFD700" />);
    }
    while (stars.length < 5) {
      stars.push(<Icon key={`empty-${stars.length}`} name="star-o" size={20} color="#FFD700" />);
    }
    return stars;
  };

  const renderReviewItem = ({ item }) => (
    <View style={styles.reviewItem}>
      <Text style={styles.reviewName}>{item.name}</Text>
      <View style={styles.reviewStars}>{renderStars(item.rating)}</View>
      <Text style={styles.reviewNote}>{item.note}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Leave a Review</Text>
      <View style={styles.starRatingContainer}>
        {renderStars(rating)}
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={5}
          step={0.5}
          value={rating}
          onValueChange={setRating}
          minimumTrackTintColor="#FFD700"
          thumbTintColor="#FFD700"
        />
      </View>
      <TextInput
        style={styles.textInput}
        placeholder="Write your review..."
        value={reviewText}
        onChangeText={setReviewText}
        multiline
      />
      <Button title="Submit Review" onPress={handleReviewSubmit} />
      {userReview && (
        <View style={styles.userReview}>
          <Text style={styles.userReviewHeader}>Your Review</Text>
          <Text style={styles.reviewName}>{userReview.name}</Text>
          <View style={styles.reviewStars}>{renderStars(userReview.rating)}</View>
          <Text style={styles.reviewNote}>{userReview.note}</Text>
        </View>
      )}
      <Text style={styles.header}>Other Reviews</Text>
      <FlatList
        data={otherReviews}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderReviewItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 16,
  },
  starRatingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  slider: {
    flex: 1,
    marginLeft: 10,
  },
  textInput: {
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginTop: 16,
    marginBottom: 16,
    textAlignVertical: 'top',
  },
  userReview: {
    marginTop: 16,
    padding: 16,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
  },
  userReviewHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  reviewItem: {
    marginBottom: 16,
    padding: 16,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
  },
  reviewName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  reviewStars: {
    flexDirection: 'row',
    marginVertical: 8,
  },
  reviewNote: {
    fontSize: 14,
    color: '#333',
  },
});

export default ReviewScreen;
