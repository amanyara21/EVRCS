import Slider from '@react-native-community/slider';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from '../Components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useAuth from '../Hooks/useAuth';
import Header from '../Components/Header';

const ReviewScreen = ({ route }) => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [userReview, setUserReview] = useState(null);
  const [otherReviews, setOtherReviews] = useState([]);
  const [hasReviewed, setHasReviewed] = useState(false);
  const { user } = useAuth();
  const { chargingStationId } = route.params;

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`https://evrcs-backend.vercel.app/api/reviews/${chargingStationId}`);
        const data = await response.json();
        setOtherReviews(data.filter(review => review.user._id !== user._id));
      } catch (error) {
        //console.log(error);
      }
    };

    const checkUserReview = async () => {
      try {
        const response = await fetch(`https://evrcs-backend.vercel.app/api/reviews/${chargingStationId}/${user._id}`);
        const data = await response.json();
        //console.log(data);
        setHasReviewed(data.hasReviewed);
        setUserReview(data.review);
      } catch (error) {
        //console.log(error);
      }
    };

    fetchReviews();
    checkUserReview();
  }, [chargingStationId]);

  const handleReviewSubmit = async () => {
    if (rating === 0 || reviewText.trim() === '') {
      Alert.alert("Please provide a rating and a review.");
      return;
    }

    //console.log("token");
    try {
      const token = await AsyncStorage.getItem('jwtToken');
      const response = await fetch(`https://evrcs-backend.vercel.app/api/reviews/${chargingStationId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token
        },
        body: JSON.stringify({
          rating,
          comment: reviewText
        })
      });
      //console.log(response.status);

      if (!response.ok) {
        const errorData = await response.json();
        //console.log(errorData);
        throw new Error(errorData.message || 'Server Error');
      }

      setUserReview({ name: 'You', rating, comment: reviewText });
      setHasReviewed(true);
      Alert.alert("Review added successfully");
    } catch (error) {
      //console.error(error);
      Alert.alert("Error submitting review", error.message);
    }
  };

  const handleStarPress = (newRating) => {
    setRating(newRating);
  };

  const renderStars = (currentRating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      let iconName = 'star-o';
      if (i <= currentRating) {
        iconName = 'star';
      } else if (i - currentRating === 0.5) {
        iconName = 'star-half';
      }
      stars.push(
        <TouchableOpacity key={i} onPress={() => handleStarPress(i)}>
          <Icon name={iconName} size={30} color="#FFD700" />
        </TouchableOpacity>
      );
    }
    return stars;
  };

  const renderReviewItem = ({ item }) => (
    <View style={styles.reviewItem}>
      <Text style={styles.reviewName}>{item.user.name}</Text>
      <View style={styles.reviewStars}>{renderStars(item.rating)}</View>
      <Text style={styles.reviewNote}>{item.comment}</Text>
    </View>
  );

  return (
    <>
      <Header title="Reviews" />
      <View style={styles.container}>
        {!hasReviewed && (
          <>
            <Text style={styles.header}>Leave a Review</Text>
            <View style={styles.starRatingContainer}>
              {renderStars(rating)}
            </View>
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
            <TextInput
              style={styles.textInput}
              placeholder="Write your review..."
              placeholderTextColor="#fff"
              value={reviewText}
              onChangeText={setReviewText}
              multiline
            />
            <Button title="Submit Review" color="#101944" click={handleReviewSubmit} />
          </>
        )}
        {userReview && (
          <>
            <Text style={styles.userReviewHeader}>Your Review</Text>
            <View style={styles.userReview}>
              <Text style={styles.reviewName}>You</Text> 
              <View style={styles.reviewStars}>{renderStars(userReview.rating)}</View>
              <Text style={styles.reviewNote}>{userReview.comment}</Text>
            </View>
          </>
        )}
        <Text style={styles.header}>Other Reviews</Text>
        <FlatList
          data={otherReviews}
          keyExtractor={(item) => item._id.toString()}
          renderItem={renderReviewItem}
        />
      </View>
    </>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#101944',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginVertical: 16,
  },
  starRatingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 16,
  },
  slider: {
    marginVertical: 16,
  },
  textInput: {
    height: 100,
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginTop: 16,
    marginBottom: 16,
    color: '#fff',
    textAlignVertical: 'top',
  },
  userReview: {
    marginTop: 16,
    padding: 16,
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 8,
  },
  userReviewHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  reviewItem: {
    marginBottom: 16,
    padding: 16,
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 8,
  },
  reviewName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  reviewStars: {
    flexDirection: 'row',
    marginVertical: 8,
  },
  reviewNote: {
    fontSize: 14,
    color: '#fff',
  },
});

export default ReviewScreen;
